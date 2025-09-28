# Task Management Backend

🔗 **Frontend Live**: [https://sofrik-task.onrender.com/](https://sofrik-task.onrender.com/)

## ⚙️ How to Run

### 1. Clone the Repository

git clone https://github.com/Mohammad-Jafrullah/Task-Management-Backend.git

cd Task-Management-Backend

2. Install Dependencies

npm install express cors jsonwebtoken bcrypt mongoose dotenv

Or just use npm install if package.json already includes them.

3. Setup Environment

Create a .env file in the root with the required environment variables:

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret

4. Run the Server

npm start

Server runs at http://localhost:5000

🌱 Seed Data

To insert test data into the database:

node seed.js
