'use strict';
const express = require('express');
const middleware = require('./middleware');
const routes = require('./routes');
const elasticClient = require('../elastic/elastic.js');
const worker = require('../worker/project.js');
const knex = require('knex')(require('../knexfile'));

const app = express();

app.use(middleware.morgan('dev'));
app.use(middleware.bodyParser.urlencoded({ extended: false }));
app.use(middleware.bodyParser.json());

app.use('/project', routes.project);

app.route('/')
.get((req, res) => { res.status(200).send('Hello World') })
.post((req, res) => { res.status(201).send('Hello World') })

module.exports = app;

