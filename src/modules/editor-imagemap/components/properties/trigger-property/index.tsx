// React
import { Fragment } from "react";
// Ant Design
import { Form, Switch } from "antd";
// i18next
import i18n from "i18next";
// Common Components
import {
	CodeModal
} from "common/components";

const TriggerProperty = {
	render(canvasRef, form, data) {

		return (
			<Fragment>
				<Form.Item label={i18n.t("imagemap.trigger.trigger-enabled")} colon={false}
					name={["trigger", "enabled"]}
					valuePropName="checked"
					initialValue={data.trigger.enabled}
					rules={[{ type: "boolean" }]}
				>
					<Switch size="small" />
				</Form.Item>
				<Form.Item style={{ display: data.trigger.enabled ? "block" : "none" }}
					name={["trigger", "code"]}
					initialValue={data.trigger.code || "return null;"}
				>
					<CodeModal form={form} />
				</Form.Item>
			</Fragment>
		);
	},
};

export { TriggerProperty };

export default TriggerProperty;