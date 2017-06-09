'use strict';
const express = require('express');
const middleware = require('./middleware');
const routes = require('./routes');
const elasticClient = require('./elastic/elastic.js');
const elastic = require('./elastic/utils.js');
const worker = require('./worker/project.js');

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
let body = {
  properties: {
    title: { type: "string" },
    subtitle: { type: "string" },
    description: { type: "string" }
  }
}

elastic.checkIndex('project')
.then(bool => {
  if (!bool) {
    return elastic.initIndex('project')
    .then(res => {
      return elastic.initMapping('project', body)
      .then(res => console.log('Mapped!'))
      .catch(err => console.log('Error', err))
    })
  }
})

module.exports = app;

