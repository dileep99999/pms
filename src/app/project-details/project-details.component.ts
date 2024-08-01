import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';

import { Router } from '@angular/router';

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.css']
})
export class ProjectDetailsComponent{
  sidebarClosed: boolean = false;
  constructor(private router: Router, private http: HttpClient) {}

  toggleSidebar() {
    this.sidebarClosed = !this.sidebarClosed;
  }
  navigatetoDashboard(){
    //this.router.navigate(['/dashboard'])
    this.router.navigate(['/dashboard']);
  }
  
}
