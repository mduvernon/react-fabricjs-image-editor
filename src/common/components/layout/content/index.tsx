// React
import { FC, PropsWithChildren, ReactNode } from "react";
// Ant Design
import { Layout, Spin } from 'antd';

type OwnProps = PropsWithChildren & {
    title?: ReactNode;
    leftSider?: ReactNode;
    content?: ReactNode;
    rightSider?: ReactNode;
    className?: string;
    loading?: boolean;
}

const Content: FC<OwnProps> = ({
    title,
    leftSider,
    content,
    rightSider,
    className = 'rde-content-layout-main',
    loading = false,
    children
}) => {
    return (
        <Spin spinning={loading}>
            <Layout className="rde-content-layout">
                {title}
                <Layout
                    style={{
                        overflowY: 'auto',
                        overflowX: 'hidden',
                        minHeight: `calc(100vh - ${title ? 98 : 60}px)`,
                        height: `calc(100vh - ${title ? 98 : 60}px)`,
                    }}
                    className={className}
                >
                    {leftSider}
                    {content || children}
                    {rightSider}
                </Layout>
            </Layout>
        </Spin>
    )
}

export { Content };

export default Content;
