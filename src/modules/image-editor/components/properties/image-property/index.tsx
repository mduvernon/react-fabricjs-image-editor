// React
import { Fragment } from 'react';
// Ant Design
import { Form, Radio } from 'antd';
// i18next
import i18n from 'i18next';

import {
	FileUpload,
	UrlModal
} from 'common/components';

const ImageProperty = {
	render(canvasRef, form, data) {

		if (!data) {
			return null;
		}

		const imageLoadType = data.imageLoadType || 'file';

		return (
			<Fragment>
				<Form.Item label={i18n.t('imagemap.image.image-load-type')} colon={false}
					name="imageLoadType"
					initialValue={imageLoadType}
				>
					<Radio.Group size="small">
						<Radio.Button value="file">{i18n.t('imagemap.image.file-upload')}</Radio.Button>
						<Radio.Button value="src">{i18n.t('imagemap.image.image-url')}</Radio.Button>
					</Radio.Group>
				</Form.Item>
				{imageLoadType === 'file' ? (
					<Form.Item label={i18n.t('common.file')} colon={false}
						name="file"
						initialValue={data.file}
						rules={[
							{
								required: true,
								message: i18n.t('validation.enter-property', { arg: i18n.t('common.file') }),
							},
						]}
					>
						<FileUpload accept="image/*" limit={100} />
					</Form.Item>
				) : (
					<Form.Item
						name={'src'}
						initialValue={data.src}
					>
						<UrlModal form={form} />
					</Form.Item>
				)}
			</Fragment>
		);
	},
};

export { ImageProperty };

export default ImageProperty;
