#!/usr/bin/env node
'use strict';

// Restores the prior-year 音一莊 roster as this year's 音二莊.
const fs = require('fs');
const https = require('https');
const ROOT = 'jjvs_v2';
const apply = process.argv.includes('--apply');
const databaseUrl = (process.env.FIREBASE_DATABASE_URL || '').replace(new RegExp('/$'), '');
function fail(message) { console.error(`ERROR: ${message}`); process.exitCode = 1; }
function request(method, path, body) { return new Promise((resolve, reject) => { const payload = body === undefined ? undefined : JSON.stringify(body); const req = https.request(new URL(`${databaseUrl}/${path}.json`), { method, headers:payload ? { 'content-type':'application/json', 'content-length':Buffer.byteLength(payload) } : {} }, response => { let text = ''; response.setEncoding('utf8'); response.on('data', chunk => { text += chunk; }); response.on('end', () => response.statusCode >= 200 && response.statusCode < 300 ? resolve(text ? JSON.parse(text) : null) : reject(new Error(`HTTP ${response.statusCode}`))); }); req.on('error', reject); if (payload) req.write(payload); req.end(); }); }
function roster() { const source = fs.readFileSync(require.resolve('../js/app.js'), 'utf8'); return [...source.matchAll(/\{id:"(M1-\d+)",name:"([^"]+)",cls:"\u97f3\u4e00\u838a"\}/g)].map(match => ({ oldId:match[1], name:match[2], newId:match[1].replace('M1-', 'M2-') })); }
(async () => {
  if (!databaseUrl) return fail('FIREBASE_DATABASE_URL is required.');
  const students = await request('GET', `${ROOT}/students`) || {}, old = roster();
  if (old.length !== 33) return fail(`Expected 33 legacy 音一莊 students, found ${old.length}.`);
  const conflicts = old.filter(row => students[row.newId] && ((students[row.newId].name && students[row.newId].name !== row.name) || (students[row.newId].cls && students[row.newId].cls !== '\u97f3\u4e8c\u838a')));
  console.log(`Promotion report: expected 33, new ${old.filter(row => !students[row.newId]).length}, existing ${old.filter(row => students[row.newId]).length}, conflict ${conflicts.length}.`);
  if (!apply) return console.log('Dry run only. No Firebase data was changed.');
  if (conflicts.length) return fail(`Conflicts: ${conflicts.map(row => row.newId).join(', ')}`);
  const timestamp = new Date().toISOString(), updates = {};
  old.forEach(row => { const seatNo = Number(row.newId.slice(-2)); updates[row.newId] = { ...(students[row.newId] || {}), id:row.newId, name:row.name, cls:'\u97f3\u4e8c\u838a', seatNo, isDormitory:students[row.newId]?.isDormitory || false, status:'active', updatedAt:timestamp, rolloverFrom:row.oldId, rolloverAt:timestamp }; });
  await request('PATCH', `${ROOT}/students`, updates);
  console.log('PROMOTION SUCCESS');
})().catch(error => fail(error.message));
