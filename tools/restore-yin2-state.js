#!/usr/bin/env node
'use strict';

// Restores old 音一莊 state from the verified pre-rollover Firebase backup.
const https = require('https');
const ROOT = 'jjvs_v2';
const SOURCE_BACKUP = 'rollover_1782714850213';
const apply = process.argv.includes('--apply');
const databaseUrl = (process.env.FIREBASE_DATABASE_URL || '').replace(new RegExp('/$'), '');
function fail(message) { console.error(`ERROR: ${message}`); process.exitCode = 1; }
function request(method, path, body) { return new Promise((resolve, reject) => { const payload = body === undefined ? undefined : JSON.stringify(body); const req = https.request(new URL(`${databaseUrl}/${path}.json`), { method, headers:payload ? { 'content-type':'application/json', 'content-length':Buffer.byteLength(payload) } : {} }, response => { let text = ''; response.setEncoding('utf8'); response.on('data', chunk => { text += chunk; }); response.on('end', () => response.statusCode >= 200 && response.statusCode < 300 ? resolve(text ? JSON.parse(text) : null) : reject(new Error(`HTTP ${response.statusCode}`))); }); req.on('error', reject); if (payload) req.write(payload); req.end(); }); }
(async () => {
  if (!databaseUrl) return fail('FIREBASE_DATABASE_URL is required.');
  const [backup, current] = await Promise.all([request('GET', `${ROOT}/rolloverBackups/${SOURCE_BACKUP}`), request('GET', `${ROOT}/students`)]);
  const rows = (backup?.rows || []).filter(row => row.action === 'promote' && row.oldCls === '\u97f3\u4e00\u838a' && row.newCls === '\u97f3\u4e8c\u838a');
  if (rows.length !== 32) return fail(`Expected 32 verified 音一 -> 音二 rows, found ${rows.length}.`);
  const invalid = rows.filter(row => !backup.students?.[row.oldId] || current?.[row.newId]?.name !== row.name || current?.[row.newId]?.cls !== '\u97f3\u4e8c\u838a');
  if (invalid.length) return fail(`Identity validation failed: ${invalid.map(row => row.newId).join(', ')}.`);
  const missingState = rows.filter(row => !current[row.newId].inventory && !current[row.newId].points).length;
  console.log(`Restore report: students ${rows.length}, targets missing state ${missingState}, source backup ${SOURCE_BACKUP}.`);
  if (!apply) return console.log('Dry run only. No Firebase data was changed.');
  const timestamp = new Date().toISOString(), restoreKey = `restore_yin2_${Date.now()}`, updates = {};
  updates[`${ROOT}/rolloverBackups/${restoreKey}`] = { createdAt:timestamp, reason:'restore 音二莊 state', sourceBackup:SOURCE_BACKUP, students:Object.fromEntries(rows.map(row => [row.newId, current[row.newId]])) };
  rows.forEach(row => {
    const source = backup.students[row.oldId];
    updates[`${ROOT}/students/${row.newId}`] = { ...source, id:row.newId, name:row.name, cls:'\u97f3\u4e8c\u838a', seatNo:Number(row.newId.slice(-2)), status:'active', restoredAt:timestamp, restoredFrom:`${SOURCE_BACKUP}/students/${row.oldId}` };
    updates[`${ROOT}/stuMsgs/${row.newId}`] = backup.stuMsgs?.[row.oldId] || null;
  });
  await request('PATCH', '', updates);
  console.log(`RESTORE SUCCESS. Backup: ${ROOT}/rolloverBackups/${restoreKey}`);
})().catch(error => fail(error.message));
