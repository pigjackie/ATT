#!/usr/bin/env node
'use strict';

// Safe Firebase RTDB migration: reads first and PATCHes identity fields only.
// FIREBASE_DATABASE_URL=https://<project>.firebasedatabase.app node tools/import-yin1-students.js --dry-run
// FIREBASE_DATABASE_URL=https://<project>.firebasedatabase.app node tools/import-yin1-students.js --apply
const https = require('https');
const ROOT = 'jjvs_v2';
const CLASS_NAME = '\u97f3\u4e00\u838a';
const DORMITORY_SEATS = new Set([4, 11, 14, 16, 17, 20, 24, 29]);
const ROSTER = [
  '\u738b\u4fca\u4eba','\u738b\u79ae\u5a77','\u7518\u5a9b\u5a9b','\u5433\u5c0f\u8129','\u5433\u82af\u7fbd','\u5442\u91c7\u6d1b','\u6797\u5ef7\u5ae3','\u6797\u60e0\u96ef','\u5f35\u7488\u5141','\u9673\u828a\u59a4','\u9673\u55ac\u5b89','\u9ec3\u8587\u9713','\u694a\u54c1\u699b','\u5289\u5b50\u7dba','\u912d\u745e\u745c','\u8cf4\u598d\u5b89','\u7c21\u55ac\u8abc','\u738b\u54c1\u74bf','\u4f59\u51f1\u8343','\u5433\u7fca\u83ef','\u5442\u82f0\u921e','\u674e\u5f65\u5b9c','\u674e\u52d7\u7444','\u674e\u52dd\u60df','\u6797\u4e9e\u51e1','\u5f35\u6df3\u8ed2','\u5f35\u821c\u54f2','\u9673\u5b9a\u6fc2','\u9673\u67cf\u5747','\u9673\u7fbf\u6137','\u9673\u8056\u5b89','\u9ec3\u67cf\u7429','\u8521\u5b87\u5a01','\u912d\u715c\u9a0f','\u8cf4\u5747\u6d3a','\u8cf4\u5b5f\u73a8','\u8cf4\u80e4\u5b97'
];
const args = new Set(process.argv.slice(2));
const apply = args.has('--apply');
const databaseUrl = (process.env.FIREBASE_DATABASE_URL || '').replace(new RegExp('/$'), '');
function fail(message) { console.error(`ERROR: ${message}`); process.exitCode = 1; }
function request(method, path, body) {
  return new Promise((resolve, reject) => {
    const url = new URL(`${databaseUrl}/${path}.json`);
    const payload = body === undefined ? undefined : JSON.stringify(body);
    const req = https.request(url, { method, headers: payload ? { 'content-type':'application/json', 'content-length':Buffer.byteLength(payload) } : {} }, res => {
      let text = ''; res.setEncoding('utf8'); res.on('data', c => { text += c; });
      res.on('end', () => res.statusCode >= 200 && res.statusCode < 300 ? resolve(text ? JSON.parse(text) : null) : reject(new Error(`${method} ${path}: HTTP ${res.statusCode}`)));
    });
    req.on('error', reject); if (payload) req.write(payload); req.end();
  });
}
function profile(seatNo, name, timestamp) { return { id:`M1-${String(seatNo).padStart(2,'0')}`, name, cls:CLASS_NAME, seatNo, isDormitory:DORMITORY_SEATS.has(seatNo), status:'active', updatedAt:timestamp }; }
function conflict(current, next) { return current && ((current.name && current.name !== next.name) || (current.cls && current.cls !== next.cls) || (current.id && current.id !== next.id)); }
function report(c) { const status = c.conflict ? 'FAIL' : 'PASS'; console.log(`\nMigration Report\nFirebase path: ${ROOT}/students\nClass: ${CLASS_NAME}\nExpected: 37\nActual: ${c.actual}\nNew: ${c.created}\nExisting: ${c.existing}\nConflict: ${c.conflict}\nDormitory: 8\nSeat: 1-37\nStatus: ${status}`); return status; }
(async () => {
  if (!databaseUrl) return fail('FIREBASE_DATABASE_URL is required. No database request was made.');
  if (apply && args.has('--dry-run')) return fail('Use either --dry-run or --apply, not both.');
  const existing = await request('GET', `${ROOT}/students`) || {};
  const c = { actual:ROSTER.length, created:0, existing:0, conflict:0 }, updates = {}, timestamp = new Date().toISOString();
  ROSTER.forEach((name, i) => {
    const next = profile(i + 1, name, timestamp), current = existing[next.id];
    if (conflict(current, next)) { c.conflict += 1; console.log(`CONFLICT ${next.id}: existing identity differs; skipped.`); return; }
    if (current) { c.existing += 1; ['id','name','cls','seatNo','isDormitory','status','updatedAt'].forEach(k => { updates[`${next.id}/${k}`] = next[k]; }); }
    else { c.created += 1; updates[next.id] = { ...next, createdAt:timestamp }; }
  });
  const status = report(c);
  if (!apply) return console.log('\nDry run only. No Firebase data was changed.');
  if (status !== 'PASS') return fail('Apply stopped because conflicts were found.');
  await request('PATCH', `${ROOT}/students`, updates);
  console.log(`\nIMPORT SUCCESS\nClass: ${CLASS_NAME}\nStudents: 37\nSeat: 1-37\nDormitory: 8`);
})().catch(error => fail(error.message));
