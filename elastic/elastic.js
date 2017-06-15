const elasticsearch = require('elasticsearch');

var host = process.env.ELASTIC_URL ? `${process.env.ELASTIC_URL}:9200` : 'localhost:9200';

const elasticClient = new elasticsearch.Client({
  host: host,
  log: 'trace'
});

let projectMapping = {
  properties: {
    title: { type: "text", boost: "3" },
    subtitle: { type: "text", boost: "2" },
    description: { type: "text" }
  }
}

elasticClient.ping({
  requestTimeout: 3000
}, function(err) {
  if (err) {
    console.trace('Elasticsearch cluster is down', err)
  } else {
    console.trace('Elasticsearch is up');
  }
})

setInterval(() => {
elasticClient.indices.exists({
  index: 'project'
})
.then(bool => {
  console.log('Check index', bool)
  if (!bool) {
    return elasticClient.indices.create({
      index: 'project'
    })
    .then(res => {
      return elasticClient.indices.putMapping({
        index: 'project',
        type: 'document',
        body: projectMapping
      })
    })
    .then(res => console.trace('Created index and updated mapping', res))
    .catch(err => console.trace('Error', err));
  } else {
    return elasticClient.indices.putMapping({
      index: 'project',
      type: 'document',
      body: projectMapping
    })
    .then(res => console.trace('Updated mapping', res))
    .catch(err => console.trace('Error', err));
  }
})

}, 300000)

module.exports = elasticClient;