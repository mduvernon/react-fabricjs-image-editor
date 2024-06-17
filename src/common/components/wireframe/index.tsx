// React
import { FC, createRef } from "react";
// Components
import { Flex } from '../flex';

type OwnProps = {
    canvasRef: any;
}

const Wireframe: FC<OwnProps> = ({
    canvasRef: { current },
}) => {

    const container = createRef<HTMLDivElement>();

    return current ? (
        <Flex flexDirection="column">
            <div ref={container} style={{ margin: 8, flex: "0 1 auto" }}>
                <img width="144" height="150" src={current.handlers.exportPNG()} />
            </div>
        </Flex>
    ) : null;
}

export { Wireframe };

export default Wireframe;
