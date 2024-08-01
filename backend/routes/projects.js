const express = require('express');
const router = express.Router();
const Project = require('../models/Project');

// Get all projects
router.get('/', async (req, res) => {
  try {
    const projects = await Project.find();
    res.json(projects);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add a new project
router.post('/', async (req, res) => {
  const project = new Project({
    name: req.body.name,
    description: req.body.description,
    manager: req.body.manager,
    status: req.body.status,
    progress: req.body.progress || 0,
    startDate: req.body.startDate,
    endDate: req.body.endDate,
    customer: req.body.customer,
    targetDeliveryDate: req.body.targetDeliveryDate,
    projectSize: req.body.projectSize,
    region: req.body.region,
    internalTeam: req.body.internalTeam,
    externalTeam: req.body.externalTeam,
    outsourcedJobs: req.body.outsourcedJobs,
    overallStatus: req.body.overallStatus,
    completionPercentage: req.body.completionPercentage,
    milestones: req.body.milestones,
    challenges: req.body.challenges,
    efficiencySkills: req.body.efficiencySkills // Added field
  });

  try {
    const newProject = await project.save();
    res.status(201).json(newProject);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get project by ID
router.get('/:id', async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).send('Project not found');
    res.json(project);
  } catch (error) {
    res.status(500).send('Server error');
  }
});

// Get project health
router.get('/:id/health', async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).send('Project not found');
    res.send({
      overallStatus: project.overallStatus,
      completionPercentage: project.completionPercentage,
      milestones: project.milestones,
      challenges: project.challenges
    });
  } catch (error) {
    res.status(500).send('Server error');
  }
});

// Update project health
router.put('/:id/health', async (req, res) => {
  try {
    const { overallStatus, completionPercentage, milestones, challenges } = req.body;
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).send('Project not found');

    project.overallStatus = overallStatus;
    project.completionPercentage = completionPercentage;
    project.milestones = milestones;
    project.challenges = challenges;

    await project.save();
    res.send({
      overallStatus: project.overallStatus,
      completionPercentage: project.completionPercentage,
      milestones: project.milestones,
      challenges: project.challenges
    });
  } catch (error) {
    res.status(500).send('Server error');
  }
});
router.get('/projects/:id/milestones', async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).send('Project not found');
    res.send({
      majorMilestones: project.majorMilestones,
      internalMilestones: project.internalMilestones
    });
  } catch (error) {
    res.status(500).send('Server error');
  }
});

// Update project milestones
router.put('/projects/:id/milestones', async (req, res) => {
  try {
    const { majorMilestones, internalMilestones } = req.body;
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).send('Project not found');

    project.majorMilestones = majorMilestones;
    project.internalMilestones = internalMilestones;

    await project.save();
    res.send({
      majorMilestones: project.majorMilestones,
      internalMilestones: project.internalMilestones
    });
  } catch (error) {
    res.status(500).send('Server error');
  }
});

// Get project efficiency and skills
router.get('/:id/efficiency-skills', async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).send('Project not found');
    res.send({
      skillMatrix: project.efficiencySkills.skillMatrix,
      softwareTools: project.efficiencySkills.softwareTools,
      dependencies: project.efficiencySkills.dependencies
    });
  } catch (error) {
    res.status(500).send('Server error');
  }
});

// Update project efficiency and skills
router.put('/:id/efficiency-skills', async (req, res) => {
  try {
    const { skillMatrix, softwareTools, dependencies } = req.body;
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).send('Project not found');

    project.efficiencySkills.skillMatrix = skillMatrix;
    project.efficiencySkills.softwareTools = softwareTools;
    project.efficiencySkills.dependencies = dependencies;

    await project.save();
    res.send(project);
  } catch (error) {
    res.status(500).send('Server error');
  }
});

module.exports = router;
