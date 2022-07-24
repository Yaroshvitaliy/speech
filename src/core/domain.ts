export interface ILanguageOptions {
    lang: string;
}

export interface ICardsOptions {
    foreignLanguage: ILanguageOptions;
    nativeLanguage: ILanguageOptions;
}

export interface ICardOptions {
    ignore: boolean;
}

interface Dictionary<T> {
    [Key: string]: T;
}

export interface ICardData {
    foreignLanguage: string;
    partOfSpeech: string;
    definition?: string;
    examples?: string[];
    nativeLanguage: string[];
    phonics?: Dictionary<string>;
    options?: ICardOptions;
}

export interface IData {
    options: ICardsOptions;
    cards: ICardData[];
}