const CronJob = require('cron').CronJob;
const request = require('request');
const elastic = require('../elastic/utils.js');
const app = require('../app.js');



const lastTime = null;

const url = `http://localhost:3000/search/documents/?date=${lastTime}`;

const ProjectJob = new CronJob({
  cronTime: '*/30 * * * * *', 
  onTick: function() {
    request(url, (err, res, body) => {
      let data = [];
      JSON.parse(body).map((project, index) => {
        
        let action = { 
          index: {
            _index: 'project',
            _type: 'document',
            _id: project.id,
          } 
        }

        let doc = {
          doc: {
            title: project.title,
            subtitle: project.subtitle,
            description: project.description
          }
        }

        data.push(action);
        data.push(doc);

      })

    // console.log(data);
      elastic.addBulk(data)  
      .then(res => {
        console.log('Updated index', res)
        lastTime = new Date();
      })
      .catch(err => console.log('Error updating index', err))
    })
  },
  start: true
})

module.exports = ProjectJob;