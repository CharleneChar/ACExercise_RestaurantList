// Load express
const express = require('express')
// Load express router
const router = express.Router()
// Load Restaurant model from restaurant.js
const Restaurant = require('../../models/restaurant')

// Set route of index page and corresponding response
router.get('/', (req, res) => {
  // Retrieve all existing data from mongoDB database (specifically, the restaurant-list database) through Restaurants model
  Restaurant.find()
    // Convert the retrieved data into an JavaScript object
    .lean()
    // Pass data to handlebars template of index page
    .then(restaurants => res.render('index', { restaurants: restaurants }))
    .catch(error => console.log(error))
})

// Set route of searched results
router.get('/search', (req, res) => {
  // Prevent blank space shown in keyword
  const keyword = req.query.keyword.trim()
  // Select the name-matched restaurants or the category-matched restaurants
  Restaurant.find()
    .lean()
    .then(allRestaurants => {
      const restaurants = allRestaurants.filter(restaurant => {
        return restaurant.name.toLowerCase().includes(keyword.toLowerCase()) || restaurant.category.toLowerCase().includes(keyword.toLowerCase())
      })
      // Provide hint message (used when there's no matched restaurants in restaurant array)
      let searched_msg = ``
      if (restaurants.length === 0) {
        searched_msg = `No matched results :(`
      }
      // Pass data to handlebars
      res.render('index', { restaurants: restaurants, keyword: keyword, searched_msg: searched_msg })
    })
    .catch(error => console.log(error))
})

// Export router
module.exports = router