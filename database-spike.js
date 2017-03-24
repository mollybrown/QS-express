const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);

database.raw(
  'INSERT INTO foods (name, calories) VALUES (?, ?)',
  ["Cheese", 120]
).then( () => {
  database.raw('SELECT * FROM foods')
  .then( (data) => {
    console.log(data.rows)
    process.exit();
  });
});
