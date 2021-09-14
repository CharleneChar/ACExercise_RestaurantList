// Load Express 
const express = require('express')
const app = express()
const port = 3001

// Load handlebars
const exphbs = require('express-handlebars')

// Load JSON file of restaurant data
const restaurantList = require('./restaurant.json')

// Set template engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// Set static files by specifying the folder
app.use(express.static('public'))

// Set route of index page and corresponding response
app.get('/', (req, res) => {
  // Pass data to handlebars
  res.render('index', { restaurants: restaurantList.results })
})

// Set route of searched results
app.get('/search', (req, res) => {
  // Prevent blank space shown in keyword
  const keyword = req.query.keyword.trim()
  // Select the name-matched restaurants or the category-matched restaurants
  const restaurants = restaurantList.results.filter(restaurant => {
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

// Set route of show page and corresponding response
app.get('/restaurants/:restaurant_id', (req, res) => {
  // Retrieve a specific restaurant data
  const restaurant = restaurantList.results.find(restaurant => restaurant.id.toString() === req.params.restaurant_id)
  // Pass data to handlebars
  res.render('show', { restaurant: restaurant })
})

// Listen the server on port 3001 when it started
app.listen(port, () => {
  console.log(`Express is running on http://localhost:${port}`)
})
