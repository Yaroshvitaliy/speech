import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Card from './components/Card';
import ControlPanel from './components/ControlPanel';
import VoicesViewer from './components/VoicesViewer';
import SourceViewer from './components/SourceViewer';
import AppContextBuilder, { IAppContext } from './contexts/appContextBuilder';
import DataSourceContextBuilder, { IDataSourceContext } from './contexts/dataSourceContextBuilder';
import widgetContextBuilder from './contexts/widgetContextBuilder';
import { ICardData, IData } from './core/domain';
import * as DataUtils from './utils/dataUtils';
import * as SpeechUtils from './utils/speechUtils';
import * as TimeUtils from './utils/timeUtils';
import * as CardsUtils from './utils/cardsUtils';
import reportWebVitals from './reportWebVitals';
import data from './data.json'

const initApp = async () => {
   let started = false;

  if (!('speechSynthesis' in window)) {
     alert(`Sorry, your browser doesn't support text to speech!`);
     return;
  }

  const searchVoiceIndex = (voices: SpeechSynthesisVoice[], lang: string) => {
    const index = voices.findIndex(x => x.lang === lang);
    const voiceIndex = index >= 0 ? index : 0;
    return voiceIndex;
  };

  // Control Panel
  const controlPanelProps = {};
  const controlPanelWidgetContext = new widgetContextBuilder()
    .withChildren(() => <ControlPanel {...controlPanelProps} />)
    .withContainer(document.querySelector('.App-control-panel'))
    .build();

  // Voices Viewer
  const voicesViewerProps = {};
  const voicesViewerWidgetContext = new widgetContextBuilder()
    .withChildren(() => <VoicesViewer {...voicesViewerProps} />)
    .withContainer(document.querySelector('.App-voices-viewer'))
    .build();

  // Source Viewer
  const sourceViewerProps = {};
  const sourceViewerWidgetContext = new widgetContextBuilder()
    .withChildren(() => <SourceViewer {...sourceViewerProps} />)
    .withContainer(document.querySelector('.App-source-viewer'))
    .build();
  
  // Card
  const cardProps = {};
  const cardWidgetContext = new widgetContextBuilder()
    .withChildren(() => <Card {...cardProps} />)
    .withContainer(document.querySelector('.App-card'))
    .build();

  // Data Source
  const dataSourceContext = new DataSourceContextBuilder()
    .withChildren([
      cardWidgetContext.Component,
      controlPanelWidgetContext.Component,
      //voicesViewerWidgetContext.Component,
      sourceViewerWidgetContext.Component,
    ])
    .withRawData(JSON.stringify(data, null, 2))
    .withRawDataSetEventHandler(async (rawData) => {
      const defaultLang = 'en-US';
      const {data: parsedData, error } = DataUtils.tryParseData(rawData);

      if (!error && parsedData) {
        dataSourceContext.setIsValid(true);
        dataSourceContext.setError('');
        const { options: cardsOptions, cards: rawCards = [] } = parsedData || {};
        const { foreignLanguage: foreignLanguageOptions, nativeLanguage: nativeLanguageOptions } = cardsOptions || {};
        const cards = DataUtils.filterCards(rawCards);
        const voices = await SpeechUtils.getVoices();
        const foreignLanguageVoiceIndex = searchVoiceIndex(voices, foreignLanguageOptions?.lang || defaultLang);
        const nativeLanguageVoiceIndex = searchVoiceIndex(voices, nativeLanguageOptions?.lang || defaultLang);
        const foreignLanguageVoice = voices[foreignLanguageVoiceIndex];
        const nativeLanguageVoice = voices[nativeLanguageVoiceIndex];
  
        dataSourceContext.setCards(cards);
        dataSourceContext.setForeignLanguageVoiceName(foreignLanguageVoice.name);
        dataSourceContext.setNativeLanguageVoiceName(nativeLanguageVoice.name);
      } else {
        dataSourceContext.setIsValid(false);
        dataSourceContext.setError(`${error || 'Could not parse data'}`);
      }
    })
    .build();

  // App's handlers
  const processCard = async (appContext: IAppContext, dataSourceContext: IDataSourceContext, voices: SpeechSynthesisVoice[], cards: ICardData[], index: number) => {
    if (!appContext.getStarted()) {
      return;
    };

    const pauseMs = 500;

    const card = cards[index];
    
    await SpeechUtils.speechCard(voices, dataSourceContext.getForeignLanguageVoiceName(), dataSourceContext.getNativeLanguageVoiceName(), card);

    if (!appContext.getStarted()) {
      return;
    };

    await TimeUtils.pause(pauseMs);

    const cardsNumber = cards.length;
    const currentIndex = appContext.getIndex();
    const newIndex = CardsUtils.getNextCardIndex(currentIndex, cardsNumber);

    appContext.setIndex(newIndex);
    await processCard(appContext, dataSourceContext, voices, cards, newIndex);
  };

  const start = async (appContext: IAppContext, dataSourceContext: IDataSourceContext) => {
    started = true;
    const voices = await SpeechUtils.getVoices();
    const index = appContext.getIndex();
    await processCard(appContext, dataSourceContext, voices, dataSourceContext.getCards(), index);
  };

  const stop = () => {
    started = false;
  };

  // App
  const appContext = new AppContextBuilder()
    .withChildren([
      dataSourceContext.Component
    ])
    .withIndexUrlParam('index')
    .withStartedSetEventHandler(async (started) => {
      started && (await start(appContext, dataSourceContext));
      started || stop();
    })
    .build()
  
  // Render
  appContext.render(null);
};

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App callback={async () => await initApp()} />
  </React.StrictMode>
);

//setTimeout(initApp, 100);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
