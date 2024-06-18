// React
import { Fragment } from 'react';
// Ant Design
import { Form } from 'antd';
// Common Components
import { IconChooser } from 'common/components';

const MarkerProperty = {
	render(canvasRef, form, data) {

		return (
			<Fragment>
				<Form.Item
					label="Icon"
					name={'icon'}
					initialValue={data.icon}
				>
					<IconChooser icon={data.icon} />
				</Form.Item>
			</Fragment>
		);
	},
};

export { MarkerProperty };

export default MarkerProperty;