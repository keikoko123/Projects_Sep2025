### Project 6 (Advanced): API Monitoring Dashboard

**Difficulty:** ★★★★★ (Focuses on DevOps, infrastructure, scheduled jobs, and specialized databases.)

**Project Background:**
A service for developers to monitor their APIs. It pings endpoints at set intervals, measures performance, and sends alerts when an API is down.

**Recommended Tech Stacks:**

- **Stack 1 (The Serverless DevOps Stack):** A cost-effective, scalable, and modern approach.
  - **Backend Logic:** AWS Lambda (in Python or Go)
  - **Scheduling:** Amazon EventBridge
  - **Database:** Amazon Timestream or InfluxDB
  - **Frontend:** React
- **Stack 2 (The Elixir/Phoenix Stack):** Uniquely suited for high-concurrency and real-time dashboard updates.
  - **Backend/Frontend:** Elixir with Phoenix LiveView
  - **Database:** PostgreSQL with TimescaleDB extension

**Detailed Development Checklist (4 Weeks):**

- **Day 1-2: System Architecture & IaC**
  - [ ] Draw a detailed architecture diagram (Frontend -> API -> Scheduler -> Worker -> Time-Series DB).
  - [ ] Choose a cloud provider (e.g., AWS) and an Infrastructure as Code (IaC) tool (e.g., Terraform, AWS SAM).
  - [ ] Write the initial IaC scripts to provision the VPC, security groups, and the time-series database (e.g., Amazon Timestream, InfluxDB).
- **Day 3-4: Web Dashboard & Auth API**
  - [ ] Set up a web application project (e.g., React).
  - [ ] Set up a backend API project (e.g., Node.js/Express).
  - [ ] Implement user authentication (register, login).
- **Day 5-7: Monitored Endpoint CRUD**
  - [ ] Design the database schema for `users` and `monitored_endpoints`.
  - [ ] Implement the full CRUD API for endpoints (create, read, update, delete).
  - [ ] Build the UI on the dashboard for users to manage their endpoints.
- **Day 8-10: Core Monitoring Worker**
  - [ ] Create a new standalone script/project for the worker (e.g., Python, Go).
  - [ ] Write the core logic: take a URL as input, make an HTTP request, and measure the response time and status code.
  - [ ] Write the result (URL, status, latency, timestamp) to the console.
- **Day 11-12: Worker & Database Integration**
  - [ ] Modify the worker to connect to the time-series database.
  - [ ] Change the worker's output to write the monitoring results into the database.
- **Day 13-14: Scheduler Setup**
  - [ ] Choose a scheduling mechanism (e.g., a cron job on a server, Amazon EventBridge, Celery Beat).
  - [ ] Create a main "dispatcher" script. This script will query the main database for all active endpoints.
- **Day 15-18: Scheduler Logic**
  - [ ] For each endpoint found by the dispatcher, it should trigger an execution of the monitoring worker (e.g., by invoking a Lambda function, adding a job to a queue).
  - [ ] Configure the scheduler to run the dispatcher script at a regular interval (e.g., every minute).
- **Day 19-20: Dashboard UI - Charting**
  - [ ] Build the UI for the main dashboard view that will display monitoring data.
  - [ ] Integrate a charting library (e.g., Chart.js, Recharts).
- **Day 21-23: Data Visualization API**
  - [ ] Create a new API endpoint on the backend (e.g., `GET /api/endpoints/:id/metrics`).
  - [ ] This endpoint will query the time-series database for a given endpoint's historical data.
  - [ ] The endpoint should support different time ranges (e.g., last hour, last 24 hours).
- **Day 24-26: Frontend Data Visualization**
  - [ ] Connect the dashboard charts to the new metrics API.
  - [ ] Display latency and uptime data visually.
  - [ ] Add UI elements to allow the user to select the time range.
- **Day 27: Alerting Logic**
  - [ ] Modify the worker: if a request fails (e.g., status code 500 or timeout), it should trigger an alert.
  - [ ] This could be done by sending a message to a specific queue or calling a webhook.
- **Day 28: Alerting Integration & Deployment**
  - [ ] Integrate with an email/SMS service (e.g., SendGrid, Twilio).
  - [ ] Create a small service that listens for alert events and sends the notification.
  - [ ] Deploy all services (API, dashboard, workers) using Docker and the chosen cloud provider's services.

---
