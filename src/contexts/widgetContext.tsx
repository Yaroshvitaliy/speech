// Generated by cra-context-generator@1.3.0 on Sun, 24 Jul 2022 09:04:14 GMT.
// Do not edit this file manually unless you disabled its code generation.
import React from 'react';

/**
 * The Widget state props interface.
 */
export interface IWidgetStateProps {
}

/**
 * The Widget state interface.
 */
export interface IWidgetState {
}

/**
 * The Widget context provider props interface.
 */
export interface IWidgetContextProviderProps {
    children: React.ReactNode;
    widgetState: IWidgetState;
}

/**
 * The Widget context value interface.
 */
export interface IWidgetContextValue {
}


/**
 * The default Widget state.
 */
export const DefaultWidgetState: IWidgetState = {
};

/**
 * The default Widget context value.
 */
export const DefaultWidgetContextValue: IWidgetContextValue = {
};

/**
 * The Widget state.
 */
export const WidgetState = ({
        }: IWidgetStateProps) => {


    const widgetState: IWidgetState = {
    };

    return widgetState;
};

/**
 * The Widget context.
 * The DefaultWidgetContextValue argument is only used when a component does not have a matching Provider above it in the tree.
 * This can be helpful for testing components.
 */
export const WidgetContext = React.createContext<IWidgetContextValue>(DefaultWidgetContextValue);

/**
 * The Widget context provider.
 */
export const WidgetContextProvider = ({
            children,
            widgetState,
        }: IWidgetContextProviderProps) => {

    const {
    } = widgetState || {};

    const contextValue: IWidgetContextValue = {
    };

    return (
        <WidgetContext.Provider value={contextValue}>
            {children}
        </WidgetContext.Provider>
    );
};