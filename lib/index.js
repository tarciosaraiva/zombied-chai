'use strict'

import Browser from 'zombie'

export default function (_chai, utils) {
  function assertBrowserInstance (obj) {
    new _chai.Assertion(obj).to.be.instanceof(Browser)
    return obj
  }

  function assertElementIsAnObject (el) {
    new _chai.Assertion(el).to.be.instanceof(Object)
    return el
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

    utils.flag(this, 'object', $el)
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
}
