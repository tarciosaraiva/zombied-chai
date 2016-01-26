[![npm version](https://badge.fury.io/js/zombied-chai.svg)](https://badge.fury.io/js/zombied-chai)
[![Build Status](https://travis-ci.org/tarciosaraiva/zombied-chai.svg)](https://travis-ci.org/tarciosaraiva/zombied-chai)
[![Code Climate](https://codeclimate.com/github/tarciosaraiva/zombied-chai/badges/gpa.svg)](https://codeclimate.com/github/tarciosaraiva/zombied-chai)
[![Test Coverage](https://codeclimate.com/github/tarciosaraiva/zombied-chai/badges/coverage.svg)](https://codeclimate.com/github/tarciosaraiva/zombied-chai/coverage)
[![Issue Count](https://codeclimate.com/github/tarciosaraiva/zombied-chai/badges/issue_count.svg)](https://codeclimate.com/github/tarciosaraiva/zombied-chai)
[![devDependency Status](https://david-dm.org/tarciosaraiva/zombied-chai/dev-status.svg)](https://david-dm.org/tarciosaraiva/zombied-chai#info=devDependencies)

# Zombied Chai

[![Join the chat at https://gitter.im/tarciosaraiva/zombied-chai](https://badges.gitter.im/tarciosaraiva/zombied-chai.svg)](https://gitter.im/tarciosaraiva/zombied-chai?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

A plugin for Chai that wraps ZombieJS assertions, but with a better DSL.

## Assertions
Not all assertions are implemented yet but you already can do some basic things:

<table>
    <tr>
        <th>Zombie assertion<br/>`browser.assert`</th>
        <th>Zombied-Chai assertion<br/>`browser.should.be/have`</th>
    </tr>
    <tr>
        <td>`.success`</td>
        <td>`.successful`</td>
    </tr>
    <tr>
        <td>`.status(200)`</td>
        <td>`.status(200)`</td>
    </tr>
    <tr>
        <td>`.element('#selector')`</td>
        <td>`.element('#selector')`</td>
    </tr>
    <tr>
        <td>`.className('#selector', 'foo')`</td>
        <td>`.element('#selector').withClass('foo')`</td>
    </tr>
    <tr>
        <td>`.hasNoClass('#selector', 'foo')`</td>
        <td>`.element('#selector').withoutClass('foo')`</td>
    </tr>
    <tr>
        <td>`.attribute('#selector', 'foo', 'bar')`</td>
        <td>`.element('#selector').withAttribute('foo', 'bar')`</td>
    </tr>
    <tr>
        <td>`.attribute('#selector', 'data-foo', 'bar')`</td>
        <td>`.element('#selector').withData('foo', 'bar')`</td>
    </tr>
    <tr>
        <td>`.hasFocus('#selector')`</td>
        <td>`.element('#selector').focused`</td>
    </tr>
    <tr>
        <td>`.link('#selector', 'link text')`</td>
        <td>`.link('#selector', 'link text')`</td>
    </tr>
    <tr>
        <td>`.link('#selector', 'link text', 'url')`</td>
        <td>`.link('#selector', 'link text').withHref('#href')`</td>
    </tr>
    <tr>
        <td rowspan="3">`.url('url|obj|regex')`</td>
        <td>`.url().withHost('host')`</td>
    </tr>
    <tr>
        <td>`.url().withPath('/path')`</td>
    </tr>
    <tr>
        <td>`.url().withQuery('a', 'b')`</td>
    </tr>
    <tr>
        <td colspan="2">
        You can chain all this<br/>
        `.url().withHost('host').withPath('/').withQuery('a', 'b')`</td>
    </tr>
</table>

Check the tests for all assertions. More assertions will come in time.
