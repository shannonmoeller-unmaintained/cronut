'use strict';

var CronTime = require('cron').CronTime;
var moment = require('moment-timezone');

/**
 * @class Job
 * @constructor
 * @param {String} pattern
 * @param {Function} task
 * @param {Object} options
 */
function Job(pattern, task) {
	/**
	 * @property {CronTime} cron
	 */
	this.cron = new CronTime(pattern);

	/**
	 * @property {Function} task
	 */
	this.task = task;

	/**
	 * @property {Moment} date
	 */
	this.date = null;

	this.next();
}

/**
 * @method next
 * @param {Moment} now
 * @return {this}
 */
Job.prototype.next = function next(now) {
	const time = moment(now).add(1, 'second');

	// eslint-disable-next-line no-underscore-dangle
	this.date = this.cron._getNextDateFrom(time);

	return this;
};

/**
 * @method tick
 * @param {Moment} now
 * @return {this}
 */
Job.prototype.tick = function tick(now) {
	const time = moment(now);

	if (this.date.isSame(time, 'second')) {
		this.next(time);

		setTimeout(this.task, 0);
	}

	return this;
};

module.exports = Job;
