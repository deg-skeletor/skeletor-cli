#!/usr/bin/env node

const pkg = require('./package.json');
const args = require('minimist')(process.argv.slice(2));
const skelCore = require('skeletor-core')();
const config = skelCore.getConfig();
const errors = {
	prefix: 'ERROR: ',
	noConfig: 'No configuration specified',
	tooManyTasks: 'One task at a time, please.',
	tooManySubtasks: 'You set "only" and "except" flags. Make up your damn mind.'
};
// const skelWizard = require('skeletor-wizard');

const skeletorCli = () => {
	
	if (isVersionCheck()) {
		return console.log(pkg.version);
	}
	if (isInvalidConfig()) {
		return logError(errors.noConfig);
	}

	const tasks = getTasks();
	const subtasks = getSubtasks();
	if (tasks.length > 1) {
		logError(errors.tooManyTasks);
		return;
	} else if (subtasks.only.length > 0 && subtasks.except.length > 0) {
		logError(errors.tooManySubtasks);
		return;
	} else {
		skelCore.runTask(tasks[0], subtasks);
	}

	function getTasks() {
		return args._;
	}

	function getSubtasks() {
		return {
			only: args.only && args.only.length > 0 ? args.only.split(',') : [],
			except: args.except && args.only.length > 0 ? args.except.split(',') : [],
			debug: args.debug
		}
	}

	function isVersionCheck() {
		return args._.includes('version') || args.v && args.v === true
	}

	function isInvalidConfig() {
		return !config || !config.tasks || config.tasks.length === 0;
	}

	function logError(msg) {
		console.log(`${errors.prefix}${msg}`)
	}

};

module.exports = skeletorCli();
