
export const debounce = (
    func: (...args: any[]) => void,
    timeout = 300
) => {
    let timer: NodeJS.Timeout;

    return (...args: any[]) => {
        clearTimeout(timer);

        const [
            firstArg,
            ...otherArgs
        ] = args;

        timer = setTimeout(
            func.bind(null, firstArg?.target?.value ?? firstArg, ...otherArgs),
            timeout,
        );
    };
};

export default debounce;
