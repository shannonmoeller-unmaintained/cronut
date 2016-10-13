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
	 * @property {Number} timeoutId
	 */
	this.timeoutId = null;

	/**
	 * @property {Number} resolution
	 */
	this.resolution = 100;

	this.tick = this.tick.bind(this);
}

/**
 * @method start
 * @return {this}
 */
Clock.prototype.start = function start() {
	if (this.timeoutId) {
		return this;
	}

	this.timeoutId = setTimeout(
		this.tick,
		this.resolution
	);

	return this;
};

/**
 * @method stop
 * @return {this}
 */
Clock.prototype.stop = function stop() {
	if (!this.timeoutId) {
		return this;
	}

	this.timeoutId = clearTimeout(
		this.timeoutId
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

	this.timeoutId = setTimeout(
		this.tick,
		this.resolution
	);

	return this;
};

module.exports = Clock;
