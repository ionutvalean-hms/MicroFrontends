import {ICommunicationClient, IDisposable, OnChangeType} from "./interfaces";
import {CommunicationHub} from "./communication.hub";

export class CommunicationClient implements ICommunicationClient, IDisposable {
    public id: string = Math.random().toString();

    constructor(protected hub: CommunicationHub, public name: string) {
    }

    subscribedSubjects: { [subject: string]: OnChangeType } = {};

    publish(subject: string, value: any): void {
        this.hub.publish(subject, value, this);
    }

    subscribe(subject: string, onChange: OnChangeType): void {
        if (!this.subscribedSubjects[subject]) {
            this.subscribedSubjects[subject] = onChange;
        }

        this.subscribedSubjects[subject] = onChange;

        this.hub.subscribe(subject, onChange, this);
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