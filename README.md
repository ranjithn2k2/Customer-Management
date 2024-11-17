# Customer-Management

### *Setup Instructions*

#### *1. Clone the Repository*
   bash
   git clone <repository_url>
   cd <project_folder>
   

#### *2. Install Dependencies*
   - Install backend dependencies:
     bash
     cd backend
     npm install
     
   - Install frontend dependencies:
     bash
     cd ../frontend
     npm install
     

#### *3. Configure Environment Variables*
   - In the backend folder, create a .env file and add the following:
     plaintext
     PORT=8080
     MONGO_URI=mongodb://localhost:27017/crud_project
     JWT_SECRET=your_jwt_secret_key
     

#### *4. Set Up MongoDB Database*
   - Ensure MongoDB is installed and running locally (or use a cloud service like MongoDB Atlas).
   - Create a new database named crud_project:
     bash
     mongo
     use crud_project
     

#### *5. Import the Database Schema*
   - Use the following script to create a collection and sample data for your CRUD project.

---

### *Database Schema Script*

   Run the following commands in the MongoDB shell or MongoDB Compass:

   javascript
   // Switch to the database
   use crud_project;

   // Create a "users" collection with sample documents
   db.users.insertMany([
     {
     
       Firstname: "John",
       Lastname: "Doe",
       email: "john.doe@example.com",
       Phone: "8234567895"
       Company: "abc",
       JobTittle: "SDE"
       createdAt: new Date(),
       
     }
   ]);
   

   - *Collections*:
     - users: Stores user information (e.g., name, email, hashed password).
     - You can add more collections (e.g., posts, products) depending on your project.

---

#### *6. Start the Backend Server*
   - Run the backend server from the backend folder:
     bash
     npm run dev
     
   - The server will start on http://localhost:8080.

#### *7. Start the Frontend*
   - Run the frontend from the frontend folder:
     bash
     npm start
     
   - The frontend will open at http://localhost:3000.

---

#### *Backend Routes*
   - Example CRUD routes for users:
     javascript
     // Routes in Express.js
     app.get("/api/users", getAllUsers);
     app.post("/api/users", createUser);
     app.put("/api/users/:id", updateUser);
     app.delete("/api/users/:id", deleteUser);
     

#### *Frontend API Calls*
   - Example API call for fetching all users:
     javascript
     import axios from "axios";

     const fetchUsers = async () => {
       const response = await axios.get("http://localhost:8080/api/users");
       console.log(response.data);
     };


### *Technical Decisions*

1. *Backend Framework*:  
   - *Express.js* was chosen for its lightweight, unopinionated design and ability to easily create RESTful APIs.  

2. *Database*:  
   - *MongoDB* was used as the database for its flexibility and ability to store JSON-like documents, making it a good match for Node.js.  

3. *Frontend Framework*:  
   - *React.js* was selected for building the user interface due to its component-based architecture, enabling reusable and maintainable code.   

4. *RESTful API*:  
   - The backend exposes a RESTful API for seamless interaction between the client and server.

---

### *How Each Part of the App Works*

#### *1. Backend (Node.js + Express)*  
   - *API Endpoints*:  
     - /api/users: Handles CRUD operations for user data.
       - *GET*: Retrieve all users.
       - *POST*: Add a new user.
       - *PUT*: Update an existing user by ID.
       - *DELETE*: Remove a user by ID.
   - *Middleware*:
     - cors: Enables cross-origin requests from the frontend.
     - body-parser: Parses incoming JSON requests.
   - *Database Integration*:
     - *MongoDB* is connected using the mongoose library, allowing schema definition and interaction with the database.

#### *2. Frontend (React.js)*  
   - *Components*:
     - *UserForm*: Collects user data for creating or editing users.
     - *UserList*: Displays all users and includes edit and delete options.
   - *API Integration*:
     - Axios is used to make HTTP requests to the backend API.
     - Example:
       javascript
       const fetchUsers = async () => {
         const response = await axios.get("http://localhost:8080/api/users");
         setUsers(response.data);
       };
       
   - *State Management*:
     - useState: Manages form input and user data.
     - useEffect: Fetches initial data from the backend when the component loads.

#### *3. Database (MongoDB)*  
   - *Schema*:
     - Example User schema:
       javascript
       const UserSchema = new mongoose.Schema({
         Firstname: { type: String, required: true },
         Lastname: { type: String, required: true },
         Email: { type: String, required: true, unique: true },
         Phone: { type: String, required: true },
         company: { type: String, required: true },
         JobTittle: { type: String, required: true },
         
       });
       

#### *4. User Workflow*  
   - *Create*:
     - User submits a form on the frontend, triggering a POST request to the backend API.
     - The backend validates and saves the data to MongoDB.
   - *Read*:
     - The frontend fetches data from the backend via a GET request and displays it in a table or list.
   - *Update*:
     - The user edits data through a form, which triggers a PUT request to update the record in MongoDB.
   - *Delete*:
     - The user clicks "Delete," sending a DELETE request to remove the record.
    




    ### *Challenges Faced During the Assignment and Resolutions*


#### *1. Handling Cross-Origin Resource Sharing (CORS)*  
   - *Challenge: Encountered **CORS errors* when the React frontend tried to interact with the Express backend. This occurred because browsers block cross-origin requests by default.  
   - *Resolution*: Added the cors middleware to the backend:
     javascript
     const cors = require("cors");
     app.use(cors());
     
     This allowed the frontend to communicate with the backend without issues.



#### *2. Managing State in React*  
   - *Challenge*: Managing complex states for CRUD operations was initially tricky, especially when dealing with real-time updates after creating or deleting users.  
   - *Resolution*: Used useState to manage local component states and useEffect to fetch data only when necessary. Introduced controlled forms to handle user inputs effectively. Considered using Context API or Redux for more complex state management but decided it wasn’t necessary for this small-scale project.



#### *3. Managing Database Relationships*  
   - *Challenge*: For a more complex project, managing relationships between collections (e.g., users and posts) in MongoDB was slightly confusing.  
   - *Resolution*: Used Mongoose's populate method to simplify fetching related data. Opted for referencing documents rather than embedding them for better scalability.


