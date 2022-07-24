import React from 'react';
import { AppContext } from '../contexts/appContext';
import { DataSourceContext } from '../contexts/dataSourceContext';
import './SourceViewer.css';

export const SourceViewer = () => {
    const { started } = React.useContext(AppContext);
    const { rawData, setRawData, isValid, error } = React.useContext(DataSourceContext);
    const contentClasses = `SoureViewer-content ${isValid ? '' : 'SoureViewer-content-invalid'}`;

    return (
        <div className={contentClasses}>
            <h4>Cards</h4>
            <textarea
                value={rawData} 
                onChange={(e) => setRawData(e.target.value)}
                readOnly={started}
                rows={20}
            ></textarea>
            <div className="SoureViewer-error">{error}</div>
        </div>
    );
};

export default SourceViewer;