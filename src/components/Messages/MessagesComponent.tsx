import React from 'react';
import { connect } from 'react-redux';
import 'firebase/firestore';
import { RootState } from '../../store/store';
import { DataState } from '../../store/data/reducer';

const mapStateToProps = ({ data }: RootState): { data: DataState } => ({
    data
});

class MessagesComponent extends React.Component {
    render() {
        // @ts-ignore
        // return this.props.data.messages.map((el: MessageData) => {
        //     return (
        //         <div className="Messages" key={new Date()}>
        //             <p>{el.user}</p>
        //             <p>{el.message}</p>
        //             <p>{el.date}</p>
        //         </div>
        //     );
        // });
        return <p>test</p>;
    }
}

export const Messages = connect(mapStateToProps)(MessagesComponent);
