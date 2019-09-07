import React from 'react';
import { connect } from 'react-redux';
import 'firebase/firestore';
import { RootState } from '../../store/store';
import { DataState } from '../../store/data/reducer';
import { MessageData } from '../../store/data/actions';
import { timeConverter } from '../../utils/convertDate';
import './Messages.css';

const mapStateToProps = ({ data }: RootState): { data: DataState } => ({
    data
});

class MessagesComponent extends React.Component {
    render() {
        // @ts-ignore
        return this.props.data.messages.map((el: MessageData) => {
            // @ts-ignore
            const date = timeConverter(el.date);
            return (
                // @ts-ignore
                <div className="Messages" key={el.key}>
                    <p>{el.message}</p>

                    <p>
                        <strong>Author:</strong> {el.user}
                    </p>
                    <span className="time-right">
                        <strong>Post date:</strong> {date}
                    </span>
                </div>
            );
        });
    }
}

export const Messages = connect(mapStateToProps)(MessagesComponent);
