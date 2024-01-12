import {Component} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import {CommunicationHub} from "../services/communication.hub";
import {ICommunicationClient} from "../services/interfaces";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'shell';
  value: string = "shell initial value";
  private readonly client: ICommunicationClient;
  private hub: CommunicationHub;


  constructor() {

    this.hub = new CommunicationHub();

    this.client = this.hub.registerClient("shellClient");

  }


  ngAfterViewInit(): void {
    let iframe = document.getElementById("reactIframe") as any;

    this.hub.registerIframeBroadcaster("reactIframe", iframe.contentWindow);

    // hub.registerIframeBroadcaster(iframe.contentWindow);

    this.client.subscribe("reactSubject", (value) => {
      this.value = value;

      console.log(`new value (${value}) has been published on the subjectA`);
    });

  }


  onPublishClick() {
    if (this.client) {
      this.client.publish("shellSubject", this.value);
    }
  }
}
