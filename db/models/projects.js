const db = require('../');

const Project = db.Model.extend({
  tableName: 'projects'
});

module.exports = db.model('Project', Project);