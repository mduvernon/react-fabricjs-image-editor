// React
import { CSSProperties, FC, MouseEvent } from "react";

type OwnProps = {
    name?: string | null,
    color?: string,
    style?: CSSProperties,
    className?: string,
    size?: number,
    innerIcon?: string | null,
    innerColor?: string,
    innerClassName?: string,
    innerSize?: number,
    prefix?: string,
    onClick?: (event: MouseEvent<HTMLElement>) => void,
    animation?: string,
}

const Icon: FC<OwnProps> = ({
    name = null,
    color = '',
    style = {},
    className = '',
    size = 1,
    innerIcon = null,
    innerColor = '',
    innerClassName = '',
    innerSize = 1,
    prefix = 'fas',
    onClick,
    animation,
}) => {

    const getIconHtml = (prefix: string, name: string, className: string, size: string, color?: string) => {
        const iconClassName = `${prefix} fa-${name} ${className}`;

        const iconStyle = Object.assign({}, style, {
            fontSize: `${size}em`,
            color,
        });

        return (<i className={iconClassName} style={iconStyle} onClick={onClick} />);
    }


    if (name.startsWith('icon-')) {
        name = name.substr('icon-'.length);
    }

    const iconHtml = getIconHtml(prefix, name, className, String(size), color);

    let innerIconHtml = null;

    if (innerIcon) {
        innerIconHtml = getIconHtml(innerIcon, innerClassName, String(innerSize), innerColor);
    } else {
        return iconHtml;
    }

    return (
        <span className="fa-stack">
            {iconHtml}
            {innerIconHtml}
        </span>
    )
}

export { Icon }

export default Icon;