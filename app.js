// Load Express 
const express = require('express')
// Execute Express
const app = express()
// Set port for this kind of project
const port = 3001
// Load handlebars
const exphbs = require('express-handlebars')
// Load method-override
const methodOverride = require('method-override')
// Load express router from index.js under routes folder
const routes = require('./routes')

// Load mongoose configuration
require('./config/mongoose')

// Set template engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// Set static files by specifying the folder
app.use(express.static('public'))

// Convert into req.body using bodyParser
app.use(express.urlencoded({ extended: true }))

// Process every request using method-override
app.use(methodOverride('_method'))

// Process every request into its right route using express router
app.use(routes)

// Start server and Listen for request coming from port 3001
app.listen(port, () => {
  console.log(`Express is running on http://localhost:${port}`)
})
