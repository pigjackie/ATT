#!/usr/bin/env node
'use strict';

// Applies the current 音一莊 Excel ordering. Two students not on the sheet
// remain preserved at the end of the list for manual review.
const https = require('https');
const ROOT = 'jjvs_v2';
const apply = process.argv.includes('--apply');
const databaseUrl = (process.env.FIREBASE_DATABASE_URL || '').replace(new RegExp('/$'), '');
const OFFICIAL = [
  '\u738b\u4fca\u4eba','\u738b\u79ae\u5a77','\u7518\u5a9b\u5a9b','\u5433\u82af\u7fbd','\u5442\u91c7\u6d1b','\u6797\u5ef7\u5ae3','\u5f35\u7488\u5141','\u9673\u828a\u59a4','\u9673\u55ac\u5b89','\u9ec3\u8587\u9713','\u694a\u54c1\u699b','\u5289\u5b50\u7dba','\u912d\u745e\u745c','\u8cf4\u598d\u5b89','\u7c21\u55ac\u8abc','\u738b\u54c1\u74bf','\u4f59\u51f1\u8343','\u5433\u7fca\u83ef','\u5442\u82f0\u921e','\u674e\u5f65\u5b9c','\u674e\u52d7\u7444','\u674e\u52dd\u60df','\u6797\u4e9e\u51e1','\u5f35\u6df3\u8ed2','\u5f35\u821c\u54f2','\u9673\u5b9a\u6fc2','\u9673\u67cf\u5747','\u9673\u7fbf\u6137','\u9673\u8056\u5b89','\u9ec3\u67cf\u7429','\u8521\u5b87\u5a01','\u912d\u715c\u9a0f','\u8cf4\u5747\u6d3a','\u8cf4\u5b5f\u73a8','\u8cf4\u80e4\u5b97'
];
function fail(message) { console.error(`ERROR: ${message}`); process.exitCode = 1; }
function request(method, path, body) { return new Promise((resolve, reject) => { const payload = body === undefined ? undefined : JSON.stringify(body); const req = https.request(new URL(`${databaseUrl}/${path}.json`), { method, headers:payload ? { 'content-type':'application/json', 'content-length':Buffer.byteLength(payload) } : {} }, response => { let text = ''; response.setEncoding('utf8'); response.on('data', chunk => { text += chunk; }); response.on('end', () => response.statusCode >= 200 && response.statusCode < 300 ? resolve(text ? JSON.parse(text) : null) : reject(new Error(`HTTP ${response.statusCode}`))); }); req.on('error', reject); if (payload) req.write(payload); req.end(); }); }
(async () => {
  if (!databaseUrl) return fail('FIREBASE_DATABASE_URL is required.');
  const students = await Promise.all(Array.from({ length:37 }, async (_, index) => { const id = `M1-${String(index + 1).padStart(2, '0')}`; return [id, await request('GET', `${ROOT}/students/${id}`)]; }));
  const byName = new Map(students.map(([id, student]) => [student?.name, { id, student }]));
  const missing = OFFICIAL.filter(name => !byName.has(name));
  if (missing.length) return fail(`Excel names not found: ${missing.join(', ')}`);
  const unlisted = students.filter(([, student]) => student && !OFFICIAL.includes(student.name));
  if (unlisted.length !== 2) return fail(`Expected 2 preserved students not in Excel, found ${unlisted.length}.`);
  const updates = {};
  OFFICIAL.forEach((name, index) => { updates[`${ROOT}/students/${byName.get(name).id}/seatNo`] = index + 1; });
  unlisted.sort(([, a], [, b]) => a.name.localeCompare(b.name, 'zh-Hant')).forEach(([id], index) => { updates[`${ROOT}/students/${id}/seatNo`] = OFFICIAL.length + index + 1; });
  console.log(`Seat report: official ${OFFICIAL.length}, preserved ${unlisted.length}, duplicate seats 0.`);
  if (!apply) return console.log('Dry run only. No Firebase data was changed.');
  await request('PATCH', '', updates);
  console.log('SEAT UPDATE SUCCESS');
})().catch(error => fail(error.message));
