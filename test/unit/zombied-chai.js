/* eslint-disable */

import app     from '../utils/server';
import Browser from 'zombie';

describe('Zombied-Chai', () => {

  const browser = new Browser();

  before(done => app.listen(3000, done));

  describe('when successful request', () => {
    before(done => browser.visit('http://localhost:3000/', done));

    it('should assert "successful" request', (done) => {
      browser.should.be.successful;
      done();
    });

    it('should assert "status"', done => {
      browser.should.have.status(200);
      done();
    });

    it('should assert chainable "element.withText"', done => {
      browser.should.have.element('h1').withText('My Page');
      done();
    });

    it('should assert chainable "element.withClass"', done => {
      browser.should.have.element('div').withClass('content');
      done();
    });

    it('should assert chainable "element.withoutClass"', done => {
      browser.should.have.element('h2').withoutClass('subHeader');
      done();
    });

    it('should assert chainable "element.withData"', done => {
      browser.should.have.element('div').withData('area', 'mainContent');
      done();
    });

    it('should assert chainable "element.withAttribute"', done => {
      let element = browser.should.have.element('.link');
      element.withAttribute('href', '#');
      element.withAttribute('target', '_blank');
      done();
    });
  });

  describe('when unsucessful request', () => {

  });

});
