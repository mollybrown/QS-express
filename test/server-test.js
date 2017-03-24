const environment = process.env.NODE_ENV || 'development';
const configuration = require('../knexfile')[environment];
const database = require('knex')(configuration);
const Food = require('../lib/models/food');
const assert = require('chai').assert
const app = require('../server')
const request = require('request')
const pry = require('pryjs')

describe('Server', () => {
  before((done) => {
    this.port = 9876
    this.server = app.listen(this.port, (error, result) => {
      if (error) { return done(error) }
      done()
    })

    this.request = request.defaults({
      baseUrl: 'http://localhost:9876'
    })
  })

  after(() => {
    this.server.close()
  })

  it('exists', () => {
    assert(app)
  })

  // Show root
  describe('GET /', () => {
    it('returns 200 status code', (done) => {
      this.request.get('/', (error, response) => {
        if (error) { done(error) }

        assert.equal(response.statusCode, 200)
        done()
      })
    })

    it('returns the name of the application', (done) => {
      this.request.get('/', (error, response) => {
        if (error) { done(error) }

        assert.equal(response.body, 'Foods')
        done()
      })
    })
  })

  // Show an individual food item
  describe('GET /api/foods/:id', (error, response) => {

    beforeEach((done) => {
      Food.createFood("apple", 50).then(() => done());
    })

    afterEach((done) => {
      Food.clearFoods().then(() => done());
    })

    it('returns 404 if the resource not found', (done) => {
      this.request.get('/api/foods/10000', (error, response) => {
        if (error) { done(error) }

        assert.equal(response.statusCode, 404)
        done()
      })
    })

    it('should return the food id, name, and calories for the food', (done) => {
      this.request.get('/api/foods/1', (error, response) => {
        if (error) { done(error) }

        const id = 1
        const name = "apple"
        const calories = 50

        let parsedFood = JSON.parse(response.body)

        assert.equal(parsedFood.id, id)
        assert.equal(parsedFood.name, name)
        assert.equal(parsedFood.calories, calories)
        done()
      })
    })
  })

  // Get all food items (foods index)
  describe('GET /api/foods', (error, response) => {

    beforeEach((done) => {
      Food.createFood("bread", 120).then(() => done());
    })

    afterEach((done) => {
      Food.clearFoods().then(() => done());
    })

    it('returns the data for all foods', (done) => {
      this.request.get('/api/foods', (error, response) => {
        if (error) { done(error) }

        let parsedFoods = JSON.parse(response.body)

        assert.equal(parsedFoods.length, 1)
        done()
      })
    })
  })

  // Create a food item
  describe('POST /api/foods', () => {

    beforeEach((done) => {
      Food.clearFoods().then(() => done());
    })

    afterEach((done) => {
      Food.clearFoods().then(() => done());
    })

    xit('should return a 201', (done) => {
      this.request.post('/api/foods', (error, response) => {
        if (error) { done(error) }
        assert.equal(response.statusCode, 201)
        done()
      })
    })

    xit('should receive and store data', (done) => {
      const food = {'name': 'coffee', 'calories': '10'}

      this.request.post('/api/foods', { form: food }, (error, response) => {
        if (error) { done(error) }

        let parsedFoods = JSON.parse(response.body)

        assert.equal(parsedFoods.length, 1)
        assert.equal(parsedFoods.name, 'coffee')
        assert.equal(parsedFoods.calories, 10)
        done()
      })
    })
  })

  // Update a food item
  describe('PUT /api/foods/:id', () => {

    beforeEach((done) => {
      Food.createFood('waffle', '95').then(() => done());
    })

    afterEach((done) => {
      Food.clearFoods().then(() => done());
    })

    xit('should return a 200', (done) => {
      this.request.put('/api/foods/1', (error, response) => {
        if (error) { done(error) }
        assert.equal(response.statusCode, 200)
        done()
      })
    })

    xit('should return a 404 when the food does not exist', (done) => {
      this.request.put('/api/foods/10000', (error, response) => {
        if (error) { done(error) }
        assert.equal(response.statusCode, 404)
        done()
      })
    })

    it('should update the data for the food with the given id', (done) => {
      const food = {name: "banana", calories: 123}
      eval(pry.it)
      this.request.put('/api/foods/1', { form: food }, (error, response) => {
        if (error) { done(error) }

        let parsedFood = JSON.parse(response.body)

        assert.include(response.body, 123)
        assert.include(response.body, "banana")
        done()
      })
    })
  })

  // Delete a food item
  describe('DELETE /api/foods/:id', () => {

    beforeEach((done) => {
      Food.createFood('waffle', '95').then(() => done());
    })

    afterEach((done) => {
      Food.clearFoods().then(() => done());
    })

    it('deletes the food data for the food with that id', (done) => {
      this.request.delete('/api/foods/1', (error, response) => {
        if (error) { done(error) }

        let parsedFoodsCount = JSON.parse(response.body).length

        assert.equal(foodsCount, 0)
        assert.equal(response.statusCode, 202)
        done()
      })
    })
  })
})
