const minimist = require('minimist');

jest.mock('console');

beforeEach(() => {
	minimist.__reset();
});

test('Returns version', () => {
	minimist.__setArgs(['version']);
	const pkg = require('./package.json');
	
	const logSpy = jest.spyOn(global.console, 'log');

	require('./index');

	expect(logSpy).toHaveBeenCalledTimes(1);
	expect(logSpy).toHaveBeenCalledWith(`skel-cli: ${pkg.version}`);
});