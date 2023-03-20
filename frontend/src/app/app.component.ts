import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ChatService } from './services/chat.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit {
  roomId!: string;
  messageText!: string;
  messageArray: {user:string,message:string}[] = [];
  phone!: string;
  currentUser!:any;
  selectedUser!:any;
  showScreen!:boolean;
  userList = [
    {
      id: 1,
      name: "A",
      phone: "8899889988",
      roomId:{
        1:'room-1',
        2:'room-2',
        3:'room-3'
      }
    },
    {
      id: 2,
      name: "B",
      phone: "8877887788",
      roomId:{
        1:'room-1',
        2:'room-2',
        4:'room-4'
      }
    },
    {
      id: 3,
      name: "C",
      phone: "7788778877",
      roomId:{
        1:'room-1',
        3:'room-3',
        4:'room-4'
      }
    },
  ]

  constructor(
    private socketService:ChatService
  ){
    this.socketService.getMessage().subscribe((data : {user:string, message: string}) => {
      this.messageArray.push(data);
    })
  }

  ngOnInit(): void {
    this.currentUser = this.userList[0];
  }

  ngAfterViewInit(): void {
    
  }

  selectUserHandler(phone:string){
    this.selectedUser = this.userList.find(user => user.phone === phone);
    //this.roomId = this.selectedUser.roomId(this.selectedUser.id);
    this.messageArray = [];
    this.join(this.currentUser.name, this.roomId);
  }

  join(userName:string, roomId:string){
    this.socketService.joinRoom({user:userName, roomId:roomId});
  }

  sendMessage(){
    // this.messageText = msg
    this.socketService.sendMessage({
      data:this.currentUser.name,
      room:this.roomId,
      message: this.messageText,
    });
    this.messageText = '';
  }
}
