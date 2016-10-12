'use strict';

var moment = require('moment-timezone');
var defaults = {
	resolution: 100,
};

/**
 * @class Clock
 * @constructor
 * @param {Set} jobs
 * @param {Object} options
 */
function Clock(jobs, options) {
	var localOptions = Object.assign({}, defaults, options);

	/**
	 * @property {Set} jobs
	 */
	this.jobs = jobs;

	/**
	 * @property {Number} resolution
	 */
	this.resolution = localOptions.resolution;

	/**
	 * @property {Number} intervalId
	 */
	this.intervalId = null;
}

/**
 * @method start
 * @return {this}
 */
Clock.prototype.start = function start() {
	if (this.intervalId) {
		return this;
	}

	this.intervalId = setInterval(this.tick.bind(this), this.resolution);

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

	this.intervalId = clearInterval(this.intervalId);

	return this;
};

/**
 * @method restart
 * @return {this}
 */
Clock.prototype.reset = function reset() {
	function resetJob(job) {
		job.reset();
	}

	this.jobs.forEach(resetJob);

	return this;
};

/**
 * @method tick
 * @return {this}
 */
Clock.prototype.tick = function tick() {
	var now = moment().toString();

	function tickJob(job) {
		job.tick(now);
	}

	this.jobs.forEach(tickJob);

	return this;
};

module.exports = Clock;
