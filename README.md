# 📰 NEWS-CMS

A full-stack News Management System built with **Node.js, Express.js, MongoDB, and EJS**.
The application allows users to browse news articles, while administrators can manage categories, news articles, and website settings.

## 🚀 Live Demo

**Live Website:** https://news-blogs-gyz3.onrender.com

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
* 🔑 JWT authentication

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

## ⚙️ Installation

### 1. Clone the repository

```bash
git clone https://github.com/jatinprajapati1542/news-blogs.git
```

### 2. Go to the project directory

```bash
cd news-blogs
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
JWT_SECRET=your_JWT_secret
```


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

| Variable         | Description                           |
| ---------------- | ------------------------------------- |
| `PORT`           | Server port                           |
| `MONGO_URL`      | MongoDB connection string             |
| `JWT_SECRET`     |Secret key used for signing JWT tokens |

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

## 🔒 Security

Sensitive information such as:

* MongoDB credentials
* JWT secrets
* API keys
* Environment variables

should never be committed to GitHub.

Make sure `.env` is included in `.gitignore`:

```gitignore
node_modules/
.env
```

## 👨‍💻 Author

**Jatin Prajapati**

GitHub: https://github.com/jatinprajapati1542

## 📄 License

This project is created for learning and portfolio purposes.
