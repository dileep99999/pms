const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const sqlite3 = require('sqlite3').verbose();
const User = require('./models/User');
const Project = require('./models/Project');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors());

// MongoDB connection setup
mongoose.connect('mongodb://localhost:27017/project-management-db', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Initialize SQLite database
const db = new sqlite3.Database(':memory:');

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS messages (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user TEXT,
    content TEXT,
    timestamp TEXT
  )`);
});

// User login route
app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ success: false, message: 'Authentication failed. User not found.' });
    }

    if (user.password !== password) {
      return res.status(401).json({ success: false, message: 'Authentication failed. Wrong password.' });
    }

    return res.status(200).json({ success: true, message: 'Login successful!' });
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ success: false, message: 'Internal server error. Please try again later.' });
  }
});

// Get all projects
app.get('/projects', async (req, res) => {
  try {
    const projects = await Project.find();
    res.json(projects);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create new project
app.post('/projects', async (req, res) => {
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
    outsourcedJobs: req.body.outsourcedJobs
  });

  try {
    const newProject = await project.save();
    res.status(201).json(newProject);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get project by ID
app.get('/projects/:id', async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    res.json(project);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update project by ID
app.put('/projects/:id', async (req, res) => {
  try {
    const project = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    res.json(project);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update project health by ID
app.put('/projects/:id/health', async (req, res) => {
  try {
    const projectId = req.params.id;
    const { overallStatus, completionPercentage, milestones, challenges } = req.body;

    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    project.overallStatus = overallStatus;
    project.completionPercentage = completionPercentage;
    project.milestones = milestones;
    project.challenges = challenges;

    await project.save();
    res.json(project);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update project milestones by ID
app.put('/projects/:id/milestones', async (req, res) => {
  try {
    const projectId = req.params.id;
    const { majorMilestones, internalMilestones } = req.body;

    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    project.majorMilestones = majorMilestones;
    project.internalMilestones = internalMilestones;

    await project.save();
    res.json(project);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update project efficiency skills by ID
app.put('/projects/:id/efficiency-skills', async (req, res) => {
  try {
    const projectId = req.params.id;
    const { skillMatrix, softwareTools, dependencies } = req.body;

    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    project.efficiencySkills.skillMatrix = skillMatrix;
    project.efficiencySkills.softwareTools = softwareTools;
    project.efficiencySkills.dependencies = dependencies;

    await project.save();
    res.json(project);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// API to get all internal messages
app.get('/api/internal-messages', (req, res) => {
  db.all('SELECT * FROM messages', [], (err, rows) => {
    if (err) {
      res.status(500).send(err.message);
    }
    res.json(rows);
  });
});

// API to send a new internal message
app.post('/api/internal-messages', (req, res) => {
  const { user, content, timestamp } = req.body;
  db.run('INSERT INTO messages (user, content, timestamp) VALUES (?, ?, ?)', [user, content, timestamp], function(err) {
    if (err) {
      res.status(500).send(err.message);
    }
    res.status(201).send({ id: this.lastID });
  });
});

// API to delete a message by ID
app.delete('/api/internal-messages/:id', (req, res) => {
  const id = req.params.id;
  db.run('DELETE FROM messages WHERE id = ?', [id], function(err) {
    if (err) {
      res.status(500).send(err.message);
    }
    res.status(200).send({ deleted: this.changes });
  });
});

// Start server
app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});
