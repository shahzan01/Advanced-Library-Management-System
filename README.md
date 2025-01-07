# Advanced Library Management System

## Project Overview
The Advanced Library Management System is a backend application designed to streamline the management of books, users, and borrowing activities in a library. Built using **Node.js**, **TypeScript**, **Express**, and **PostgreSQL**, it offers a comprehensive suite of features including authentication, role-based access control, and analytics.

## Features

### Database Design
- **Entities:**
  - `User`: Stores librarian and member information, including roles (Admin or Member), email verification status, and soft delete flag.
  - `Book`: Stores book details with unique ISBNs, descriptions, and copies, with soft delete functionality.
  - `BorrowedBook`: Tracks borrowed books, due dates, fines, and return dates.
  - `Transaction`: Tracks fines and payments related to borrowed books.
  - `Category`: Categorizes books into genres.
  - `Author`: Manages author details and their relationship with books.
  - `Otp`: Handles email OTPs for verification purposes.
  - `BookCategory` & `BookAuthor`: Many-to-many relationship mapping between books, categories, and authors.
 
<h2>Database Relationship Diagram</h2>
<img src="https://github.com/shahzan01/Advanced-Library-Management-System/blob/main/public/db-diagram.png" alt="Database Relationship Diagram" />

- **Constraints & Relationships:**
  - Each book has a unique ISBN and can have multiple copies.
  - Users can borrow up to 3 books at a time for 14 days; fines apply for overdue returns.
  - Books and users support soft deletes.
  - Email verification is required before borrowing books.
  - Multi-category and multi-author relationships are supported.

### RESTful APIs
#### Authentication APIs:
- Register/Login with JWT authentication.
- Role-based access (Admin vs Member).
- Email verification for new users via OTP.

#### Book Management APIs:
- Add/Edit/Delete books (Admin only).
- Get book details by ISBN or title.
- Search books by category, author, or availability.

#### User Management APIs:
- View user details.
- Track borrowed books and fines.
- Enable/disable user accounts.

#### Borrow and Return APIs:
- Borrow a book, respecting borrowing limits.
- Return a book and calculate fines based on overdue days.

#### Payment APIs:
- Pay fines for late returns.
- Generate invoices for payments.

#### Analytics APIs (Advanced):
- Statistics on most borrowed books.
- Monthly usage reports for admins.

### General Backend Features
- **ORM:** Prisma for database interaction.
- **Middleware:** Logging and error handling.
- **Validation:** Input validation using `zod`.
- **Rate Limiting:** Prevent abuse of API endpoints.
- **Utilities:** Reusable modules for database connections and error messages.

### Bonus Features
- **Schedulers:** Email reminders for return deadlines.
- **Deployment:** Deployable to cloud platforms like Vercel or Render.
- 
## Prerequisites
- **Node.js**: v16+
- **PostgreSQL**: v13+

## Setup Instructions

1. **Clone the Repository**
   ```bash
   git clone https://github.com/shahzan01/Advanced-Library-Management-System
   cd Advanced-Library-Management-System
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Set Up Environment Variables**
   Create a `.env` file in the root directory using the provided `.env.example`.
   ```
   JWT_SECRET_ADMIN=<Your admin JWT Secret>
    JWT_SECRET_MEMBER=<Your member JWT Secret>
    DATABASE_URL=<Your PostgreSQL connection string>

    MAIL_HOST = gmail
    MAIL_USER = <Your  email>
    MAIL_PASS = <Your email password>


   ```

4. **Run Database Migrations**
   ```bash
   npx prisma migrate deploy
   ```

5. **Generate Prisma Client**
   ```bash
   npx prisma generate
   ```

6. **Seed the Database**
   ```bash
   npm run seed
   ```

7. **Start the Server**
   ```bash
   npm run build
   npm run start
   ```

8. **API Documentation**
   Access the API documentation via Swagger or Postman collection provided in the repository.

## Folder Structure
```
/prisma
/public
/src
  /config
  /controllers
  /mail/templates
  /middlewares
  /models
  /routes
  /services
  /types
  /utils
  /validation
  app.ts
  db.sql
  index.ts
README.md
package.json
tsconfig.json
.env.example
```

## Scripts in `package.json`
- **`dev`**: Start the development server with live reload using `nodemon`.
- **`build`**: Compile TypeScript to JavaScript.
- **`start`**: Start the production server.
- **`seed`**: Seed the database with initial data.
- **`vercel-build`**: Generate the Prisma client for deployment on Vercel.



## Contribution
Feel free to fork this repository and submit pull requests to contribute to the project.

## License
This project is licensed under the MIT License.
