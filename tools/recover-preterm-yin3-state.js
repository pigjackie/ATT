#!/usr/bin/env node
'use strict';

// Restores the pre-term state of the original 音二莊 cohort, now 音三莊.
// It is read-only unless --apply is explicitly supplied.
const https = require('https');
const ROOT = 'jjvs_v2';
const SOURCE_BACKUP = 'rollover_1782714850213';
const apply = process.argv.includes('--apply');
const databaseUrl = (process.env.FIREBASE_DATABASE_URL || '').replace(/\/$/, '');

function fail(message) { console.error(`ERROR: ${message}`); process.exitCode = 1; }
function request(method, path, body) {
  return new Promise((resolve, reject) => {
    const payload = body === undefined ? undefined : JSON.stringify(body);
    const req = https.request(new URL(`${databaseUrl}/${path}.json`), {
      method,
      headers: payload ? { 'content-type':'application/json', 'content-length':Buffer.byteLength(payload) } : {}
    }, response => {
      let text = '';
      response.setEncoding('utf8');
      response.on('data', chunk => { text += chunk; });
      response.on('end', () => response.statusCode >= 200 && response.statusCode < 300
        ? resolve(text ? JSON.parse(text) : null)
        : reject(new Error(`HTTP ${response.statusCode}`)));
    });
    req.on('error', reject);
    if (payload) req.write(payload);
    req.end();
  });
}
function id(n, grade) { return `${grade}-${String(n).padStart(2, '0')}`; }

(async () => {
  if (!databaseUrl) return fail('FIREBASE_DATABASE_URL is required.');
  const [backup, students, messages] = await Promise.all([
    request('GET', `${ROOT}/rolloverBackups/${SOURCE_BACKUP}`),
    request('GET', `${ROOT}/students`),
    request('GET', `${ROOT}/stuMsgs`)
  ]);
  const sourceStudents = backup?.students || {};
  const sourceMessages = backup?.stuMsgs || {};
  const rows = Array.from({ length:44 }, (_, index) => {
    const n = index + 1, sourceId = id(n, 'M2'), targetId = id(n, 'M3');
    return { sourceId, targetId, source:sourceStudents[sourceId], target:students?.[targetId] };
  });
  const invalid = rows.filter(row => !row.source || !row.target || row.target.cls !== '音三莊');
  if (invalid.length) return fail(`Validation failed: ${invalid.map(r => r.targetId).join(', ')}.`);

  const stateSummary = rows.reduce((sum, row) => {
    sum.logs += Object.keys(row.source.log || {}).length;
    sum.cards += Object.keys(row.source.inventory || {}).length;
    sum.messages += Object.keys(sourceMessages[row.sourceId] || {}).length;
    return sum;
  }, { logs:0, cards:0, messages:0 });
  console.log(`Recovery source: ${SOURCE_BACKUP}; students: ${rows.length}; source logs: ${stateSummary.logs}; source card types: ${stateSummary.cards}; source messages: ${stateSummary.messages}.`);
  console.log('Preserved fields: current name, class, seat number, dormitory flag, password, and current rollover metadata. M3-45/M3-46 are untouched.');
  if (!apply) return console.log('Dry run only. No Firebase data was changed.');

  const timestamp = new Date().toISOString();
  const recoveryKey = `recover_preterm_yin3_${Date.now()}`;
  const updates = {
    [`${ROOT}/rolloverBackups/${recoveryKey}`]: {
      createdAt:timestamp,
      reason:'pre-term 音三莊 state recovery',
      sourceBackup:SOURCE_BACKUP,
      students:Object.fromEntries(rows.map(row => [row.targetId, row.target])),
      stuMsgs:Object.fromEntries(rows.map(row => [row.targetId, messages?.[row.targetId] || null]))
    }
  };
  rows.forEach(row => {
    const target = row.target;
    updates[`${ROOT}/students/${row.targetId}`] = {
      ...row.source,
      id:row.targetId,
      name:target.name,
      cls:'音三莊',
      seatNo:target.seatNo,
      isDormitory:typeof target.isDormitory === 'boolean' ? target.isDormitory : false,
      status:'active',
      password:target.password || row.source.password || '0000',
      rolloverFrom:target.rolloverFrom,
      rolloverAt:target.rolloverAt,
      rolloverLabel:target.rolloverLabel,
      recoveredAt:timestamp,
      recoveredFrom:`${SOURCE_BACKUP}/students/${row.sourceId}`,
      updatedAt:timestamp
    };
    updates[`${ROOT}/stuMsgs/${row.targetId}`] = sourceMessages[row.sourceId] || null;
  });
  await request('PATCH', '', updates);
  console.log(`RECOVERY SUCCESS. Current state backup: ${ROOT}/rolloverBackups/${recoveryKey}`);
})().catch(error => fail(error.message));
