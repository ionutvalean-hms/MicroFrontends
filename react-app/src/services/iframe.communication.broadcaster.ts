import {CommunicationBroadcaster} from "./communication.broadcaster";
import {MessageType, OnChangeType, ValueType} from "./interfaces";
import {CommunicationHub} from "./communication.hub";

export class IframeCommunicationBroadcaster extends CommunicationBroadcaster {
    constructor(hub: CommunicationHub, name: string){
        super(hub, name);

        window.addEventListener("message", (event) => {
            console.log(`react event origin '${event.origin}' message: ${JSON.stringify(event.data)}`);

            if (!event.data || !event.data.type) {
                return;
            }

            switch (event.data.type) {
                case MessageType.Publish:
                    this.hub.publish(event.data.subject, event.data.value, this);
                    break;
            }
        });
    }
    public publish(subject: string, value: ValueType): void {
        if (!window || !window.postMessage) {
            return;
        }

        const messageObject = {
            type: MessageType.Publish,
            subject: subject,
            value: value
        };

        this.transportMessage(messageObject);
    }

    private transportMessage(message: any) {
        window.parent.postMessage(message, "*");

        console.log(message);
    }
    subscribe(subject: string, onChange: OnChangeType): void {
    }
}