import React from 'react';
import Auth from './components/Auth/Auth';
import './App.css';
import { Messages } from './components/Messages/MessagesComponent';
import { WriteMessageComponent } from './components/Messages/WriteMessage';
import { connect } from 'react-redux';
import { RootState } from './store/store';
import { DataState } from './store/data/reducer';

const mapStateToProps = ({ data }: RootState): { data: DataState } => ({
    data
});

class _App extends React.Component {
    render() {
        return (
            <div className="header">
                <Auth />
                <Messages />
                // @ts-ignore
                {this.props.data.isAuth ? <WriteMessageComponent /> : null}
            </div>
        );
    }
}

export const App = connect(mapStateToProps)(_App);
