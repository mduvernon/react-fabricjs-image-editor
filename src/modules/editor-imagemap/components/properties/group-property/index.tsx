// React
import { Fragment } from 'react';
// Ant Design
import {
	InputNumber,
	Slider,
	Input,
	Form,
	Col,
	Row
} from 'antd';

const GroupProperty = {
	render(canvasRef, form, data) {

		return (
			<Fragment>
				<Form.Item label="Name" colon={false}
					name={'name'}
					initialValue={data.name}
					rules={[
						{
							// required: false,
							// message: 'Please input name',
						},
					]}
				>
					<Input />
				</Form.Item>
				<Row>
					<Col span={12}>
						<Form.Item label="Width" colon={false}
							name={'width'}
							initialValue={data.width * data.scaleX}
							rules={[
								{
									required: true,
									message: 'Please input width',
								},
							]}
						>
							<InputNumber />
						</Form.Item>
					</Col>
					<Col span={12}>
						<Form.Item label="Height" colon={false}
							name={'height'}
							initialValue={data.height * data.scaleY}
							rules={[
								{
									required: true,
									message: 'Please input height',
								},
							]}
						>
							<InputNumber />
						</Form.Item>
					</Col>
				</Row>
				<Row>
					<Col span={12}>
						<Form.Item label="Left" colon={false}
							name={'left'}
							initialValue={data.left}
							rules={[
								{
									required: true,
									message: 'Please input x position',
								},
							]}
						>
							<InputNumber />
						</Form.Item>
					</Col>
					<Col span={12}>
						<Form.Item label="Top" colon={false}
							name={'top'}
							initialValue={data.top}
							rules={[
								{
									required: true,
									message: 'Please input y position',
								},
							]}
						>
							<InputNumber />
						</Form.Item>
					</Col>
				</Row>
				<Form.Item label="Rotation" colon={false}
					name={'angle'}
					initialValue={data.angle}
					rules={[
						{
							type: 'number',
							required: true,
							message: 'Please input rotation',
						},
					]}
				>
					<Slider min={0} max={360} />
				</Form.Item>
			</Fragment>
		);
	},
};

export { GroupProperty };

export default GroupProperty;