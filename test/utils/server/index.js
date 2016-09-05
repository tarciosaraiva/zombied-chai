'use strict'

var express = require('express')
var resolve = require('path').resolve

const assets = resolve(__dirname, 'assets')
const server = express()

server.use('/', express.static(assets))

module.exports = server
