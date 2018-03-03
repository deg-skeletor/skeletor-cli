#!/usr/bin/env node

const pkg = require('./package.json');
const minimist = require('minimist');
const skeletor = require('skeletor-core');
// const skeletorWizard = require('skeletor-wizard');

const skeletorCli = () => {

	const skelCore = skeletor();
	const defaultKeyword = 'default';
	const errors = {
		tooManyTasks: 'One task at a time, please.',
		tooManySubtasks: 'You set "only" and "except" flags. Make up your damn mind.'
	};
	const minimistConfig = {
		boolean: [
			'debug',
			'version'
		]
	};
	const args = getArgs();
	const tasks = getTasks();
	const subtasks = getSubtasks();
	console.log(core.getConfig());

	if (args.version) {
		console.log(pkg.version);
	} else {
		if (tasks.length > 1) {
			console.log(errors.tooManyTasks);
			return;
		} else if (subtasks.only.length > 0 && subtasks.except.length > 0) {
			console.log(errors.tooManySubtasks);
			return;
		} else {
			skelCore.runTask(tasks[0], subtasks);
		}
	}

	function getArgs() {
		return minimist(process.argv.slice(2), minimistConfig);
	}

	function getTasks() {
		return args._.length === 0 ? [defaultKeyword] : args._;
	}

	function getSubtasks() {
		return {
			only: args.only && args.only.length > 0 ? args.only.split(',') : [],
			except: args.except && args.only.length > 0 ? args.except.split(',') : [],
			debug: args.debug
		}
	}

};

module.exports = skeletorCli();
