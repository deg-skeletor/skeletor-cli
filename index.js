#!/usr/bin/env node

const pkg = require('./package.json');
const inquirer = require('inquirer');
const fs = require('fs-extra');
const args = require('minimist')(process.argv.slice(2));
const taskArgs = args._;
const errors = require('./lib/errors').errors;
const orko = require('@deg-skeletor/orko')();

const skeletorCli = () => {

	let config;
	let skelCore;
	let subTaskArgs; 

	const init = async () => {
		if (isVersionCheck()) {
			return logToConsole(`skel-cli: ${pkg.version}`, '');
		}

		const configExists = await pathExists(`${process.cwd()}/skeletor.config.js`);

		if (!configExists) {
			inquirer.prompt([{
  				name: 'createConfigFile',
  				message: errors.noConfig,
  				type: 'confirm'
  			}])
  				.then(answers => {
	  				if (answers.createConfigFile === true) {
						orko.start();
	  				} else {
	  					logToConsole(errors.cliCanceled, '');
	  				}
	  			});
		} else {
			skelCore = require('@deg-skeletor/core')();
			config = skelCore.getConfig();

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
			const filteredTask = filterTasks();
			console.log(filteredTask);
			if (filteredTask) {
				runTask(filteredTask);
			} else {
				logToConsole(errors.taskNotFound.replace('[taskName]', taskArgs[0]));
			}
		}
	};

	const isVersionCheck = () => {
		return taskArgs.includes('version') || args.v;
	};

	const hasInvalidConfig = () => {
		return !config.tasks || config.tasks.length === 0;
	};

	const hasTooManyTaskArgs = () => {
		return taskArgs.length > 1;
	};

	const hasTooManySubTaskArgs = () => {
		return subTaskArgs.only.length > 0 && subTaskArgs.except.length > 0
	};

	const runTask = task => {
		skelCore.runTask(task.name, {
			subTasksToInclude: filterSubTasks(task)
		});
	};

	const filterTasks = () => {
		let filteredTasks;
		if (taskArgs.length > 0) {
			const tasksMatchingArgs = config.tasks.find(task => task.name === taskArgs[0]);
			filteredTasks = tasksMatchingArgs || null;
		} else {
			const defaultTask = config.tasks.find(task => task.isDefaultTask === true);
			filteredTasks = defaultTask || config.tasks[0];
		}
		return filteredTasks;
	};

	const filterSubTasks = (task) => {
		if (subTaskArgs.only.length > 0) {
			return filterSubTasksByMethod(task, 'only');
		} else if (subTaskArgs.except.length > 0) {
			return filterSubTasksByMethod(task, 'except');
		}
		return task.subTasks.map(subTask => subTask.name);
	};

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
	};

	const getSubTaskArgs = () => {
		return {
			only: args.only && args.only.length > 0 ? args.only.split(',') : [],
			except: args.except && args.except.length > 0 ? args.except.split(',') : []
		};
	};

	const logToConsole = (msg, prefix = errors.prefix, method = 'log') => {
		console[method](`${prefix}${msg}`);
	};

	const pathExists = async pathtoCheck => {
		return await fs.pathExists(pathtoCheck);
	};

	init();

};

module.exports = skeletorCli();
