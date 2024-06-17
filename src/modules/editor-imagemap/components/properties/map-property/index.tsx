// React
import { Fragment } from 'react';
// Ant Design
import { Form, Input, Radio, Row, Col, InputNumber } from 'antd';
// i18next
import i18n from 'i18next';

const MapProperty = {
	render(canvasRef, form, data) {

		if (!data) {
			return null;
		}

		const layout = data.layout || 'fixed';

		return (
			<Fragment>
				<Form.Item label={i18n.t('common.name')} colon={false}
					name={'name'}
					initialValue={data.name || ''}
					rules={[
						{
							required: false,
							message: i18n.t('validation.enter-arg', { arg: i18n.t('common.name') }),
						},
					]}
				>
					<Input />
				</Form.Item>
				<Form.Item label={i18n.t('common.layout')} colon={false}
					name={'layout'}
					initialValue={layout}
				>
					<Radio.Group size="small">
						<Radio.Button value="fixed">{i18n.t('common.fixed')}</Radio.Button>
						<Radio.Button value="responsive">{i18n.t('common.responsive')}</Radio.Button>
						<Radio.Button value="fullscreen">{i18n.t('common.fullscreen')}</Radio.Button>
					</Radio.Group>
				</Form.Item>
				{layout === 'fixed' ? (
					<Fragment>
						<Row>
							<Col span={12}>
								<Form.Item label={i18n.t('common.width')} colon={false}
									name={'width'}
									initialValue={data.width * data.scaleX}
									rules={[
										{
											required: true,
											message: i18n.t('validation.enter-arg', {
												arg: i18n.t('common.width'),
											}),
										},
									]}
								>
									<InputNumber />
								</Form.Item>
							</Col>
							<Col span={12}>
								<Form.Item label={i18n.t('common.height')} colon={false}
									name={'height'}
									initialValue={data.height * data.scaleY}
									rules={[
										{
											required: true,
											message: i18n.t('validation.enter-arg', {
												arg: i18n.t('common.height'),
											}),
										},
									]}
								>
									<InputNumber />
								</Form.Item>
							</Col>
						</Row>
					</Fragment>
				) : null}
			</Fragment>
		);
	},
};

export { MapProperty };

export default MapProperty;