
markdown
Copy
Edit
# 🐾 Pawzio - Virtual Pet Adoption Center

Pawzio is a full-stack web application where users can register, log in, browse and adopt virtual pets, leave feedback, and contact admins. Admins have full control over pets, feedback, customer details, and adoption records.

---

## 🔧 Tech Stack

| Layer       | Tech                           |
|-------------|--------------------------------|
| Frontend    | Vite + React                   |
| Backend     | Node.js + Express.js           |
| Database    | PostgreSQL                     |
| Auth        | JWT + bcrypt + cookie-parser   |
| REST Client | Postman                        |

---

## 🚀 Features

### 👤 User
- Register / Login (JWT + Cookies)
- Browse adoptable pets
- Filter pets by species, personality, mood
- Adopt pets
- Submit feedback
- Send contact message

### 🔐 Admin
- Login
- Add / Edit / Delete / View pets
- View feedback messages
- View contact messages
- View customer details
- View adopted pets and adopter information

---

## 📁 Folder Structure

### 📦 Backend (`/backend`)

/backend
├── app.js # Initializes Express app and middleware
├── server.js # Starts the server
├── db.js # PostgreSQL connection
├── .env # Environment variables

├── /routes # API route definitions
│ ├── petRoutes.js
│ ├── userRoutes.js
│ ├── adminRoutes.js
│ ├── feedbackRoutes.js
│ └── messageRoutes.js

├── /controllers # Route handler logic
│ ├── petController.js
│ ├── userController.js
│ ├── adminController.js
│ ├── feedbackController.js
│ └── messageController.js

├── /models # DB interaction
│ ├── petModel.js
│ ├── userModel.js
│ ├── feedbackModel.js
│ └── messageModel.js

├── /services # Reusable business logic
│ ├── petService.js
│ └── userService.js

├── /middleware # Auth & middleware
│ └── authMiddleware.js # JWT and admin verification

├── /utils
│ └── moodLogic.js # Mood calculation logic


### 💻 Frontend (`/frontend`)

/frontend
├── public/ # Static assets
├── src/
│ ├── App.js
│ ├── index.js
│ ├── /components
│ │ ├── PetList.js
│ ├── /pages
│ │ └── CustomerPages
│ │    └── HomePage.js
│ │ └── AdminPAges
│ │    └── HomePage.js
│ ├── /services
│ │ └── api.js 
│ ├── /styles
│ │ └── global.css
│ └── /utils
│ └── helpers.js

---

## ⚙️ Installation & Setup

### 📦 Clone the Repository

```bash
git clone https://github.com/your-username/pawzio.git
cd pawzio
🔙 Backend Setup
Navigate to backend:

cd backend
Install dependencies:

npm install
Create .env file:

PORT=5000
DATABASE_URL=postgresql://username:password@localhost:5432/pawzio
JWT_SECRET=your_jwt_secret
COOKIE_SECRET=your_cookie_secret
Setup PostgreSQL database:

Run the schema script or use a tool like pgAdmin to create necessary tables (users, pets, feedbacks, messages, adoptions, etc.).

Start the server:

npm run dev
🖥️ Frontend Setup
Navigate to frontend:

cd ../frontend
Install dependencies:

npm install
Start the React app:

npm run dev
🔐 Authentication
JWT is used for issuing and verifying tokens.

Tokens are stored in HttpOnly cookies using cookie-parser.

Passwords are hashed using bcrypt before storing in the database.

🧪 API Testing with Postman
Import the provided pawzio.postman_collection.json into Postman.

Test endpoints for:

User registration/login

Admin login

CRUD operations on pets

Adoption endpoints

Feedback and messages


🛠 Database Setup
The full database schema and seed data are located at:

/backend/db/setup.sql
To set up the database:

psql -U your_username -d your_databasename -f db/setup.sql
📄 API Documentation
All API routes with example requests and responses are included in:

bash
Copy
Edit
/backend/api-docs.json
You can import this JSON file into Postman for testing.

👨‍💻 Developer
Name: Kirujan Amirthalingam
Email: amirkirujan10@gmail.com
GitHub: @Kiru-10

📄 License
This project is licensed under the MIT License.
Feel free to use and modify for educational or commercial purposes.










