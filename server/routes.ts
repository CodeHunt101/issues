import express, { Express, Request, Response, Router } from "express";
import { IssuesData } from "./issues_data";

export class Routes {
  router: Router;
  app: Express;
  issuesData: IssuesData;
  constructor(issuesData: IssuesData) {
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

    this.router.use((err: any, req: Request, res: Response) => {
      console.error(err.stack)
      res.status(500).json({ message: 'Internal Server Error' })
    })
  }

  getIssues(_:Request, res: Response) {
    res.json(this.issuesData.getIssues())
  }

  getIssueById(req: Request, res: Response) {
    const issueId = parseInt(req.params.id)
    const issue = this.issuesData.getIssueById(issueId)

    if (issue) {
      console.log(`Issue with ID ${issueId} retrieved`)
      res.json(issue)
    } else {
      res.status(404).json({ message: 'Issue not found' })
    }
  }

  addIssue(req: Request, res: Response) {
    const newIssue = req.body
    this.issuesData.addIssue(newIssue)
    console.log('Issue added successfully')
    const issues = this.issuesData.getIssues()
    res.status(201).json(issues)
  }

  updateIssue(req: Request, res: Response) {
    const issueId = parseInt(req.params.id)
    const updatedIssue = req.body

    this.issuesData.updateIssue(issueId, updatedIssue)
    console.log(`Issue with ID ${issueId} updated successfully`)
    res.json(updatedIssue)
  }

  deleteIssue(req: Request, res: Response) {
    const issueId = parseInt(req.params.id)
    this.issuesData.deleteIssue(issueId)
    console.log(`Issue with ID ${issueId} deleted successfully`)
    res.json({ message: 'Issue deleted successfully' })
  }
}

