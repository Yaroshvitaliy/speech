// Generated by cra-context-generator@1.3.0 on Sun, 24 Jul 2022 09:04:14 GMT.
// Do not edit this file manually unless you disabled its code generation.
import React from 'react';
import ReactDOM from 'react-dom/client';
import { DataSourceContextProvider, IDataSourceState, DataSourceState, DefaultDataSourceState } from './dataSourceContext';
import { createChildren, getHistory } from './contextBuilderUtils';

/**
 * The DataSource context interface.
 */
export interface IDataSourceContext {
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

    /**
     * Gets the rawData.
     */
    getRawData: () => string;

    /**
     * Sets the rawData.
     */
    setRawData: (rawData: string) => void;

    /**
     * Gets the isValid.
     */
    getIsValid: () => boolean;

    /**
     * Sets the isValid.
     */
    setIsValid: (isValid: boolean) => void;

    /**
     * Gets the error.
     */
    getError: () => string;

    /**
     * Sets the error.
     */
    setError: (error: string) => void;

    /**
     * Gets the foreignLanguageVoiceName.
     */
    getForeignLanguageVoiceName: () => string;

    /**
     * Sets the foreignLanguageVoiceName.
     */
    setForeignLanguageVoiceName: (foreignLanguageVoiceName: string) => void;

    /**
     * Gets the nativeLanguageVoiceName.
     */
    getNativeLanguageVoiceName: () => string;

    /**
     * Sets the nativeLanguageVoiceName.
     */
    setNativeLanguageVoiceName: (nativeLanguageVoiceName: string) => void;

    /**
     * Gets the cards.
     */
    getCards: () => any[];

    /**
     * Sets the cards.
     */
    setCards: (cards: any[]) => void;
}

interface IComponentProps {
    children: React.ReactNode;
    dataSourceState: IDataSourceState;
    rawData: string;
    rawDataSetEventHandler?: (rawData: string) => void;
    isValid: boolean;
    isValidSetEventHandler?: (isValid: boolean) => void;
    error: string;
    errorSetEventHandler?: (error: string) => void;
    foreignLanguageVoiceName: string;
    foreignLanguageVoiceNameSetEventHandler?: (foreignLanguageVoiceName: string) => void;
    nativeLanguageVoiceName: string;
    nativeLanguageVoiceNameSetEventHandler?: (nativeLanguageVoiceName: string) => void;
    cards: any[];
    cardsSetEventHandler?: (cards: any[]) => void;
}

/**
 * The DataSource context builder.
 * Helps to build the DataSource context and manage its state.
 */
export class DataSourceContextBuilder {
    private props: IComponentProps = {
        children: undefined,
        dataSourceState: DefaultDataSourceState,
        rawData: DefaultDataSourceState.rawDataState,
        rawDataSetEventHandler: undefined,
        isValid: DefaultDataSourceState.isValidState,
        isValidSetEventHandler: undefined,
        error: DefaultDataSourceState.errorState,
        errorSetEventHandler: undefined,
        foreignLanguageVoiceName: DefaultDataSourceState.foreignLanguageVoiceNameState,
        foreignLanguageVoiceNameSetEventHandler: undefined,
        nativeLanguageVoiceName: DefaultDataSourceState.nativeLanguageVoiceNameState,
        nativeLanguageVoiceNameSetEventHandler: undefined,
        cards: DefaultDataSourceState.cardsState,
        cardsSetEventHandler: undefined,
    };

