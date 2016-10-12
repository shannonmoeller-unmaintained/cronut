'use strict';

var Clock = require('./lib/clock');
var Job = require('./lib/job');

function cronut(options) {
	/* global Set */
	var jobs = new Set();
	var clock = new Clock(jobs);

	function cron(pattern, task) {
		return cron.addTask(pattern, task);
	}

	cron.addTask = function addTask(pattern, task) {
		var job = new Job(pattern, task, options);

		jobs.add(job);

		if (jobs.size) {
			clock.start();
		}

		return function removeTask() {
			jobs.delete(job);

			if (!jobs.size) {
				clock.stop();
			}
		};
	};

	cron.restart = function restart() {
		clock.stop();
		clock.reset();
		clock.start();
	};

	return cron;
}

cronut.Clock = Clock;
cronut.Job = Job;

module.exports = cronut;
