// Load mongoose
const mongoose = require('mongoose')

// Connect to mongoDB database using mongoose
mongoose.connect('mongodb://localhost/restaurant-list', { useNewUrlParser: true, useUnifiedTopology: true })

// Store connection status
const db = mongoose.connection

// Listen to check for connection status
db.on('error', () => {
  console.log('mongodb error!')
})
db.once('open', () => {
  console.log('mongodb connected!')
})

// Export mongoose configuration
module.exports = db