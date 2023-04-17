const client = require('./trino_client')

function execute10times (query) {
  for (let i = 0; i < 20; i++) {
    client.execute({
      query: query,
      catalog: 'warehouse',
      schema: 'sf1',
      source: 'nodejs-client',
      state: function (error, query_id, stats) {},
      // columns: function (error, data) { console.log({resultColumns: data}); },
      data: function (error, data, columns, stats) {},
      success: function (error, stats) {console.log('done')},
      error: function (error) {console.error(error)}
    });
    console.log('submit job ', i)
  }
}

// execute10times('select * from warehouse.sf1.orders limit 200')
execute10times('select * from warehouse.sf1.orders_origin limit 200')

// execute10times('select count(1) from warehouse.sf1.orders_origin')
// execute10times('select count(1) from warehouse.sf1.orders')
