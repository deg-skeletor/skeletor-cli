#!/usr/bin/env node

const skelCore = require('skeletor-core');

const skeletorCli = () => {

	// console.log(skelCore());

	console.log('skeletorCli');

	// const minimist = require('minimist');
	// const skeletorWizard = require('skeletor-wizard');
	// const pkg = require('./package.json');

	// const defaultKeyword = 'default';
	// const quotesKeyword = 'etor';
	// const errors = {
	// 	tooManyTasks: 'One task at a time, please.',
	// 	tooManySubtasks: 'You set "only" and "except" flags. Make up your damn mind.'
	// };
	// const minimistConfig = {
	// 	boolean: [
	// 		'debug',
	// 		'version'
	// 	]
	// };
	// const args = getArgs();
	// const tasks = getTasks();
	// const subtasks = getSubtasks();

	// function init() {
	// 	if (args.version) {
	// 		console.log(pkg.version);
	// 	} else {
	// 		if (tasks.length > 1) {
	// 			console.log(errors.tooManyTasks);
	// 			return;
	// 		} else if (subtasks.only.length > 0 && subtasks.except.length > 0) {
	// 			console.log(errors.tooManySubtasks);
	// 			return;
	// 		} else {
	// 			run(tasks[0], subtasks);
	// 			if (args.etor) {
	// 				console.log(getQuote());
	// 			}
	// 		}
	// 	}
	// }

	// function run(task, subtasks) {
	// 	console.log(task);
	// 	console.log(subtasks);
	// }

	// function getArgs() {
	// 	return minimist(process.argv.slice(2), minimistConfig);
	// }

	// function getTasks() {
	// 	return args._.length === 0 ? [defaultKeyword] : args._;
	// }

	// function getSubtasks() {
	// 	return {
	// 		only: args.only && args.only.length > 0 ? args.only.split(',') : [],
	// 		except: args.except && args.only.length > 0 ? args.except.split(',') : [],
	// 		debug: args.debug
	// 	}
	// }

	// function getQuote() {
	// 	const skelQuotes = [
	// 		`How unpleasant it is to see you, you sniveling coward!`,
	// 		`Everything comes to he who waits...and I have waited so very long for this moment!`,
	// 		`I am the alpha and the omega. Death and rebirth. And, as you die, so will I be reborn.`,
	// 		`Yes we'll win this game the old-fashioned way, the tried and true way: we'll cheat!`,
	// 		`I help no one but myself!`,
	// 		`I am not nice, I am not kind, and I am not wonderful!`,
	// 		`I ache to smash you out of existence! To drive your cursed face from my memories forever!`,
	// 		`I must possess all, or I possess nothing!`,
	// 		`How I loathe heroes. Always getting in the way and acting so...so...heroic!`,
	// 		`You furry, flea bitten fool. I'll cover my throne with your hide!`,
	// 		`Books are the real treasures of the world!`,
	// 		`This is how it ends! With Skeletor triumphant at last!`,
	// 		`No one "gets" Skeletor! Away!`,
	// 		`I am not in a giving vein today!`,
	// 		`I'm so powerful I even impress myself!`,
	// 		`Really. How sensitive you are. Can you feel...this?`,
	// 		`Never mind what I said, just do what I said.`,
	// 		`I'll turn you into a suitcase!`,
	// 		`You have a brain that could warm my heart, if I had a heart!`,
	// 		`Everything I do is for the sake of evil.`,
	// 		`Where are they? Where are your friends now? Tell me about the loneliness of good. Is it equal to the loneliness of evil?`,
	// 		`I don't know what's coming over me, but whatever it is, I don't like it!`,
	// 		`This is becoming a wonderful day for evil!`
	// 	];
	// 	return skelQuotes[Math.floor(Math.random() * skelQuotes.length)];
	// }

	// init();

};

module.exports = skeletorCli();
