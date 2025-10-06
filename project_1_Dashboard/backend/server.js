// server.js

/**
 * Main entry point for the backend application.
 *
 * Responsibilities:
 * - Initialize the Express application.
 * - Connect to the database.
 * - Apply essential middleware (e.g., for parsing JSON).
 * - Mount the API routes.
 * - Implement global error handling.
 * - Start the HTTP server.
 */

// - `backend/server.js`：

//   - __作用__：後端應用程式的入口點。它初始化 Express 應用程式，連接到 MongoDB 資料庫，啟用 CORS，應用 JSON 解析中介軟體，並掛載所有 API 路由。

//   - __通訊__：

//     - 呼叫 `connectDB()` (來自 `config/db.js`) 來建立資料庫連接。
//     - 使用 `app.use('/api/auth', authRoutes)` 等語句掛載來自 `routes/auth.js`, `routes/users.js`, `routes/posts.js` 的路由。
//     - 使用 `cors()` (來自 `node_modules/cors`) 啟用跨來源請求。
//     - 使用 `express.json()` (來自 `node_modules/express`) 解析 JSON 請求體。
//     - 讀取 `.env` 檔案中的環境變數 (透過 `dotenv.config()`)。

//! node_modules imports
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors'); // Import cors

//! local files imports
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const postRoutes = require('./routes/posts');

//https://www.freecodecamp.org/chinese/news/how-to-use-node-environment-variables-with-a-dotenv-file-for-node-js-and-npm/
//DotEnv是一個輕量級的npm 包，它可以從.env檔案中自動載入環境變數到process.env物件。
dotenv.config();

//step1 
connectDB();

//step2
const app = express();

//step3a Enable CORS for all origins
app.use(cors());

//step3b Middleware for parsing JSON bodies
// http://geeksforgeeks.org/web-tech/express-js-express-json-function/
app.use(express.json());

//step3c Health check route
app.get('/', (req, res) => {
    res.send('API is running...');
});

// step4 - Mount Auth Routes
app.use('/api/auth', authRoutes);
// step5 - Mount User Routes
app.use('/api/users', userRoutes);
// step6 - Mount Post Routes
app.use('/api/posts', postRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
