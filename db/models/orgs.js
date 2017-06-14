const db = require('../');

const Org = db.Model.extend({
  tableName: 'organizations'
});

module.exports = db.model('Org', Org);
