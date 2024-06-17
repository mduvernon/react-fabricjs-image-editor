// React
import { FC, PropsWithChildren, useState } from 'react';
// Contexts
import { FlowContext } from '../../contexts';

type OwnProps = PropsWithChildren & {};

const FlowContainer: FC<OwnProps> = ({
    children
}) => {
    const [selectedFlowNode, setSelectedFlowNode] = useState(null);

    return (
        <FlowContext.Provider
            value={{
                selectedFlowNode,
                setSelectedFlowNode,
            }}
        >
            {children}
        </FlowContext.Provider>
    );
};

export { FlowContainer }

export default FlowContainer;
