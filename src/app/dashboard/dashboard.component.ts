import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  projects: any[] = [];
  newProjectDetails: any = {
    name: '',
    description: '',
    manager: '',
    status: '',
    startDate: '',
    endDate: '',
    customer: '',
    targetDeliveryDate: '',
    projectSize: '',
    region: '',
    internalTeam: [],
    externalTeam: [],
    outsourcedJobs: []
  };
  showForm = false;

  @ViewChild('projectForm', { static: false }) projectForm!: NgForm;

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.fetchProjects();
  }

  fetchProjects(): void {
    this.http.get<any[]>('http://localhost:3000/projects')
      .subscribe(data => {
        this.projects = data;
      }, error => {
        console.error('Error fetching projects', error);
      });
  }

  addProject(): void {
    if (this.projectForm.form.valid) {
      const projectData = {
        name: this.newProjectDetails.name,
        description: this.newProjectDetails.description, // Ensure this field is included
        manager: this.newProjectDetails.manager, // Ensure this field is included
        status: this.newProjectDetails.status, // Ensure this field is included
        progress: this.newProjectDetails.progress || 0, // Default to 0 if not provided
        startDate: this.newProjectDetails.startDate,
        endDate: this.newProjectDetails.endDate,
        customer: this.newProjectDetails.customer,
        targetDeliveryDate: this.newProjectDetails.targetDeliveryDate,
        projectSize: this.newProjectDetails.projectSize,
        region: this.newProjectDetails.region,
        internalTeam: this.newProjectDetails.internalTeam,
        externalTeam: this.newProjectDetails.externalTeam,
        outsourcedJobs: this.newProjectDetails.outsourcedJobs
      };
  
      this.http.post<any>('http://localhost:3000/projects', projectData)
        .subscribe(response => {
          this.projects.push(response);
          this.newProjectDetails = {
            name: '',
            description: '', // Ensure this field is reset
            manager: '', // Ensure this field is reset
            status: '', // Ensure this field is reset
            progress: 0, // Ensure this field is reset
            startDate: '',
            endDate: '',
            customer: '',
            targetDeliveryDate: '',
            projectSize: '',
            region: '',
            internalTeam: [],
            externalTeam: [],
            outsourcedJobs: []
          };
          this.showForm = false;
        }, error => {
          console.error('Error adding project', error);
        });
    }
  }
  
  toggleForm(): void {
    this.showForm = !this.showForm;
  }

  selectProject(project: any): void {
    this.router.navigate(['/project', project._id]);
  }

  addInternalTeamMember(): void {
    this.newProjectDetails.internalTeam.push({ name: '', role: '' });
  }

  removeInternalTeamMember(index: number): void {
    this.newProjectDetails.internalTeam.splice(index, 1);
  }

  addExternalTeamMember(): void {
    this.newProjectDetails.externalTeam.push({ name: '', contribution: '' });
  }

  removeExternalTeamMember(index: number): void {
    this.newProjectDetails.externalTeam.splice(index, 1);
  }

  addOutsourcedJob(): void {
    this.newProjectDetails.outsourcedJobs.push({ task: '', deadline: '', responsible: '' });
  }

  removeOutsourcedJob(index: number): void {
    this.newProjectDetails.outsourcedJobs.splice(index, 1);
  }
}
