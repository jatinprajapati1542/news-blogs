# 📰 NEWS-CMS

A full-stack News Management System built with **Node.js, Express.js, MongoDB, and EJS**.
The application allows users to browse news articles, while administrators can manage categories, news articles, and website settings.

## 🚀 Live Demo

**Live Website:** [Add your Render URL here]

## 📌 Features

* 🔐 User authentication
* 📰 Create, edit, and delete news articles
* 📂 Category management
* 🖼️ Upload and manage news images
* ⚙️ Website settings management
* 🔍 Search news articles
* 📄 Pagination
* 📝 Rich text editor for news content
* 🗄️ MongoDB database
* 🔒 Password hashing using bcrypt
* 🔑 Session-based authentication

## 🛠️ Technologies Used

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* EJS
* Express Session
* Multer
* bcrypt

### Frontend

* HTML5
* CSS3
* JavaScript
* Bootstrap
* EJS

### Deployment

* Render
* MongoDB Atlas
* GitHub

## 📁 Project Structure

```text
NEWS-CMS/
│
├── controllers/
├── middleware/
├── models/
├── routes/
├── views/
│   ├── admin/
│   ├── auth/
│   ├── layouts/
│   └── ...
│
├── public/
│   ├── css/
│   ├── js/
│   └── ...
│
├── uploads/
├── config/
├── app.js
├── package.json
├── package-lock.json
├── .gitignore
└── README.md
```

## ⚙️ Installation

### 1. Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/NEWS-CMS.git
```

### 2. Go to the project directory

```bash
cd NEWS-CMS
```

### 3. Install dependencies

```bash
npm install
```

### 4. Create `.env`

Create a `.env` file in the root directory:

```env
PORT=5000
MONGO_URL=your_mongodb_connection_string
SESSION_SECRET=your_session_secret
```

> Do not upload your `.env` file to GitHub.

### 5. Start the development server

```bash
npm start
```

The application will run at:

```text
http://localhost:5000
```

## 🗄️ Database

This project uses **MongoDB** with **Mongoose**.

You can use MongoDB Atlas for a cloud database.

Add your MongoDB connection string to `.env`:

```env
MONGO_URL=mongodb+srv://username:password@cluster.mongodb.net/news-cms
```

## 🔐 Environment Variables

| Variable         | Description                        |
| ---------------- | ---------------------------------- |
| `PORT`           | Server port                        |
| `MONGO_URL`      | MongoDB connection string          |
| `SESSION_SECRET` | Secret used for session management |

## 🌐 Deployment

The NEWS-CMS application is deployed using **Render**.

### Render configuration

**Build Command:**

```bash
npm install
```

**Start Command:**

```bash
npm start
```

Add the required environment variables in the Render dashboard.

## 📸 Screenshots

### Home Page

*Add screenshot here*

### Admin Dashboard

*Add screenshot here*

### News Management

*Add screenshot here*

## 🔒 Security

Sensitive information such as:

* MongoDB credentials
* Session secrets
* API keys
* Environment variables

should never be committed to GitHub.

Make sure `.env` is included in `.gitignore`:

```gitignore
node_modules/
.env
uploads/*
```

## 👨‍💻 Author

**Jatin Prajapati**

GitHub: [Your GitHub Profile](https://github.com/YOUR_USERNAME)

## 📄 License

This project is created for learning and development purposes.
