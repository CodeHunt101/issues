# issues

Make sure to execute `npm install` to install all the dependencies.

To execute commands, in the CLI you must run from the root directory:

```
node issues_client_cli <command>
```

## Commands:

### List all issues:

```
node issues_client_cli list-issues
```

### Read an issue:
```
node issues_client_cli get-issue <id>
```
Example:
```
node issues_client_cli get-issue 1
```

### Add an issue:
```
node issues_client_cli add-issue <title> <description>
```
Example:
```
node issues_client_cli add-issue "new title" "new description"
```

### Update an issue:
```
node issues_client_cli update-issue <id> <title> <description>
```
Example:
```
node issues_client_cli update-issue 1 "updated title" "updated description"
```

### Delete an issue:
```
node issues_client_cli delete-issue <id>
```
Example:
```
node issues_client_cli delete-issue 1
```

## Opportunities for improvement:

I could not go through these on the loom recording but I hope leaving it on the Readme helps:

- Handle some validation errors from the server
- Store issues in a database
- Add unit tests to ensure expected behaviour of the app
- Make the CLI more interactive
- Refactor some function snippets to make it more reusable
- Reorganise folders for better modularisation

Thank you!
