// React
import { Fragment } from 'react';
// Ant Design
import {
	InputNumber,
	Slider,
	Select,
	Form,
	Col,
	Row,
} from 'antd';
// i18next
import i18n from 'i18next';
// Common Components
import {
	ColorPicker
} from 'common/components';

const StyleProperty = {
	render(canvasRef, form, data) {

		return (
			<Fragment>
				<Form.Item label={i18n.t('imagemap.style.fill-color')} colon={false}
					name={'fill'}
					initialValue={data.fill || 'rgba(0, 0, 0, 1)'}
				>
					<ColorPicker valueType={'string'} />
				</Form.Item>
				<Form.Item label={i18n.t('common.opacity')} colon={false}
					name={'opacity'}
					initialValue={data.opacity || 1}
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
				<Form.Item label={i18n.t('imagemap.style.stroke-color')} colon={false}
					name={'stroke'}
					initialValue={data.stroke || 'rgba(255, 255, 255, 0)'}
				>
					<ColorPicker valueType={'string'} />
				</Form.Item>
				<Form.Item label={i18n.t('imagemap.style.stroke-width')} colon={false}
					name={'strokeWidth'}
					initialValue={data.strokeWidth || 1}
				>
					<Select showSearch style={{ width: '100%' }}>
						{Array.from({ length: 12 }, (v, k) => {
							const value = k + 1;
							return (
								<Select.Option key={value} value={value}>
									{value}
								</Select.Option>
							);
						})}
					</Select>
				</Form.Item>
				{data.type === 'rect' ? (
					<Row gutter={8}>
						<Col md={24} lg={12}>
							<Form.Item label={i18n.t('imagemap.style.rx')} colon={false}
								name={'rx'}
								initialValue={data.rx || 0}
							>
								<InputNumber min={0} />
							</Form.Item>
						</Col>
						<Col md={24} lg={12}>
							<Form.Item label={i18n.t('imagemap.style.ry')} colon={false}
								name={'ry'}
								initialValue={data.ry || 0}
							>
								<InputNumber min={0} />
							</Form.Item>
						</Col>
					</Row>
				) : null}
			</Fragment>
		);
	},
};

export { StyleProperty };

export default StyleProperty;
