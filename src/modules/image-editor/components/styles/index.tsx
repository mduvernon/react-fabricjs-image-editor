// React
import { FC, useMemo, useRef, useState } from "react";
// Ant Design
import {
    Button,
    Form
} from 'antd';
// i18next
import i18n from 'i18next';
// Common Components
import {
    Flex,
    Icon
} from 'common/components';
// Components
import { StyleModal } from "./modal";
import { StyleList } from "./list";

type OwnProps = {
    styles: any[];
    onChangeStyles: (styles: any[]) => void;
};

const Styles: FC<OwnProps> = ({
    styles,
    onChangeStyles,
}) => {

    const [visible, setVisible] = useState(false);
    const [validateTitle, setValidateTitle] = useState({
        validateStatus: '',
        help: '',
    });
    const [current, setCurrent] = useState('add');
    const [index, setIndex] = useState(-1);
    const [style, setStyle] = useState<any>({});

    const modalRef = useRef(null);

    const handlers = useMemo(() => ({
        onOk: () => {
            if (validateTitle.validateStatus === 'error') {
                return;
            }

            if (!style.title) {

                setValidateTitle(handlers?.onValid());

                return;
            }

            if (current === 'add') {
                if (Object.keys(style).length === 1) {
                    modalRef.current?.validateFields((err, values) => {
                        Object.assign(style, values);
                    });
                }

                styles.push(style);
            } else {
                styles.splice(index, 1, style);
            }

            setVisible(false);
            setStyle({});

            if (typeof onChangeStyles === 'function') {
                onChangeStyles(styles);
            }
        },

        onCancel: () => {

            setVisible(false);
            setStyle({});
            setValidateTitle({
                validateStatus: '',
                help: '',
            });

        },

        onAdd: () => {
            setVisible(true);
            setStyle({});
            setValidateTitle({
                validateStatus: '',
                help: '',
            });
            setCurrent('add');

        },

        onEdit: (style, index) => {
            setVisible(true);
            setStyle(style);
            setValidateTitle({
                validateStatus: '',
                help: '',
            });
            setCurrent('modify');
            setIndex(index);

        },

        onDelete: (index) => {
            styles.splice(index, 1);
            onChangeStyles(styles);
        },

        onClear: () => {
            onChangeStyles([]);
        },

        onChange: (props, changedValues, allValues) => {
            const field = Object.keys(changedValues)[0];
            const isTitle = field === 'title';

            if (isTitle) {
                setValidateTitle(handlers?.onValid(changedValues[field]));
            }

            setStyle({
                title: style.title,
                ...allValues,
            });
        },

        onValid: (value?: any) => {
            if (!value || !value.length) {
                return {
                    validateStatus: 'error',
                    help: i18n.t('validation.enter-property', { arg: i18n.t('common.title') }),
                };
            }

            const exist = styles.some(
                (style) => style.title === value
            );

            if (!exist) {
                return {
                    validateStatus: 'success',
                    help: '',
                };
            }

            return {
                validateStatus: 'error',
                help: i18n.t('validation.already-property', { arg: i18n.t('common.title') }),
            };
        },
    }), [
        styles,
        style,
        validateTitle,
    ]);

    return (
        <Form>
            <Flex flexDirection="column">
                <Flex justifyContent="flex-end" style={{ padding: 8 }}>
                    <Button className="rde-action-btn" shape="circle" onClick={handlers?.onAdd}>
                        <Icon name="plus" />
                    </Button>
                    <Button className="rde-action-btn" shape="circle" onClick={handlers?.onClear}>
                        <Icon name="times" />
                    </Button>
                    <StyleModal
                        ref={modalRef}
                        validateTitle={validateTitle}
                        visible={visible}
                        onOk={handlers?.onOk}
                        style={style}
                        onCancel={handlers?.onCancel}
                        onChange={handlers?.onChange}
                        onValid={handlers?.onValid}
                    />
                </Flex>
                <StyleList
                    styles={styles}
                    onEdit={handlers?.onEdit}
                    onDelete={handlers?.onDelete}
                />
            </Flex>
        </Form>
    )
}

export { Styles };

export default Styles;