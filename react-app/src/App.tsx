import './App.css';
import {ICommunicationClient} from "./services/interfaces";
import {CommunicationHub} from "./services/communication.hub";
import {useState} from "react";


function App() {
    const hub: CommunicationHub = (window as any).hub
    hub.registerIframeBroadcaster("reactIFrameBroadcaster");
    const client: ICommunicationClient = hub.registerClient("reactCommunicationClient");
    const [text, setText] = useState("react initial text");

    function onValueChanged(event: any) {
        setText(event.target.value);
    }

    return (
        <div className="App" style={{backgroundColor: 'lightblue'}}>
            <span>React child app</span>
            <textarea style={{width: "100%"}} value={text} onChange={onValueChanged}></textarea>

            <button onClick={(): void => {
                client.publish("reactSubject", text);
            }}>Publish</button>

            <button onClick={(): void => {
                client.subscribe("shellSubject", newValue => setText(newValue));
            }}>Subscribe to shell subject</button>
        </div>
    );
}

export default App;
