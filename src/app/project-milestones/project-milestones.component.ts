import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment'; // Adjust path if needed

@Component({
  selector: 'app-project-milestones',
  templateUrl: './project-milestones.component.html',
  styleUrls: ['./project-milestones.component.css']
})
export class ProjectMilestonesComponent implements OnInit {
  projectMilestones: any = {
    majorMilestones: [
      { number: 1, name: '', date: '' }
    ],
    internalMilestones: {
      'To Do': [
        { name: '', description: '', priority: 'Medium' }
      ],
      'In Progress': [
        { name: '', description: '', priority: 'Medium' }
      ],
      'Done': [
        { name: '', description: '', priority: 'Medium' }
      ]
    }
  };

  isEditing = false;

  constructor(private route: ActivatedRoute, private http: HttpClient) { }

  ngOnInit(): void {
    const projectId = this.route.parent?.snapshot.paramMap.get('id');
    if (projectId) {
      this.http.get(`${environment.apiUrl}/projects/${projectId}/milestones`)
        .subscribe(data => {
          this.projectMilestones = data;
        });
    }
  }

  enableEditing() {
    this.isEditing = true;
  }

  submitChanges() {
    const projectId = this.route.parent?.snapshot.paramMap.get('id');
    if (projectId) {
      this.http.put(`${environment.apiUrl}/projects/${projectId}/milestones`, this.projectMilestones)
        .subscribe(response => {
          this.projectMilestones = response;
          this.isEditing = false;
        });
    }
  }

  addMajorMilestone() {
    const newNumber = this.projectMilestones.majorMilestones.length + 1;
    this.projectMilestones.majorMilestones.push({ number: newNumber, name: '', date: '' });
  }

  removeMajorMilestone(index: number) {
    this.projectMilestones.majorMilestones.splice(index, 1);
    this.projectMilestones.majorMilestones.forEach((milestone: any, idx: number) => milestone.number = idx + 1);
  }

  addInternalMilestone(status: string) {
    this.projectMilestones.internalMilestones[status].push({ name: '', description: '', priority: 'Medium' });
  }

  removeInternalMilestone(status: string, index: number) {
    this.projectMilestones.internalMilestones[status].splice(index, 1);
  }

  getPriorityClass(priority: string) {
    return {
      'priority-high': priority === 'High',
      'priority-medium': priority === 'Medium',
      'priority-low': priority === 'Low'
    };
  }
}
