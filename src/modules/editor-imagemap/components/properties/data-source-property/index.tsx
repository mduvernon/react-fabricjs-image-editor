// React
import { Fragment } from 'react';
// Ant Designs
import {
    InputNumber,
    Button,
    Select,
    Switch,
    Slider,
    Form,
    Row,
    Col,
} from 'antd';
// Common Components
import { ColorPicker } from 'common/components';

const DataSourceProperty = {
    render(canvasRef, form, data) {

        if (!data) {
            return null;
        }

        const type = data.animation?.type || 'none';
        return (
            <Fragment>
                <Form.Item label="Animation Type" colon={false}
                    name={['animation', 'type']}
                    initialValue={type}
                >
                    <Select>
                        <Select.Option value="none">None</Select.Option>
                        <Select.Option value="fade">Fade</Select.Option>
                        <Select.Option value="bounce">Bounce</Select.Option>
                        <Select.Option value="shake">Shake</Select.Option>
                        <Select.Option value="scaling">Scaling</Select.Option>
                        <Select.Option value="rotation">Rotation</Select.Option>
                        <Select.Option value="flash">Flash</Select.Option>
                    </Select>
                </Form.Item>
                {type === 'none' ? null : (
                    <Fragment>
                        <Row>
                            <Col span={12}>
                                <Form.Item label="Auto Play" colon={false}
                                    name={['animation', 'autoplay']}
                                    initialValue={data.animation.autoplay}
                                    rules={[
                                        {
                                            type: 'boolean',
                                        },
                                    ]}
                                    valuePropName="checked"
                                >
                                    <Switch size="small" />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item label="Loop" colon={false}
                                    name={['animation', 'loop']}
                                    initialValue={data.animation.loop}
                                    rules={[
                                        {
                                            type: 'boolean',
                                        },
                                    ]}
                                    valuePropName="checked"
                                >
                                    <Switch size="small" />
                                </Form.Item>
                            </Col>
                        </Row>
                        {type !== 'shake' ? (
                            <Row>
                                <Col span={12}>
                                    <Form.Item label="Delay" colon={false}
                                        name={['animation', 'delay']}
                                        initialValue={data.animation.delay || 100}
                                        rules={[
                                            {
                                                type: 'number',
                                                min: 100,
                                                max: 5000,
                                            },
                                        ]}
                                    >
                                        <Slider min={100} max={5000} step={100} />
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item label="Duration" colon={false}
                                        name={['animation', 'duration']}
                                        initialValue={data.animation.duration || 1000}
                                        rules={[
                                            {
                                                type: 'number',
                                                min: 100,
                                                max: 5000,
                                            },
                                        ]}
                                    >
                                        <Slider min={100} max={5000} step={100} />
                                    </Form.Item>
                                </Col>
                            </Row>
                        ) : null}
                        {this.getComponentType(type, data)}
                        <Form.Item label="Playback" colon={false}>
                            <Row>
                                <Col span={8}>
                                    <Button
                                        onClick={() => {
                                            canvasRef.current?.handler.animationHandler.play(data.id);
                                        }}
                                    >
                                        Start
                                    </Button>
                                </Col>
                                <Col span={8}>
                                    <Button
                                        onClick={() => {
                                            canvasRef.current?.handler.animationHandler.pause(data.id);
                                        }}
                                    >
                                        Pause
                                    </Button>
                                </Col>
                                <Col span={8}>
                                    <Button
                                        onClick={() => {
                                            canvasRef.current?.handler.animationHandler.stop(data.id);
                                        }}
                                    >
                                        Stop
                                    </Button>
                                </Col>
                            </Row>
                        </Form.Item>
                    </Fragment>
                )}
            </Fragment>
        );
    },
    getComponentType(type, data) {
        let component;

        if (type === 'fade') {
            component = (
                <Form.Item label="Opacity" colon={false}
                    name={['animation', 'opacity']}
                    initialValue={data.animation.opacity || 0}
                    rules={[
                        {
                            type: 'number',
                            min: 0,
                            max: 1,
                        },
                    ]}
                >
                    <Slider min={0} max={1} step={0.1} />
                </Form.Item>
            );
        } else if (type === 'bounce') {
            component = (
                <Fragment>
                    <Form.Item label="Bounce Type" colon={false}
                        name={['animation', 'bounce']}
                        initialValue={data.animation.bounce || 'hotizontal'}
                    >
                        <Select>
                            <Select.Option value="hotizontal">Horizontal</Select.Option>
                            <Select.Option value="vertical">Vertical</Select.Option>
                        </Select>
                    </Form.Item>
                    <Form.Item label="Offset" colon={false}
                        name={['animation', 'offset']}
                        initialValue={data.animation.offset || 1}
                        rules={[
                            {
                                type: 'number',
                                min: 1,
                                max: 10,
                            },
                        ]}
                    >
                        <Slider min={1} max={10} step={1} />
                    </Form.Item>
                </Fragment>
            );
        } else if (type === 'shake') {
            component = (
                <Fragment>
                    <Form.Item label="Shake Type" colon={false}
                        name={['animation', 'shake']}
                        initialValue={data.animation.shake || 'hotizontal'}
                    >
                        <Select>
                            <Select.Option value="hotizontal">Horizontal</Select.Option>
                            <Select.Option value="vertical">Vertical</Select.Option>
                        </Select>
                    </Form.Item>
                    <Form.Item label="Offset" colon={false}
                        name={['animation', 'offset']}
                        initialValue={data.animation.offset || 1}
                        rules={[
                            {
                                type: 'number',
                                min: 1,
                                max: 10,
                            },
                        ]}
                    >
                        <Slider min={1} max={10} step={1} />
                    </Form.Item>
                </Fragment>
            );
        } else if (type === 'scaling') {
            component = (
                <Form.Item label="Scaling" colon={false}
                    name={['animation', 'scale']}
                    initialValue={data.animation.scale || 1}
                    rules={[
                        {
                            type: 'number',
                            min: 1,
                            max: 5,
                        },
                    ]}
                >
                    <Slider min={1} max={5} step={0.1} />
                </Form.Item>
            );
        } else if (type === 'rotation') {
            component = (
                <Form.Item label="Angle" colon={false}
                    name={['animation', 'angle']}
                    initialValue={data.animation.angle || data.angle}
                    rules={[
                        {
                            type: 'number',
                            min: 0,
                            max: 360,
                        },
                    ]}
                >
                    <Slider min={0} max={360} />
                </Form.Item>
            );
        } else if (type === 'flash') {
            component = (
                <Row>
                    <Col span={12}>
                        <Form.Item label="Fill Color" colon={false}
                            name={['animation', 'fill']}
                            initialValue={data.animation.fill || data.fill}
                        >
                            <ColorPicker valueType={'string'} />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label="Stroke Color" colon={false}
                            initialValue={data.animation.stroke || data.stroke}
                        >
                            <ColorPicker valueType={'string'} />
                        </Form.Item>
                    </Col>
                </Row>
            );
        } else {
            component = (
                <Row>
                    <Col span={12}>
                        <Form.Item label="Value" colon={false}
                            name={['animation', 'value']}
                            initialValue={data.animation.value || 1}
                            rules={[
                                {
                                    type: 'number',
                                    min: 1,
                                    max: 10,
                                },
                            ]}
                        >
                            <InputNumber min={1} max={10} />
                        </Form.Item>
                    </Col>
                </Row>
            );
        }

        return component;
    },
};

export { DataSourceProperty };

export default DataSourceProperty;
