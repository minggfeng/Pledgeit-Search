const elasticsearch = require('elasticsearch');

const elasticClient = new elasticsearch.Client({
  host: 'localhost:9200',
  log: 'trace'
});

var indexName ="projectIndex"

module.exports = elasticClient;