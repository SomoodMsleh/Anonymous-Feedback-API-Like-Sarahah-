# Anonymous Feedback API (Like Sarahah)

A Node.js-based anonymous feedback API that allows users to send and receive anonymous messages. Built with Express.js, MySQL (phpMyAdmin), and JWT authentication.

## Features
- **User Authentication**: Sign up, log in.
- **Anonymous Messaging**: Users can send anonymous messages to others.
- **Message Management**:
  - View received messages
  - Report offensive messages
  - Mark messages as read
  - Delete messages
- **Admin Controls**:
  - View all messages
  - Manage users (activate, deactivate, and update roles)
  - View and manage reported messages
- **Security**:
  - JWT authentication
  - Password hashing with bcrypt
  - Role-based access control

## Installation

### Prerequisites
- **Node.js** (v18+ recommended)
- **MySQL** (phpMyAdmin recommended)
- **Cloudinary** (for image uploads)

### Setup
1. **Clone the repository**
   ```sh
   git clone https://github.com/SomoodMsleh/Anonymous-Feedback-API-Like-Sarahah-.git
   cd Anonymous-Feedback-API-Like-Sarahah-
   ```

2. **Install dependencies**
   ```sh
   npm install
   ```

3. **Configure environment variables**
   Create a `.env` file in the project root and add:
   ```env
   PORT=4000
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=your_database_password
   DB_NAME=anonymousfeedbackapp
   DB_DIALECT=mysql
   JWT_SECRET=your_jwt_secret
   EMAIL_SERVICE=gmail
   EMAIL_USERNAME=your_email@gmail.com
   EMAIL_PASSWORD=your_email_app_password
   HASH_SALT= salt_number
   CLOUDINARY_NAME=your_cloudinary_name
   CLOUDINARY_KEY=your_cloudinary_api_key
   CLOUDINARY_API_SECRET=your_cloudinary_api_secret
   ```

4. **Start the server**
   ```sh
   npm run dev
   ```

## API Endpoints

### Authentication
- `POST /auth/signup` → Register a new user
- `POST /auth/login` → Login and get a token

### User Management
- `PUT /admin/users/:id/activate` → Reactivate a user (Admin or user who has the account)
- `PUT /admin/users/:id/deactivate` → Deactivate a user (Admin or user who has the account)
- `PUT /admin/user` → Update role from user to admin
- `GET /admin/users` → List all users (Admin only)
- `DELETE /admin/users/:id` → Delete a user account (Admin only)
- GET /admin/users/inactive → Get a list of inactive users [Admin Only]
- `POST /messages/:id/report` → Report an offensive message  
- `PUT /users/password` → Change password  , Token Required
 `PUT /users/profile` → Update user profile (profile picture)

### Messaging
- `POST /messages/send/:receiver_id` → Send anonymous message (Token required)
- `GET /messages/received` → View received messages (Token required)
- `GET /messages/unread` → Fetch unread messages (Token required)
- `PUT /messages/:id/read` → Mark message as read (Token required)
- `DELETE /messages/:id` → Delete a received message (Token required)

### Admin Controls
- `GET /admin/messages` → View all messages (Admin only)
- `GET /admin/reports` → View all reported messages (Admin only)
- `GET /admin/reports/:id` → View details of a specific report (Admin only)

## Technologies Used
- **Node.js & Express.js** - Backend framework
- **MySQL & Sequelize** - Database and ORM
- **JWT** - Authentication
- **Bcrypt** - Password hashing
- **Cloudinary** - Image storage
- **Nodemailer** - Email verification
- **Joi** -validation
- **multer** - upload file

## Contributing
1. Fork the repository
2. Create a feature branch (`git checkout -b feature-name`)
3. Commit changes (`git commit -m 'Add new feature'`)
4. Push to the branch (`git push origin feature-name`)
5. Open a pull request



---
**Author**: Somood Musleh

