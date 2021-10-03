// Load express
const express = require('express')
// Load express router
const router = express.Router()
// Load Restaurant model from restaurant.js
const Restaurant = require('../../models/restaurant')

// Set route of new page
router.get('/new', (req, res) => {
  return res.render('new')
})

// Set route for Create in CRUD
router.post('/', (req, res) => {
  const allInfo = req.body
  return Restaurant.create({
    name: allInfo.name,
    name_en: allInfo.name_en,
    category: allInfo.category,
    image: allInfo.image,
    location: allInfo.location,
    phone: allInfo.phone,
    google_map: allInfo.google_map,
    rating: allInfo.rating,
    description: allInfo.description
  })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

// Set route of show page and also route for Read in CRUD
router.get('/:restaurant_id', (req, res) => {
  const restaurantId = req.params.restaurant_id
  // Retrieve a specific restaurant data in detail
  Restaurant.findById(restaurantId)
    .lean()
    .then(restaurant => res.render('show', { restaurant: restaurant }))
    .catch(error => console.log(error))
})

// Set route of edit page 
router.get('/:restaurant_id/edit', (req, res) => {
  const restaurantId = req.params.restaurant_id
  Restaurant.findById(restaurantId)
    .lean()
    .then(restaurant => res.render('edit', { restaurant: restaurant }))
    .catch(error => console.log(error))
})

// Set route for Update in CRUD
router.put('/:restaurant_id', (req, res) => {
  const restaurantId = req.params.restaurant_id
  const allInfo = req.body
  Restaurant.findById(restaurantId)
    .then(restaurant => {
      restaurant.name = allInfo.name
      restaurant.name_en = allInfo.name_en
      restaurant.category = allInfo.category
      restaurant.image = allInfo.image
      restaurant.location = allInfo.location
      restaurant.phone = allInfo.phone
      restaurant.google_map = allInfo.google_map
      restaurant.rating = allInfo.rating
      restaurant.description = allInfo.description
      return restaurant.save()
    })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

// Set route for Delete in CRUD
router.delete('/:restaurant_id', (req, res) => {
  const restaurantId = req.params.restaurant_id
  Restaurant.findById(restaurantId)
    .then(restaurant => restaurant.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

// Export router
module.exports = router