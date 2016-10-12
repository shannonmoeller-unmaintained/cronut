'use strict';

var moment = require('moment-timezone');

/**
 * @class Clock
 * @constructor
 * @param {Set} jobs
 * @param {Object} options
 */
function Clock(jobs) {
	/**
	 * @property {Set} jobs
	 */
	this.jobs = jobs;

	/**
	 * @property {Number} intervalId
	 */
	this.intervalId = null;

	/**
	 * @property {Number} resolution
	 */
	this.resolution = 100;
}

/**
 * @method start
 * @return {this}
 */
Clock.prototype.start = function start() {
	if (this.intervalId) {
		return this;
	}

	this.intervalId = setInterval(
		this.tick.bind(this),
		this.resolution
	);

	return this;
};

/**
 * @method stop
 * @return {this}
 */
Clock.prototype.stop = function stop() {
	if (!this.intervalId) {
		return this;
	}

	this.intervalId = clearInterval(
		this.intervalId
	);

	return this;
};

/**
 * @method reset
 * @return {this}
 */
Clock.prototype.reset = function reset() {
	var now = moment();

	function resetJob(job) {
		job.next(now);
	}

	this.jobs.forEach(resetJob);

	return this;
};

/**
 * @method tick
 * @return {this}
 */
Clock.prototype.tick = function tick() {
	var now = moment();

	function tickJob(job) {
		job.tick(now);
	}

	this.jobs.forEach(tickJob);

	return this;
};

module.exports = Clock;
