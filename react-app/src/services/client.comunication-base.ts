import {ICommunicationClient, IDisposable, OnChangeType} from "./interfaces";
import {CommunicationHub} from "./communication.hub";

export class ClientCommunicationBase implements ICommunicationClient, IDisposable {
    public id: string = Math.random().toString();

    constructor(protected hub: CommunicationHub, public name: string) {
    }

    subscribedTopics: { [topic: string]: OnChangeType } = {};

    publish(topic: string, value: any): void {
        this.hub.publish(topic, value, this);
    }

    subscribe(topic: string, onChange: OnChangeType): void {
        if (!this.subscribedTopics[topic]) {
            this.subscribedTopics[topic] = onChange;
        }

        this.subscribedTopics[topic] = onChange;

        this.hub.subscribe(topic, onChange, this);
    }

    dispose(): void {
        if (this.hub) {
            this.hub.disposeClient(this);
        }
    }

    public toString(): string {
        return this.name;
    }
}