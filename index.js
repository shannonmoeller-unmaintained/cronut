const Clock = require('./lib/clock');
const Job = require('./lib/job');

function cronut(options) {
	/* global Set */
	const jobs = new Set();
	const clock = new Clock(jobs);

	return function schedule(pattern, task) {
		const job = new Job(pattern, task, options);

		jobs.add(job);

		if (jobs.size) {
			clock.start();
		}

		return function unschedule() {
			jobs.delete(job);

			if (!jobs.size) {
				clock.stop();
			}
		};
	};
}

cronut.Clock = Clock;
cronut.Job = Job;

module.exports = cronut;
