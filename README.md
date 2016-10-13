# `cronut`

[![NPM version][npm-img]][npm-url] [![Downloads][downloads-img]][npm-url] [![Build Status][travis-img]][travis-url] [![Coverage Status][coveralls-img]][coveralls-url] [![Chat][gitter-img]][gitter-url] [![Tip][amazon-img]][amazon-url]

Tasty task scheduler with a mungable internal clock filling.

## Install

    $ npm install --save cronut

## Usage

### Schedule Tasks

```js
import cronut from 'cronut';

const cron = cronut();

cron('0 0 0 * * *', () => {
    console.log('another hour');
});

cron('0 0 * * * *', () => {
    console.log('another minute');
});

cron('* * * * * *', () => {
    console.log('another second');
});

cron('0 30 0,12 * * 1-5', () => {
    console.log('12:30 AM and PM on weekdays');
});
```

### Unschedule Tasks

```js
const removeTask = cron('0 * * * * *', () => {
    // only run 10 or so times
    console.log('another second');
});

// Unschedule after 10 seconds
setTimeout(removeTask, 10000);
```

## API

### cronut()

Creates a new task scheduler.

```js
import cronut from 'cronut';

const cron = cronut();
```

### cron(pattern, task[, options]) : Function
### cron.addTask(pattern, task[, options]) : Function

- `pattern` `String`
- `task` `Function`
- `options` `Object`
  - `resolution` `Number` Default: `100`.

Patterns are any valid pattern supported by [`cron`](http://npm.im/cron). The task is the function to be executed at the appointed times. Returns a function to stop the task.

```js
cron('* * * * * *', () => {
    console.log('another second');
});

// same as

cron.addTask('* * * * * *', () => {
    console.log('another second');
});

// removable

const removeTask = cron.addTask('* * * * * *', () => {
    console.log('another second');
});

removeTask();
```

### cron.restart()

Stops the clock, resets each tasks' internal schedule, then restarts the clock.

```js
cron.restart();
```

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
