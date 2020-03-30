import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ChatService {

  // private socket =io('http://localhost:3000');
  socket: any;
  url: any = '192.168.225.53:3000'
  constructor() { 
    this.socket = io(this.url);
  }

  listen(event: string) {
    return new Observable((subscriber) => {
      this.socket.on(event, (data) => {
        subscriber.next(data);
      });
    });
  }

  emit(event: string, data: any) {
    this.socket.emit(event, data);
  }

  sendMessage(data: any) {
    this.socket.emit('sendMessage',data);
  }

  newMessageReceived(){
    return new Observable<{user:String, message:String}>(observer=>{
        this.socket.on('new Message', (data)=>{
            observer.next(data);
        });
  });
  }
}
