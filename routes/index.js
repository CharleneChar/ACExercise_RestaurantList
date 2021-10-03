// Load express
const express = require('express')
// Load express router
const router = express.Router()
// Load home module from home.js
const home = require('./modules/home')
// Load restaurants module from restaurants.js
const restaurants = require('./modules/restaurants')

// Direct URL request with '/' to home module (or home router)
router.use('/', home)

// Direct URL request with '/restaurants' to restaurants module (or restaurants router)
router.use('/restaurants', restaurants)

// Export router
module.exports = router