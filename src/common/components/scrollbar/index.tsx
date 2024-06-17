// React
import { FC, PropsWithChildren } from "react";
// Scrollbars
import { Scrollbars } from 'react-custom-scrollbars-2';

type OwnProps = PropsWithChildren & {}

const Scrollbar: FC<OwnProps> = ({
    children,
    ...props
}) => {

    const renderTrack = (innerProps: any) => (
        <div {...innerProps} className="rde-track-vertical" />
    );

    return (
        <Scrollbars renderTrackVertical={renderTrack}>
            {children}
        </Scrollbars>
    );
};

export { Scrollbar };

export default Scrollbar;


