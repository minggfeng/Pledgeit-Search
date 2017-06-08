const elasticClient = require('./elastic.js');

const initIndex = (index) => {
  return elasticClient.indices.create({
    index: index
  });
}

const deleteIndex = (index) => {
  return elasticClient.indices.delete({
    index: index
  });
}

const checkIndex = (index) => {
  return elasticClient.indices.exists({
    index: index
  });
}

const initMapping = (index, body) => {
  return elasticClient.indices.putMapping({
    index: index,
    type: "document",
    body: body
  });
}

const addDocument = (index, body, id) => {
  return elasticClient.index({
    index: index, 
    type: "document",
    id: id,
    body: body
  })
}

const getSuggestions = (index, query) => {
  return elasticClient.suggest({
    index: index,
    type: "document",
    body: {
      docsuggest: {
        text: query,
        completion: {
          field: "suggest",
          fuzzy: true
        }
      }
    }
  })
}

const addBulk = (body) => {
  return elasticClient.bulk({
    body: body
  })
}

module.exports.initIndex = initIndex;
module.exports.deleteIndex = deleteIndex;
module.exports.checkIndex = checkIndex;
module.exports.initMapping = initMapping;
module.exports.addDocument = addDocument;
module.exports.getSuggestions = getSuggestions;
module.exports.addBulk = addBulk;
