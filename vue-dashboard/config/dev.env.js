'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  APIPATH: '"https://vue-course-api.hexschool.io"',
  CUSTOMPATH: '"royu"',
  API: '"/api"'
  // username - w9737649@gmail.com
  // password - a12345
})
