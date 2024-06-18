// React
import { FC, useMemo, useRef, useState } from "react";
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

    const handlers = useMemo(() => ({
        onOk: () => {
            if (validateTitle.validateStatus === 'error') {
                return;
            }

            if (!animation.title) {
                setValidateTitle(handlers?.onValid());
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
                setValidateTitle(handlers?.onValid(fields[field]));
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
    }), [
        animations,
        animation,
        index,
        current,
    ])

    return (
        <Scrollbar>
            <Form>
                <Flex flexDirection="column">
                    <Flex justifyContent="flex-end" style={{ padding: 8 }}>
                        <Button className="rde-action-btn" shape="circle" onClick={handlers?.onAdd}>
                            <Icon name="plus" />
                        </Button>
                        <Button className="rde-action-btn" shape="circle" onClick={handlers?.onClear}>
                            <Icon name="times" />
                        </Button>
                        <AnimationsModal
                            ref={modalRef}
                            validateTitle={validateTitle}
                            visible={visible}
                            onOk={handlers?.onOk}
                            animation={animation}
                            onCancel={handlers?.onCancel}
                            onChange={handlers?.onChange}
                            onValid={handlers?.onValid}
                        />
                    </Flex>
                    <AnimationsList
                        animations={animations}
                        onEdit={handlers?.onEdit}
                        onDelete={handlers?.onDelete}
                    />
                </Flex>
            </Form>
        </Scrollbar>
    )
}

export { Animations };

export default Animations;
