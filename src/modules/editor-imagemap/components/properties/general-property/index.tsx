// React
import { Fragment } from 'react';
// Ant Design
import {
	InputNumber,
	Slider,
	Switch,
	Input,
	Form,
	Col,
	Row
} from 'antd';
// i18next
import i18n from 'i18next';

const GeneralProperty = {
	render(canvasRef, form, data) {

		return (
			<Fragment>
				<Row>
					<Col span={12}>
						<Form.Item label={i18n.t('common.locked')} colon={false}
							name={'locked'}
							rules={[
								{
									type: 'boolean',
								},
							]}
							valuePropName="checked"
							initialValue={data.locked}
						>
							<Switch size="small" />
						</Form.Item>
					</Col>
					<Col span={12}>
						<Form.Item label={i18n.t('common.visible')} colon={false}
							name={'visible'}
							rules={[
								{
									type: 'boolean',
								},
							]}
							valuePropName="checked"
							initialValue={data.visible}
						>
							<Switch size="small" />
						</Form.Item>
					</Col>
				</Row>
				<Form.Item label={i18n.t('common.name')} colon={false}
					name={'name'}
					initialValue={data.name}
				>
					<Input />
				</Form.Item>
				<Row>
					<Col span={12}>
						<Form.Item label={i18n.t('common.width')} colon={false}
							name={'width'}
							rules={[
								{
									type: 'number',
									required: true,
									message: 'Please input width',
									min: 1,
								},
							]}
							initialValue={parseInt(String(data.width * data.scaleX), 10)}
						>
							<InputNumber min={1} />
						</Form.Item>
					</Col>
					<Col span={12}>
						<Form.Item label={i18n.t('common.height')} colon={false}
							name={'height'}
							rules={[
								{
									type: 'number',
									required: true,
									message: 'Please input height',
									min: 1,
								},
							]}
							initialValue={parseInt(String(data.height * data.scaleY), 10)}
						>
							<InputNumber min={1} />
						</Form.Item>
					</Col>
				</Row>
				<Row>
					<Col span={12}>
						<Form.Item label={i18n.t('common.left')} colon={false}
							name={'left'}
							rules={[
								{
									type: 'number',
									required: true,
									message: 'Please input x position',
								},
							]}
							initialValue={data.left}
						>
							<InputNumber />
						</Form.Item>
					</Col>
					<Col span={12}>
						<Form.Item label={i18n.t('common.top')} colon={false}
							name={'top'}
							rules={[
								{
									type: 'number',
									required: true,
									message: 'Please input y position',
								},
							]}
							initialValue={data.top}
						>
							<InputNumber />
						</Form.Item>
					</Col>
				</Row>
				{data.superType === 'element' ? null : (
					<Form.Item label={i18n.t('common.angle')} colon={false}
						name={'angle'}
						rules={[
							{
								type: 'number',
								required: true,
								message: 'Please input rotation',
							},
						]}
						initialValue={data.angle}
					>
						<Slider min={0} max={360} />
					</Form.Item>
				)}
			</Fragment>
		);
	},
};

export { GeneralProperty };

export default GeneralProperty;
