// Generated by cra-context-generator@1.3.0 on Sun, 24 Jul 2022 09:04:14 GMT.
// Do not edit this file manually unless you disabled its code generation.
import React from 'react';
import ReactDOM from 'react-dom/client';
import { WidgetContextProvider, IWidgetState, WidgetState, DefaultWidgetState } from './widgetContext';
import { createChildren, getHistory } from './contextBuilderUtils';
import Widget from '../components/Widget';

/**
 * The Widget context interface.
 */
export interface IWidgetContext {
    /**
     * The component to be rendered.
     */
    Component: () => JSX.Element;

    /**
     * Renderes the component.
     *
     * @param {Element | DocumentFragment | null} container The container. Optional parameter.
     */
    render: (container: Element | DocumentFragment | null) => void;
}

interface IComponentProps {
    children: React.ReactNode;
    widgetState: IWidgetState;
    container?: Element | null;
}

/**
 * The Widget context builder.
 * Helps to build the Widget context and manage its state.
 */
export class WidgetContextBuilder {
    private props: IComponentProps = {
        children: undefined,
        widgetState: DefaultWidgetState,
        container: undefined,
    };

    /**
     * Builds the Widget Context.
     *
     * @returns {IWidgetContext} The Widget Context Interface.
     */
    build() {
        const {
        } = this.props;

        const Component = () => {
            const widgetState = WidgetState({
            });
            const {
                children,
                container,
                ...rest
            } = this.props;
            this.props.widgetState = widgetState;
            return (
                <WidgetContextProvider {...rest} widgetState={widgetState}>
                    <Widget container={container}>
                        {children}
                    </Widget>
                </WidgetContextProvider>
            );
        };

        const render = (container: Element | DocumentFragment | null) =>
            ReactDOM
                .createRoot((container || document.createElement('div')) as HTMLElement)
                .render(
                    <React.StrictMode>
                        <Component />
                    </React.StrictMode>
                );


        const context: IWidgetContext = {
            Component,
            render,
        };

        return context;
    }

    /**
     * Sets the children.
     * All the children within the context will have the same state.
     *
     * @param {(() => JSX.Element) | (Array<() => JSX.Element>)} children The children.
     */
    withChildren(children: (() => JSX.Element) | (Array<() => JSX.Element>)) {
        this.props.children = createChildren(children);
        return this;
    }

    /**
     * Sets the container. Default value: undefined.
     *
     * @param {Element | null} container The container.
     */
    withContainer(container: Element | null) {
        this.props.container = container;
        return this;
    }
};

export default WidgetContextBuilder;