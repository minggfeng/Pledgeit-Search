const CronJob = require('cron').CronJob;
const request = require('request');
const elastic = require('../elastic/utils.js');
const app = require('../app.js');
const models = require('../../db/models');

var lastUpdate = '2016-07-09 00:00:00-07';

if (lastUpdate === '2016-07-09 00:00:00-07') {
  let projectDocuments = [];
  return models.Project.where('updated_at', '>', lastUpdate).fetchAll()
  .then(projects => {
    projects.models.map(model => {
      let action = {
        index: {
          _index: 'project',
          _type: 'document',
          _id: model.get('id')
        }
      }

      let doc = {
        doc: {
          title: model.get('title'),
          subtitle: model.get('subtitle'),
          description: model.get('description')
        }
      }
      
      projectDocuments.push(action);
      projectDocuments.push(doc);
    })
  })
  .then(res => {
    if (projectDocuments.length > 0) {
      return elastic.addBulk(projectDocuments);
    } else {
      return; 
    }
  })
  .then(res => {
    if (res) {
      lastUpdate = new Date();
      console.log('Updated project index');
    } else {
      console.log('Checked project index');
    }
  })
  .catch(err => {
    console.log('Error updating project index');
  })
}



const ProjectJob = new CronJob({
  cronTime: '*/10 * * * *',
  onTick: function() {
    let projectDocuments = [];
    return models.Project.where('updated_at', '>', lastUpdate).fetchAll()
    .then(projects => {
      projects.models.map(model => {
        let action = {
          index: {
            _index: 'project',
            _type: 'document',
            _id: model.get('id')
          }
        }

        let doc = {
          doc: {
            title: model.get('title'),
            subtitle: model.get('subtitle'),
            description: model.get('description')
          }
        }
        
        projectDocuments.push(action);
        projectDocuments.push(doc);
      })
    })
    .then(res => {
      if (projectDocuments.length > 0) {
        return elastic.addBulk(projectDocuments);
      } else {
        return; 
      }
    })
    .then(res => {
      if (res) {
        lastUpdate = new Date();
        console.log('Updated project index');
      } else {
        console.log('Checked project index');
      }
    })
    .catch(err => {
      console.log('Error updating project index');
    })

  },
  start: true
})

module.exports = ProjectJob;