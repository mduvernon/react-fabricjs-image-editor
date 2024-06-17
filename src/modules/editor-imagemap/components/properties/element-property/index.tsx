// Ant Design
import { Form } from 'antd';
// Common Components
import { AceModal } from 'common/components';

const ElementProperty = {
	render(canvasRef, form, data) {

		if (!data) {
			return null;
		}

		return (
			<Form.Item
				label="Code"
				name="code"
				rules={[
					{
						required: true,
						message: 'Please input code',
					},
				]}
				initialValue={data.code}
			>
				<AceModal form={form} value={data.code} />
			</Form.Item>
		);
	},
}

export { ElementProperty }

export default ElementProperty;