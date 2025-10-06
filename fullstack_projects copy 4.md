### Project 4 (Intermediate-Advanced): Real-Time Collaboration Tool

**Difficulty:** ★★★★☆ (Focuses on the complexities of concurrency and real-time event handling.)

**Project Background:**
A digital whiteboard or Kanban board for remote teams to manage projects in real-time. Multiple users can edit simultaneously, with all screens updating instantly.

**Recommended Tech Stacks:**

- **Stack 1 (The "Real-time" JavaScript Stack):** The most direct path to implementing real-time features.
  - **Frontend:** Svelte or React
  - **Backend:** Node.js with Express and Socket.io
  - **Database:** MongoDB or Redis
- **Stack 2 (The Go Stack):** Excellent for a high-performance, concurrent backend.
  - **Frontend:** Vue.js
  - **Backend:** Go with Gorilla WebSocket
  - **Database:** PostgreSQL

**Detailed Development Checklist (3 Weeks):**

- **Day 1: Planning & Core API**
  - [ ] Finalize features (boards, lists, cards, real-time movement).
  - [ ] Design the database schema (`users`, `boards`, `lists`, `cards`).
  - [ ] Set up the backend project (e.g., Node.js/Express) and a database (e.g., MongoDB).
  - [ ] Implement user authentication API (`/register`, `/login`).
- **Day 2: Board API**
  - [ ] Create protected CRUD API endpoints for `boards`.
  - [ ] `POST /api/boards`, `GET /api/boards`, `GET /api/boards/:id`, etc.
- **Day 3: List & Card API**
  - [ ] Create protected CRUD API endpoints for `lists` (scoped to a board).
  - [ ] Create protected CRUD API endpoints for `cards` (scoped to a list).
- **Day 4: Frontend Setup**
  - [ ] Initialize the frontend project (e.g., Svelte, React).
  - [ ] Build the UI for login/registration and connect it to the API.
- **Day 5: Board List UI**
  - [ ] Build the UI for the main dashboard to display a list of the user's boards.
  - [ ] Add a form to create a new board.
- **Day 6: Single Board View UI**
  - [ ] Build the main UI for a single board, showing lists and cards.
  - [ ] Fetch and display all data from the API for a specific board.
- **Day 7: Frontend CRUD Integration**
  - [ ] Connect the frontend UI to the API to allow creating, updating, and deleting lists and cards.
  - [ ] At this point, the app should be fully functional for a single user.
- **Day 8: WebSocket Backend Setup**
  - [ ] Integrate `Socket.io` into the Express backend.
  - [ ] Configure a basic connection event listener.
- **Day 9: WebSocket Frontend Setup**
  - [ ] Add the `socket.io-client` library to the frontend.
  - [ ] Implement logic to establish a WebSocket connection when a user logs in.
- **Day 10: Room Logic**
  - [ ] On the backend, create a "room" for each board ID.
  - [ ] When a user opens a board on the frontend, emit a `joinBoard` event.
  - [ ] On the backend, listen for `joinBoard` and add the user's socket to the corresponding room.
- **Day 11: Broadcasting Card Creation**
  - [ ] When the `POST /api/cards` endpoint is called, after saving to the DB, emit a `cardCreated` event to the board's room.
  - [ ] The event payload should contain the new card's data.
- **Day 12: Listening for Card Creation**
  - [ ] On the frontend, listen for the `cardCreated` event.
  - [ ] When the event is received, add the new card to the UI in real-time without needing a page refresh.
- **Day 13: Broadcasting Card Updates**
  - [ ] Modify the card update logic (e.g., changing text) to emit a `cardUpdated` event to the room.
- **Day 14: Listening for Card Updates**
  - [ ] On the frontend, listen for `cardUpdated` and update the specific card in the UI.
- **Day 15: Drag-and-Drop UI**
  - [ ] Integrate a drag-and-drop library (e.g., `dnd-kit`, `SortableJS`).
  - [ ] Implement the UI logic to allow moving cards between and within lists.
- **Day 16: Broadcasting Card Movement**
  - [ ] When a card is dropped in a new position, emit a `cardMoved` event.
  - [ ] The payload should include the card ID, new list ID, and new position.
- **Day 17: Listening for Card Movement**
  - [ ] On the backend, listen for `cardMoved` and update the card's data in the database.
  - [ ] Broadcast the confirmed move to all other clients in the room.
  - [ ] On the frontend, listen for the broadcast and move the card in the UI for all users.
- **Day 18: Authentication & Authorization**
  - [ ] Secure the WebSocket connection, ensuring only authenticated users can connect.
  - [ ] Add authorization logic to ensure users can only join boards they have access to.
- **Day 19: Presence Indicators UI**
  - [ ] Add a UI element to display the avatars of users currently viewing the board.
- **Day 20: Presence Logic**
  - [ ] On `joinBoard`, add the user to a list of active users for that board and broadcast the updated list.
  - [ ] On socket `disconnect`, remove the user and broadcast the updated list.
- **Day 21: Deployment**
  - [ ] Containerize the application with Docker.
  - [ ] Deploy to a service that supports WebSockets (e.g., Fly.io, Heroku, DigitalOcean).
  - [ ] Configure the production environment, including CORS for the WebSocket server.

---
