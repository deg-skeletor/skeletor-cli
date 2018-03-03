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
		return logToConsole(pkg.version, '');
	}
	if (hasInvalidConfig()) {
		return logError(errors.noConfig);
	}
	if (hasInvalidTasks()) {
		return logToConsole(errors.tooManyTasks);
	}
	if (hasInvalidSubtasks()) {

	}

	if (tasks.length > 1) {
		logToConsole(errors.tooManyTasks);
		return;
	} else if (subtasks.only.length > 0 && subtasks.except.length > 0) {
		logToConsole(errors.tooManySubtasks);
		return;
	} else {
		skelCore.runTask(tasks[0], subtasks);
	}

	function getSubtasks() {
		return {
			only: args._.only && args._.only.length > 0 ? args._.only.split(',') : [],
			except: args._.except && args._.only.length > 0 ? args._.except.split(',') : []
		}
	}

	function isVersionCheck() {
		return args._.includes('version') || args.v && args.v === true
	}

	function hasInvalidConfig() {
		return !config || !config.tasks || config.tasks.length === 0;
	}

	function hasInvalidTasks() {
		console.log(args);
		return args._.length <= 1;
	}

	function hasInvalidSubtasks() {
		const subtasks = getSubtasks();
		console.log(subtasks);
		subtasks.only.length > 0 && subtasks.except.length > 0
	}

	function logToConsole(msg, prefix = errors.prefix, method = 'log') {
		console[method](`${prefix}${msg}`)
	}

};

module.exports = skeletorCli();
