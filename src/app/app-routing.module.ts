import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProjectDetailsComponent } from './project-details/project-details.component';
import { ProjectOverviewComponent } from './project-overview/project-overview.component';
import { TeamStructureComponent } from './team-structure/team-structure.component';
import { ProjectHealthComponent } from './project-health/project-health.component';
import { ProjectMilestonesComponent } from './project-milestones/project-milestones.component';
import { EfficiencySkillsComponent } from './efficiency-skills/efficiency-skills.component';
import { DocumentationComponent } from './documentation/documentation.component';
import { CommunicationComponent } from './communication/communication.component';
import { AdditionalConsiderationsComponent } from './additional-considerations/additional-considerations.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent },
  {
    path: 'project/:id', component: ProjectDetailsComponent, children: [
      { path: '', redirectTo:'overview',pathMatch:'full'},
      { path: 'overview', component: ProjectOverviewComponent },
      { path: 'team-structure', component: TeamStructureComponent },
      { path: 'project-health', component: ProjectHealthComponent },
      {path:'project-milestones',component:ProjectMilestonesComponent},
      { path: 'project/:id/milestones', component: ProjectMilestonesComponent },
      { path: 'efficiency-skills', component: EfficiencySkillsComponent },
      { path: 'documentation', component: DocumentationComponent },
      { path: 'communication', component: CommunicationComponent },
      { path: 'additional-considerations', component: AdditionalConsiderationsComponent },
    ]
  },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
