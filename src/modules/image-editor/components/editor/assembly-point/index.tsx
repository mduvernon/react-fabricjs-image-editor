// React
import React, { FC, memo } from 'react';
// Ant Design
import { ConfigProvider } from 'antd';
import enUS from 'antd/locale/en_US';
// i18next
import i18next from 'i18next';
// Types
import { AppConfigType } from 'common/type';
// Context
import { AppProvider } from 'common/contexts';
// Components
import { EditorContent } from '../content';
// Utils
import { deepMerge } from 'common/utils';
// i18n
import { i18nClient } from 'i18n';
// Constants
import { defaultConfig } from 'common/constants';
// Styles
import './style.scss';

const antResources = {
    en: enUS,
    'en-US': enUS,
};

type OwnProps = AppConfigType & {};

const AssemblyPointComponent: FC<OwnProps> = ({
    ...props
}) => {

    const defaultAndProvidedConfigMerged = deepMerge(
        defaultConfig,
        props
    );

    return (
        <React.StrictMode>
            <ConfigProvider locale={antResources[i18next.language]}>
                <AppProvider config={defaultAndProvidedConfigMerged}>
                    <EditorContent />
                </AppProvider>
            </ConfigProvider>
        </React.StrictMode >
    );
}

i18nClient();

const AssemblyPoint = memo(AssemblyPointComponent);

export { AssemblyPoint };

export default AssemblyPoint;