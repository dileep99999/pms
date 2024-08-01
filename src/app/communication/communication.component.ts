import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
//import { ProjectService } from '../project.service'; // Adjust the path according to your project structure

interface Message {
  id: number;
  user: string;
  content: string;
  timestamp: string;
}

@Component({
  selector: 'app-communication',
  templateUrl: './communication.component.html',
  styleUrls: ['./communication.component.css']
})
export class CommunicationComponent  {
 
/** 
  constructor(private fb: FormBuilder, private projectService: ProjectService) {
    this.internalChatForm = this.fb.group({
      user: ['', Validators.required],
      content: ['', Validators.required],
      timestamp: [new Date().toISOString(), Validators.required]
    });
  }

  ngOnInit() {
    this.loadInternalMessages();
  }

  loadInternalMessages() {
    this.projectService.getInternalMessages().subscribe(
      (data: Message[]) => {
        this.internalMessages = data;
      },
      error => {
        console.error('Error loading messages', error);
      }
    );
  }

  sendInternalMessage() {
    if (this.internalChatForm.invalid) {
      return;
    }

    this.projectService.sendInternalMessage(this.internalChatForm.value).subscribe(
      response => {
        this.loadInternalMessages();
        this.internalChatForm.reset({ timestamp: new Date().toISOString() });
      },
      error => {
        console.error('Error sending message', error);
      }
    );
  }

  markAsSeen(id: number) {
    this.projectService.deleteInternalMessage(id).subscribe(
      response => {
        this.loadInternalMessages();
      },
      error => {
        console.error('Error deleting message', error);
      }
    );
  }*/
}
