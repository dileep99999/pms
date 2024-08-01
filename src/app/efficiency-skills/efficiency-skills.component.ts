import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment'; // Adjust path if needed

@Component({
  selector: 'app-efficiency-skills',
  templateUrl: './efficiency-skills.component.html',
  styleUrls: ['./efficiency-skills.component.css']
})
export class EfficiencySkillsComponent implements OnInit {
  efficiencySkills: any = {
    skillMatrix: [{ skill: '', required: false, teamMembers: [] }],
    softwareTools: [{ name: '', version: '', licensing: '' }],
    dependencies: [{ task: '', dependentOn: '' }]
  };

  isEditing = false;

  constructor(private route: ActivatedRoute, private http: HttpClient) { }

  ngOnInit(): void {
    const projectId = this.route.parent?.snapshot.paramMap.get('id');
    if (projectId) {
      this.http.get(`${environment.apiUrl}/projects/${projectId}`)
        .subscribe((data: any) => {
          this.efficiencySkills = data.efficiencySkills || this.efficiencySkills;
        });
    }
  }

  enableEditing() {
    this.isEditing = true;
  }

  submitChanges() {
    const projectId = this.route.parent?.snapshot.paramMap.get('id');
    if (projectId) {
      this.http.put(`${environment.apiUrl}/projects/${projectId}/efficiency-skills`, this.efficiencySkills)
        .subscribe((response: any) => {
          this.efficiencySkills = response.efficiencySkills;
          this.isEditing = false;
        });
    }
  }

  addSkill() {
    this.efficiencySkills.skillMatrix.push({ skill: '', required: false, teamMembers: [] });
  }

  removeSkill(index: number) {
    this.efficiencySkills.skillMatrix.splice(index, 1);
  }

  addSoftwareTool() {
    this.efficiencySkills.softwareTools.push({ name: '', version: '', licensing: '' });
  }

  removeSoftwareTool(index: number) {
    this.efficiencySkills.softwareTools.splice(index, 1);
  }

  addDependency() {
    this.efficiencySkills.dependencies.push({ task: '', dependentOn: '' });
  }

  removeDependency(index: number) {
    this.efficiencySkills.dependencies.splice(index, 1);
  }
}
