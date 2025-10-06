### Project 2 (Beginner-Intermediate): Hybrid Cross-Platform Budgeting App

**Difficulty:** ★★☆☆☆ (Introduces mobile development in a manageable way using a BaaS.)

**Project Background:**
A single app for iOS and Android to help users track income/expenses and visualize their financial habits. The goal is a consistent UX from a single codebase, simplified by a Backend-as-a-Service.

**Recommended Tech Stacks:**

- **Stack 1 (The React Native/Firebase Stack):** The fastest way to get a full-featured app on both platforms.
  - **Mobile App:** React Native (with Expo)
  - **Backend:** Firebase (Authentication, Firestore, Cloud Functions)
- **Stack 2 (The Flutter/Supabase Stack):** A great alternative with a fantastic developer experience.
  - **Mobile App:** Flutter
  - **Backend:** Supabase (PostgreSQL-based BaaS)

**Detailed Development Checklist (2 Weeks):**

- **Day 1: Planning & Setup**
  - [ ] Finalize feature list (e.g., transaction tracking, categories, dashboard with charts).
  - [ ] Design the Firestore data model (`users`, `transactions`, `categories`).
  - [ ] Initialize a new React Native (Expo) or Flutter project.
  - [ ] Create a new Firebase project in the console.
  - [ ] Create a new Git repository on GitHub and clone it locally.
- **Day 2: Firebase Configuration**
  - [ ] Enable Email/Password sign-in method in Firebase Authentication.
  - [ ] Set up Firestore database rules for basic security (e.g., only authenticated users can read/write their own data).
  - [ ] Add Firebase SDK to the mobile app project and configure it with your project credentials.
- **Day 3: Auth UI**
  - [ ] Build the UI for the Registration screen (email, password fields, submit button).
  - [ ] Build the UI for the Login screen.
  - [ ] Create reusable input components.
- **Day 4: Auth Logic**
  - [ ] Implement client-side logic to call the Firebase SDK for user registration.
  - [ ] Implement client-side logic for user login.
  - [ ] Implement logic to store user session/token and handle automatic login.
- **Day 5: App Navigation**
  - [ ] Set up a navigation library (e.g., React Navigation, GoRouter).
  - [ ] Create a main tab navigator for authenticated users (e.g., Dashboard, Transactions, Add).
  - [ ] Implement logic to show the Auth screens or the Main app screens based on login state.
- **Day 6: Transaction Form UI**
  - [ ] Build the UI for the "Add Transaction" screen.
  - [ ] Include fields for amount, category (dropdown/picker), date (date picker), and notes.
  - [ ] Implement client-side form validation.
- **Day 7: Transaction Logic**
  - [ ] Write the logic to save a new transaction to the user's `transactions` collection in Firestore.
  - [ ] Implement logic to edit an existing transaction.
  - [ ] Implement logic to delete a transaction.
- **Day 8: Transaction List UI**
  - [ ] Build the UI for the "Transactions" history screen.
  - [ ] Create a reusable component to display a single transaction item.
  - [ ] Add pull-to-refresh functionality.
- **Day 9: Real-time Data**
  - [ ] Use Firestore's real-time capabilities to fetch and display the list of transactions.
  - [ ] Ensure the list updates automatically when a new transaction is added or modified.
  - [ ] Order transactions by date (newest first).
- **Day 10: Filtering**
  - [ ] Add UI controls (e.g., dropdowns, date pickers) to the transaction list screen.
  - [ ] Implement the client-side logic to filter the displayed transactions by category or date range.
- **Day 11: Dashboard UI**
  - [ ] Build the UI for the main dashboard/summary screen.
  - [ ] Design components to show key info like "Total Income," "Total Expenses," and "Balance" for the current month.
- **Day 12: Data Visualization**
  - [ ] Integrate a charting library (e.g., `react-native-svg-charts`, `fl_chart`).
  - [ ] Fetch transaction data and process it to be suitable for the chart.
  - [ ] Display a pie chart showing the breakdown of expenses by category.
- **Day 13: Polish & Extras**
  - [ ] Add loading indicators for data fetching operations.
  - [ ] Implement error handling and display user-friendly error messages.
  - [ ] (Optional) Use a native module (e.g., `expo-local-authentication`) to add biometric (Face ID/Touch ID) login.
- **Day 14: Testing & Build**
  - [ ] Test all features on both an iOS simulator and an Android emulator.
  - [ ] Create a development build using Expo Application Services (EAS) or `flutter build`.
  - [ ] Test the development build on a physical iOS and Android device.

---
