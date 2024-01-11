import {Component, ElementRef, ViewChild} from '@angular/core';
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

    this.client = this.hub.registerClient();

  }


  ngAfterViewInit(): void {
    let iframe = document.getElementById("reactIframe") as any;

    this.hub.registerIframeBroadcaster(iframe.contentWindow);

    // hub.registerIframeBroadcaster(iframe.contentWindow);

    this.client.subscribe("reactTopic", (value) => {
      this.value = value;

      console.log(value);
    });

  }


  onPublishClick() {
    if (this.client) {
      this.client.publish("shellTopic", this.value);
    }
  }
}
