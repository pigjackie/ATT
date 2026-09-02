/* Minimal Firebase gateway for app services.  It deliberately exposes only
 * scoped paths under jjvs_v2 and never calls set() on the root. */
(function (global) {
  'use strict';
  const ROOT = 'jjvs_v2';
  function ref(path) {
    if (!global.firebase || !global.firebase.apps.length) throw new Error('Firebase has not been initialized');
    const safePath = String(path || '').replace(/^\/+|\/+$/g, '');
    return global.firebase.database().ref(safePath ? `${ROOT}/${safePath}` : ROOT);
  }
  async function get(path) { return (await ref(path).once('value')).val(); }
  async function patch(path, value) { return ref(path).update(value); }
  global.FirebaseService = Object.freeze({ ref, get, patch });
})(window);
