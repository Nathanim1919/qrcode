export interface IEvent {
    _id: string;
    name: string;
    date: string;
    time: string;
    type: string;
    status: string;
    visibility: 'Public' | 'Private';
}