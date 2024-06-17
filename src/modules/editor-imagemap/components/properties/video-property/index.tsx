import { Fragment } from 'react';
// Ant Design
import {
	Switch,
	Radio,
	Form,
	Row,
	Col,
} from 'antd';
// Common Components
import {
	FileUpload,
	UrlModal,
} from 'common/components';

const VideoProperty = {
	render(canvasRef, form, data) {

		if (!data) {
			return null;
		}

		const videoLoadType = data.videoLoadType || 'file';

		return (
			<Fragment>
				<Row>
					<Col span={8}>
						<Form.Item label="Auto Play" colon={false}
							name={'autoplay'}
							valuePropName="checked"
							initialValue={data.autoplay}
							rules={[{ type: 'boolean' }]}
						>
							<Switch />
						</Form.Item>
					</Col>
					<Col span={8}>
						<Form.Item label="Muted" colon={false}
							name={'muted'}
							valuePropName="checked"
							initialValue={data.muted}
							rules={[{ type: 'boolean' }]}
						>
							<Switch />
						</Form.Item>
					</Col>
					<Col span={8}>
						<Form.Item label="Loop" colon={false}
							name={'loop'}
							valuePropName="checked"
							initialValue={data.loop}
							rules={[{ type: 'boolean' }]}
						>
							<Switch />
						</Form.Item>
					</Col>
				</Row>
				<Form.Item label="Video Load Type" colon={false}
					name="videoLoadType"
					initialValue={videoLoadType}
				>
					<Radio.Group size="large">
						<Radio.Button value="file">File Upload</Radio.Button>
						<Radio.Button value="src">Video URL</Radio.Button>
					</Radio.Group>
				</Form.Item>
				{videoLoadType === 'file' ? (
					<Form.Item label="File" colon={false}
						name="file"
						rules={[{ required: true, message: 'Please select video' }]}
						initialValue={data.file}
					>
						<FileUpload accept="video/*" />
					</Form.Item>
				) : (
					<Form.Item
						name={'src'}
						rules={[{ required: true, message: 'Please select image' }]}
						initialValue={data.src}
					>
						<UrlModal form={form} />
					</Form.Item>
				)}
			</Fragment>
		);
	},
};

export { VideoProperty };

export default VideoProperty;
