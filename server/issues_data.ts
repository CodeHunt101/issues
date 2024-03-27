import express, { Express, Request, Response } from "express";

export class IssuesData {
  issues: any
  constructor() {
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
  }

  getIssues() {
    return this.issues
  }

  getIssueById(issueId: number) {
    return this.issues.find((issue: { id: number; }) => issue.id === issueId)
  }

  addIssue(newIssue: any) {
    const maxId = Math.max(...this.issues.map((issue: { id: number }) => issue.id), 0)
    newIssue.id = maxId + 1
    this.issues.push(newIssue)
  }

  updateIssue(issueId: number, updatedIssue: any) {
    this.issues = this.issues.map((issue: { id: number; }) =>
      issue.id === issueId ? updatedIssue : issue
    )
  }

  deleteIssue(issueId: number) {
    this.issues = this.issues.filter((issue: { id: number; }) => issue.id !== issueId)
  }
}

