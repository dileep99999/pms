import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment'; // Adjust path if needed

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  constructor(private http: HttpClient) {}

  getProjectById(id: string) {
    return this.http.get(`${environment.apiUrl}/projects/${id}`);
  }

  updateProject(id: string, projectData: any) {
    return this.http.put(`${environment.apiUrl}/projects/${id}`, projectData);
  }

  updateProjectHealth(projectId: string, projectHealth: any) {
    return this.http.put(`${environment.apiUrl}/projects/${projectId}/health`, { projectHealth });
  }

  updateProjectMilestones(id: string, milestones: any) {
    return this.http.put(`${environment.apiUrl}/projects/${id}/milestones`, milestones);
  }

  updateEfficiencySkills(projectId: string, efficiencySkills: any) {
    return this.http.put<any>(`${environment.apiUrl}/projects/${projectId}/efficiency-skills`, efficiencySkills);
  }

  getInternalMessages() {
    return this.http.get(`${environment.apiUrl}/internal-messages`);
  }

  sendInternalMessage(message: any) {
    return this.http.post(`${environment.apiUrl}/internal-messages`, message);
  }

  deleteInternalMessage(id: number) {
    return this.http.delete(`${environment.apiUrl}/internal-messages/${id}`);
  }
}
