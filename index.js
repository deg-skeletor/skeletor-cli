#!/usr/bin/env node

const pkg = require('./package.json');
const args = require('minimist')(process.argv.slice(2));
const skelCore = require('skeletor-core')();
const config = skelCore.getConfig();
const errors = {
	tooManyTasks: 'One task at a time, please.',
	tooManySubtasks: 'You set "only" and "except" flags. Make up your damn mind.'
};
// const skelWizard = require('skeletor-wizard');

const skeletorCli = () => {
	
	if (config) {
		const tasks = getTasks();
		const subtasks = getSubtasks();
		console.log(config);
		console.log(args);

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
	}
	

};

module.exports = skeletorCli();
