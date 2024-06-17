// React
import { FC, useRef, useState, Fragment } from 'react';
// Ant Design 
import {
    Button,
    Modal,
    Form
} from 'antd';
// React Ace Editor
import ReactAce from 'react-ace';
// i18next
import i18n from 'i18next';
// Common Hooks
import { useDeepCompareEffect } from "common/hooks";
// Components
import Icon from '../icon';

import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/theme-github';

type OwnProps = {
    value?: any;
    onChange?: (value?: any) => void;
    form?: any;
}

const ChartModal: FC<OwnProps> = ({
    value,
    onChange,
    form
}) => {

    const [tempChartOption, setTempChartOption] = useState(value);
    const [chartOption, setChartOption] = useState(value);
    const [visible, setVisible] = useState(false);

    const jsRef = useRef(null);

    const handlers = useRef({
        onOk: () => {
            if (typeof onChange === 'function') {
                onChange(tempChartOption);
            }

            setVisible(false);
            setChartOption(tempChartOption);
        },
        onCancel: () => {
            modalHandlers.current?.onHide();
        },
        onClick: () => {
            modalHandlers.current?.onShow();
        },
    });

    const modalHandlers = useRef({
        onShow: () => {
            setVisible(true);
        },
        onHide: () => {
            setVisible(false);
        },
    });

    useDeepCompareEffect(() => {
        setChartOption(value);
    }, [value]);

    return (
        <Fragment>
            <Form.Item
                name={["chartOption"]}
                label={
                    <Fragment>
                        <span style={{ marginRight: 8 }}>{i18n.t('common.code')}</span>
                        <Button onClick={handlers.current?.onClick} shape="circle" className="rde-action-btn">
                            <Icon name="edit" />
                        </Button>
                    </Fragment>
                }
                colon={false}
                initialValue={chartOption}
            >
                <pre style={{ wordBreak: 'break-all', lineHeight: '1.2em' }}>{chartOption}</pre>
            </Form.Item>
            <Modal onCancel={handlers.current?.onCancel} onOk={handlers.current?.onOk} open={visible} style={{ minWidth: 800 }}>
                <Form.Item
                    label={
                        <span>Code (value, styles, animations, userProperty)</span>
                    }
                    colon={false}
                >
                    <ReactAce
                        ref={jsRef}
                        mode="javascript"
                        theme="github"
                        width="100%"
                        height="600px"
                        defaultValue={chartOption}
                        value={tempChartOption}
                        editorProps={{
                            $blockScrolling: true,
                        }}
                        onChange={setTempChartOption}
                    />
                </Form.Item>
            </Modal>
        </Fragment>
    )
};

export { ChartModal };

export default ChartModal;