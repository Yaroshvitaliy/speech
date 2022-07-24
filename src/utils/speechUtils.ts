import { ICardData } from '../core/domain';

export const getVoices = () => 
    new Promise<SpeechSynthesisVoice[]>((resolve) => {
        const synth = window.speechSynthesis;
        const intervalId = setInterval(() => {
            if (synth.getVoices().length !== 0) {
                resolve(synth.getVoices());
                clearInterval(intervalId);
            }
        }, 10);
    });

const speech = (text: string, voice: SpeechSynthesisVoice, lang: string, timeout: number) =>
    new Promise<void>((resolve) => {
        if (!text || !voice || !lang) {
            resolve();
            return;
        }

        const synthUtterance = new SpeechSynthesisUtterance();

        // fallback mechanism
        let timeoutId = setTimeout(() => {
            resolve();
        }, timeout);

        synthUtterance.addEventListener('end', e => {
            clearTimeout(timeoutId);
            synthUtterance.removeEventListener('end', e => {});
            resolve();
        });

        synthUtterance.text = text;
        synthUtterance.voice = voice;
        synthUtterance.lang = lang;

        window.speechSynthesis.speak(synthUtterance);
    });

export const speechCard = async (voices: SpeechSynthesisVoice[], foreignLanguageVoiceName: string, nativeLanguageVoiceName: string, card: ICardData) => {
    const speechTimeoutMs = 5000;
    const foreignLanguageVoice = voices.find(x => x.name === foreignLanguageVoiceName) || voices[0];
    const nativeLanguageVoice = voices.find(x => x.name === nativeLanguageVoiceName) || voices[0];

    await speech(card.foreignLanguage, foreignLanguageVoice, foreignLanguageVoice.lang, speechTimeoutMs);

    for (const nativeLanguage of card.nativeLanguage || []) {
        await speech(nativeLanguage, nativeLanguageVoice, nativeLanguageVoice.lang, speechTimeoutMs);
    }
};