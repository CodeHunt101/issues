const express = require('express')
const bodyParser = require('body-parser')
const dotenv = require('dotenv')
dotenv.config()

class IssuesServer {
  constructor() {
    this.app = express()
    this.port = process.env.PORT || 3000
    this.issues = [
      {
        id: 1,
        title: 'User Registration Error',
        description: 'Users are unable to sign up',
      },
      {
        id: 2,
        title: 'User login error',
        description: 'Users are unable to log in',
      },
    ]

    this.app.use(bodyParser.json())
    this.setupRoutes()
  }

  getPort() {
    return this.port
  }

  setupRoutes() {
    this.app.get('/issues', this.getIssues.bind(this))
    this.app.get('/issues/:id', this.getIssueById.bind(this))
    this.app.post('/issues', this.addIssue.bind(this))
    this.app.put('/issues/:id', this.updateIssue.bind(this))
    this.app.delete('/issues/:id', this.deleteIssue.bind(this))

    this.app.use((err, req, res, next) => {
      console.error(err.stack)
      res.status(500).json({ message: 'Internal Server Error' })
    })
  }

  getIssues(_, res) {
    res.json(this.issues)
  }

  getIssueById(req, res) {
    const issueId = parseInt(req.params.id)
    const issue = this.issues.find((issue) => issue.id === issueId)

    if (issue) {
      res.json(issue)
    } else {
      res.status(404).json({ message: 'Issue not found' })
    }
  }

  addIssue(req, res) {
    const newIssue = req.body
    this.issues.push(newIssue)
    res.status(201).json(this.issues)
  }

  updateIssue(req, res) {
    const issueId = parseInt(req.params.id)
    const updatedIssue = req.body

    this.issues = this.issues.map((issue) =>
      issue.id === issueId ? updatedIssue : issue
    )

    res.json(updatedIssue)
  }

  deleteIssue(req, res) {
    const issueId = parseInt(req.params.id)
    this.issues = this.issues.filter((issue) => issue.id !== issueId)
    res.json({ message: 'Issue deleted successfully' })
  }

  start() {
    this.app.listen(this.port, () => {
      console.log(`Server listening at http://localhost:${this.port}`)
    })
  }
}

const server = new IssuesServer()
server.start()
