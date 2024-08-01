const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  manager: { type: String, required: true },
  status: { type: String, required: true },
  progress: { type: Number, required: true, default: 0 },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  customer: { type: String, required: true },
  targetDeliveryDate: { type: Date, required: true },
  projectSize: { type: String, enum: ['Large', 'Medium', 'Small'], required: true },
  region: { type: String, required: true },
  internalTeam: [
    {
      name: { type: String, required: true },
      role: { type: String, required: true }
    }
  ],
  externalTeam: [
    {
      name: { type: String, required: true },
      contribution: { type: String, required: true }
    }
  ],
  outsourcedJobs: [
    {
      task: { type: String, required: true },
      deadline: { type: Date, required: true },
      responsible: { type: String, required: true }
    }
  ],
  overallStatus: { type: String, enum: ['Green', 'Yellow', 'Red'], default: 'Green' },
  completionPercentage: { type: Number, default: 0 },
  milestones: [
    {
      name: { type: String, required: true },
      countdown: { type: Date, required: true },
      daysRemaining: { type: Number, default: 0 }
    }
  ],
  challenges: [
    {
      description: { type: String, required: true },
      mitigation: { type: String, required: true }
    }
  ],
  efficiencySkills: {
    skillMatrix: [
      {
        skill: { type: String, required: true },
        required: { type: Boolean, required: true },
        teamMembers: [{ type: String }]
      }
    ]},
    majorMilestones: [
      {
        number: { type: Number, required: true },
        name: { type: String, required: true },
        date: { type: Date, required: true }
      }
    ],
  
    internalMilestones: {
      'To Do': [
        {
          name: { type: String, required: true },
          description: { type: String, required: true },
          priority: { type: String, enum: ['High', 'Medium', 'Low'], required: true }
        }
      ],
      'In Progress': [
        {
          name: { type: String, required: true },
          description: { type: String, required: true },
          priority: { type: String, enum: ['High', 'Medium', 'Low'], required: true }
        }
      ],
      'Done': [
        {
          name: { type: String, required: true },
          description: { type: String, required: true },
          priority: { type: String, enum: ['High', 'Medium', 'Low'], required: true }
        }
      ]
    },
    softwareTools: [
      {
        name: { type: String, required: true },
        version: { type: String },
        licensing: { type: String }
      }
    ],
    dependencies: [
      {
        task: { type: String, required: true },
        dependentOn: { type: String, required: true }
      }
    ]
  }
);

module.exports = mongoose.model('Project', ProjectSchema);
