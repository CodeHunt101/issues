const express = require('express')

class Routes {
  constructor(issuesData) {
    this.router = express.Router()
    this.app = express()
    this.issuesData = issuesData
    this.setupRoutes()
  }

  getRoutes() {
    return this.router
  }

  setupRoutes() {
    this.router.get('/issues', this.getIssues.bind(this))
    this.router.get('/issues/:id', this.getIssueById.bind(this))
    this.router.post('/issues', this.addIssue.bind(this))
    this.router.put('/issues/:id', this.updateIssue.bind(this))
    this.router.delete('/issues/:id', this.deleteIssue.bind(this))

    this.router.use((err, req, res, next) => {
      console.error(err.stack)
      res.status(500).json({ message: 'Internal Server Error' })
    })
  }

  getIssues(_, res) {
    res.json(this.issuesData.getIssues())
  }

  getIssueById(req, res) {
    const issueId = parseInt(req.params.id)
    const issue = this.issuesData.getIssueById(issueId)

    if (issue) {
      res.json(issue)
    } else {
      res.status(404).json({ message: 'Issue not found' })
    }
  }

  addIssue(req, res) {
    const newIssue = req.body
    this.issuesData.addIssue(newIssue)
    const issues = this.issuesData.getIssues()
    res.status(201).json(issues)
  }

  updateIssue(req, res) {
    const issueId = parseInt(req.params.id)
    const updatedIssue = req.body

    this.issuesData.updateIssue(issueId, updatedIssue)
    res.json(updatedIssue)
  }

  deleteIssue(req, res) {
    const issueId = parseInt(req.params.id)
    this.issuesData.deleteIssue(issueId)
    res.json({ message: 'Issue deleted successfully' })
  }
}

module.exports = Routes