    /**
     * Builds the DataSource Context.
     *
     * @returns {IDataSourceContext} The DataSource Context Interface.
     */
    build() {
        const {
            rawData: initialRawData,
            isValid: initialIsValid,
            error: initialError,
            foreignLanguageVoiceName: initialForeignLanguageVoiceName,
            nativeLanguageVoiceName: initialNativeLanguageVoiceName,
            cards: initialCards,
        } = this.props;

        const Component = () => {
            const dataSourceState = DataSourceState({
                rawData: initialRawData,
                isValid: initialIsValid,
                error: initialError,
                foreignLanguageVoiceName: initialForeignLanguageVoiceName,
                nativeLanguageVoiceName: initialNativeLanguageVoiceName,
                cards: initialCards,
            });
            const {
                children,
                rawData,
                isValid,
                error,
                foreignLanguageVoiceName,
                nativeLanguageVoiceName,
                cards,
                ...rest
            } = this.props;
            this.props.dataSourceState = dataSourceState;
            return (
                <DataSourceContextProvider {...rest} dataSourceState={dataSourceState}>
                    {children}
                </DataSourceContextProvider>
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

        const getRawData = () => {
            const { rawDataState } = this.props.dataSourceState || {};
            return rawDataState;
        };

        const setRawData = (rawData: string) => {
            const { setRawDataState } = this.props.dataSourceState || {};
            setRawDataState && setRawDataState(rawData);
        };
        const getIsValid = () => {
            const { isValidState } = this.props.dataSourceState || {};
            return isValidState;
        };

        const setIsValid = (isValid: boolean) => {
            const { setIsValidState } = this.props.dataSourceState || {};
            setIsValidState && setIsValidState(isValid);
        };
        const getError = () => {
            const { errorState } = this.props.dataSourceState || {};
            return errorState;
        };

        const setError = (error: string) => {
            const { setErrorState } = this.props.dataSourceState || {};
            setErrorState && setErrorState(error);
        };
        const getForeignLanguageVoiceName = () => {
            const { foreignLanguageVoiceNameState } = this.props.dataSourceState || {};
            return foreignLanguageVoiceNameState;
        };

        const setForeignLanguageVoiceName = (foreignLanguageVoiceName: string) => {
            const { setForeignLanguageVoiceNameState } = this.props.dataSourceState || {};
            setForeignLanguageVoiceNameState && setForeignLanguageVoiceNameState(foreignLanguageVoiceName);
        };
        const getNativeLanguageVoiceName = () => {
            const { nativeLanguageVoiceNameState } = this.props.dataSourceState || {};
            return nativeLanguageVoiceNameState;
        };

        const setNativeLanguageVoiceName = (nativeLanguageVoiceName: string) => {
            const { setNativeLanguageVoiceNameState } = this.props.dataSourceState || {};
            setNativeLanguageVoiceNameState && setNativeLanguageVoiceNameState(nativeLanguageVoiceName);
        };
        const getCards = () => {
            const { cardsState } = this.props.dataSourceState || {};
            return cardsState;
        };

        const setCards = (cards: any[]) => {
            const { setCardsState } = this.props.dataSourceState || {};
            setCardsState && setCardsState(cards);
        };

        const context: IDataSourceContext = {
            Component,
            render,
            getRawData,
            setRawData,
            getIsValid,
            setIsValid,
            getError,
            setError,
            getForeignLanguageVoiceName,
            setForeignLanguageVoiceName,
            getNativeLanguageVoiceName,
            setNativeLanguageVoiceName,
            getCards,
            setCards,
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
     * Sets the raw data. Default value: '{}'.
     *
     * @param {string} rawData The raw data.
     */
    withRawData(rawData: string) {
        this.props.rawData = rawData;
        return this;
    }

    /**
     * Sets the raw data set event handler.
     *
     * @param {(rawData: string) => void} rawDataSetEventHandler The raw data set event handler.
     */
    withRawDataSetEventHandler(rawDataSetEventHandler: (rawData: string) => void) {
        this.props.rawDataSetEventHandler = rawDataSetEventHandler;
        return this;
    }

    /**
     * Sets the is valid. Default value: true.
     *
     * @param {boolean} isValid The is valid.
     */
    withIsValid(isValid: boolean) {
        this.props.isValid = isValid;
        return this;
    }

    /**
     * Sets the is valid set event handler.
     *
     * @param {(isValid: boolean) => void} isValidSetEventHandler The is valid set event handler.
     */
    withIsValidSetEventHandler(isValidSetEventHandler: (isValid: boolean) => void) {
        this.props.isValidSetEventHandler = isValidSetEventHandler;
        return this;
    }

    /**
     * Sets the error. Default value: ''.
     *
     * @param {string} error The error.
     */
    withError(error: string) {
        this.props.error = error;
        return this;
    }

    /**
     * Sets the error set event handler.
     *
     * @param {(error: string) => void} errorSetEventHandler The error set event handler.
     */
    withErrorSetEventHandler(errorSetEventHandler: (error: string) => void) {
        this.props.errorSetEventHandler = errorSetEventHandler;
        return this;
    }

    /**
     * Sets the foreign language voice name. Default value: ''.
     *
     * @param {string} foreignLanguageVoiceName The foreign language voice name.
     */
    withForeignLanguageVoiceName(foreignLanguageVoiceName: string) {
        this.props.foreignLanguageVoiceName = foreignLanguageVoiceName;
        return this;
    }

    /**
     * Sets the foreign language voice name set event handler.
     *
     * @param {(foreignLanguageVoiceName: string) => void} foreignLanguageVoiceNameSetEventHandler The foreign language voice name set event handler.
     */
    withForeignLanguageVoiceNameSetEventHandler(foreignLanguageVoiceNameSetEventHandler: (foreignLanguageVoiceName: string) => void) {
        this.props.foreignLanguageVoiceNameSetEventHandler = foreignLanguageVoiceNameSetEventHandler;
        return this;
    }

    /**
     * Sets the native language voice name. Default value: ''.
     *
     * @param {string} nativeLanguageVoiceName The native language voice name.
     */
    withNativeLanguageVoiceName(nativeLanguageVoiceName: string) {
        this.props.nativeLanguageVoiceName = nativeLanguageVoiceName;
        return this;
    }

    /**
     * Sets the native language voice name set event handler.
     *
     * @param {(nativeLanguageVoiceName: string) => void} nativeLanguageVoiceNameSetEventHandler The native language voice name set event handler.
     */
    withNativeLanguageVoiceNameSetEventHandler(nativeLanguageVoiceNameSetEventHandler: (nativeLanguageVoiceName: string) => void) {
        this.props.nativeLanguageVoiceNameSetEventHandler = nativeLanguageVoiceNameSetEventHandler;
        return this;
    }

    /**
     * Sets the cards. Default value: [].
     *
     * @param {any[]} cards The cards.
     */
    withCards(cards: any[]) {
        this.props.cards = cards;
        return this;
    }

    /**
     * Sets the cards set event handler.
     *
     * @param {(cards: any[]) => void} cardsSetEventHandler The cards set event handler.
     */
    withCardsSetEventHandler(cardsSetEventHandler: (cards: any[]) => void) {
        this.props.cardsSetEventHandler = cardsSetEventHandler;
        return this;
    }
};

export default DataSourceContextBuilder;
