import { Handler } from './Handler';

class CustomHandler {

	handler: Handler;

	constructor(handler: Handler) {
		this.handler = handler;
		this.initialze();
	}

	protected initialze() { }
}

export { CustomHandler }

export default CustomHandler;
