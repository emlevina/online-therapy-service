# About project

Online service where you can find a proper therapist according to your request, book an appointment, chat with your therapist. It will have authentication and real-time messenger.
In the MVP I was focused on a customer app with only basic functionality. Future versions may include dashboard for therapists and video messaging.
The project is build with MERN stack, React app on Express Node.js server with MongoDB as a database.

## How to navigate the project

### Client
- Inside `/actions` [folder](./client/src/actions/index.js) all axios requests to server are collected to achieve better maintainability.
- `/pages` contain simple components representing each page of the app (like [Dashboard](./client/src/pages/Dashboard.js), while `/features` are grouping major logical blocks of app functionality (like [Chat](./client/src/features/Chat), and `/layouts` is just a special folder for placing any layout based components.
- `/context` and `/providers` allows to share state between components with `useContext` and `createContext` hooks.
- And `/hooks` is used to store all custom hooks, in my case there was [`useFetch`](./client/src/hooks/useFetch.js) for fetching and storing data, errors and loading status.

### Server
- `/app` folder contains everything realted to Express server, including various controllers (e.g. [appointments](./server/app/controllers/appointments.js))
- There is also a middleware for [error handling](./server/app/middleware/handleErrors.js) which enables creating meaningful custom errors, e.g. if the task wasn't found.
- All requests are handled by appropriate [routers](./server/app/routes/appointments.js) with [verification middleware](./server/app/middleware/verifyToken.js) applied when necessary
- To connect the database I used [Mongoose library](./server/config/db.js) and created models with in-built validation and pre/post Mongoose schema middleware, like [Appointments model](./server/app/models/Appointment.js)
- The [server](./server/server.js) is also connected to socket.io to enable real-time messaging between users.
