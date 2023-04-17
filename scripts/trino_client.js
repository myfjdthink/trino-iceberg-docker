var presto = require('presto-client');
const Headers = require('presto-client/lib/presto-client/headers').Headers;
for (let key of Object.keys(Headers)) {
  Headers[key] = Headers[key].replace("Presto", "Trino");
}

var client = new presto.Client({user: 'root', port: '8060'});

module.exports = client;
