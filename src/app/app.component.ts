import { Component, OnInit } from '@angular/core';
import { ChatService } from './chat.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers:[ChatService]
})
export class AppComponent implements OnInit {
  title = 'Application';
  message: any;
  messageRecieved = [];
  constructor(
    private chatService: ChatService,
  ) {}

  ngOnInit() {
    this.chatService.listen('test')
    .subscribe((data)=>{
    })
    this.chatService.newMessageReceived()
    .subscribe((data)=>{
      this.messageRecieved.push(data);
    })
  }

  sendMessage(message: any){
    this.chatService.sendMessage({message:message});
    this.clearData();
  }

  clearData() {
    this.message = '';
  }
}
