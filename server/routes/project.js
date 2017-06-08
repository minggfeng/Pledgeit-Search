'use strict';
const express = require('express');
const router = express.Router();
const elastic = require('../elastic/utils.js');

router.route('/_bulk').post((req, res) => {
  elastic.addBulk(req.body)
  .then(results => res.status(200).send(results))
  .catch(err => res.status(404).send(err));
})

router.route('/suggest:input').get((req, res) => {
  console.log('suggest', req.params.input)
  elastic.getSuggestions('project', req.params.input).then(res => console.log('suggestres', res))
})


module.exports = router;