// React
import { Fragment } from 'react';
// Ant Design
import {
	Select,
	Switch,
	Input,
	Form,
} from 'antd';
// i18next
import i18n from 'i18next';

const LinkProperty = {
	render(canvasRef, form, data) {

		return (
			<Fragment>
				<Form.Item label={i18n.t('imagemap.link.link-enabled')} colon={false}
					name={["link", "enabled"]}
					initialValue={data.link.enabled}
					valuePropName="checked"
					rules={[
						{
							required: true,
							message: i18n.t('validation.enter-property', {
								arg: i18n.t('imagemap.marker.link-enabled'),
							}),
						},
					]}
				>
					<Switch size="small" />
				</Form.Item>
				{data.link.enabled ? (
					<Fragment>
						<Form.Item label={i18n.t('common.state')} colon={false}
							name={["link", "state"]}
							initialValue={data.link.state || 'current'}
						>
							<Select>
								<Select.Option value="current">{i18n.t('common.current')}</Select.Option>
								<Select.Option value="new">{i18n.t('common.new')}</Select.Option>
							</Select>
						</Form.Item>
						<Form.Item label={i18n.t('common.url')} colon={false}
							name={["link", "url"]}
							initialValue={data.link.url || ''}
							rules={[
								{
									required: true,
									message: i18n.t('validation.enter-property', { arg: i18n.t('common.url') }),
								},
							]}
						>
							<Input />
						</Form.Item>
					</Fragment>
				) : null}
			</Fragment>
		);
	},
};

export { LinkProperty };

export default LinkProperty;