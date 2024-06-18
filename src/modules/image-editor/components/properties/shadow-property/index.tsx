// React
import { Fragment } from 'react';
// Ant Design
import {
	Slider,
	Switch,
	Form,
} from 'antd';
// i18next
import i18n from 'i18next';

import { ColorPicker } from 'common/components';

const ShadowProperty = {
	render(canvasRef, form, data) {

		const enabeld = data?.shadow?.enabled || false

		return (
			<Fragment>
				<Form.Item label={i18n.t('imagemap.shadow.shadow-enabled')} colon={false}
					name="shadow.enabled"
					initialValue={enabeld}
					valuePropName="checked"
				>
					<Switch size="small" />
				</Form.Item>
				{enabeld ? (
					<Fragment>
						<Form.Item label={i18n.t('common.color')} colon={false}
							name={['shadow', 'color']}
							initialValue={data.shadow.color || 'rgba(0, 0, 0, 0)'}
						>
							<ColorPicker valueType={'string'} />
						</Form.Item>
						<Form.Item label={i18n.t('common.blur')} colon={false}
							name={['shadow', 'blur']}
							initialValue={data.shadow.blur || 15}
						>
							<Slider min={0} max={100} />
						</Form.Item>
						<Form.Item label={i18n.t('imagemap.shadow.offset-x')} colon={false}
							name={['shadow', 'offsetX']}
							initialValue={data.shadow.offsetX || 10}
							rules={[
								{
									type: 'number',
									min: 0,
									max: 100,
								},
							]}
						>
							<Slider min={0} max={100} />
						</Form.Item>
						<Form.Item label={i18n.t('imagemap.shadow.offset-y')} colon={false}
							name={['shadow', 'offsetY']}
							initialValue={data.shadow.offsetY || 10}
							rules={[
								{
									type: 'number',
									min: 0,
									max: 100,
								},
							]}
						>
							<Slider min={0} max={100} />
						</Form.Item>
					</Fragment>
				) : null}
			</Fragment>
		);
	},
};

export { ShadowProperty };

export default ShadowProperty;