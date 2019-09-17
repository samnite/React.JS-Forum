import { firestore } from 'firebase';

export const timeConverter = (UNIX_timestamp: firestore.Timestamp) => {
    const a = new Date(UNIX_timestamp.toDate());
    const months = [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec'
    ];
    const year = a.getFullYear();
    const month = months[a.getMonth()];
    const date = a.getDate();
    const hour = a.getHours();
    const min = a.getMinutes();
    const sec = a.getSeconds();

    const formatZeros = (number: number): string | number => {
        if (number < 10) {
            return `0${number}`;
        } else {
            return number;
        }
    };

    return (
        date +
        ' ' +
        month +
        ' ' +
        year +
        ' ' +
        formatZeros(hour) +
        ':' +
        formatZeros(min) +
        ':' +
        formatZeros(sec)
    );
};
