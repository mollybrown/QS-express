const pry = require('pryjs')
const Food = require('../models/food')

  // Create a food item
  function create(request, response) {
    const food = request.body.food.name
    const calories = request.body.food.calories

    if (!food) {
      return response.status(422).send({
        error: "No food provided!"
      })
    }
    Food.createFood().then((data) => {
      let newFood = data.rows[0]
      response.status(201).json(newFood)
    })
  }

  // Show an individual food item
  function show(request, response) {
    Food.find(request.params.id)
    .then((data) => {
      if(!data.rowCount) {
        return response.sendStatus(404)
      }
      response.json(data.rows[0])
    })
  }

  // show all foods (index)
  function index(request, response) {
    Food.getFoods().then((data) => {
      if (!data.rowCount) {
        return response.sendStatus(404)
      }
      response.status(200).json(data.rows)
    })
  }

  // Update an individual food item
  function update(request, response) {
    const id = request.params.id
    const name = request.body.food.name
    const calories = request.body.food.calories

    Food.updateFood(id, name, calories)
    .then((data) => {
      if(!data.rowCount) {
        response.sendStatus(404)
      }
      response.status(202).json(data.rows[0])
    })
  }

  // Delete a food item
  function destroy(request, response) {
    Food.deleteFood(request.params.id)
    .then((data) => {
      response.sendStatus(202)
    })
  }

  module.exports = {
    index: index,
    create: create,
    show: show,
    update: update,
    destroy: destroy
  }
