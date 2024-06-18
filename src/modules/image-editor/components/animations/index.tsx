// React
import { FC, useRef, useState } from "react";
// Ant Design
import { Form, Button } from 'antd';
// i18next
import i18n from 'i18next';
// Common Components
import {
    Scrollbar,
    Flex,
    Icon
} from 'common/components';
// Components
import { AnimationsModal } from "./modal";
import { AnimationsList } from "./list";

const initialAnimation = {
    type: 'none',
    loop: true,
    autoplay: true,
    delay: 100,
    duration: 1000,
};

type OwnProps = {
    animations: any[];
    onChangeAnimations: (animations: any[]) => void;
}

const Animations: FC<OwnProps> = ({
    animations,
    onChangeAnimations
}) => {

    const [animation, setAnimation] = useState<any>(initialAnimation);
    const [visible, setVisible] = useState(false);
    const [validateTitle, setValidateTitle] = useState({
        validateStatus: '',
        help: '',
    });
    const [current, setCurrent] = useState('add');
    const [index, setIndex] = useState(-1);

    const modalRef = useRef(null);
    const handlers = useRef({
        onOk: () => {
            if (validateTitle.validateStatus === 'error') {
                return;
            }

            if (!animation.title) {
                setValidateTitle(handlers.current?.onValid());
                return;
            }

            if (!animation.type) {
                animation.type = 'none';
            }

            if (Object.keys(animation).length === 2) {
                modalRef.current?.validateFields((err, values) => {
                    Object.assign(animation, values.animation);
                });
            }

            if (current === 'add') {
                animations.push(animation);
            } else {
                animations.splice(index, 1, animation);
            }

            setVisible(false);
            setAnimation({});

            onChangeAnimations(animations);
        },
        onCancel: () => {
            setVisible(false);
            setAnimation(initialAnimation);
            setValidateTitle({
                validateStatus: '',
                help: '',
            });
        },
        onAdd: () => {
            setVisible(true);
            setAnimation(initialAnimation);
            setValidateTitle({
                validateStatus: '',
                help: '',
            });
            setCurrent('add');
        },
        onEdit: (animation, index) => {
            setVisible(true);
            setAnimation(animation);
            setValidateTitle({
                validateStatus: '',
                help: '',
            });
            setCurrent('modify');
            setIndex(index);
        },
        onDelete: (index) => {
            animations.splice(index, 1);
            onChangeAnimations(animations);
        },
        onClear: () => {
            onChangeAnimations([]);
        },
        onChange: (props, changedValues, allValues) => {
            const fields = changedValues[Object.keys(changedValues)[0]];
            const field = Object.keys(fields)[0];
            const isTitle = field === 'title';

            if (isTitle) {
                setValidateTitle(handlers.current?.onValid(fields[field]));
            }

            setAnimation({
                title: animation.title,
                ...initialAnimation,
                ...allValues[Object.keys(allValues)[0]],
            });
        },
        onValid: (value?: any) => {

            if (!value || !value.length) {
                return {
                    validateStatus: 'error',
                    help: i18n.t('validation.enter-property', { arg: i18n.t('common.title') }),
                };
            }

            const exist = animations.some((animation) => animation.title === value);

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
    });

    return (
        <Scrollbar>
            <Form>
                <Flex flexDirection="column">
                    <Flex justifyContent="flex-end" style={{ padding: 8 }}>
                        <Button className="rde-action-btn" shape="circle" onClick={handlers.current?.onAdd}>
                            <Icon name="plus" />
                        </Button>
                        <Button className="rde-action-btn" shape="circle" onClick={handlers.current?.onClear}>
                            <Icon name="times" />
                        </Button>
                        <AnimationsModal
                            ref={modalRef}
                            validateTitle={validateTitle}
                            visible={visible}
                            onOk={handlers.current?.onOk}
                            animation={animation}
                            onCancel={handlers.current?.onCancel}
                            onChange={handlers.current?.onChange}
                            onValid={handlers.current?.onValid}
                        />
                    </Flex>
                    <AnimationsList
                        animations={animations}
                        onEdit={handlers.current?.onEdit}
                        onDelete={handlers.current?.onDelete}
                    />
                </Flex>
            </Form>
        </Scrollbar>
    )
}

export { Animations };

export default Animations;
