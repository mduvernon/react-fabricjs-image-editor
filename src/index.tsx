import React from 'react';
import ReactDom from 'react-dom';
import { ConfigProvider } from 'antd';
import enUS from 'antd/locale/en_US';
import App from './App';
import { register } from './serviceWorker';
import i18next from 'i18next';
import { i18nClient } from './i18n';

const antResources = {
	en: enUS,
	'en-US': enUS,
};

const root = document.createElement('div');
root.id = 'root';

document.body.appendChild(root);

const render = Component => {
	const rootElement = document.getElementById('root');

	ReactDom.render(
		<ConfigProvider locale={antResources[i18next.language]}>
			<Component />
		</ConfigProvider>,
		rootElement,
	);
};

i18nClient();

render(App);

register();
