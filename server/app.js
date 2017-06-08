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

let body = {
  properties: {
    title: { type: "string" },
    subtitle: { type: "string" },
    description: { type: "string" }
  }
}

// elastic.deleteIndex('project')
if (!elastic.checkIndex('project')) {
  elastic.initIndex('project')
  .then(elastic.initMapping('project', body))
}

// elastic.getSuggestions('project', 'africa')


// elasticClient.ping({
//   // ping usually has a 3000ms timeout 
//   requestTimeout: 1000
// }, function (error) {
//   if (error) {
//     console.trace('elasticsearch cluster is down!');
//   } else {
//     console.log('All is well');
//   }
// });

// if (!elastic.checkIndex(indices[0])) {
//   elastic.initIndex(indices[0])
// }

// elastic.initMapping(indices[0], body)
// .then(elastic.addDocument(indices[0], data))
// .then(res => console.log(res));

// elastic.getSuggestions('project', 'military')
// .then(res => console.log(res))

module.exports = app;

