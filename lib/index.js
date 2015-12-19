'use strict';

import Browser from 'zombie';

export default function (_chai, utils) {

  function assertBrowserInstance(obj) {
    new _chai.Assertion(obj).to.be.instanceof(Browser);
    return obj;
  }

  function assertElementIsAnObject(el) {
    typeof(el).should.equal('object');
    return el;
  }

  _chai.Assertion.addProperty('successful', function () {
    let browser = assertBrowserInstance(this._obj);

    this.assert(
      browser.success === true && browser.status === 200,
      'expected request to be successful with HTTP 200 OK',
      'expected request to not be successful with HTTP 200 OK'
    );
  });

  _chai.Assertion.addChainableMethod('element', function (el) {
    let browser = assertBrowserInstance(this._obj);

    const $el = browser.query(el);

    this.assert(
      $el !== undefined,
      'expected #{exp} to be present in the DOM',
      'expected #{exp} to not be present in the DOM',
      el,
      browser._type
    );

    utils.flag(this, '$el', $el);
  });

  _chai.Assertion.addMethod('withText', function (text) {
    assertBrowserInstance(this._obj);

    if (utils.flag(this, '$el')) {
      let element = assertElementIsAnObject(utils.flag(this, '$el'));

      this.assert(
        element.textContent === text,
        'expected element to have text #{exp} but text was #{act}',
        'expected element to not have text #{act}',
        text,
        element
      );
    }
  });

  _chai.Assertion.addMethod('withAttribute', function (attrName, attrValue) {
    // let browser = assertBrowserInstance(this._obj);

    if (utils.flag(this, '$el')) {
      let element = assertElementIsAnObject(utils.flag(this, '$el'));
      this.assert(
        element.getAttribute(attrName) === attrValue,
        'expected element to have text #{exp} but text was #{act}',
        'expected element to not have text #{act}',
        attrName,
        element
      );
    }
  });

}
