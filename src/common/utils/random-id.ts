import { v4 as uuidv4 } from 'uuid';

export const randomUUID = (length: number = 10, upperCase: boolean = true): string => {
    let uid = uuidv4();

    uid = removeSpecialChar(uid)
        .slice(0, length);

    return upperCase ? uid.toUpperCase() : uid;
};

export const removeSpecialChar = (str: string) => {
    let rgxStr = /[~`!@#$%^&*()+={}\[\];:\'\"<>.,\/\\\?-_]/g;

    const rgx = new RegExp(rgxStr, 'g');

    return str.replace(rgx, '');
};

export const randomId = (prefixString = '') => {
    const suffixString = randomUUID(5);

    return `${prefixString}${prefixString ? '-' : ''}${suffixString}`;
}

export default randomId;
