'use strict'

var app     = require('../utils/server')
var Browser = require('zombie')

describe('Zombied-Chai', () => {

  const browser = new Browser()

  before(done => app.listen(3000, done))

  describe('when successful request', () => {
    before(done => browser.visit('http://localhost:3000/', done))

    it('should assert "successful" request', (done) => {
      browser.should.be.successful
      done()
    })

    it('should assert "status"', done => {
      browser.should.have.status(200)
      done()
    })

    it('should assert chainable "element.withText"', done => {
      browser.should.have.element('h1').withText('My Page')
      done()
    })

    it('should assert chainable "element.withClass"', done => {
      browser.should.have.element('div').withClass('content')
      done()
    })

    it('should assert chainable "element.withoutClass"', done => {
      browser.should.have.element('h2').withoutClass('subHeader')
      done()
    })

    it('should assert chainable "element.withData"', done => {
      browser.should.have.element('div').withData('area', 'mainContent')
      done()
    })

    it('should assert chainable "element.withAttribute"', done => {
      let element = browser.should.have.element('.link')
      element.withAttribute('href', '#')
      element.withAttribute('target', '_blank')
      done()
    })

    it('should assert chainable "element.focused"', done => {
      browser.focus('input')
      browser.should.have.element('input').focused
      done()
    })

    it('should assert chainable "link.withHref"', done => {
      browser.should.have.element('.link-google', 'Go to Google-land').withHref('http://www.google.com')
      done()
    })
  })

  describe('when URL', () => {
    before(done => browser.visit('http://localhost:3000/?test=success', done))

    it('should assert chainable "url.withPath"', done => {
      browser.should.have.url().withPath('/')
      done()
    })

    it('should assert chainable "url.withHost"', done => {
      browser.should.have.url().withHost('localhost')
      done()
    })

    it('should assert chainable "url.withQuery"', done => {
      browser.should.have.url().withQuery('test', 'success')
      done()
    })

    it('should assert chainable "url.withHost.withPath.withQuery"', done => {
      browser.should.have.url().withHost('localhost').withPath('/').withQuery('test', 'success')
      done()
    })
  })

  describe('when unsucessful request', () => {

    browser.on('error', error => { })

    before(done => {
      browser.visit('http://localhost:3000/sad-server', () => done())
    })

    it('should assert "unsuccessful" request', (done) => {
      browser.should.be.unsuccessful
      done()
    })
  })

})
