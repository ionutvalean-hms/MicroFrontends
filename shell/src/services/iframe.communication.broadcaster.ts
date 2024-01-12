import {CommunicationBroadcaster} from "./communication.broadcaster";
import {MessageType, OnChangeType, ValueType} from "./interfaces";
import {CommunicationHub} from "./communication.hub";

export class IframeCommunicationBroadcaster extends CommunicationBroadcaster {
    constructor(hub: CommunicationHub, name: string, private contextWindow: Window) {
        super(hub, name);

        try {

          window.addEventListener("message", (event) => {
            if (!event.data || !event.data.type) {
              return;
            }

            console.log(`shell event origin '${event.origin}' message: ${JSON.stringify(event.data)}`);

            switch (event.data.type) {
              case MessageType.Publish:
                this.hub.publish(event.data.subject, event.data.value, this);
                break;
            }
          });
        }
        catch (e) {
          console.log(e);
        }
    }
    public override publish(subject: string, value: ValueType): void {
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
      this.contextWindow.postMessage(message, "*");

        console.log(message);
    }
    public override subscribe(subject: string, onChange: OnChangeType): void {
    }
}
