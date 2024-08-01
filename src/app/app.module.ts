import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms'; 
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProjectDetailsComponent } from './project-details/project-details.component';

import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { ProjectOverviewComponent } from './project-overview/project-overview.component';
import { TeamStructureComponent } from './team-structure/team-structure.component';
import { ProjectHealthComponent } from './project-health/project-health.component';
import { EfficiencySkillsComponent } from './efficiency-skills/efficiency-skills.component';
import { DocumentationComponent } from './documentation/documentation.component';
import { CommunicationComponent } from './communication/communication.component';
import { AdditionalConsiderationsComponent } from './additional-considerations/additional-considerations.component';
import { ProjectMilestonesComponent } from './project-milestones/project-milestones.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    ProjectDetailsComponent,
    ProjectOverviewComponent,
    TeamStructureComponent,
    ProjectHealthComponent,

    EfficiencySkillsComponent,
    DocumentationComponent,
    CommunicationComponent,
    AdditionalConsiderationsComponent,
    ProjectMilestonesComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    MatSlideToggleModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
