class IssuesData {
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

  getIssueById(issueId) {
    return this.issues.find((issue) => issue.id === issueId)
  }

  addIssue(newIssue) {
    const maxId = Math.max(...this.issues.map((issue) => issue.id), 0)
    newIssue.id = maxId + 1
    this.issues.push(newIssue)
  }

  updateIssue(issueId, updatedIssue) {
    this.issues = this.issues.map((issue) =>
      issue.id === issueId ? updatedIssue : issue
    )
  }

  deleteIssue(issueId) {
    this.issues = this.issues.filter((issue) => issue.id !== issueId)
  }
}

module.exports = IssuesData
