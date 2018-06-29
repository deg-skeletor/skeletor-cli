let args = [];

const minimist = () => ({
	_: args
});

minimist.__setArgs = newArgs => {
	args = newArgs;
}

minimist.__reset = () => {
	args = [];
}

module.exports = minimist;