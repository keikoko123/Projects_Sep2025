### Project 3 (Intermediate): E-commerce Platform

**Difficulty:** ★★★☆☆ (Adds complex business logic, state management, and critical third-party integrations.)

**Project Background:**
A boutique online store needing a modern platform to sell products. The goal is a seamless shopping experience with a secure checkout and an easy-to-use admin system.

**Recommended Tech Stacks:**

- **Stack 1 (The Next.js/Stripe Stack):** A modern, SEO-friendly, and powerful combination for e-commerce.
  - **Frontend/Backend:** Next.js (React framework)
  - **Database:** PostgreSQL (with Prisma ORM)
  - **Payments:** Stripe
- **Stack 2 (The C#/.NET Stack):** A robust, enterprise-grade choice.
  - **Frontend:** React or Blazor
  - **Backend:** C# with ASP.NET Core
  - **Database:** Microsoft SQL Server

**Detailed Development Checklist (3 Weeks):**

- **Day 1: Planning & Schema**
  - [ ] Finalize feature list (product catalog, cart, checkout, user profiles, admin dashboard).
  - [ ] Draw a detailed database schema diagram for `users`, `products`, `orders`, and `order_items`.
  - [ ] Choose a primary tech stack (e.g., Next.js/PostgreSQL/Prisma).
  - [ ] Create a new Git repository.
- **Day 2: Backend Setup**
  - [ ] Initialize the backend project (e.g., `create-next-app`).
  - [ ] Install dependencies (Prisma, bcrypt, jsonwebtoken).
  - [ ] Set up the Prisma schema based on the diagram and run the initial migration.
  - [ ] Configure environment variables (`.env`).
- **Day 3: User Registration API**
  - [ ] Create the `POST /api/auth/register` API route.
  - [ ] Implement input validation and password hashing.
  - [ ] Write logic to create a new user using Prisma.
- **Day 4: User Login API**
  - [ ] Create the `POST /api/auth/login` API route.
  - [ ] Implement logic to verify user credentials and generate a JWT.
- **Day 5: Product CRUD API - Part 1**
  - [ ] Create the `POST /api/products` route for creating a new product (admin only).
  - [ ] Create the `GET /api/products` and `GET /api/products/:id` routes for fetching products (public).
- **Day 6: Product CRUD API - Part 2**
  - [ ] Implement image upload logic, saving files to a local `/public` folder or a cloud storage service.
  - [ ] Create the `PUT /api/products/:id` and `DELETE /api/products/:id` routes (admin only).
- **Day 7: Admin Dashboard UI**
  - [ ] Create a new protected area in the frontend for admins.
  - [ ] Build the UI to list all products with "Edit" and "Delete" buttons.
  - [ ] Build the form for creating and editing products, including the file upload input.
- **Day 8: Public Frontend Setup**
  - [ ] Set up the main layout for the public-facing store.
  - [ ] Implement the UI for the navigation bar, including a link to the shopping cart.
- **Day 9: Product Listing Page**
  - [ ] Build the UI for the main shop page that displays a grid of all products.
  - [ ] Fetch data from the `GET /api/products` endpoint and display it.
- **Day 10: Product Detail Page**
  - [ ] Create a dynamic route for single product pages (e.g., `/products/[id]`).
  - [ ] Build the UI to display detailed information for a single product.
  - [ ] Include an "Add to Cart" button.
- **Day 11: State Management Setup**
  - [ ] Choose and set up a state management solution (e.g., React Context, Redux Toolkit, Zustand) for the shopping cart.
  - [ ] Define the cart's state structure (e.g., an array of items with product details and quantity).
- **Day 12: Cart Logic**
  - [ ] Implement the "Add to Cart" functionality.
  - [ ] Implement logic to increment the quantity if the item is already in the cart.
- **Day 13: Cart UI**
  - [ ] Build the UI for the shopping cart page.
  - [ ] Display all items in the cart with their quantities and prices.
  - [ ] Add buttons to update item quantities or remove items from the cart.
- **Day 14: Cart Summary & Checkout Button**
  - [ ] Display the cart subtotal, taxes (if any), and total.
  - [ ] Add a "Proceed to Checkout" button that navigates to the checkout page.
- **Day 15: Checkout Form UI**
  - [ ] Build the UI for a multi-step checkout form (e.g., shipping address, payment information).
  - [ ] Implement client-side validation for all form fields.
- **Day 16: Backend Order API**
  - [ ] Create a protected `POST /api/orders` route.
  - [ ] The route should take the cart contents and shipping info, create an `order` and associated `order_items` in the database.
- **Day 17: Stripe Backend Integration**
  - [ ] Set up a Stripe account and get API keys.
  - [ ] Modify the order creation route to create a Stripe "Payment Intent" with the final order amount.
  - [ ] Return the Payment Intent's `client_secret` to the frontend.
- **Day 18: Stripe Frontend Integration**
  - [ ] Integrate Stripe Elements into the checkout form for securely collecting credit card details.
  - [ ] Use the `client_secret` from the backend to confirm the payment on the frontend.
- **Day 19: Post-Payment Logic**
  - [ ] Handle successful payment confirmation from Stripe.
  - [ ] Redirect the user to an "Order Successful" page.
  - [ ] Handle payment failures and display appropriate error messages.
- **Day 20: Order History Page**
  - [ ] Create a protected `GET /api/orders/me` route to fetch orders for the logged-in user.
  - [ ] Build the UI for the "My Orders" page to list a user's past orders.
- **Day 21: Docker & Deployment**
  - [ ] Write a `Dockerfile` for the Next.js application.
  - [ ] Write a `docker-compose.yml` file that includes the app and a PostgreSQL database.
  - [ ] Deploy the application to a service like Vercel or Fly.io.

---
