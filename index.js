'use strict';

var moment = require('moment-timezone');
var Clock = require('./lib/clock');
var Job = require('./lib/job');

function cronut() {
	/* global Set */
	var jobs = new Set();
	var clock = new Clock(jobs);

	function cron(pattern, task) {
		return cron.addTask(pattern, task);
	}

	cron.addTask = function addTask(pattern, task) {
		var job = new Job(pattern, task);

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

	cron.now = function now(fn) {
		moment.now = fn;

		clock.reset();
	};

	return cron;
}

cronut.Clock = Clock;
cronut.Job = Job;

module.exports = cronut;
