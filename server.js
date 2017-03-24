const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()
const FoodsController = require('./lib/controllers/foods-controller')

const corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200
}

app.use(cors(corsOptions))
app.options('*', cors(corsOptions))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.set('port', process.env.PORT || 3000)
app.locals.title = 'Foods'

// Show root
app.get('/', (request, response) => {
  response.send(app.locals.title)
})

// Get all food items (foods index)
app.get('/api/foods', FoodsController.index)

// Show an individual food item
app.get('/api/foods/:id', FoodsController.show)

// Create a food item
app.post('/api/foods', FoodsController.create)

// Update a food item
app.put('/api/foods/:id', FoodsController.update)

// Delete a food item
app.delete('/api/foods/:id', FoodsController.destroy)

// Sanity Check
if (!module.parent) {
  app.listen(app.get('port'), () => {
    console.log(`${app.locals.title} is running on ${app.get('port')}`)
  })
}

module.exports = app
