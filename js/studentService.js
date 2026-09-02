/* Firebase-backed student directory. Identity fields are intentionally kept
 * separate from student-owned state such as password, attendance and cards. */
(function (global) {
  'use strict';
  const ROOT = 'jjvs_v2';
  const ID_PATTERN = /^[A-Z]\d-\d{2}$/;

  function normalize(id, value) {
    if (!value || typeof value !== 'object') return null;
    const studentId = String(value.id || id).trim();
    const name = String(value.name || '').trim();
    const cls = String(value.cls || value.className || '').trim();
    if (!ID_PATTERN.test(studentId) || !name || !cls) return null;
    const seatNo = Number(value.seatNo);
    return { id: studentId, name, cls,
      ...(Number.isInteger(seatNo) && seatNo > 0 ? { seatNo } : {}),
      ...(typeof value.isDormitory === 'boolean' ? { isDormitory: value.isDormitory } : {}),
      ...(value.status ? { status: value.status } : {}) };
  }

  async function loadDirectory() {
    if (!global.FirebaseService) throw new Error('Firebase service has not been initialized');
    const raw = (await global.FirebaseService.get('students')) || {};
    const students = Object.entries(raw).map(([id, value]) => normalize(id, value)).filter(Boolean)
      .filter(student => student.status !== 'archived' && student.status !== 'inactive')
      .sort((a, b) => a.cls.localeCompare(b.cls, 'zh-Hant') || (a.seatNo || Number.MAX_SAFE_INTEGER) - (b.seatNo || Number.MAX_SAFE_INTEGER) || a.id.localeCompare(b.id));
    return { students, classes: [...new Set(students.map(student => student.cls))] };
  }
  global.StudentService = Object.freeze({ loadDirectory, normalize });
})(window);
