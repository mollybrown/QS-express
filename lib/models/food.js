const environment = process.env.NODE_ENV || 'development';
const configuration = require('../../knexfile')[environment];
const database = require('knex')(configuration);

function clearFoods(){
  return database.raw('TRUNCATE foods RESTART IDENTITY')
}

function getFoods(){
  return database.raw('SELECT * FROM foods')
}

function createFood(name, calories){
  return database.raw(
    'INSERT INTO foods (name, calories) VALUES (?, ?) RETURNING *',
    [name, calories]
  )
}

function updateFood(id, name, calories){
  return database.raw('UPDATE foods SET name = ?, calories = ? WHERE id = ? RETURNING *',
    [id, name, calories])
}

function find(id){
  return database.raw('SELECT * FROM foods WHERE id=?', [id])
}

function deleteFood(id){
  return database.raw('DELETE FROM foods WHERE id=?', [id])
}

module.exports = {
  // Sets up functions as properties for Food
  getFoods: getFoods,
  clearFoods: clearFoods,
  createFood: createFood,
  updateFood: updateFood,
  find: find,
  deleteFood: deleteFood
}
