import React from 'react';
import Auth from './components/Auth/Auth';
import './App.css'

export class App extends React.Component {
  render() {
    return (
      <div className="header">
        <Auth />
      </div>
    );
  }
}
