import React, {useState} from 'react';

import {HeroHeader} from 'components/HeroHeader';
import {SensorConfiguration} from 'components/SensorConfiguration';
import socket from 'Socket';

import './App.scss';

const App: React.FC = () => {
    const [isLoading, setIsLoading] = useState(false);

    socket.on('initial_loading_finished', () => {
        setIsLoading(false);
    });

    const display = (isLoading)
        ? <h3>Loading, please wait...</h3>
        // : <h3>Please connect a sensor to begin</h3>;
        : <SensorConfiguration/>;

    return (
        <div className="home-page">
            <HeroHeader title="Home"/>
            <section className="card">
                <div className={'container has-text-centered ' + (isLoading ? 'is-loading' : '')} id="layered-background">
                    {display}
                </div>
            </section>
        </div>
    );
};

export default App;
