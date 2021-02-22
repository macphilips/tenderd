# Tenderd ReactJS Full Stack Challenge

The task is to build an online platform that enable Users to create and manage Request my their own Company or third party Companies.

This project was generated using [Create React App](https://create-react-app.dev/docs/getting-started) and [ExpressJS-Sequelize-Template](https://github.com/macphilips/express-sequelize-template)

## Requirements

- [NodeJS](https://nodejs.org/en/)
- [Firebase CLI](https://www.npmjs.com/package/firebase-tools)

## Development
This application was developed using [ExpressJS](http://expressjs.com/) and ReactJS.
This project was configured as monorepo using [`yarn workspaces`](https://classic.yarnpkg.com/en/docs/workspaces/) and the source code for the  React app and Express app can be found in `packages/client` and `packages/server` respectively.


## Installation
Before installing, ensure you've properly installed [Firebase CLI](https://firebase.google.com/docs/cli) and configured [Firebase Local Emulator Suite](https://firebase.google.com/docs/emulator-suite/install_and_configure?hl=en).
You may need to delete Firebase related files at the root of the project to be able to run `firebase init`

* From the terminal, run the following commands to clone and install application dependencies. 
```shell script
git clone https://github.com/macphilips/tenderd.git
cd tenderd
yarn install
``` 

* To build the project and run the project locally using Firebase emulate, we need to set the following variables in a .env file in `packages/client` directory

```
REACT_APP_SERVER_API_URL=http://localhost:<5001>/<PROJECT-ID>/<region>/app/api/v1
REACT_APP_USE_FIREBASE_EMULATOR=true

```
 
 `REACT_APP_SERVER_API_URL` should point to you local instance of cloud functions. Once you're done setting up env variable, you can run:
 
```shell script
yarn build
 ```

This will run the build script in `packages/client/package.json` and `packages/server/package.json`.

Once build is successfully, we need to start up the Firebase emulator

## Testing
To ensure that your installation is successful you'll need to run tests.
The command: `yarn test` makes this possible. It isn't functional right now, but once it's done you'll be notified via the README.

## [API Documentation](https://tenderd-doc.herokuapp.com/docs/v1/)
This application uses swagger to document it API and the full API docs can be located [here](https://tenderd-doc.herokuapp.com/docs/v1/).
All URIs are relative to the base url.
Base url: `localhost:5000/docs/api/v1`

For example:
### Create User Account 

**POST** /auth/signup

Use this endpoint to create user account with a unique email address.
This endpoint leverages Firebase Authentication with Email/Password enabled as a provider.

#### HTTP request 
##### Request Body

Example
```json
{
  "name": "John",
  "lastName": "Doe",
  "email": "john.doe@example.com",
  "password": "johndoe"
}
``` 

#### Http Response
##### Return type

```json
{
  "id": "12233212",
  "firstName": "John",
  "lastName": "DOe",
  "email": "john.doe@example.com"
}
```


### Architecture
The application utilizes [Firebase](https://firebase.google.com/docs) firestore for data storage and
Firebase hosting to service static react application, Cloud Functions to hosting the 
backend server (express server), and Firebase storage to store images/documents for the app. The application leverages Firebase Authentication( with Email/Password enabled as a provider) to handle user authentication and sign up.

We also leverage Github actions to deploy the application to Firebase Hosting and Firebase Function when we merge/push to `prod` branch

### Models/Database schemas

For this project, I have 4 models

_represented as a collection in Firestore_
- User 
- Company
- Request: 

_Sub-collection_
- RequestEventLog (linked to Request model)

```ts
export interface User {
  id: string
  name: string
  email: string
  password: string
  companyId?: string // The `User` model as many to one relation with `Company` model, it's represented with the companyId field the User object defined below. Defining the relationship like this enable us to easy perform queries like fetching the users under a particular company.
}

export interface Company {
  id: string
  name: string
}

export interface Request {
  id: string
  description: string           // description of request
  
  resources: string[]           // hold links to image/documents uploaded to Firebase storage when creating/updating a request.
  
  type: RequestType             // e.g Replacement, Maintenance, e.t.tc
  
  status: RequestStatus         // e.g Completed/Cancelled
  
  assignedUserId: string        // assigned user id
  
  assignedUserName: string      // holds the name of the assigned user name, we added this here, to aviod making two calles to firestore, one to fetch the request and the second to fetch assigned user model object
                                // same reason hold for companyName below.
  
  companyId: string             // assigned company id
  
  companyName: string           // holds the name of the assigned company.  
  
  eventLogs?: RequestEventLog[] // holds an history of changes made to the state field,
                                // we one write to this subcollection when we update the status field.
                                // We the event log, we can compute the Timeline to see how we transition
                                // from one status to the other during the live time of the request.
}

export interface RequestEventLog {
  id: string
  status: RequestStatus // changed status
  type: RequestEventLogType
  actorId: string
  actorName: string // who perform the action on the Request entity (the auth user), this is some time different from assignedUserId.
  timestamp: string // when the action happened
}
```


### Live App Link
https://tenderd-28498.web.app/

