import React from 'react';
import Auth from './components/Auth/Auth'
import './App.css'
import MessagesComponent from './components/Messages/MessagesComponent';

export class App extends React.Component {
    render() {
        return (
            <div className="header">
                <Auth/>
                <MessagesComponent />
            </div>
        )
    }
}
