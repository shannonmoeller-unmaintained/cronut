# `cronut`

[![NPM version][npm-img]][npm-url] [![Downloads][downloads-img]][npm-url] [![Build Status][travis-img]][travis-url] [![Coverage Status][coveralls-img]][coveralls-url] [![Chat][gitter-img]][gitter-url] [![Tip][amazon-img]][amazon-url]

Tasty task scheduler with a mungable internal clock filling.

## Install

    $ npm install --save cronut

## Usage

### Schedule Tasks

```js
import cronut from 'cronut';

const scheduler = cronut();

scheduler('0 0 0 * * *', () => {
    console.log('another hour');
});

scheduler('0 0 * * * *', () => {
    console.log('another minute');
});

scheduler('* * * * * *', () => {
    console.log('another second');
});

scheduler('0 30 12,24 * * 1-5', () => {
    console.log('12:30 AM and PM on weekdays');
});
```

### Unschedule Tasks

```js
const unschedule = scheduler('0 * * * * *', () => {
    // only run 10 or so
    console.log('another second');
});

// Unschedule after 10 seconds
setTimeout(unschedule, 10000);
```

## API

### schedule(pattern, task[, options]) : Job

- `pattern` `String`
- `task` `Function`
- `options` `Object`

Patterns are any valid pattern supported by [`cron-parser`](http://npm.im/cron-parser).

## Why?

There are a bunch of task schedulers already available, but none of them allowed me to mess with the internal clock for timeline manipulation or testing purposes.

## Contribute

Standards for this project, including tests, code coverage, and semantics are enforced with a build tool. Pull requests must include passing tests with 100% code coverage and no linting errors.

### Test

    $ npm test

----

© Shannon Moeller <me@shannonmoeller.com> (http://shannonmoeller.com)

Licensed under [MIT](http://shannonmoeller.com/mit.txt)

[amazon-img]:    https://img.shields.io/badge/amazon-tip_jar-yellow.svg?style=flat-square
[amazon-url]:    https://www.amazon.com/gp/registry/wishlist/1VQM9ID04YPC5?sort=universal-price
[coveralls-img]: http://img.shields.io/coveralls/shannonmoeller/cronut/master.svg?style=flat-square
[coveralls-url]: https://coveralls.io/r/shannonmoeller/cronut
[downloads-img]: http://img.shields.io/npm/dm/cronut.svg?style=flat-square
[gitter-img]:    http://img.shields.io/badge/gitter-join_chat-1dce73.svg?style=flat-square
[gitter-url]:    https://gitter.im/shannonmoeller/shannonmoeller
[npm-img]:       http://img.shields.io/npm/v/cronut.svg?style=flat-square
[npm-url]:       https://npmjs.org/package/cronut
[travis-img]:    http://img.shields.io/travis/shannonmoeller/cronut.svg?style=flat-square
[travis-url]:    https://travis-ci.org/shannonmoeller/cronut
