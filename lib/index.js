'use strict'

var Browser = require('zombie')
var parse = require('url').parse

module.exports = (_chai, utils) => {
  function assertBrowserInstance (obj) {
    new _chai.Assertion(obj.browser || obj).to.be.instanceof(Browser)
    return obj.browser || obj
  }

  function assertElementIsAnObject (obj) {
    new _chai.Assertion(obj.$el || obj).to.be.instanceof(Object)
    return obj.$el || obj
  }

  function assertParsedURL (obj) {
    let assertion = new _chai.Assertion(obj.parsedUrl || obj)
    assertion.to.have.ownProperty('protocol')
    assertion.to.have.ownProperty('hostname')
    assertion.to.have.ownProperty('query')
    assertion.to.have.ownProperty('pathname')
    return obj.parsedUrl || obj
  }

  _chai.Assertion.addProperty('successful', function () {
    let browser = assertBrowserInstance(this._obj)

    this.assert(
      browser.success && browser.status === 200,
      'expected request to be successful with HTTP 200 OK',
      'expected request to not be successful with HTTP 200 OK'
    )
  })

  _chai.Assertion.addProperty('unsucessful', function () {
    let browser = assertBrowserInstance(this._obj)

    this.assert(
      !browser.success === true,
      'expected request to be successful with HTTP 200 OK',
      'expected request to not be successful with HTTP 200 OK'
    )
  })

  _chai.Assertion.addMethod('status', function (statusCode) {
    let browser = assertBrowserInstance(this._obj)

    this.assert(
      browser.status === statusCode,
      'expected request to have status #{exp} but was #{act}',
      'expected request to not have status #{exp} but was #{act}',
      statusCode,
      browser.status
    )
  })

  _chai.Assertion.addChainableMethod('element', function (el) {
    let browser = assertBrowserInstance(this._obj)

    const $el = browser.query(el)

    this.assert(
      $el !== undefined,
      'expected #{exp} to be present in the DOM',
      'expected #{exp} to not be present in the DOM',
      el,
      $el
    )

    const zombiedOject = { browser, $el }
    utils.flag(this, 'object', zombiedOject)
  })

  _chai.Assertion.addChainableMethod('link', function (el, text) {
    let browser = assertBrowserInstance(this._obj)

    const $el = browser.query(el)

    this.assert(
      $el !== undefined && $el.name === 'a' && $el.textContent === text,
      'expected #{exp} to be a link present in the DOM',
      'expected #{exp} to not be a link present in the DOM',
      el,
      $el
    )

    const zombiedOject = { browser, $el }
    utils.flag(this, 'object', zombiedOject)
  })

  _chai.Assertion.addMethod('withHref', function (href) {
    let element = assertElementIsAnObject(this._obj)

    this.assert(
      element.getAttribute('href') === href,
      'expected element to have href #{exp} but was #{act}',
      'expected element to not have href #{act}',
      href,
      element
    )
  })

  _chai.Assertion.addMethod('withText', function (text) {
    let element = assertElementIsAnObject(this._obj)

    this.assert(
      element.textContent === text,
      'expected element to have text #{exp} but text was #{act}',
      'expected element to not have text #{act}',
      text,
      element
    )
  })

  _chai.Assertion.addMethod('withAttribute', function (attrName, attrValue) {
    let element = assertElementIsAnObject(this._obj)
    this.assert(
      element.getAttribute(attrName) === attrValue,
      'expected element to have attribute #{exp} but was not found',
      'expected element to not have attribute #{exp}',
      `[${attrName}="${attrValue}"]`,
      element
    )
  })

  _chai.Assertion.addMethod('withClass', function (className) {
    let element = assertElementIsAnObject(this._obj)
    let classNames = element.className.split(/\s+/)

    this.assert(
      classNames.indexOf(className) !== -1,
      'expected element to have class #{exp} but was not found',
      'expected element to not have class #{exp}',
      className,
      element
    )
  })

  _chai.Assertion.addMethod('withoutClass', function (className) {
    let element = assertElementIsAnObject(this._obj)
    let classNames = element.className.split(/\s+/)

    this.assert(
      classNames.indexOf(className) === -1,
      'expected element to not have class #{exp} but it was found',
      'expected element to have class #{exp} but it was not found',
      className,
      element
    )
  })

  _chai.Assertion.addMethod('withData', function (name, dataValue) {
    let element = assertElementIsAnObject(this._obj)

    this.assert(
      element.getAttribute(`data-${name}`) === dataValue,
      'expected element to have data attribute #{exp} but it was not found',
      'expected element to not have data attribute #{exp} but it was found',
      `[data-${name}="${dataValue}"]`,
      element
    )
  })

  _chai.Assertion.addProperty('focused', function () {
    let browser = assertBrowserInstance(this._obj)
    let element = assertElementIsAnObject(this._obj)

    this.assert(
      browser.activeElement === element,
      'expected element to be focused but it wasn\'t',
      'expected element to not have focus but it was focused',
      '',
      element
    )
  })

  _chai.Assertion.addChainableMethod('url', function () {
    let browser = assertBrowserInstance(this._obj)

    const url = browser.location.href

    this.assert(
      url !== undefined,
      'expected URL to be available',
      'expected URL to not be available'
    )

    const zombiedOject = { browser, parsedUrl: parse(url) }
    utils.flag(this, 'object', zombiedOject)
  })

  _chai.Assertion.addMethod('withPath', function (path) {
    let url = assertParsedURL(this._obj)

    this.assert(
      url.pathname === path,
      'expected URL to have path #{exp} but was #{act}',
      'expected URL to not have path #{exp} but was #{act}',
      path,
      url
    )
  })

  _chai.Assertion.addMethod('withHost', function (host) {
    let url = assertParsedURL(this._obj)

    this.assert(
      url.hostname === host,
      'expected URL to have host #{exp} but was #{act}',
      'expected URL to not have host #{exp} but was #{act}',
      host,
      url
    )
  })

  _chai.Assertion.addMethod('withQuery', function (queryName, queryValue) {
    let url = assertParsedURL(this._obj)

    url.query.should.match(/^([\w-]+(=[\w-]*)?(&[\w-]+(=[\w-]*)?)*)?$/)
    let query = url.query.split('=')

    this.assert(
      query[0] === queryName && query[1] === queryValue,
      'expected URL to have query #{exp} but was #{act}',
      'expected URL to not have query #{exp} but was #{act}',
      `?${queryName}=${queryValue}`,
      url
    )
  })
}
