// Ant Design
import { Form } from 'antd';

import { ChartModal } from 'common/components';

const ChartProperty = {
	render(canvasRef, form, data) {

		if (!data) {
			return null;
		}

		return (
			<Form.Item
				name="chartOption"
				rules={[
					{
						required: true,
						message: 'Please input code',
					},
				]}
				initialValue={data.chartOptionStr}
			>
				<ChartModal form={form} />
			</Form.Item>
		);
	},
};

export { ChartProperty }

export default ChartProperty;