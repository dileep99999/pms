import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment'; // Adjust path if needed

@Component({
  selector: 'app-team-structure',
  templateUrl: './team-structure.component.html',
  styleUrls: ['./team-structure.component.css']
})
export class TeamStructureComponent implements OnInit {
  project: any;
  isEditing = false;

  constructor(private route: ActivatedRoute, private http: HttpClient) { }

  ngOnInit(): void {
    const projectId = this.route.parent?.snapshot.paramMap.get('id');
    if (projectId) {
      this.http.get(`${environment.apiUrl}/projects/${projectId}`)
        .subscribe(data => {
          this.project = data;
        });
    }
  }

  enableEditing() {
    this.isEditing = true;
  }

  submitChanges() {
    const projectId = this.project._id;
    this.http.put(`${environment.apiUrl}/projects/${projectId}`, this.project)
      .subscribe(response => {
        this.isEditing = false;
      });
  }

  removeInternalTeamMember(index: number) {
    this.project.internalTeam.splice(index, 1);
  }

  removeExternalTeamMember(index: number) {
    this.project.externalTeam.splice(index, 1);
  }

  removeOutsourcedJob(index: number) {
    this.project.outsourcedJobs.splice(index, 1);
  }
  addInternalTeamMember() {
    this.project.internalTeam.push({ name: '', role: '' });
  }
  
  addExternalTeamMember() {
    this.project.externalTeam.push({ name: '', contribution: '' });
  }
  
  // Add a new outsourced job
  addOutsourcedJob() {
    this.project.outsourcedJobs.push({ task: '', deadline: '', responsible: '' });
  }
}
