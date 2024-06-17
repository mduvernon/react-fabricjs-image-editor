import React from 'react';

import { NodeObject } from 'modules/canvas/objects/Node';

export interface IFlowContext {
	selectedFlowNode: NodeObject;
	setSelectedFlowNode: (selectedFlowNode: NodeObject) => void;
}

const FlowContext = React.createContext<IFlowContext>(undefined);

export { FlowContext };

export default FlowContext;
