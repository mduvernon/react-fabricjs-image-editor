// Ant Design
import { Form } from 'antd';
// Common components
import { UrlModal } from 'common/components';

const IframeProperty = {
	render(canvasRef, form, data) {

		if (!data) {
			return null;
		}

		return (
			<Form.Item
				label="URL"
				name="src"
				initialValue={data.src}
				rules={[
					{
						required: true,
						message: 'Please input URL',
					},
				]}
			>
				<UrlModal form={form} />
			</Form.Item>
		);
	},
};

export { IframeProperty };

export default IframeProperty;