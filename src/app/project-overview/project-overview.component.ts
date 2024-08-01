import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment'; // Adjust path if needed

@Component({
  selector: 'app-project-overview',
  templateUrl: './project-overview.component.html',
  styleUrls: ['./project-overview.component.css']
})
export class ProjectOverviewComponent implements OnInit {
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
}
