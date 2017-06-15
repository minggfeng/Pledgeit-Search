'use strict';
const express = require('express');
const router = express.Router();
const elastic = require('../../elastic/utils.js');

router.route('/_bulk')
.post((req, res) => {
  elastic.addBulk('project', req.body)
  .then(results => res.status(200).send(results))
  .catch(err => { console.log(err); res.status(404).send(err)});
})

router.route('/_mapping/document')
.put((req, res) => {
  elastic.initMapping('project', req.body)
  .then(results => res.status(201).send(results))
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

router.route('/')
.get((req, res) => {
  elastic.checkIndex('project')
  .then(bool => res.status(200).send(bool))
  .catch(err => res.status(404).send(err));
})
.post((req, res) => {
  elastic.addBulk('project', req.body)
  .then(results => {
    res.status(200).send(results);
  })
  .catch(err => res.status(404).send(err));
})
.options((req, res) => {
  res.status(200).send({ options: projectMapping });
})
.delete((req, res) => {
  elastic.deleteIndex('project')
  .then(results => res.status(202).send('Deleted'))
  .catch(err => res.status(404).send(err));
})
.put((req, res) => {
  elastic.initIndex('project')
  .then(res => {
    elastic.initMapping('project', projectMapping)
    .then(res => res.status(201).send('Update'))
  })
  .catch(err => res.status(404).send(err))
})

module.exports = router;