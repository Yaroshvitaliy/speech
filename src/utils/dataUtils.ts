import { IData, ICardData } from '../core/domain';

export const tryParseData = (rawData: string) => {
    try {
        const data = JSON.parse(rawData) as IData;
        let error = null;
    
        if (!data) error = "No data";
        if (!data.cards) error = "No cards";
    
        return { data, error };
    } catch (e) {
        return { data: null, error: e };
    }
};

export const filterCards = (cards: ICardData[]) => 
    cards.filter(x => !x.options || !x.options.ignore);