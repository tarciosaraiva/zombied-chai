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

    it('should assert "status"', (done) => {
      browser.should.have.status(200);
      done();
    });

    it('should assert chainable "element.withText"', (done) => {
      browser.should.have.element('h1').withText('My Page');
      done();
    });
  });

  describe('when unsucessful request', () => {

  });

});
