#!/usr/bin/env node

const pkg = require('./package.json');
const inquirer = require('inquirer');
const args = require('minimist')(process.argv.slice(2));
const taskArgs = args._;
const errors = require('./lib/errors').errors;
const skelCore = require('@deg-skeletor/core')();
const config = skelCore.getConfig();
// const skelWizard = require('skeletor-wizard');

const skeletorCli = () => {

	let subTaskArgs; 

	const init = () => {
		if (isVersionCheck()) {
			return logToConsole(`skel-cli: ${pkg.version}`, '');
		}
		if (!config) {
			inquirer.prompt([{
  				name: 'createConfigFile',
  				message: errors.noConfig,
  				type: 'confirm'
  			}])
  				.then(answers => {
	  				if (answers.createConfigFile === true) {
	  					logToConsole('scaffolding go!', '');
	  				} else {
	  					logToConsole(errors.cliCanceled, '');
	  				}
	  			});
		} else {
			if (hasInvalidConfig()) {
				return logToConsole(errors.invalidConfig);
			}
			if (hasTooManyTaskArgs()) {
				return logToConsole(errors.tooManyTasks);
			}
			subTaskArgs = getSubTaskArgs();
			if (hasTooManySubTaskArgs()) {
				return logToConsole(errors.tooManySubTasks);
			}
			const filteredTasks = filterTasks();
			if (filteredTasks) {
				runTasks(filteredTasks);
			} else {
				logToConsole(errors.taskNotFound.replace('[taskName]', taskArgs[0]));
			}
		}
	}

	const isVersionCheck = () => {
		return taskArgs.includes('version') || args.v;
	}

	const hasInvalidConfig = () => {
		return !config.tasks || config.tasks.length === 0;
	}

	const hasTooManyTaskArgs = () => {
		return taskArgs.length > 1;
	}

	const hasTooManySubTaskArgs = () => {
		return subTaskArgs.only.length > 0 && subTaskArgs.except.length > 0
	}

	const runTasks = (filteredTasks) => {
		filteredTasks.forEach(task => {
			skelCore.runTask(task.name, {
				subTasksToInclude: filterSubTasks(task)
			});
		});
	}

	const filterTasks = () => {
		if (taskArgs.length > 0) {
			const filteredTasks = config.tasks.filter(task => task.name === taskArgs[0]);
			return filteredTasks.length > 0 ? filteredTasks : null;
		} else {
			return config.tasks;
		}
	}

	const filterSubTasks = (task) => {
		if (subTaskArgs.only.length > 0) {
			return filterSubTasksByMethod(task, 'only');
		} else if (subTaskArgs.except.length > 0) {
			return filterSubTasksByMethod(task, 'except');
		} else {
			return task.subTasks.map(subTask => subTask.name);
		}
	}

	const filterSubTasksByMethod = (task, method) => {
		return task.subTasks.reduce((accumulator, subTask) => {
			if (method === 'only') {
				if (subTaskArgs[method].includes(subTask.name)) {
					accumulator.push(subTask.name);
				}
			}
			if (method === 'except') {
				if (!subTaskArgs[method].includes(subTask.name)) {
					accumulator.push(subTask.name);
				}
			}
			return accumulator;
		}, []);
	}

	const getSubTaskArgs = () => {
		return {
			only: args.only && args.only.length > 0 ? args.only.split(',') : [],
			except: args.except && args.except.length > 0 ? args.except.split(',') : []
		};
	}

	const logToConsole = (msg, prefix = errors.prefix, method = 'log') => {
		console[method](`${prefix}${msg}`);
	}

	init();

};

module.exports = skeletorCli();
