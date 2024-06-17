// React
import { FC, PropsWithChildren, ReactElement } from "react";
// Common Components 
import { Flex } from "common/components";

type OwnProps = PropsWithChildren & {
    title?: string | ReactElement;
    content?: ReactElement;
    action?: ReactElement;
}

const ImageMapTitle: FC<OwnProps> = ({
    title,
    content,
    action,
    children
}) => {

    return (
        Boolean(children) ? (
            <>
                {children}
            </>
        ) : (
            <Flex className="rde-content-layout-title" alignItems="center" flexWrap="wrap">
                <Flex.Item flex="0 1 auto">
                    <Flex
                        className="rde-content-layout-title-title"
                        justifyContent="flex-start"
                        alignItems="center"
                    >
                        {title instanceof String ? <h3>{title}</h3> : title}
                    </Flex>
                </Flex.Item>
                <Flex.Item flex="auto">
                    <Flex className="rde-content-layout-title-content" alignItems="center">
                        {content}
                    </Flex>
                </Flex.Item>
                <Flex.Item flex="auto">
                    <Flex className="rde-content-layout-title-action" justifyContent="flex-end" alignItems="center">
                        {action}
                    </Flex>
                </Flex.Item>
            </Flex>
        )

    )
}

export { ImageMapTitle };

export default ImageMapTitle;
