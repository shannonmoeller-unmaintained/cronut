const moment = require('moment-timezone');

const defaults = {
	resolution: 100,
};

/**
 * @class Clock
 */
class Clock {
	/**
	 * @constructor
	 * @param {Set} jobs
	 * @param {Object} options
	 */
	constructor(jobs, options) {
		const localOptions = Object.assign({}, defaults, options);

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
	start() {
		if (this.intervalId) {
			return this;
		}

		this.intervalId = setInterval(
			this.tick.bind(this),
			this.resolution
		);

		return this;
	}

	/**
	 * @method stop
	 * @return {this}
	 */
	stop() {
		if (!this.intervalId) {
			return this;
		}

		this.intervalId = clearInterval(
			this.intervalId
		);

		return this;
	}

	/**
	 * @method tick
	 * @return {this}
	 */
	tick() {
		const now = moment().toString();

		function tickJob(job) {
			job.onTick(now);
		}

		this.jobs.forEach(tickJob);

		return this;
	}
}

module.exports = Clock;
