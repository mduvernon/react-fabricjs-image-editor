// Ant Design
import { Form, Switch } from 'antd';
// i18next
import i18n from 'i18next';

const TooltipProperty = {
	render(canvasRef, form, data) {

		if (!data) {
			return null;
		}

		return (
			<Form.Item label={i18n.t('imagemap.tooltip.tooltip-enabled')} colon={false}
				name={["tooltip", "enabled"]}
				valuePropName="checked"
				initialValue={data.tooltip.enabled}
				rules={[{ type: 'boolean' }]}
			>
				<Switch size="small" />
			</Form.Item>
		);
	},
}

export { TooltipProperty }

export default TooltipProperty;