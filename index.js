#!/usr/bin/env node

const pkg = require('./package.json');
const args = require('minimist')(process.argv.slice(2));
const subtaskArgs = getSubtaskArgs();
const skelCore = require('skeletor-core')();
const config = skelCore.getConfig();
const errors = {
	prefix: 'ERROR: ',
	noConfig: 'No configuration specified',
	tooManyTasks: 'One task at a time, please.',
	tooManySubtasks: 'You set "only" and "except" flags. Make up your damn mind.',
	taskNotFound: 'The task you entered does not exist in the config file.'
};
// const skelWizard = require('skeletor-wizard');

const skeletorCli = () => {

	const init = () => {
		if (isVersionCheck()) {
			return logToConsole(pkg.version, '');
		}
		if (hasInvalidConfig()) {
			return logError(errors.noConfig);
		}
		if (hasTooManyTaskArgs()) {
			return logToConsole(errors.tooManyTasks);
		}
		if (hasTooManySubtaskArgs()) {
			return logToConsole(errors.tooManySubtasks);
		}
		const filteredTasks = filterTasks();
		if (filteredTasks) {
			runTasks(filteredTasks);
			console.log(filteredTasks);
		} else {
			logToConsole(errors.taskNotFound);
		}
	}

	const isVersionCheck = () => {
		return args._.includes('version') || args.v;
	}

	const hasInvalidConfig = () => {
		return !config || !config.tasks || config.tasks.length === 0;
	}

	const hasTooManyTaskArgs = () => {
		return args._.length > 1;
	}

	const hasTooManySubtaskArgs = () => {
		return subtaskArgs.only.length > 0 && subtaskArgs.except.length > 0
	}

	const runTasks = (filteredTasks) => {
		console.log(subtaskArgs);
		filteredTasks.forEach(task => {
			skelCore.runTask(task, {
				subTasksToInclude: ''
			});
		});
	}

	const filterTasks = () => {
		if (args._.length > 0) {
			const filtered = config.tasks.filter(task => task.name === args._[0]);
			return filtered.length > 0 ? filtered : null;
		} else {
			return config.tasks;
		}
	}

	const getSubtaskArgs = () => {
		return {
			only: args.only && args.only.length > 0 ? args.only.split(',') : [],
			except: args.except && args.only.length > 0 ? args.except.split(',') : []
		};
	}

	const logToConsole = (msg, prefix = errors.prefix, method = 'log') => {
		console[method](`${prefix}${msg}`)
	}

	init();

};

module.exports = skeletorCli();
