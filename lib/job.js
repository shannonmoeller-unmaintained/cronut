'use strict';

var parser = require('cron-parser');
var defaults = {
	iterator: false,
};

/**
 * @class Job
 * @constructor
 * @param {String} pattern
 * @param {Function} task
 * @param {Object} options
 */
function Job(pattern, task, options) {
	var localOptions = Object.assign({}, defaults, options);
	var schedule = parser.parseExpression(pattern, localOptions);

	/**
	 * @property {CronExpression} schedule
	 */
	this.schedule = schedule;

	/**
	 * @property {Function} task
	 */
	this.task = task;

	/**
	 * @property {String} nextTimestamp
	 */
	this.nextTimestamp = null;

	this.reset();
}

/**
 * @method reset
 * @return {this}
 */
Job.prototype.reset = function reset() {
	this.nextTimestamp = this.schedule
		.next()
		.toString();

	return this;
};

/**
 * @method tick
 * @param {String} timestamp
 * @return {this}
 */
Job.prototype.tick = function tick(timestamp) {
	if (timestamp === this.nextTimestamp) {
		this.reset();

		setTimeout(this.task, 0);
	}

	return this;
};

module.exports = Job;
