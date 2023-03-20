import { Injectable } from '@angular/core';
import { io,Socket } from 'socket.io-client';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private socket!: Socket
  url = 'https://localhost:3000';
  constructor() {
    this.socket = io(this.url);
  }

  joinRoom(data:any){
    this.socket.emit('join',data);
  }

  sendMessage(data:any){
    //console.log("data........",data);
    this.socket.emit('message',data);
  }

  getMessage(): Observable<any> {
      return new Observable<{user: string,message:string}>(observer => {
        this.socket.on('new message',(data:any) => {
          //console.log("new message......",data);
        observer.next(data);
      });
      return () =>{
        this.socket.disconnect();
      }
    });
  }
}
