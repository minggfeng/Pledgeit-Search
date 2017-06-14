'use strict';
const express = require('express');
const middleware = require('./middleware');
const routes = require('./routes');
const elasticClient = require('./elastic/elastic.js');
const elastic = require('./elastic/utils.js');
const worker = require('./worker/project.js');
const knex = require('knex')(require('../knexfile'));

const app = express();

app.use(middleware.morgan('dev'));
app.use(middleware.bodyParser.urlencoded({ extended: false }));
app.use(middleware.bodyParser.json());

app.use('/project', routes.project);


elasticClient.ping({
  requestTimeout: 1000
}, function (error) {
  if (error) {
    console.trace('Elasticsearch cluster is down!');
  } else {
    console.log('All is well');
  }
});
// elastic.deleteIndex('project')

let projectMapping = {
  properties: {
    title: { type: "text", boost: "3" },
    subtitle: { type: "text", boost: "2" },
    description: { type: "text" }
  }
}

elastic.checkIndex('project')
.then(bool => {
  if (bool) {
    elastic.deleteIndex('project');
  } else if (!bool) {
    return elastic.initIndex('project')
    .then(res => {
      return elastic.initMapping('project', projectMapping)
      .then(res => console.log('Mapped!'))
      .catch(err => console.log('Error', err))
    })
  }
})

module.exports = app;

