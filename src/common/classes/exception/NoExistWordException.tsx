

class NoExistWordException {
	public message: string;
	public name: string;

	constructor() {
		this.message = 'Does not exist word.';
		this.name = 'NoExistWordException';
	}

	toString() {
		return `${this.name}: ${this.message}`;
	}
}

export { NoExistWordException };

export default NoExistWordException;