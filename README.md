# issues

Make sure to execute `npm install` to install all the dependencies.

Run `npm start` from the root directory to run the server. By default it utilises port 3000.

To execute commands, in the CLI you must run from the root directory:

```
node dist/client/run <command>
```

## Commands:

### List all issues:

```
node dist/client/run list-issues
```

### Read an issue:
```
node dist/client/run get-issue <id>
```
Example:
```
node dist/client/run get-issue 1
```

### Add an issue:
```
node dist/client/run add-issue <title> <description>
```
Example:
```
node dist/client/run add-issue "new title" "new description"
```

### Update an issue:
```
node dist/client/run update-issue <id> <title> <description>
```
Example:
```
node dist/client/run update-issue 1 "updated title" "updated description"
```

### Delete an issue:
```
node dist/client/run delete-issue <id>
```
Example:
```
node dist/client/run delete-issue 1
```

Thank you!
