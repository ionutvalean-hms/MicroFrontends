import {CommunicationBroadcaster} from "./communication.broadcaster";
import {MessageType, OnChangeType, ValueType} from "./interfaces";
import {CommunicationHub} from "./communication.hub";

export class IframeCommunicationBroadcaster extends CommunicationBroadcaster {
    constructor(hub: CommunicationHub, private context: string) {
        super(hub);

        window.addEventListener("message", (event) => {
            if (!event.data || !event.data.type) {
                return;
            }

            switch (event.data.type) {
                case MessageType.Publish:
                    this.hub.publish(event.data.topic, event.data.value, this);
                    break;
            }
        });
    }
    public publish(topic: string, value: ValueType): void {
        if (!window || !window.postMessage) {
            return;
        }

        const messageObject = {
            type: MessageType.Publish,
            topic: topic,
            value: value
        };

        this.transportMessage(messageObject);
    }

    private transportMessage(message: any) {
        window.postMessage(message, "*");

        console.log(message);
    }
    subscribe(topic: string, onChange: OnChangeType): void {
    }
}