// React
import { CSSProperties, FC, PropsWithChildren } from "react";
// Ant Design
import { TooltipPlacement } from "antd/lib/tooltip";
import { ButtonType } from "antd/lib/button";
import {
    Tooltip,
    Button
} from 'antd';
// Components
import Icon from '../icon';

type OwnProps = PropsWithChildren & {
    name?: string;
    id?: string;
    style?: CSSProperties;
    wrapperStyle?: CSSProperties;
    wrapperClassName?: string;
    tooltipTitle?: string;
    tooltipPlacement?: TooltipPlacement;
    className?: string;
    icon?: string;
    iconStyle?: CSSProperties;
    iconClassName?: string;
    iconAnimation?: string;
    visible?: boolean;
    shape?: 'circle' | 'round';
    disabled?: boolean;
    loading?: boolean;
    type?: ButtonType;
    size?: 'small' | 'middle' | 'large';
    onClick?: () => void;
}

const CommonButton: FC<OwnProps> = ({
    name,
    id,
    style,
    wrapperStyle,
    wrapperClassName,
    tooltipTitle,
    tooltipPlacement,
    className,
    icon,
    iconStyle,
    iconClassName,
    iconAnimation,
    visible = true,
    shape,
    disabled = false,
    loading = false,
    type = 'default',
    size,
    onClick,
    children
}) => {
    return visible ? (
        <Tooltip title={tooltipTitle} placement={tooltipPlacement}>
            {wrapperClassName || wrapperStyle ? (
                <span style={wrapperStyle} className={wrapperClassName}>
                    <Button
                        id={id}
                        className={className}
                        name={name}
                        style={style}
                        shape={shape}
                        size={size}
                        onClick={onClick}
                        type={type}
                        disabled={disabled}
                        loading={loading}
                    >
                        {icon ? (
                            iconAnimation ? (
                                <Icon
                                    name={icon}
                                    style={iconStyle}
                                    className={iconClassName}
                                    animation={iconAnimation}
                                />
                            ) : (
                                <Icon
                                    name={icon}
                                    style={iconStyle}
                                    className={iconClassName}
                                />
                            )
                        ) : null}
                        {children}
                    </Button>
                </span>
            ) : (
                <Button
                    id={id}
                    className={className}
                    name={name}
                    style={style}
                    shape={shape}
                    size={size}
                    onClick={onClick}
                    type={type}
                    disabled={disabled}
                    loading={loading}
                >
                    {icon ? (
                        iconAnimation ? (
                            <Icon
                                name={icon}
                                style={iconStyle}
                                className={iconClassName}
                                animation={iconAnimation}
                            />
                        ) : (
                            <Icon
                                name={icon}
                                style={iconStyle}
                                className={iconClassName}
                            />
                        )
                    ) : null}
                    {children}
                </Button>
            )}
        </Tooltip>
    ) : null
}

export { CommonButton };

export default CommonButton;