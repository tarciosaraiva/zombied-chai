[![npm version](https://badge.fury.io/js/zombied-chai.svg)](https://badge.fury.io/js/zombied-chai)
[![Build Status](https://travis-ci.org/tarciosaraiva/zombied-chai.svg)](https://travis-ci.org/tarciosaraiva/zombied-chai)
[![Code Climate](https://codeclimate.com/github/tarciosaraiva/zombied-chai/badges/gpa.svg)](https://codeclimate.com/github/tarciosaraiva/zombied-chai)
[![Test Coverage](https://codeclimate.com/github/tarciosaraiva/zombied-chai/badges/coverage.svg)](https://codeclimate.com/github/tarciosaraiva/zombied-chai/coverage)
[![Issue Count](https://codeclimate.com/github/tarciosaraiva/zombied-chai/badges/issue_count.svg)](https://codeclimate.com/github/tarciosaraiva/zombied-chai)

# Zombied Chai

[![Join the chat at https://gitter.im/tarciosaraiva/zombied-chai](https://badges.gitter.im/tarciosaraiva/zombied-chai.svg)](https://gitter.im/tarciosaraiva/zombied-chai?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

A plugin for Chai that wraps ZombieJS assertions, but with a better DSL.

## Assertions
Not all assertions are implemented yet but you already can do some basic things:

<table>
    <tr>
        <th>Zombie assertion</th>
        <th>Zombied-Chai assertion</th>
    </tr>
    <tr>
        <td>browser.assert.success</td>
        <td>browser.should.be.successful</td>
    </tr>
    <tr>
        <td>browser.assert.status(200)</td>
        <td>browser.should.have.status(200)</td>
    </tr>
    <tr>
        <td>browser.assert.element('#selector')</td>
        <td>browser.should.have.element('#selector')</td>
    </tr>
    <tr>
        <td>browser.assert.className('#selector', 'foo')</td>
        <td>browser.should.have.element('#selector').withClass('foo')</td>
    </tr>
    <tr>
        <td>browser.assert.hasNoClass('#selector', 'foo')</td>
        <td>browser.should.have.element('#selector').withoutClass('foo')</td>
    </tr>
    <tr>
        <td>browser.assert.attribute('#selector', 'foo', 'bar')</td>
        <td>browser.should.have.element('#selector').withAttribute('foo', 'bar')</td>
    </tr>
    <tr>
        <td>browser.assert.attribute('#selector', 'data-foo', 'bar')</td>
        <td>browser.should.have.element('#selector').withData('foo', 'bar')</td>
    </tr>
</table>

Check the tests for all assertions. More assertions will come in time.
