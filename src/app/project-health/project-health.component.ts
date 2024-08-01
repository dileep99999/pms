import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment'; // Adjust path if needed

@Component({
  selector: 'app-project-health',
  templateUrl: './project-health.component.html',
  styleUrls: ['./project-health.component.css']
})
export class ProjectHealthComponent implements OnInit {
  projectHealth: any = {
    overallStatus: 'Green',
    completionPercentage: 0,
    milestones: [
      { number: 1, name: '', countdown: '', daysRemaining: 0 }
    ],
    challenges: [
      { description: '', mitigation: '' }
    ]
  };

  isEditing = false;

  constructor(private route: ActivatedRoute, private http: HttpClient) { }

  ngOnInit(): void {
    const projectId = this.route.parent?.snapshot.paramMap.get('id');
    if (projectId) {
      this.http.get(`${environment.apiUrl}/projects/${projectId}`)
        .subscribe(data => {
          this.projectHealth = data;
          this.calculateDaysRemaining();
        });
    }
  }

  enableEditing() {
    this.isEditing = true;
  }

  submitChanges() {
    const projectId = this.route.parent?.snapshot.paramMap.get('id');
    if (projectId) {
      this.http.put(`${environment.apiUrl}/projects/${projectId}/health`, this.projectHealth)
        .subscribe(response => {
          this.projectHealth = response;
          this.isEditing = false;
          this.calculateDaysRemaining(); // Recalculate days remaining
        });
    }
  }

  calculateDaysRemaining() {
    const currentDate = new Date();
    this.projectHealth.milestones.forEach((milestone: any) => {
      const milestoneDate = new Date(milestone.countdown);
      const timeDifference = milestoneDate.getTime() - currentDate.getTime();
      milestone.daysRemaining = Math.ceil(timeDifference / (1000 * 3600 * 24));
    });

    // Update overall status based on milestones
    const hasOverdueMilestone = this.projectHealth.milestones.some((milestone: any) => milestone.daysRemaining < 0);
    const hasUpcomingMilestone = this.projectHealth.milestones.some((milestone: any) => milestone.daysRemaining <= 10 && milestone.daysRemaining >= 0);

    if (hasOverdueMilestone) {
      this.projectHealth.overallStatus = 'Red';
    } else if (hasUpcomingMilestone) {
      this.projectHealth.overallStatus = 'Yellow';
    } else {
      this.projectHealth.overallStatus = 'Green';
    }
  }

  getStatusClass(status: string) {
    return {
      'status-green': status === 'Green',
      'status-yellow': status === 'Yellow',
      'status-red': status === 'Red'
    };
  }

  getDaysRemainingClass(daysRemaining: number) {
    return {
      'days-green': daysRemaining > 10,
      'days-yellow': daysRemaining <= 10 && daysRemaining >= 0,
      'days-red': daysRemaining < 0
    };
  }

  addMilestone() {
    const newNumber = this.projectHealth.milestones.length + 1;
    this.projectHealth.milestones.push({ number: newNumber, name: '', countdown: '', daysRemaining: 0 });
  }

  removeMilestone(index: number) {
    this.projectHealth.milestones.splice(index, 1);
    // Update milestone numbers after removal
    this.projectHealth.milestones.forEach((milestone: any, idx: number) => milestone.number = idx + 1);
  }

  addChallenge() {
    this.projectHealth.challenges.push({ description: '', mitigation: '' });
  }

  removeChallenge(index: number) {
    this.projectHealth.challenges.splice(index, 1);
  }
}
