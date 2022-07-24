import React from 'react';
import { AppContext } from '../contexts/appContext';
import { DataSourceContext } from '../contexts/dataSourceContext';
import * as DataUtils from '../utils/dataUtils';
import './Card.css';

interface IForeignLanguage {
    partOfSpeech: string;
    foreignLanguage: string;
}

const ForeignLanguage = ({ partOfSpeech, foreignLanguage } : IForeignLanguage) => 
    <div className="Card-foreignLanguage">
        <h4>Foreign Language</h4>
        <p>
            {partOfSpeech && <i>[{partOfSpeech}]</i>} {foreignLanguage}
        </p>
    </div>

interface INativeLanguage {
    nativeLanguage: string[];
}

const NativeLanguage = ({ nativeLanguage } : INativeLanguage ) => (
    <div className="Card-nativeLanguage">
        <h4>Native Language</h4>
        <ul>
            { nativeLanguage.map((x, i) => 
                <li className="NativeLanguage-content" key={i}>{x}</li>)
            }
        </ul>
    </div>
);

interface IPhonicProps {
    lang: string;
    phonic: string;
}

const Phonic = ( { lang, phonic } : IPhonicProps) => (
    <li className="Phonic-Content">
        <span className="Phonic-lang">{lang}</span><span className="Phonic-phonic">{phonic}</span>
    </li>
);

interface IExampleProps {
    example: string;
}

const Example = ({ example } : IExampleProps) => (<li className="Example-content">{example}</li>);

const shouldRender = (array: any[]) => Boolean(array.length > 0);

export const Card = () => {
    const { index } = React.useContext(AppContext);
    const { rawData, isValid, error } = React.useContext(DataSourceContext);

    if (!isValid) {
        return (
            <div>{error || 'Error'}</div>
        );
    }

    const {data: parsedData } = DataUtils.tryParseData(rawData);
    const {cards: rawCards = [] } = parsedData || {};
    const cards = DataUtils.filterCards(rawCards);

    if (cards.length === 0) {
        return (
            <div>No Cards</div>
        );
    }

    if (index >= cards.length) {
        return (
            <div>Out of range</div>
        );
    }

    const card = cards[index];
    const { foreignLanguage, partOfSpeech, examples = [], nativeLanguage, phonics: phonicsDictionary = {}, definition } = card;
    const phonics = Object.entries<string>(phonicsDictionary);

    return (
        <div className="Card-content">
            <div className="Card-row">
                <div className="Card-col">
                    { foreignLanguage &&
                        <ForeignLanguage partOfSpeech={partOfSpeech} foreignLanguage={foreignLanguage} />
                    }
                </div>

                <div className="Card-col">
                    { nativeLanguage &&
                        <NativeLanguage nativeLanguage={nativeLanguage} />
                    }
                </div>
            </div>

            { definition && 
                <div className="Card-row">
                    <div className="Card-col">
                        <h4>Definition</h4>
                        <p>{definition}</p>
                    </div>
                </div>
            }
            
            { shouldRender(phonics) &&         
                <div className="Card-row">
                    <div className="Card-col">
                        <h4>Phonics</h4>
                        <ul>
                            { phonics.map(([lang, phonic], i) => 
                                <Phonic key={i} lang={lang} phonic={phonic} />)
                            }
                        </ul>
                    </div>
                </div>
            }

            { shouldRender(examples) &&
                <div className="Card-row">
                    <div className="Card-col">
                        <h4>Examples</h4>
                        <ul>
                            { examples.map((example, i) => 
                                <Example key={i} example={example} />)
                            }
                        </ul>
                    </div>
                </div>
            }

            <div className="Card-row">
                <div className="Card-col">
                    <hr />
                    {index + 1} / {cards.length}
                </div>
            </div>
        </div>
    );
};

export default Card;