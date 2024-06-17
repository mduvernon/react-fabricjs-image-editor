// React
import { FC, useEffect, useRef, useState } from "react";
// Ant Design
import { Button, Menu, Modal, Tooltip } from 'antd';
// il8next
import i18next from 'i18next';
// Components
import { ShortcutHelp } from '../../shortcut-help';
import { Flex } from '../../flex';
import { Icon } from '../../icon';

type OwnProps = {
    onChangeEditor: (param: any) => void;
    currentEditor: string;
}

const Title: FC<OwnProps> = ({
    onChangeEditor,
    currentEditor
}) => {

    const [visible, setVisible] = useState(false);

    const handlers = useRef({
        goGithub: () => {
            window.open('https://github.com/salgum1114/react-design-editor');
        },
        goDocs: () => {
            window.open('https://salgum1114.github.io/react-design-editor/docs');
        },
        showHelp: () => {
            setVisible(true);
        },
    });

    useEffect(() => {
        if (globalThis) {
            (globalThis.adsbygoogle = globalThis.adsbygoogle || []).push({});
        }
    }, []);

    return (
        <Flex
            style={{ background: 'linear-gradient(141deg,#23303e,#404040 51%,#23303e 75%)' }}
            flexWrap="wrap"
            flex="1"
            alignItems="center"
        >
            <Flex style={{ marginLeft: 8 }} flex="0 1 auto">
                <span style={{ color: '#fff', fontSize: 24, fontWeight: 500 }}>React Design Editor</span>
                <Tooltip title={i18next.t('action.go-github')} overlayStyle={{ fontSize: 16 }}>
                    <Button
                        className="rde-action-btn"
                        style={{
                            color: 'white',
                        }}
                        shape="circle"
                        size="large"
                        onClick={handlers.current?.goGithub}
                    >
                        <Icon name="github" prefix="fab" size={1.5} />
                    </Button>
                </Tooltip>
                <Tooltip title={i18next.t('action.go-docs')} overlayStyle={{ fontSize: 16 }}>
                    <Button
                        className="rde-action-btn"
                        style={{
                            color: 'white',
                        }}
                        shape="circle"
                        size="large"
                        onClick={handlers.current?.goDocs}
                    >
                        <Icon name="book" prefix="fas" size={1.5} />
                    </Button>
                </Tooltip>
                <Tooltip title={i18next.t('action.shortcut-help')} overlayStyle={{ fontSize: 16 }}>
                    <Button
                        className="rde-action-btn"
                        style={{
                            color: 'white',
                        }}
                        shape="circle"
                        size="large"
                        onClick={handlers.current?.showHelp}
                    >
                        <Icon name="question" prefix="fas" size={1.5} />
                    </Button>
                </Tooltip>
            </Flex>
            <Flex style={{ marginLeft: 88 }}>
                <Menu
                    mode="horizontal"
                    theme="dark"
                    style={{ background: 'transparent', fontSize: '16px' }}
                    onClick={onChangeEditor}
                    selectedKeys={[currentEditor]}
                    items={[
                        {
                            key: 'imagemap',
                            label: i18next.t('imagemap.imagemap'),
                        },
                        {
                            key: 'workflow',
                            label: i18next.t('workflow.workflow'),
                        },
                    ]}
                />
            </Flex>
            <Flex flex="1" justifyContent="flex-end">
                <ins
                    className="adsbygoogle"
                    style={{ display: 'inline-block', width: 600, height: 60 }}
                    data-ad-client="ca-pub-8569372752842198"
                    data-ad-slot="5790685139"
                />
            </Flex>
            <Modal
                open={visible}
                onCancel={() => setVisible(false)}
                closable={true}
                footer={null}
                width="50%"
            >
                <ShortcutHelp />
            </Modal>
        </Flex>
    )
}

export { Title };

export default Title;