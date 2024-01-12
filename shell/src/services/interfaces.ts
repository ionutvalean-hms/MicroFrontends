export type ValueType = any;
export type OnChangeType = (newValue: ValueType) => void;

export interface ICommunicationClient {
    name: string;

    subscribedSubjects: { [subject: string] : OnChangeType};

    publish(subject: string, value: ValueType): void;

    subscribe(subject: string, onChange: OnChangeType): void;
}

export interface IDisposable {
    dispose(): void;
}
export enum MessageType {
    Publish = 1,
}


