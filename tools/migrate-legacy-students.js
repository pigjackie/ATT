#!/usr/bin/env node
'use strict';

// One-time safe migration for the pre-Firebase classes in js/app.js.
// It excludes 音一莊, whose official replacement roster is imported separately.
const fs = require('fs');
const https = require('https');
const ROOT = 'jjvs_v2';
const EXCLUDED_CLASS = '\u97f3\u4e00\u838a';
const apply = process.argv.includes('--apply');
const databaseUrl = (process.env.FIREBASE_DATABASE_URL || '').replace(new RegExp('/$'), '');
function fail(message) { console.error(`ERROR: ${message}`); process.exitCode = 1; }
function request(method, path, body) {
  return new Promise((resolve, reject) => {
    const payload = body === undefined ? undefined : JSON.stringify(body);
    const req = https.request(new URL(`${databaseUrl}/${path}.json`), { method, headers: payload ? { 'content-type':'application/json', 'content-length':Buffer.byteLength(payload) } : {} }, response => {
      let text = ''; response.setEncoding('utf8'); response.on('data', chunk => { text += chunk; });
      response.on('end', () => response.statusCode >= 200 && response.statusCode < 300 ? resolve(text ? JSON.parse(text) : null) : reject(new Error(`HTTP ${response.statusCode}`)));
    });
    req.on('error', reject); if (payload) req.write(payload); req.end();
  });
}
function loadLegacyRoster() {
  const source = fs.readFileSync(require.resolve('../js/app.js'), 'utf8');
  const matches = [...source.matchAll(/\{id:"([^"]+)",name:"([^"]+)",cls:"([^"]+)"\}/g)];
  return matches.map(match => ({ id:match[1], name:match[2], cls:match[3] })).filter(student => student.cls !== EXCLUDED_CLASS);
}
function identityConflict(current, next) { return current && ((current.id && current.id !== next.id) || (current.name && current.name !== next.name) || (current.cls && current.cls !== next.cls)); }
(async () => {
  if (!databaseUrl) return fail('FIREBASE_DATABASE_URL is required.');
  const students = loadLegacyRoster();
  const existing = await request('GET', `${ROOT}/students`) || {};
  const updates = {}, counts = { total:students.length, created:0, existing:0, conflict:0 };
  const timestamp = new Date().toISOString();
  students.forEach(student => {
    const current = existing[student.id];
    if (identityConflict(current, student)) { counts.conflict += 1; console.log(`CONFLICT ${student.id}`); return; }
    const profile = { ...student, seatNo:Number(student.id.slice(-2)), isDormitory:typeof current?.isDormitory === 'boolean' ? current.isDormitory : false, status:'active', updatedAt:timestamp };
    if (current) { counts.existing += 1; Object.entries(profile).forEach(([key, value]) => { updates[`${student.id}/${key}`] = value; }); }
    else { counts.created += 1; updates[student.id] = { ...profile, createdAt:timestamp }; }
  });
  console.log(`Legacy migration: total ${counts.total}, new ${counts.created}, existing ${counts.existing}, conflict ${counts.conflict}`);
  if (!apply) return console.log('Dry run only. No Firebase data was changed.');
  if (counts.conflict) return fail('Apply stopped because conflicts were found.');
  await request('PATCH', `${ROOT}/students`, updates);
  console.log('IMPORT SUCCESS');
})().catch(error => fail(error.message));
