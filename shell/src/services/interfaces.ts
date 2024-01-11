export type ValueType = any;
export type OnChangeType = (newValue: ValueType) => void;

export interface ICommunicationClient {
    subscribedTopics: { [topic: string] : OnChangeType};

    publish(topic: string, value: ValueType): void;

    subscribe(topic: string, onChange: OnChangeType): void;
}

export interface IDisposable {
    dispose(): void;
}
export enum MessageType {
    Publish = 1,
}


