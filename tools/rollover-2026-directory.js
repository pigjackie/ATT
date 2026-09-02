#!/usr/bin/env node
'use strict';

// Safe one-time rollover: 音二莊 -> 音三莊; 演二樸 joins 音三莊;
// the former 音三莊 is archived. Default mode is read-only.
const https = require('https');
const ROOT = 'jjvs_v2';
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
function byClass(students, cls) { return Object.entries(students).filter(([, value]) => value?.cls === cls).sort(([a], [b]) => a.localeCompare(b, undefined, { numeric:true })); }
function studentNumber(id) { return Number(id.slice(-2)); }
(async () => {
  if (!databaseUrl) return fail('FIREBASE_DATABASE_URL is required.');
  const [students, messages] = await Promise.all([request('GET', `${ROOT}/students`), request('GET', `${ROOT}/stuMsgs`)]);
  const m3 = byClass(students || {}, '\u97f3\u4e09\u838a');
  const m2 = byClass(students || {}, '\u97f3\u4e8c\u838a');
  const p2 = byClass(students || {}, '\u6f14\u4e8c\u6a38');
  const expectedM2 = Array.from({ length:44 }, (_, i) => `M2-${String(i + 1).padStart(2, '0')}`);
  if (m3.length !== 40 || m2.length !== 44 || p2.length !== 2 || m2.map(([id]) => id).join(',') !== expectedM2.join(',')) {
    return fail(`Unexpected roster: 音三莊 ${m3.length}, 音二莊 ${m2.length}, 演二樸 ${p2.length}. No data changed.`);
  }
  const mappings = [
    ...m2.map(([oldId, data]) => ({ oldId, newId:oldId.replace('M2-', 'M3-'), data })),
    ...p2.map(([oldId, data], index) => ({ oldId, newId:`M3-${String(45 + index).padStart(2, '0')}`, data }))
  ];
  const targetIds = new Set(mappings.map(row => row.newId));
  if (m3.some(([id]) => !targetIds.has(id)) || mappings.some(row => {
    const target = students[row.newId];
    return target && !m3.some(([id]) => id === row.newId) && (target.name || target.cls);
  })) {
    return fail('Target IDs are not the expected former 音三莊 range. No data changed.');
  }
  console.log(`Rollover report: graduate ${m3.length}; 音二莊 -> 音三莊 ${m2.length}; 演二樸 -> 音三莊 ${p2.length}; active 音三莊 ${mappings.length}.`);
  if (!apply) return console.log('Dry run only. No Firebase data was changed.');
  const timestamp = new Date().toISOString(), key = `rollover_2026_${Date.now()}`, updates = {};
  updates[`${ROOT}/rolloverBackups/${key}`] = { createdAt:timestamp, reason:'2026 grade rollover', sourceStudents:{ m3:Object.fromEntries(m3), m2:Object.fromEntries(m2), p2:Object.fromEntries(p2), targetState:Object.fromEntries(mappings.map(row => [row.newId, students[row.newId] || null])) }, sourceMessages:{ m3:Object.fromEntries(m3.map(([id]) => [id, messages?.[id] || null])), m2:Object.fromEntries(m2.map(([id]) => [id, messages?.[id] || null])), p2:Object.fromEntries(p2.map(([id]) => [id, messages?.[id] || null])) }, mappings };
  m3.forEach(([id, data]) => { updates[`${ROOT}/graduates/2026\u7562\u696d\u751f/${id}`] = { ...data, id, status:'graduate', archivedAt:timestamp }; });
  mappings.forEach((row, index) => {
    const seatNo = index < 44 ? studentNumber(row.newId) : 45 + (index - 44);
    updates[`${ROOT}/students/${row.newId}`] = { ...(students[row.newId] || {}), ...row.data, id:row.newId, cls:'\u97f3\u4e09\u838a', seatNo, status:'active', updatedAt:timestamp, rolloverFrom:row.oldId, rolloverAt:timestamp };
    updates[`${ROOT}/students/${row.oldId}`] = null;
    updates[`${ROOT}/stuMsgs/${row.newId}`] = messages?.[row.oldId] || messages?.[row.newId] || null;
    updates[`${ROOT}/stuMsgs/${row.oldId}`] = null;
  });
  await request('PATCH', '', updates);
  console.log(`ROLLOVER SUCCESS. Backup: ${ROOT}/rolloverBackups/${key}`);
})().catch(error => fail(error.message));
