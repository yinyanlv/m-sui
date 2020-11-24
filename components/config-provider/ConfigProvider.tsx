import React, { PropsWithChildren } from 'react';

interface ConfigProviderProps {
    value: ConfigModel;
}

type ConfigModel = typeof defaultConfig; 

const defaultConfig = {
}

const configContext = React.createContext<ConfigModel>(defaultConfig);

function ConfigProvider(props: PropsWithChildren<ConfigProviderProps>) {

    return (
        <configContext.Provider value={props.value}>
            {
                props.children
            }
        </configContext.Provider>
    );
}

export default React.memo(ConfigProvider);