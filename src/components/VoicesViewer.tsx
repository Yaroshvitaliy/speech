import { Async } from 'react-async'
import * as SpeechUtils from '../utils/speechUtils';

export const VoicesViewer = () => (
    <div className="VoicesViewer-content">
        <h4>Voices</h4>
        <Async promiseFn={SpeechUtils.getVoices}>
            <Async.Pending>Loading...</Async.Pending>
            <Async.Rejected>
                {(error) => `Error: ${error.message}`}
            </Async.Rejected>
            <Async.Fulfilled>
                { (data) => 
                    <ul>
                        { (data as SpeechSynthesisVoice[]).map((voice, i) =>
                            <li key={i}>{i} - [{voice.lang}] {voice.name}</li>)
                        }
                    </ul>
                }
            </Async.Fulfilled>
        </Async>
    </div>
);

export default VoicesViewer;