import {ICommunicationClient, OnChangeType, ValueType} from "./interfaces";
import {ClientCommunicationBase} from "./client.comunication-base";
import {IframeCommunicationBroadcaster} from "./iframe.communication.broadcaster";

export class CommunicationHub {
    protected clients: ICommunicationClient[] = [];

    public registerClient(): ICommunicationClient {
        const result: ICommunicationClient = new ClientCommunicationBase(this);

        this.clients.push(result);

        return result;
    }

    public registerIframeBroadcaster(contextWindow: Window): ICommunicationClient {
        const result: ICommunicationClient = new IframeCommunicationBroadcaster(this, contextWindow);

        this.clients.push(result);

        return result;
    }

    public disposeClient(client: ICommunicationClient): void {
        const index: number = this.clients.indexOf(client);

        if (index > -1) {
            this.clients.splice(index, 1);
        }
    }

    public publish(topic: string, value: ValueType, client: ICommunicationClient): void {
        for (const existingClient of this.clients){
            if (existingClient === client){
                continue;
            }

            if (existingClient instanceof IframeCommunicationBroadcaster){
                existingClient.publish(topic, value);
            }
            else if (existingClient.subscribedTopics[topic]){
                existingClient.subscribedTopics[topic](value);
            }
        }
    }

    public subscribe(topic: string, onChange: OnChangeType, client: ICommunicationClient): void {
        let topicList: string[] = [];

        for (const existingClient of this.clients.filter(c => !(c instanceof IframeCommunicationBroadcaster))){
            topicList = topicList.concat(Object.keys(existingClient.subscribedTopics));
        }

        const uniqueTopics: string[] = topicList.filter((value, index, self) => self.indexOf(value) === index);

        for (const iframeClient of this.clients.filter(c => c instanceof IframeCommunicationBroadcaster)){
            (iframeClient as IframeCommunicationBroadcaster).setInternalTopics(uniqueTopics);
        }
    }
}
