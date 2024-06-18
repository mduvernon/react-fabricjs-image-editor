// React
import { FC, useMemo, useState } from "react";
// Ant Designs
import { Tabs } from 'antd';
// Common Components
import {
    CommonButton,
    Icon
} from "common/components";
// Components
import { Animations } from "../../animations";
import { Styles } from "../../styles";
import {
    MapProperties,
    NodeProperties
} from "../../properties";

type OwnProps = {
    canvasRef: any;
    selectedItem: any;
    onChange: (e: any, key: any, value: any) => void;
    onChangeAnimations: (animations: any[]) => void;
    onChangeStyles: (styles: any[]) => void;
    onChangeDataSources: (dataSources: any[]) => void;
    animations: any[];
    styles: any[];
    dataSources: any[];
};

const EditorRightPanel: FC<OwnProps> = ({
    onChange,
    selectedItem,
    canvasRef,
    animations,
    styles,
    dataSources,
    onChangeAnimations,
    onChangeStyles,
    onChangeDataSources,
}) => {
    const [activeKey, setActiveKey] = useState('map');
    const [collapse, setCollapse] = useState(false);

    const handlers = useMemo(() => ({
        onChangeTab: (activeKey) => {
            setActiveKey(activeKey);
        },

        onCollapse: () => {
            setCollapse((prevCollapse) => !prevCollapse);
        },

    }), []);

    return (
        <div className={`rde-editor-configurations ${Boolean(collapse) ? 'minimize' : ''}`}>
            <CommonButton
                className="rde-action-btn rde-editor-configurations-action-btn"
                shape="circle"
                icon={collapse ? 'angle-double-left' : 'angle-double-right'}
                onClick={handlers?.onCollapse}
                style={{ position: 'absolute', top: 16, right: 16, zIndex: 1000 }}
            />
            <Tabs
                className="rde-editor-configurations-tabs"
                tabPosition="right"
                style={{ height: '100%' }}
                activeKey={activeKey}
                onChange={handlers?.onChangeTab}
                tabBarStyle={{ marginTop: 60 }}
                items={
                    [
                        {
                            key: 'map',
                            label: <Icon name="cog" />,
                            children: <MapProperties onChange={onChange} selectedItem={selectedItem} canvasRef={canvasRef} />
                        },
                        {
                            key: 'node',
                            label: <Icon name="cogs" />,
                            children: <NodeProperties onChange={onChange} selectedItem={selectedItem} canvasRef={canvasRef} />
                        },
                        {
                            key: 'animations',
                            label: <Icon name="vine" prefix="fab" />,
                            children: <Animations animations={animations} onChangeAnimations={onChangeAnimations} />
                        },
                        {
                            key: 'styles',
                            label: <Icon name="star-half-alt" />,
                            children: <Styles styles={styles} onChangeStyles={onChangeStyles} />
                        },
                        // {
                        //     key: 'datasources',
                        //     label: <Icon name="table" />,
                        //     children: <DataSources ref={(c) => { this.dataSourcesRef = c; }} dataSources={dataSources} onChangeDataSources={onChangeDataSources} />
                        // }
                    ]
                }
            />
        </div>
    )
};

export { EditorRightPanel };

export default EditorRightPanel;