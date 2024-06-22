// React
import { ReactNode, useState, useRef, forwardRef, LabelHTMLAttributes, PropsWithChildren, FC, Ref, HTMLAttributes } from 'react';
// Styles
import './style.scss';

export type IconProps = HTMLAttributes<SVGSVGElement> & {
    size?: number;
    width?: string | number;
    height?: string | number;
    color?: string;
    color2?: string;
    stroke?: string;
    stroke2?: string;
    viewBox?: string;
}

export type LabelProps = PropsWithChildren & LabelHTMLAttributes<HTMLLabelElement> & {
    iconStart?: ReactNode | ((props: IconProps) => ReactNode);
    iconEnd?: ReactNode | ((props: IconProps) => ReactNode);
    error?: boolean;
    disabled?: boolean;
    size?: 'sm' | 'md';
    className?: string;
};

const Label: FC<LabelProps> = forwardRef(({
    className = '',
    children,
    iconStart,
    iconEnd,
    error = false,
    disabled,
    size,
    ...props
}: LabelProps,
    labelRef$: Ref<HTMLLabelElement> // Update the type of labelRef$
) => {
    const [isEllipsisActive, setIsEllipsisActive] = useState(false);

    const textRef$ = useRef<HTMLSpanElement | null>(null);

    const _renderIcon = (icon: ReactNode | ((props: IconProps) => ReactNode), end: boolean): ReactNode => (
        <span className={`icon ${end ? 'end' : 'start'}`}>
            {typeof icon === 'function' ? icon({ size: size === 'md' ? 14 : 12 }) : icon}
        </span>
    );

    const _getTextTooltip = (): string | undefined => {
        if (typeof children === 'string' && isEllipsisActive) {
            return children;
        }
    };

    const _handleTextTooltip = (): void => {
        if (textRef$.current !== null && textRef$.current) {
            setIsEllipsisActive(textRef$?.current?.offsetWidth < textRef$?.current?.scrollWidth);
        }
    };

    return (
        <label className={`rde-editor__label ${className} ${size} ${Boolean(error) ? 'error' : ''} ${Boolean(disabled) ? 'disabled' : ''}`}
            ref={labelRef$}
            {...props}
        >
            {Boolean(iconStart) && (
                _renderIcon(iconStart, false)
            )}

            <span className='text' title={_getTextTooltip()} onMouseOver={_handleTextTooltip} ref={textRef$}>
                {children}
            </span>

            {Boolean(iconEnd) && (
                _renderIcon(iconEnd, true)
            )}
        </label >
    );
}
);

export { Label };
