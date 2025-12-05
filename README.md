# Task Management App

A modern, Trello-inspired task management application built with the MERN stack, featuring drag-and-drop functionality for efficient project organization.

## Features

- **Drag & Drop Task Ordering**: Seamlessly reorder tasks and columns using Hello-Pangea DnD
- **Multiple Boards System**: Create and manage multiple project boards
- **Column CRUD Operations**: Create, edit, and delete columns
- **Task CRUD Operations**: Create, edit, and delete tasks with descriptions
- **Real-time UI Updates**: Instant visual feedback using React state management
- **Responsive Design**: Built with TailwindCSS for a clean, modern interface
- **MongoDB Integration**: Persistent data storage with Mongoose ODM

## Tech Stack

- **Frontend**: React 19, TailwindCSS, Hello-Pangea DnD, Axios, Vite
- **Backend**: Node.js, Express.js, MongoDB, Mongoose
- **State Management**: React Hooks
- **Development Tools**: ESLint, Vite, Nodemon

## Prerequisites

Before running this application, ensure you have the following installed:

- Node.js (v16 or higher)
- npm or yarn
- MongoDB (local installation or MongoDB Atlas)

## Installation

1. **Clone the Repository**
   ```bash
   git clone <your-repo-url>
   cd task-managementapp
   ```

2. **Backend Setup**
   ```bash
   cd backend
   npm install
   ```

3. **Frontend Setup**
   ```bash
   cd ../frontend/task-management
   npm install
   ```

## Environment Configuration

1. **Backend Environment Variables**
   ```bash
   cd backend
   cp .env.example .env
   ```

   Edit `.env` with your configuration:
   ```
   MONGO_URI=mongodb://127.0.0.1:27017/your_database_name
   PORT=4000
   ```

## Running the Application

1. **Start MongoDB**
   Ensure MongoDB is running on your system.

2. **Start Backend Server**
   ```bash
   cd backend
   npm run dev
   ```
   Server will run on: http://localhost:4000

3. **Seed Demo Data (Optional)**
   ```bash
   node seed.js
   ```

4. **Start Frontend Development Server**
   ```bash
   cd ../frontend/task-management
   npm run dev
   ```
   Application will be available at: http://localhost:5173

## API Documentation

### Boards
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/boards` | Retrieve all boards with populated columns and cards |
| POST | `/api/boards` | Create a new board |

### Columns
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/boards/:boardId/columns` | Create a new column in a board |
| PUT | `/api/boards/columns/:columnId` | Update column title |
| DELETE | `/api/boards/columns/:columnId` | Delete column and associated cards |
| POST | `/api/boards/:boardId/columns/order` | Update column order |

### Tasks (Cards)
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/boards/columns/:columnId/cards` | Create a new task in a column |
| PUT | `/api/boards/cards/:id` | Update task details |
| DELETE | `/api/boards/cards/:id` | Delete task |
| PUT | `/api/boards/move` | Move task between columns or reorder within column |

## Screenshots

### Home Page / Demo Board
![Home Page](./frontend/task-management/Screenshots/Screenshot%202025-12-05%20113035.png)

### Create New Board
![Create Board](./frontend/task-management/Screenshots/Screenshot%202025-12-05%20113149.png)

### Drag & Drop Tasks
![Drag & Drop](./frontend/task-management/Screenshots/Screenshot%202025-12-05%20113208.png)

### Edit and Delete Tasks
![Edit Delete](./frontend/task-management/Screenshots/Screenshot%202025-12-05%20113222.png)

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
