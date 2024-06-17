// React
import { FC, useRef, useState } from "react";
// Ant Design
import { ValidateStatus } from "antd/lib/form/FormItem";
import {
    Button,
    Table,
    Modal,
    Input,
    Form,
} from 'antd';
// i18next
import i18n from 'i18next';
// Common Hooks
import { useDeepCompareEffect } from "common/hooks";
// Components
import { Flex } from '../flex';
import { Icon } from '../icon';

type OwnProps = {
    userProperty?: any;
    onChange?: (value: any) => void;
    form?: any;
}

const EditTable: FC<OwnProps> = ({
    onChange,
    form,
    ...props
}) => {

    const [userProperty, setUserProperty] = useState({});
    const [tempKey, setTempKey] = useState('');
    const [originKey, setOriginKey] = useState('');
    const [tempValue, setTempValue] = useState('');
    const [visible, setVisible] = useState(false);
    const [current, setCurrent] = useState('add');
    const [validateStatus, setValidateStatus] = useState<ValidateStatus>('');
    const [help, setHelp] = useState('');

    const handlers = useRef({
        onOk: () => {
            if (validateStatus === 'error') {
                return;
            }

            if (current === 'modify') {
                delete userProperty[originKey];
            }

            const newUserProperty = Object.assign({}, userProperty, {
                [tempKey]: tempValue
            });

            if (typeof onChange === 'function') {
                onChange(userProperty);
            }

            setUserProperty(newUserProperty);
            setVisible(false);
        },
        onCancel: () => {
            modalHandlers.current?.onHide();
        },
        onChangeKey: (value: string) => {
            let validateStatus: ValidateStatus = 'success';
            let help = '';

            if (
                (current === 'add' && Object.keys(userProperty).some(p => p === value)) ||
                (current === 'modify' && originKey !== value && userProperty[value])
            ) {
                validateStatus = 'error';
                help = i18n.t('validation.already-property', { arg: i18n.t('common.key') });

            } else if (!value.length) {
                validateStatus = 'error';
                help = i18n.t('validation.enter-property', { arg: i18n.t('common.key') });

            } else {
                validateStatus = 'success';
                help = '';
            }

            setTempKey(value);
            setValidateStatus(validateStatus);
            setHelp(help);
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

    const getDataSource = userProperty => {
        return Object.keys(userProperty).map(key => {
            return {
                key,
                value: userProperty[key],
            };
        });
    };

    const handleAdd = () => {
        setVisible(true);
        setTempKey('');
        setTempValue('');
        setCurrent('add');
        setValidateStatus('');
        setHelp('');
    };

    const handleEdit = (key: string) => {
        setVisible(true);
        setTempKey(key);
        setOriginKey(key);
        setTempValue(userProperty[key]);
        setCurrent('modify');
        setValidateStatus('');
        setHelp('');
    };

    const handleDelete = (key: string) => {
        setUserProperty((userProperty) => {
            const newUserProperty = Object.assign({}, userProperty);
            delete newUserProperty[key];
            return newUserProperty;
        });
    };

    const handleClear = () => {
        setUserProperty({});
    };

    useDeepCompareEffect(() => {
        setUserProperty(props.userProperty);
    }, [props.userProperty]);

    const columns = [
        {
            title: i18n.t('common.key'),
            dataIndex: 'key',
        },
        {
            title: i18n.t('common.value'),
            dataIndex: 'value',
        },
        {
            title: '',
            dataIndex: 'action',
            render: (text, record) => {
                return (
                    <div>
                        <Button
                            className="rde-action-btn"
                            shape="circle"
                            onClick={() => {
                                handleEdit(record.key);
                            }}
                        >
                            <Icon name="edit" />
                        </Button>
                        <Button
                            className="rde-action-btn"
                            shape="circle"
                            onClick={() => {
                                handleDelete(record.key);
                            }}
                        >
                            <Icon name="times" />
                        </Button>
                    </div>
                );
            },
        },
    ];

    return (
        <Flex flexDirection="column">
            <Flex justifyContent="flex-end">
                <Button className="rde-action-btn" shape="circle" onClick={handleAdd}>
                    <Icon name="plus" />
                </Button>
                <Button className="rde-action-btn" shape="circle" onClick={handleClear}>
                    <Icon name="times" />
                </Button>
            </Flex>
            <Table
                size="small"
                pagination={{
                    pageSize: 5,
                }}
                columns={columns}
                dataSource={getDataSource(userProperty)}
            />
            <Modal onCancel={handlers.current?.onCancel} onOk={handlers.current?.onOk} open={visible}>
                <Form.Item
                    required
                    label={i18n.t('common.key')}
                    colon={false}
                    hasFeedback
                    validateStatus={validateStatus}
                    help={help}
                >
                    <Input
                        defaultValue={tempKey}
                        value={tempKey}
                        onChange={e => {
                            handlers.current?.onChangeKey(e.target.value);
                        }}
                    />
                </Form.Item>
                <Form.Item label={i18n.t('common.value')} colon={false}>
                    <Input
                        defaultValue={tempValue}
                        value={tempValue}
                        onChange={e => {
                            setTempValue(e.target.value);
                        }}
                    />
                </Form.Item>
            </Modal>
        </Flex>
    )
}

export { EditTable };

export default EditTable;