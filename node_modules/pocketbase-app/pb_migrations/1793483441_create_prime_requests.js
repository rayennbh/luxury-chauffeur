migrate((app) => {
  let requests;
  try { requests = app.findCollectionByNameOrId('prime_requests'); } catch (_) {
    requests = new Collection({ name: 'prime_requests', type: 'base', listRule: null, viewRule: null, createRule: '', updateRule: null, deleteRule: null, fields: [
      { name: 'name', type: 'text', required: true, max: 150 },
      { name: 'email', type: 'email', required: true },
      { name: 'phone', type: 'text', max: 50 },
      { name: 'kind', type: 'select', required: true, maxSelect: 1, values: ['contact', 'transfert', 'rendez-vous'] },
      { name: 'departure', type: 'text', max: 250 },
      { name: 'arrival', type: 'text', max: 250 },
      { name: 'requested_date', type: 'text', max: 30 },
      { name: 'requested_time', type: 'text', max: 10 },
      { name: 'passengers', type: 'number', min: 0, max: 99 },
      { name: 'message', type: 'text', max: 4000 },
      { name: 'consent', type: 'bool', required: true },
      { name: 'created', type: 'autodate', onCreate: true, onUpdate: false },
      { name: 'updated', type: 'autodate', onCreate: true, onUpdate: true }
    ] }); app.save(requests);
  }
  let messages;
  try { messages = app.findCollectionByNameOrId('prime_messages'); } catch (_) {
    const users = app.findCollectionByNameOrId('users');
    messages = new Collection({ name: 'prime_messages', type: 'base',
      listRule: '@request.auth.id != "" && owner = @request.auth.id',
      viewRule: '@request.auth.id != "" && owner = @request.auth.id',
      createRule: '@request.auth.id != "" && @request.body.owner = @request.auth.id && @request.body.sender = "visiteur"',
      updateRule: null, deleteRule: null,
      fields: [
        { name: 'owner', type: 'relation', collectionId: users.id, maxSelect: 1, required: true, cascadeDelete: true },
        { name: 'sender', type: 'select', maxSelect: 1, required: true, values: ['visiteur', 'équipe'] },
        { name: 'body', type: 'text', required: true, max: 2000 },
        { name: 'created', type: 'autodate', onCreate: true, onUpdate: false },
        { name: 'updated', type: 'autodate', onCreate: true, onUpdate: true }
      ] }); app.save(messages);
  }
}, (app) => {
  for (const name of ['prime_messages', 'prime_requests']) {
    try { app.delete(app.findCollectionByNameOrId(name)); } catch (_) { /* Nothing to revert. */ }
  }
});
