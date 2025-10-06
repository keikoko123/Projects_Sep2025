### Project 5 (Advanced): Native Mobile Fitness Tracker

**Difficulty:** ★★★★☆ (Requires learning a platform-specific language, toolchain, and device APIs.)

**Project Background:**
A mobile app for iOS or Android to log workouts and track progress. The app must be fast, responsive, and deeply integrated with the native platform's ecosystem.

**Recommended Tech Stacks:**

- **Stack 1 (The Apple Ecosystem):** For a pure, high-performance iOS experience.
  - **Mobile App:** Swift with SwiftUI
  - **Backend:** Go or Node.js with a PostgreSQL database
- **Stack 2 (The Android Ecosystem):** For a modern, Google-centric Android app.
  - **Mobile App:** Kotlin with Jetpack Compose
  - **Backend:** Java with Spring Boot or Python with Django

**Detailed Development Checklist (4 Weeks):**

- **Day 1-2: Planning & Environment Setup**
  - [ ] Finalize feature list (exercise library, workout logging, history, progress charts).
  - [ ] Design UI mockups for the main screens.
  - [ ] Install Xcode (for iOS/Swift) or Android Studio (for Android/Kotlin).
  - [ ] Create a new native project (SwiftUI or Jetpack Compose).
  - [ ] Create a new Git repository.
- **Day 3-4: Local Database Schema & Setup**
  - [ ] Design the schema for the local database (`exercises`, `workouts`, `sets`).
  - [ ] Set up Core Data (iOS) or Room (Android) in the project.
  - [ ] Define the entities/models based on the schema.
- **Day 5: Exercise Library UI**
  - [ ] Build the UI to display a list of all available exercises.
  - [ ] Add a search bar to filter exercises.
- **Day 6: Populating the Exercise Library**
  - [ ] Create a pre-populated list of exercises (e.g., in a JSON file).
  - [ ] Write the logic to parse this file and save the exercises to the local database on the app's first launch.
- **Day 7: Workout Logging UI - Part 1**
  - [ ] Build the UI for the main workout screen.
  - [ ] Add a button to "Start a New Workout".
  - [ ] Create a screen where users can select exercises from the library to add to their current workout.
- **Day 8-9: Workout Logging UI - Part 2**
  - [ ] Build the UI for an active workout session.
  - [ ] Display the list of chosen exercises.
  - [ ] For each exercise, create UI elements to add sets (e.g., reps and weight inputs).
- **Day 10-12: Workout Logging Logic**
  - [ ] Implement the logic to add/remove exercises from the current session.
  - [ ] Implement the logic to add, edit, and delete sets for each exercise.
  - [ ] Add a "Finish Workout" button that saves the entire session (workout details and all sets) to the local database.
- **Day 13-14: Workout History UI**
  - [ ] Build the UI for the "History" screen.
  - [ ] Fetch all past workout sessions from the local database and display them in a list, ordered by date.
- **Day 15-16: Workout Detail View**
  - [ ] Create a screen to show the details of a single past workout.
  - [ ] Display all exercises and sets that were performed during that session.
- **Day 17-18: Progress Chart UI**
  - [ ] Build the UI for the "Progress" or "Stats" screen.
  - [ ] Add controls to select a specific exercise to view progress for.
- **Day 19-20: Progress Chart Logic**
  - [ ] Write database queries to fetch all sets for a specific exercise over time.
  - [ ] Process this data to track metrics like "max weight," "total volume," etc.
  - [ ] Integrate a native charting library and display the progress data on a line chart.
- **Day 21-22: Simple Backend API**
  - [ ] Set up a simple backend (e.g., Node.js/Go) with a database (e.g., PostgreSQL).
  - [ ] Implement API endpoints for user registration, login, and a protected endpoint to upload a workout backup.
- **Day 23-24: App Sync Logic**
  - [ ] Add networking capabilities to the native app.
  - [ ] Implement the logic for user authentication against the backend API.
  - [ ] Create a "Backup to Cloud" feature that serializes workout data and sends it to the backend.
- **Day 25-26: Health Platform Integration**
  - [ ] Request permissions for HealthKit (iOS) or Google Fit (Android).
  - [ ] After a workout is completed, use the platform's SDK to write the workout data (e.g., type, duration, calories burned) to the Health app.
- **Day 27: Push Notifications**
  - [ ] Integrate a service like Firebase Cloud Messaging.
  - [ ] Implement logic to schedule local notifications for workout reminders.
- **Day 28: Final Polish & Testing**
  - [ ] Review the entire app for UI consistency and smoothness.
  - [ ] Add subtle animations and haptic feedback.
  - [ ] Test all features thoroughly on a physical device, including offline functionality.

---
