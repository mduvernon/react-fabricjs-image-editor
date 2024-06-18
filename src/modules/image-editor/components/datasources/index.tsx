// React
import { FC, useMemo, useRef, useState } from "react";
// Ant Designs
import {
    Button,
    Form
} from 'antd';
// Common Components
import {
    Icon,
    Flex
} from "common/components";
// Components
import { DataSourceModal } from "./modal";
import { DataSourceList } from "./list";

type OwnProps = {
    dataSources: any[];
    onChangeDataSources: (dataSources: any[]) => void;
};

const Datasources: FC<OwnProps> = ({
    onChangeDataSources,
    dataSources = [],
}) => {

    const [visible, setVisible] = useState(false);
    const [dataSource, setDataSource] = useState<any>({});
    const [validateTitle, setValidateTitle] = useState({
        validateStatus: '',
        help: '',
    });
    const [current, setCurrent] = useState('add');
    const [index, setIndex] = useState(-1);

    const modalRef = useRef(null);

    const handlers = useMemo(() => ({
        onOk: () => {

            if (validateTitle.validateStatus === 'error') {
                return;
            }

            if (!dataSource.title) {

                setValidateTitle(handlers?.onValid());

                return;
            }

            if (current === 'add') {
                if (Object.keys(dataSource).length === 1) {
                    modalRef.current?.validateFields((err, values) => {
                        Object.assign(dataSource, values);
                    });
                }

                dataSources.push(dataSource);

            } else {
                dataSources.splice(index, 1, dataSource);

            }
            setVisible(false);
            setDataSource({});

            onChangeDataSources(dataSources);
        },

        onCancel: () => {
            setVisible(false);
            setDataSource({});
            setValidateTitle({
                validateStatus: '',
                help: '',
            });
        },

        onAdd: () => {
            setVisible(true);
            setDataSource({});
            setValidateTitle({
                validateStatus: '',
                help: '',
            });
            setCurrent('add');
        },

        onEdit: (dataSource, index) => {
            setVisible(true);
            setDataSource(dataSource);
            setValidateTitle({
                validateStatus: '',
                help: '',
            });
            setCurrent('modify');
            setIndex(index);
        },

        onDelete: index => {
            dataSources.splice(index, 1);
            onChangeDataSources(dataSources);
        },

        onClear: () => {
            onChangeDataSources([]);
        },

        onChange: (props, changedValues, allValues) => {
            const field = Object.keys(changedValues)[0];
            const isTitle = field === 'title';

            if (isTitle) {
                setValidateTitle(handlers?.onValid(changedValues[field]));
            }

            setDataSource({ title: dataSource.title, ...allValues });
        },

        onValid: (value?: any) => {
            if (!value || !value.length) {
                return {
                    validateStatus: 'error',
                    help: 'Please input title.',
                };
            }

            const exist = dataSources.some(
                (dataSource) => dataSource.title === value
            );

            if (!exist) {
                return {
                    validateStatus: 'success',
                    help: '',
                };
            }

            return {
                validateStatus: 'error',
                help: 'Already exist title.',
            };
        },
    }), [
        dataSources,
        dataSource,
        index,
        visible,
        validateTitle,
        current,
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
                    <DataSourceModal
                        ref={modalRef}
                        validateTitle={validateTitle}
                        visible={visible}
                        onOk={handlers?.onOk}
                        dataSource={dataSource}
                        onCancel={handlers?.onCancel}
                        onChange={handlers?.onChange}
                        onValid={handlers?.onValid}
                    />
                </Flex>
                <DataSourceList
                    dataSources={dataSources}
                    onEdit={handlers?.onEdit}
                    onDelete={handlers?.onDelete}
                />
            </Flex>
        </Form>
    )
};

export { Datasources };

export default Datasources;

