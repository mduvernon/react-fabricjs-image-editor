// React
import { Fragment } from 'react';
// Ant Design
import { Form } from 'antd';
// Common Components
import { EditTable } from 'common/components';

const UserProperty = {
	render(canvasRef, form, data) {

		return (
			<Fragment>
				<Form.Item
					label="User Property"
					name={'userProperty'}
				>
					<EditTable userProperty={data.userProperty} form={form} />
				</Form.Item>
			</Fragment>
		);
	},
}

export { UserProperty }

export default UserProperty;