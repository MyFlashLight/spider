if (process.env.ENV === 'production') {
  module.exports = require('./production')
} else if (process.env.ENV === 'local') {
  module.exports = require('./local')
} else {
  module.exports = require('./development')
}