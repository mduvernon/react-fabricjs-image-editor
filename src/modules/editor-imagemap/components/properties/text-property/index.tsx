// React
import { Fragment } from 'react';
// Ant Design
import {
	Slider,
	Select,
	Form,
	Row,
	Col,
	Tag
} from 'antd';
// lodash
import sortBy from 'lodash/sortBy';
// Common Components
import { Fonts, Icon } from 'common/components';

const fonts = Fonts.getFonts();

const TextProperty = {
	render(canvasRef, form, data) {

		return (
			<Fragment>
				<Row>
					<Row>
						<Col span={16}>
							<Form.Item label="Font Family" colon={false}
								name="fontFamily"
								initialValue={data.fontFamily}
							>
								<Select>
									{Object.keys(fonts).map(font => (
										<Select.OptGroup key={font} label={font.toUpperCase()}>
											{sortBy(fonts[font], ['name']).map(f => (
												<Select.Option key={f.name} value={f.name}>
													{f.name}
												</Select.Option>
											))}
										</Select.OptGroup>
									))}
								</Select>
							</Form.Item>
						</Col>
						<Col span={8}>
							<Form.Item label="Font Size" colon={false}
								name="fontSize"
								initialValue={data.fontSize || '32'}
							>
								<Select>
									{Array.from({ length: 60 }, (v, k) => (
										<Select.Option key={k} value={`${k + 1}`}>
											{k + 1}
										</Select.Option>
									))}
								</Select>
							</Form.Item>
						</Col>
						<Col span={6}>
							<Form.Item
								name={'fontWeight'}
								valuePropName="checked"
								initialValue={data.fontWeight === 'bold'}
							>
								<Tag.CheckableTag className="rde-action-tag"
									checked={data.fontWeight === 'bold'}
								>
									<Icon name="bold" />
								</Tag.CheckableTag>
							</Form.Item>
						</Col>
						<Col span={6}>
							<Form.Item
								name={'fontStyle'}
								valuePropName="checked"
								initialValue={data.fontStyle === 'italic'}
							>
								<Tag.CheckableTag className="rde-action-tag"
									checked={data.fontStyle === 'italic'}
								>
									<Icon name="italic" />
								</Tag.CheckableTag>
							</Form.Item>
						</Col>
						<Col span={6}>
							<Form.Item
								name={'linethrough'}
								valuePropName="checked"
								initialValue={data.linethrough}
							>
								<Tag.CheckableTag className="rde-action-tag"
									checked={data.linethrough}
								>
									<Icon name="strikethrough" />
								</Tag.CheckableTag>
							</Form.Item>
						</Col>
						<Col span={6}>
							<Form.Item
								name={'underline'}
								valuePropName="checked"
								initialValue={data.overline}
							>
								<Tag.CheckableTag className="rde-action-tag"
									checked={data.overline}
								>
									<Icon name="underline" />
								</Tag.CheckableTag>
							</Form.Item>
						</Col>
						<Col span={6}>
							<Form.Item
								name={['textAlign', 'left']}
								valuePropName="checked"
								initialValue={data.textAlign === 'left'}
							>
								<Tag.CheckableTag className="rde-action-tag"
									checked={data.textAlign === 'left'}
								>
									<Icon name="align-left" />
								</Tag.CheckableTag>
							</Form.Item>
						</Col>
						<Col span={6}>
							<Form.Item
								name={['textAlign', 'center']}
								valuePropName="checked"
								initialValue={data.textAlign === 'center'}
							>
								<Tag.CheckableTag className="rde-action-tag"
									checked={data.textAlign === 'center'}
								>
									<Icon name="align-center" />
								</Tag.CheckableTag>
							</Form.Item>
						</Col>
						<Col span={6}>
							<Form.Item
								name={['textAlign', 'right']}
								valuePropName="checked"
								initialValue={data.textAlign === 'right'}
							>
								<Tag.CheckableTag className="rde-action-tag"
									checked={data.textAlign === 'right'}
								>
									<Icon name="align-right" />
								</Tag.CheckableTag>
							</Form.Item>
						</Col>
						<Col span={6}>
							<Form.Item
								name={['textAlign', 'justify']}
								valuePropName="checked"
								initialValue={data.textAlign === 'justify'}
							>
								<Tag.CheckableTag className="rde-action-tag"
									checked={data.textAlign === 'justify'}
								>
									<Icon name="align-justify" />
								</Tag.CheckableTag>
							</Form.Item>
						</Col>
						<Col span={12}>
							<Form.Item label="Line Height" colon={false}
								name="lineHeight"
								initialValue={data.lineHeight || '1'}
								rules={[
									{
										type: 'number',
									},
								]}
							>
								<Slider min={0} max={100} />
							</Form.Item>
						</Col>
						<Col span={12}>
							<Form.Item label="Char Spacing" colon={false}
								name="charSpacing"
								initialValue={data.charSpacing || '0'}
								rules={[
									{
										type: 'number',
									},
								]}
							>
								<Slider min={0} max={100} />
							</Form.Item>
						</Col>
					</Row>
				</Row>
			</Fragment>
		);
	},
};

export { TextProperty };

export default TextProperty;