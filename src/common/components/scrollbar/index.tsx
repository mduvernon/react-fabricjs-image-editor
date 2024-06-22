// React
import { FC, PropsWithChildren } from "react";
// Scrollbars
import { Scrollbars } from 'react-custom-scrollbars-2';

type OwnProps = PropsWithChildren & {
    className?: string;
    renderTrackStyle?: any;
}

const Scrollbar: FC<OwnProps> = ({
    renderTrackStyle = {},
    className = '',
    children,
    ...props
}) => {

    const renderTrack = (innerProps: any) => {

        return (
            <div
                style={{
                    ...innerProps.style,
                    ...renderTrackStyle
                }}
                className={`rde-scrollbar__track ${className}`}
            />
        );
    };

    return (
        <Scrollbars renderTrackVertical={renderTrack}>
            {children}
        </Scrollbars>
    );
};

export { Scrollbar };

export default Scrollbar;


