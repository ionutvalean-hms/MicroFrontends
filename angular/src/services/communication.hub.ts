import {ICommunicationClient, OnChangeType, ValueType} from "./interfaces";
import {CommunicationClient} from "./comunication.client";
import {IframeCommunicationBroadcaster} from "./iframe.communication.broadcaster";
import {CommunicationBroadcaster} from "./communication.broadcaster";

export class CommunicationHub {
    protected clients: ICommunicationClient[] = [];

    public registerClient(name: string): ICommunicationClient {
        const existingClient = this.clients.find(c => c.name === name);
        if (existingClient) {
            return existingClient;
        }

        const result: ICommunicationClient = new CommunicationClient(this, name);

        this.clients.push(result);

        return result;
    }

    public registerIframeBroadcaster(name: string, contextWindow: Window): ICommunicationClient {
        const existingClient = this.clients.find(c => c.name === name);
        if (existingClient) {
            return existingClient;
        }

        const result: ICommunicationClient = new IframeCommunicationBroadcaster(this, name, contextWindow);

        this.clients.push(result);

        return result;
    }

    public disposeClient(client: ICommunicationClient): void {
        const index: number = this.clients.indexOf(client);

        if (index > -1) {
            this.clients.splice(index, 1);
        }
    }

    public publish(subject: string, value: ValueType, client: ICommunicationClient): void {
        for (const existingClient of this.clients){
            if (existingClient === client){
                continue;
            }

            if (existingClient instanceof CommunicationBroadcaster){
                existingClient.publish(subject, value);
            }
            else if (existingClient.subscribedSubjects[subject]){
                existingClient.subscribedSubjects[subject](value);
            }
        }
    }

    public subscribe(subject: string, onChange: OnChangeType, client: ICommunicationClient): void {
    }
}
