import {CommunicationBroadcaster} from "./communication.broadcaster";
import {MessageType, OnChangeType, ValueType} from "./interfaces";
import {CommunicationHub} from "./communication.hub";

export class IframeCommunicationBroadcaster extends CommunicationBroadcaster {
    constructor(hub: CommunicationHub, private contextWindow: Window) {
        super(hub);

        try {

          window.addEventListener("message", (event) => {
            if (!event.data || !event.data.type) {
              return;
            }

            console.log(`shell event origin '${event.origin}' message: ${JSON.stringify(event.data)}`);

            switch (event.data.type) {
              case MessageType.Publish:
                this.hub.publish(event.data.topic, event.data.value, this);
                break;
            }
          });
        }
        catch (e) {
          console.log(e);
        }
    }
    public override publish(topic: string, value: ValueType): void {
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
      this.contextWindow.postMessage(message, "*");

        console.log(message);
    }
    public override subscribe(topic: string, onChange: OnChangeType): void {
    }
}
