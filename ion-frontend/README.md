## Ion Frontend

## About

---

This module contains a React application that serves as Ion's UI. Feel free to take a look around, deploy, and contribute.

## Starting the Application

---

### Quick Start

Create a file called `.env.local` and insert the following

```
REACT_APP_BASE_URL="http://localhost:1236/api"
REACT_APP_WEBSOCKET_URL="ws://localhost:1236/"
```

Install dependencies and start the app on `http://localhost:3000`

```
yarn install
yarn start
```

## Design Goals

---

In building out the client experience, I set the following themes as guideposts when writing the frontend:

Configurability: The client experience should be configurable, such that deploying on their personal machines can still allow them to tailor certain aspects to their needs. This includes theme / styling configurability, showing and hiding specific functionality, employing different data connectors, etc.

Extensibility: Extending the functionality of DataHub should be as simple as possible. Making changes like extending an existing entity & adding a new entity should require minimal effort and should be well covered in detailed documentation.

## Design Details

---

### Package Organisation

There are three main components to the frontend:

1. The charting library built on top of D3. Located at `src/components/Charting/` You can read about it [here](./src/components/Charting/README.md)
2. The data connectors for different data sources. Located at `src/data/` You can read about it [here](./src/components/data/README.md)
3. The rest containing the general structure of the react app of course!

## Other References

---

### UI/UX Design

Many of the frontend design components and informatics are inspired by what is available and offered on the Bloomberg Terminal. As such, many of the designs for the frontend is derived from the UI/UX designs of the terminal itself.

Reference sources: \
https://www.investopedia.com/articles/professionaleducation/11/bloomberg-terminal.asp
https://www.youtube.com/watch?v=HCXWLX4OQmA&ab_channel=Banks%26Markets
