const parser = require('cron-parser');

const defaults = {
	iterator: false,
};

/**
 * @class Job
 */
class Job {
	/**
	 * @constructor
	 * @param {String} pattern
	 * @param {Function} task
	 * @param {Object} options
	 */
	constructor(pattern, task, options) {
		const localOptions = Object.assign({}, defaults, options);
		const schedule = parser.parseExpression(pattern, localOptions);

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

		this.findNextTimestamp();
	}

	/**
	 * @method findNextTimestamp
	 * @return {this}
	 */
	findNextTimestamp() {
		this.nextTimestamp = this.schedule
			.next()
			.toString();

		return this;
	}

	/**
	 * @method onTick
	 * @param {String} timestamp
	 * @return {this}
	 */
	onTick(timestamp) {
		if (timestamp === this.nextTimestamp) {
			this.findNextTimestamp();

			setImmediate(this.task);
		}

		return this;
	}
}

module.exports = Job;
