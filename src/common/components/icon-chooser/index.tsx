// React
import { FC, Fragment, useEffect, useRef, useState } from "react";
// Ant Design
import {
    Button,
    Modal,
    Input,
    Form,
    Col,
    Row,
} from 'antd';
// Lodash
import debounce from 'lodash/debounce';
// i18next
import i18n from 'i18next';
// Components
import { Icon } from '..';

import icons from 'assets/fontawesome/metadata/icons.json';

type OwnProps = {
    icon?: any;
    value?: any;
    onChange?: (value: any) => void;
}

const IconChooser: FC<OwnProps> = ({
    value = null,
    onChange,
    ...props
}) => {

    const [visible, setVisible] = useState<boolean>(false);
    const [textSearch, setTextSearch] = useState<string>('');
    const [icon, setIcon] = useState<any>(value);

    const handler = useRef({
        onOk: () => {
            if (typeof onChange === 'function') {
                onChange(icon);
            }

            setVisible(false);
        },
        onCancel: () => {
            modalHandlers.current?.onHide();
        },
        onClick: () => {
            modalHandlers.current?.onShow();
        },
        onClickIcon: icon => {
            setIcon(icon);

            if (typeof onChange === 'function') {
                onChange(icon);
            }

            modalHandlers.current?.onHide();
        },
        onSearch: debounce(value => {
            setTextSearch(value);
        }, 500),
    });

    const modalHandlers = useRef({
        onShow: () => {
            setVisible(true);
        },
        onHide: () => {
            setVisible(false);
        },
    });

    useEffect(() => {
        setIcon(props.icon ?? { 'map-marker-alt': icons['map-marker-alt'] });
    }, [props.icon]);

    const getPrefix = (style: string) => {
        let prefix = 'fas';

        if (style === 'brands') {
            prefix = 'fab';

        } else if (style === 'regular') {
            prefix = 'far';
        }

        return prefix;
    };

    const getIcons = (textSearch: string) => {
        const lowerCase = textSearch.toLowerCase();

        return Object.keys(icons)
            .filter(icon => icon.includes(lowerCase) || icons[icon].search.terms.some((term) => term.includes(lowerCase)))
            .map(icon => ({ [icon]: icons[icon] }));
    };

    const filteredIcons = getIcons(textSearch);
    const filteredIconsLength = filteredIcons.length;

    return (
        <Fragment>
            <Form.Item
                colon={false}
                label={
                    <Fragment>
                        <span style={{ marginRight: 8 }}>{i18n.t('common.icon')}</span>
                        <Icon name={Object.keys(icon)[0]} prefix={getPrefix(icon[Object.keys(icon)[0]].styles[0])} />
                    </Fragment>
                }
            >
                <Button onClick={handler.current.onClick}>
                    {i18n.t('imagemap.marker.choose-icon')}
                </Button>
            </Form.Item>
            <Modal
                onOk={handler.current.onOk}
                onCancel={handler.current.onCancel}
                width="80%"
                open={visible}
                title={
                    <div style={{ padding: '0 24px' }}>
                        <Input
                            onChange={e => {
                                handler.current.onSearch(e.target.value);
                            }}
                            placeholder={i18n.t('imagemap.marker.search-icon', { length: filteredIconsLength })}
                        />
                    </div>
                }
                bodyStyle={{ margin: 16, overflowY: 'auto', height: '600px' }}
            >
                <Row>
                    {filteredIcons.map(ic => {
                        const name = Object.keys(ic)[0];
                        const metadata = ic[name];
                        const prefix = getPrefix(metadata.styles[0]);
                        return (
                            <Col
                                onClick={handler.current.onClickIcon.bind(this, ic)}
                                key={name}
                                span={4}
                                className="rde-icon-container"
                            >
                                <div className="rde-icon-top">
                                    <Icon name={name} size={3} prefix={prefix} />
                                </div>
                                <div className="rde-icon-bottom">{name}</div>
                            </Col>
                        );
                    })}
                </Row>
            </Modal>
        </Fragment>
    )
}

export { IconChooser }

export default IconChooser;