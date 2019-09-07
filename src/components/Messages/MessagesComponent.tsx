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
                    <p key="sdsd">
                        <strong>Author:</strong> {el.user}
                    </p>
                    <p key="sdsdsdsd">
                        <strong>Message:</strong> {el.message}
                    </p>
                    <p key="554544554">
                        <strong>Post date:</strong> {date}
                    </p>
                </div>
            );
        });
    }
}

export const Messages = connect(mapStateToProps)(MessagesComponent);
