import { Component, OnInit, ViewChild, ElementRef, QueryList, AfterViewInit, ViewChildren } from '@angular/core';
import { ChatService } from '../services/chat/chat-service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LocalStorage } from '../services/local-storage';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})

export class ChatComponent implements OnInit, AfterViewInit {
  @ViewChild('chatHistory') chatHistoryRef!: ElementRef;
  @ViewChildren('chatHistory') chatHistoryElements!: QueryList<ElementRef>;
  messages!: Observable<any[]>;
  newMsg = '';

  constructor(private chatService: ChatService, private router: Router, localStr:LocalStorage){}
  
  ngAfterViewInit(){
    this.scrollToBottom();
  }
  

  
  scrollToBottom() {
    if (this.chatHistoryElements && this.chatHistoryElements.length > 0) {
        const chatHistory: HTMLDivElement = this.chatHistoryRef.nativeElement;
        chatHistory.scrollTop = chatHistory.scrollHeight;
    }
}
  ngOnInit(): void {
    
    this.messages = this.chatService.getChatMessages();
    this.messages.subscribe(messages => {
      console.log('Received Messages:', messages);
      setTimeout(() => {
        this.scrollToBottom();
      });
  });
  }
  sendMessage(){
    this.chatService.addChatMessage(this.newMsg).then(() => {
      this.newMsg = '';
      this.scrollToBottom();
    });
  }
  onKeyDown(event: KeyboardEvent){
    if (event.key === 'Enter') {
      event.preventDefault(); 
      if (this.newMsg.trim() !== '') {
        this.sendMessage(); 
      }

  }
}

  signOut(){
    this.chatService.signOut().then(()=>{
      this.router.navigateByUrl('/', {replaceUrl: true});
    });
  }

}
