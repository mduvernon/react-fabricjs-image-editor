// Ant Design
import {
    Slider,
    Form,
    Row,
    Col,
    Tag,
} from 'antd';
// i18next
import i18n from 'i18next';

const ImageFilterProperty = {
    render(canvasRef, form, data) {

        const { filters } = data;

        return (
            <Row>
                <Row>
                    <Col md={24} lg={6}>
                        <Form.Item label={i18n.t('imagemap.filter.grayscale')}
                            name={['filters', 'grayscale']}
                            valuePropName="checked"
                            initialValue={!!filters[0]}
                        >
                            <Tag.CheckableTag
                                className="rde-action-tag"
                                checked={!!filters[0]}
                            >
                                {'G'}
                            </Tag.CheckableTag>
                        </Form.Item>
                    </Col>
                    <Col md={24} lg={6}>
                        <Form.Item label={i18n.t('imagemap.filter.invert')}
                            name={['filters', 'invert']}
                            valuePropName="checked"
                            initialValue={!!filters[1]}
                        >
                            <Tag.CheckableTag
                                className="rde-action-tag"
                                checked={!!filters[1]}
                            >
                                {'I'}
                            </Tag.CheckableTag>
                        </Form.Item>
                    </Col>
                    <Col md={24} lg={6}>
                        <Form.Item label={i18n.t('imagemap.filter.sepia')}
                            name={['filters', 'sepia']}
                            valuePropName="checked"
                            initialValue={!!filters[3]}
                        >
                            <Tag.CheckableTag
                                className="rde-action-tag"
                                checked={!!filters[3]}
                            >
                                {'S'}
                            </Tag.CheckableTag>
                        </Form.Item>
                    </Col>
                    <Col md={24} lg={6}>
                        <Form.Item label={i18n.t('imagemap.filter.brownie')}
                            name={['filters', 'brownie']}
                            valuePropName="checked"
                            initialValue={!!filters[4]}
                        >
                            <Tag.CheckableTag
                                className="rde-action-tag"
                                checked={!!filters[4]}
                            >
                                {'B'}
                            </Tag.CheckableTag>
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col md={24} lg={6}>
                        <Form.Item label={i18n.t('imagemap.filter.vintage')}
                            name={['filters', 'vintage']}
                            valuePropName="checked"
                            initialValue={!!filters[9]}
                        >
                            <Tag.CheckableTag
                                className="rde-action-tag"
                                checked={!!filters[9]}
                            >
                                {'V'}
                            </Tag.CheckableTag>
                        </Form.Item>
                    </Col>
                    <Col md={24} lg={6}>
                        <Form.Item label={i18n.t('imagemap.filter.blackwhite')}
                            name={['filters', 'blackwhite']}
                            valuePropName="checked"
                            initialValue={!!filters[19]}
                        >
                            <Tag.CheckableTag
                                className="rde-action-tag"
                                checked={!!filters[19]}
                            >
                                {'B'}
                            </Tag.CheckableTag>
                        </Form.Item>
                    </Col>
                    <Col md={24} lg={6}>
                        <Form.Item label={i18n.t('imagemap.filter.technicolor')}
                            name={['filters', 'technicolor']}
                            valuePropName="checked"
                            initialValue={!!filters[14]}
                        >
                            <Tag.CheckableTag
                                className="rde-action-tag"
                                checked={!!filters[14]}
                            >
                                {'T'}
                            </Tag.CheckableTag>
                        </Form.Item>
                    </Col>
                    <Col md={24} lg={6}>
                        <Form.Item label={i18n.t('imagemap.filter.polaroid')}
                            name={['filters', 'polaroid']}
                            valuePropName="checked"
                            initialValue={!!filters[15]}
                        >
                            <Tag.CheckableTag
                                className="rde-action-tag"
                                checked={!!filters[15]}
                            >
                                {'P'}
                            </Tag.CheckableTag>
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col md={24} lg={6}>
                        <Form.Item label={i18n.t('imagemap.filter.sharpen')}
                            name={['filters', 'sharpen']}
                            valuePropName="checked"
                            initialValue={!!filters[12]}
                        >
                            <Tag.CheckableTag
                                className="rde-action-tag"
                                checked={!!filters[12]}
                            >
                                {'S'}
                            </Tag.CheckableTag>
                        </Form.Item>
                    </Col>
                    <Col md={24} lg={6}>
                        <Form.Item label={i18n.t('imagemap.filter.emboss')}
                            name={['filters', 'emboss']}
                            valuePropName="checked"
                            initialValue={!!filters[13]}
                        >
                            <Tag.CheckableTag
                                className="rde-action-tag"
                                checked={!!filters[13]}
                            >
                                {'E'}
                            </Tag.CheckableTag>
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col md={24} lg={6}>
                        <Form.Item label={i18n.t('imagemap.filter.gamma')}
                            name={['filters', 'gamma']}
                            valuePropName="checked"
                            initialValue={!!filters[17]}
                        >
                            <Tag.CheckableTag
                                className="rde-action-tag"
                                checked={!!filters[17]}
                            >
                                {'G'}
                            </Tag.CheckableTag>
                        </Form.Item>
                    </Col>
                    <Col md={24} lg={6}>
                        <Form.Item label={i18n.t('color.red')}
                            name={['filters', 'gamma', 'r']}
                            initialValue={filters[17] ? filters[17].gamma[0] : 1}
                        >
                            <Slider disabled={!filters[17]} step={0.01} min={0.01} max={2.2} />
                        </Form.Item>
                    </Col>
                    <Col md={24} lg={6}>
                        <Form.Item label={i18n.t('color.green')}
                            name={['filters', 'gamma', 'g']}
                            initialValue={filters[17] ? filters[17].gamma[1] : 1}
                        >
                            <Slider disabled={!filters[17]} step={0.01} min={0.01} max={2.2} />
                        </Form.Item>
                    </Col>
                    <Col md={24} lg={6}>
                        <Form.Item label={i18n.t('color.blue')}
                            name={['filters', 'gamma', 'b']}
                            initialValue={filters[17] ? filters[17].gamma[2] : 1}
                        >
                            <Slider disabled={!filters[17]} step={0.01} min={0.01} max={2.2} />
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col md={24} lg={6}>
                        <Form.Item label={i18n.t('imagemap.filter.brightness')}
                            name={['filters', 'brightness', 'enabled']}
                            valuePropName="checked"
                            initialValue={!!filters[5]}
                        >
                            <Tag.CheckableTag
                                className="rde-action-tag"
                                checked={!!filters[5]}
                            >
                                {'B'}
                            </Tag.CheckableTag>
                        </Form.Item>
                    </Col>
                    <Col md={24} lg={18}>
                        <Form.Item label={i18n.t('imagemap.filter.brightness')}
                            name={['filters', 'brightness', 'brightness']}
                            initialValue={filters[5] ? filters[5].brightness : 0.1}
                        >
                            <Slider disabled={!filters[5]} step={0.01} min={-1} max={1} />
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col md={24} lg={6}>
                        <Form.Item label={i18n.t('imagemap.filter.contrast')}
                            name={['filters', 'contrast', 'enabled']}
                            valuePropName="checked"
                            initialValue={!!filters[6]}
                        >
                            <Tag.CheckableTag
                                className="rde-action-tag"
                                checked={!!filters[6]}
                            >
                                {'C'}
                            </Tag.CheckableTag>
                        </Form.Item>
                    </Col>
                    <Col md={24} lg={18}>
                        <Form.Item label={i18n.t('imagemap.filter.contrast')}
                            name={['filters', 'contrast', 'contrast']}
                            initialValue={filters[6] ? filters[6].contrast : 0}
                        >
                            <Slider disabled={!filters[6]} step={0.01} min={-1} max={1} />
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col md={24} lg={6}>
                        <Form.Item label={i18n.t('imagemap.filter.saturation')}
                            name={['filters', 'saturation', 'enabled']}
                            valuePropName="checked"
                            initialValue={!!filters[7]}
                        >
                            <Tag.CheckableTag
                                className="rde-action-tag"
                                checked={!!filters[7]}
                            >
                                {'S'}
                            </Tag.CheckableTag>
                        </Form.Item>
                    </Col>
                    <Col md={24} lg={18}>
                        <Form.Item label={i18n.t('imagemap.filter.saturation')}
                            name={['filters', 'saturation', 'saturation']}
                            initialValue={filters[7] ? filters[7].saturation : 0}
                        >
                            <Slider disabled={!filters[7]} step={0.01} min={-1} max={1} />
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col md={24} lg={6}>
                        <Form.Item label={i18n.t('imagemap.filter.hue')}
                            name={['filters', 'hue', 'enabled']}
                            valuePropName="checked"
                            initialValue={!!filters[21]}
                        >
                            <Tag.CheckableTag
                                className="rde-action-tag"
                                checked={!!filters[21]}
                            >
                                {'H'}
                            </Tag.CheckableTag>
                        </Form.Item>
                    </Col>
                    <Col md={24} lg={18}>
                        <Form.Item label={i18n.t('imagemap.filter.hue')}
                            name={['filters', 'hue', 'rotation']}
                            initialValue={filters[21] ? filters[21].rotation : 0}
                        >
                            <Slider disabled={!filters[21]} step={0.002} min={-2} max={2} />
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col md={24} lg={6}>
                        <Form.Item label={i18n.t('imagemap.filter.noise')}
                            name={['filters', 'noise', 'enabled']}
                            valuePropName="checked"
                            initialValue={!!filters[8]}
                        >
                            <Tag.CheckableTag
                                className="rde-action-tag"
                                checked={!!filters[8]}
                            >
                                {'N'}
                            </Tag.CheckableTag>
                        </Form.Item>
                    </Col>
                    <Col md={24} lg={18}>
                        <Form.Item label={i18n.t('imagemap.filter.noise')}
                            name={['filters', 'noise', 'noise']}
                            initialValue={filters[8] ? filters[8].noise : 100}
                        >
                            <Slider disabled={!filters[8]} step={1} min={0} max={1000} />
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col md={24} lg={6}>
                        <Form.Item label={i18n.t('imagemap.filter.pixelate')}
                            name={['filters', 'pixelate', 'enabled']}
                            valuePropName="checked"
                            initialValue={!!filters[10]}
                        >
                            <Tag.CheckableTag
                                className="rde-action-tag"
                                checked={!!filters[10]}
                            >
                                {'P'}
                            </Tag.CheckableTag>
                        </Form.Item>
                    </Col>
                    <Col md={24} lg={18}>
                        <Form.Item label={i18n.t('imagemap.filter.pixelate')}
                            name={['filters', 'pixelate', 'blocksize']}
                            initialValue={filters[10] ? filters[10].blocksize : 4}
                        >
                            <Slider disabled={!filters[10]} step={1} min={2} max={20} />
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col md={24} lg={6}>
                        <Form.Item label={i18n.t('imagemap.filter.blur')}
                            name={['filters', 'blur', 'enabled']}
                            valuePropName="checked"
                            initialValue={!!filters[11]}
                        >
                            <Tag.CheckableTag
                                className="rde-action-tag"
                                checked={!!filters[11]}
                            >
                                {'B'}
                            </Tag.CheckableTag>
                        </Form.Item>
                    </Col>
                    <Col md={24} lg={18}>
                        <Form.Item label={i18n.t('imagemap.filter.blur')}
                            name={['filters', 'blur', 'value']}
                            initialValue={filters[11] ? filters[11].value : 0.1}
                        >
                            <Slider disabled={!filters[11]} step={0.01} min={0} max={1} />
                        </Form.Item>
                    </Col>
                </Row>
            </Row>
        );
    },
};

export { ImageFilterProperty };

export default ImageFilterProperty;
