import React from 'react';
import { Async } from 'react-async'
import { AppContext } from '../contexts/appContext';
import { DataSourceContext } from '../contexts/dataSourceContext';
import * as SpeechUtils from '../utils/speechUtils';
import * as DataUtils from '../utils/dataUtils';
import * as CardsUtils from '../utils/cardsUtils';
import './ControlPanel.css';

interface IVoiceSwitcherProps {
    title: string;
    voiceLang: string;
    voiceName: string;
    setVoiceName: (voiceName: string) => void
}

const VoiceSwitcher = ({ title, voiceLang, voiceName, setVoiceName } : IVoiceSwitcherProps) => (
    <div className="VoiceSwitcher-content">
    <h4>{title}</h4>
    <Async promiseFn={SpeechUtils.getVoices}>
        <Async.Pending>Loading...</Async.Pending>
        <Async.Rejected>
            {(error) => `Error: ${error.message}`}
        </Async.Rejected>
        <Async.Fulfilled>
            { (data) => 
                <select value={voiceName} onChange={e => setVoiceName(e.target.value)}>
                    { (data as SpeechSynthesisVoice[]).map((voice, i) =>                        
                        <option 
                            className={voice.lang !== voiceLang ? 'noteligible' : ''} 
                            key={i} 
                            value={voice.name}>{voice.lang !== voiceLang ? `- ${i}` : `${i}`} - [{voice.lang}] {voice.name}
                        </option>)
                    }
                </select>
            }
        </Async.Fulfilled>
    </Async>
</div>
);

export const ControlPanel = () => {
    const { 
        started, 
        setStarted, 
        index,
        setIndex
    } = React.useContext(AppContext);

    const {
        foreignLanguageVoiceName, 
        setForeignLanguageVoiceName, 
        nativeLanguageVoiceName, 
        setNativeLanguageVoiceName,
    } = React.useContext(DataSourceContext);

    const defaultLang = 'en-US';
    const { rawData } = React.useContext(DataSourceContext);
    const {data: parsedData } = DataUtils.tryParseData(rawData);
    const { options: cardsOptions, cards: rawCards = [] } = parsedData || {};
    const { foreignLanguage: foreignLanguageOptions, nativeLanguage: nativeLanguageOptions } = cardsOptions || {};
    const cards = DataUtils.filterCards(rawCards);
    const card = cards[index];
    const cardsNumber = cards.length;

    const start = () => setStarted(true);

    const pause = () => setStarted(false);

    const stop = () => {
        setStarted(false);
        setIndex(0);
    };

    const prevCard = () => {
        const newIndex = CardsUtils.getPrevCardIndex(index, cardsNumber);
        setIndex(newIndex);
    };

    const nextCard = () => {
        const newIndex = CardsUtils.getNextCardIndex(index, cardsNumber);
        setIndex(newIndex);
    };

    const speak = async () => {
        const voices = await SpeechUtils.getVoices();
        await SpeechUtils.speechCard(voices, foreignLanguageVoiceName, nativeLanguageVoiceName, card);
    };

    return (
        <div className="ControlPanel-content">
            <div className="ControlPanel-row">
                { started || 
                    <div className="ControlPanel-col">
                        <button className="ControlPanel-button ControlPanel-button-prev-card" onClick={prevCard}>&lt;</button>
                    </div> 
                }
                { started || 
                    <div className="ControlPanel-col">
                        <button className="ControlPanel-button ControlPanel-button-play" onClick={start}>Play</button>
                    </div> 
                }
                { started || 
                    <div className="ControlPanel-col">
                        <button className="ControlPanel-button ControlPanel-button-play" onClick={async () => await speak()}>Speak</button>
                    </div> 
                }
                { started && 
                    <div className="ControlPanel-col">
                        <button className="ControlPanel-button ControlPanel-button-pause" onClick={pause}>Pause</button>
                    </div>
                }
                { started && 
                    <div className="ControlPanel-col">
                        <button className="ControlPanel-button ControlPanel-button-stop" onClick={stop}>Stop</button>
                    </div>
                }
                { started || 
                    <div className="ControlPanel-col">
                        <button className="ControlPanel-button ControlPanel-button-next-card" onClick={nextCard}>&gt;</button>
                    </div> 
                }

            </div>

            <div className="ControlPanel-row">
                <div className="ControlPanel-col">
                    <VoiceSwitcher  
                        title="Foreign Language" 
                        voiceLang={foreignLanguageOptions?.lang || defaultLang} 
                        voiceName={foreignLanguageVoiceName} 
                        setVoiceName={setForeignLanguageVoiceName} 
                    />
                </div>
                <div className="ControlPanel-col">
                    <VoiceSwitcher
                        title="Native Language"
                        voiceLang={nativeLanguageOptions?.lang || defaultLang} 
                        voiceName={nativeLanguageVoiceName}
                        setVoiceName={setNativeLanguageVoiceName}
                    />
                </div>
            </div>
        </div>
    );
};

export default ControlPanel;