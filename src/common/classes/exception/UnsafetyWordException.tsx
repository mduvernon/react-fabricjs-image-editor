class UnsafetyWordException {
	public message: string;
	public name: string;

	constructor() {
		this.message = 'Includes unsafety word.';
		this.name = 'UnsafetyWordException';
	}

	toString() {
		return `${this.name}: ${this.message}`;
	}
}

export { UnsafetyWordException };

export default UnsafetyWordException;