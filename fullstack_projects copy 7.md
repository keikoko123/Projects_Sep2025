### Project 7 (Expert): Video Processing and Streaming Service

**Difficulty:** ★★★★★ (The most complex project, involving microservices, message queues, and advanced cloud architecture.)

**Project Background:**
A platform where users can upload raw video files, which are then automatically transcended into multiple resolutions for adaptive web streaming.

**Recommended Tech Stacks:**

- **Stack 1 (The Heavy-Lifting Python Stack):** A powerful and common choice for media processing pipelines.
  - **Backend API:** Python with FastAPI
  - **Workers:** Python with Celery and RabbitMQ
  - **Cloud Services:** AWS S3 and CloudFront
- **Stack 2 (The High-Performance Rust Stack):** For maximum performance, safety, and control.
  - **Backend API:** Rust with Actix-web
  - **Workers:** Custom Rust workers
  - **Cloud Services:** AWS S3 and CloudFront

**Detailed Development Checklist (5 Weeks):**

- **Day 1-3: Architecture & Cloud Provisioning**
  - [ ] Draw a detailed microservices architecture diagram (Uploader -> API -> Message Queue -> Worker -> Database/Storage).
  - [ ] Use Terraform to provision all cloud infrastructure: S3 buckets (uploads, transcoded videos), a message queue (SQS/RabbitMQ), IAM roles, and a CDN (CloudFront).
- **Day 4-5: API Service Setup**
  - [ ] Initialize the backend API project (e.g., Python/FastAPI, Rust/Actix-web).
  - [ ] Set up a standard database (e.g., PostgreSQL) to store video metadata.
  - [ ] Design the `videos` table schema (e.g., `id`, `user_id`, `original_filename`, `status`, `created_at`).
- **Day 6-8: Secure Upload Endpoint**
  - [ ] Implement a protected API endpoint (e.g., `POST /api/uploads/initiate`).
  - [ ] This endpoint should create a new record in the `videos` database with a "pending" status.
  - [ ] It should then use the AWS SDK to generate a pre-signed S3 URL for the client to upload the file directly to the uploads bucket.
  - [ ] Return the pre-signed URL and the video ID to the client.
- **Day 9-10: Upload Notification Endpoint**
  - [ ] Implement a second protected endpoint (e.g., `POST /api/uploads/complete`).
  - [ ] The client will call this _after_ the S3 upload is finished.
  - [ ] This endpoint will publish a message to the message queue (e.g., SQS). The message should contain the video ID and the location of the uploaded file in S3.
- **Day 11-14: Frontend Uploader**
  - [ ] Build a simple frontend application (e.g., React).
  - [ ] Create a file input form.
  - [ ] On submit, the frontend first calls the `initiate` endpoint, then uses the returned pre-signed URL to upload the file directly to S3.
  - [ ] After the upload succeeds, it calls the `complete` endpoint.
- **Day 15-17: Transcoding Worker Setup**
  - [ ] Create a new project for the worker service.
  - [ ] Install necessary libraries, including an S3 SDK, a message queue SDK, and a wrapper for **FFmpeg**.
  - [ ] Write the main worker loop that polls the message queue for new messages.
- **Day 18-21: Core Transcoding Logic**
  - [ ] When a message is received, the worker should:
    - 1. Update the video status to "processing" in the database.
    - 2. Download the original video file from the uploads S3 bucket.
    - 3. Use FFmpeg via a command-line wrapper to transcode the video into multiple resolutions (e.g., 1080p, 720p, 480p).
    - 4. Upload all transcoded files to the destination S3 bucket.
    - 5. Update the video status to "complete" in the database.
- **Day 22-24: Error Handling in Worker**
  - [ ] Implement robust error handling. If a transcode fails, update the video status to "failed".
  - [ ] Configure the message queue's dead-letter queue (DLQ) to catch messages that consistently fail.
- **Day 25-26: Metadata API**
  - [ ] Create public API endpoints to list available videos (`GET /api/videos`) and get details for a single video (`GET /api/videos/:id`).
  - [ ] The single video endpoint should return metadata and the URLs for the different resolution files.
- **Day 27-29: Secure Video Playback**
  - [ ] The video detail endpoint should not return direct S3 URLs. Instead, it should generate signed, short-lived URLs from the CDN (CloudFront).
  - [ ] This prevents unauthorized access and hotlinking.
- **Day 30-31: Frontend Playback UI**
  - [ ] Build the UI to list all "complete" videos.
  - [ ] Build a video player page.
  - [ ] Use a modern video player library (e.g., Video.js, Plyr) that supports adaptive bitrate streaming (HLS/DASH).
  - [ ] The frontend will fetch the signed URLs from the API and pass them to the player.
- **Day 32-35: Containerization & Deployment**
  - [ ] Write `Dockerfile`s for both the API service and the worker service.
  - [ ] Deploy the API service to a container orchestration platform (e.g., AWS ECS, Kubernetes).
  - [ ] Deploy the worker service, and configure auto-scaling based on the number of messages in the SQS queue.
  - [ ] Set up CI/CD pipelines for both services.
