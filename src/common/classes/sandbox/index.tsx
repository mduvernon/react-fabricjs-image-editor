import UnsafetyWordException from '../exception/UnsafetyWordException';
import NoExistWordException from '../exception/NoExistWordException';

const excludeWords = [
    'window',
    'Window',
    'alert',
    'console',
    'this',
    'eval',
    'new',
    'function',
    'Function',
    'document',
];

const includeWords = ['return'];

const parameters = ['value', 'animations', 'styles', 'userProperty'];

class SandBox {

    public excludeWords: string[];
    public includeWords: string[];

    /**
     *Creates an instance of SandBox.
     * @param {{ excludeWords: string[], includeWords: string[] }} params
     * @memberof SandBox
     */
    constructor(params: { excludeWords?: any[], includeWords?: any[] } = {}) {
        this.excludeWords = params.excludeWords || excludeWords;
        this.includeWords = params.includeWords || includeWords;
    }

    verify(code) {
        const newCode = code.toString();

        if (this.excludeWords.some(word => code.includes(word))) {
            throw new UnsafetyWordException();
        }

        if (!this.includeWords.some(word => code.includes(word))) {
            throw new NoExistWordException();
        }

        return new Function(parameters as any, `"use strict"; ${newCode}`);
    }

    compile(code) {
        try {
            return this.verify(code);
        } catch (error) {
            if (error.toString) {
                console.error(error.toString());
            } else {
                console.error(error.message);
            }
        }
    }
}

export { SandBox };

export default SandBox;
