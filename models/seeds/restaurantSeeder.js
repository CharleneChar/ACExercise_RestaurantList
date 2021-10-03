// Load mongoose configuration
const db = require('../../config/mongoose')
// Load Restaurant model from restaurant.js
const Restaurants = require('../restaurant')
// Load JSON file of restaurant data
const restaurantList = require('/Users/mac/Desktop/alphacamp/2-3/restaurant_list/restaurant.json')

db.once('open', () => {
  console.log('mongodb connected!')
  // Add data from JSON file to mongoDB database
  const restaurantArray = restaurantList.results
  restaurantArray.forEach(element => {
    Restaurants.create({
      name: element.name,
      name_en: element.name_en,
      category: element.category,
      image: element.image,
      location: element.location,
      phone: element.phone,
      google_map: element.google_map,
      rating: element.rating,
      description: element.description
    })
  })
})
