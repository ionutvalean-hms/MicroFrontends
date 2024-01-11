import {ClientCommunicationBase} from "./client.comunication-base";

export class CommunicationBroadcaster extends ClientCommunicationBase {
    public setInternalTopics(topics: string[]): void {
        this.subscribedTopics = {};

        for (const topic of topics) {
            this.subscribedTopics[topic] = this.broadcastInternalSubscribedTopic;
        }
    }

    private broadcastInternalSubscribedTopic() {
    }
}