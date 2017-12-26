const DEV = process.env.NODE_ENV
  ? process.env.NODE_ENV !== 'production'
  : true

if (DEV) {
  require('dotenv').config()
  // use dynamic-dedupe: otherwise peerDependencies of symlinked modules don't work
  const dedupe = require('dynamic-dedupe')
  dedupe.activate()
}

process.env.PORT = process.env.PORT || 3020

const server = require('./server')
server.run()
