export const getNextCardIndex = (index: number, cardsNumber: number) => 
    index === cardsNumber - 1 ? 0 : index + 1;

export const getPrevCardIndex = (index: number, cardsNumber: number) => 
    index === 0 ? cardsNumber - 1 : index - 1;