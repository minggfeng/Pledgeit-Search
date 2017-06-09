'use strict';
const express = require('express');
const router = express.Router();
const elastic = require('../elastic/utils.js');

router.route('/_bulk').post((req, res) => {
  elastic.addBulk(req.body)
  .then(results => res.status(200).send(results))
  .catch(err => res.status(404).send(err));
})

router.route('/_suggest/:query').get((req, res) => {
  elastic.search('project', req.params.query)
  .then(results => {
    let data = results.hits.hits.map(hit => hit["_id"]);
    res.status(200).send(data)
  })
  .catch(err => res.status(404).send(err))
})

module.exports = router;