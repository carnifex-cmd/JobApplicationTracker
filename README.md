# Job Application Tracking Dashboard

A modern, full-stack job application tracking dashboard built with React (Next.js) and Node.js. Track your job search progress with a clean, responsive interface and powerful features.

![Job Tracker Screenshot](https://via.placeholder.com/800x400?text=Job+Application+Tracker+Dashboard)

## ✨ Features

- **🔐 User Authentication**: Secure signup and login with JWT tokens
- **📊 Dashboard Overview**: Visual stats of your application status
- **📝 Application Management**: Create, read, update, and delete job applications
- **🔍 Advanced Filtering**: Filter by status, search by company/title, and sort by various criteria
- **📱 Responsive Design**: Works perfectly on desktop, tablet, and mobile
- **🌙 Dark/Light Mode**: Toggle between themes for comfortable viewing
- **🎨 Modern UI**: Built with Next UI for beautiful, accessible components
- **⚡ Fast Performance**: Optimized API calls and efficient data handling

## 🚀 Tech Stack

### Frontend
- **React 18** with Next.js 14 (App Router)
- **Next UI** for component library
- **Tailwind CSS** for styling
- **Framer Motion** for animations
- **Axios** for API requests
- **React Hook Form** for form handling
- **Date-fns** for date formatting

### Backend
- **Node.js** with Express.js
- **PostgreSQL** database with connection pooling
- **JWT** for authentication
- **Bcrypt** for password hashing
- **Helmet** for security headers
- **Express Rate Limit** for API protection
- **Express Validator** for input validation

## 📋 Prerequisites

Before running this application, make sure you have:

- **Node.js** (v18 or higher)
- **PostgreSQL** (v12 or higher)
- **npm** or **yarn** package manager

## 🛠️ Installation & Setup

### 1. Clone the Repository

```bash
git clone <repository-url>
cd JobApplicationTracker
```

### 2. Install Dependencies

```bash
# Install root dependencies
npm install

# Install all dependencies (frontend + backend)
npm run install:all
```

### 3. Database Setup

1. **Create PostgreSQL Database**:
   ```sql
   CREATE DATABASE job_tracker;
   ```

2. **Run Migration Script**:
   ```bash
   psql -U your_username -d job_tracker -f migrations/001_initial_schema.sql
   ```

### 4. Environment Configuration

1. **Copy environment file**:
   ```bash
   cp .env.example .env
   ```

2. **Configure your `.env` file**:
   ```env
   # Database Configuration
   DB_HOST=localhost
   DB_PORT=5432
   DB_NAME=job_tracker
   DB_USER=your_db_user
   DB_PASSWORD=your_db_password

   # JWT Secret (use a strong, random string)
   JWT_SECRET=your_super_secret_jwt_key_here

   # Server Configuration
   PORT=5000
   NODE_ENV=development

   # Frontend Configuration
   NEXT_PUBLIC_API_URL=http://localhost:5000/api

   # CORS Origins
   CORS_ORIGINS=http://localhost:3000
   ```

### 5. Start the Application

```bash
# Start both frontend and backend simultaneously
npm run dev

# Or start them separately:
npm run dev:backend    # Starts backend on port 5000
npm run dev:frontend   # Starts frontend on port 3000
```

### 6. Access the Application

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000
- **Health Check**: http://localhost:5000/health

## 📝 Usage Guide

### Getting Started

1. **Sign Up**: Create a new account with your email and password
2. **Login**: Sign in to access your dashboard
3. **Add Applications**: Click "Add Application" to track a new job application
4. **Manage Applications**: View, edit, or delete applications from the table
5. **Filter & Search**: Use the filters and search to find specific applications
6. **View Stats**: Monitor your application progress with the dashboard stats

### Application Fields

- **Company Name**: The company you applied to
- **Job Title**: Position title
- **Application Date**: When you submitted the application
- **Status**: Current status (Applied, Interview, Offered, Rejected)
- **Notes**: Additional notes about the application

### API Endpoints

#### Authentication
- `POST /api/auth/signup` - Register new user
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - Get user profile

#### Applications
- `GET /api/applications` - Get all applications (with filtering)
- `POST /api/applications` - Create new application
- `GET /api/applications/:id` - Get specific application
- `PUT /api/applications/:id` - Update application
- `DELETE /api/applications/:id` - Delete application
- `GET /api/applications/stats` - Get application statistics

## 🗂️ Project Structure

```
JobApplicationTracker/
├── backend/
│   ├── config/
│   │   └── database.js          # Database configuration
│   │   ├── controllers/
│   │   │   ├── authController.js    # Authentication logic
│   │   │   └── applicationsController.js
│   │   ├── middleware/
│   │   │   ├── auth.js              # JWT middleware
│   │   │   └── errorHandler.js      # Error handling
│   │   ├── models/
│   │   │   ├── User.js              # User model
│   │   │   └── JobApplication.js    # Application model
│   │   ├── routes/
│   │   │   ├── auth.js              # Auth routes
│   │   │   └── applications.js      # Application routes
│   │   ├── package.json
│   │   └── server.js                # Express server
│   ├── frontend/
│   │   ├── app/
│   │   │   ├── auth/
│   │   │   │   ├── login/page.js    # Login page
│   │   │   │   └── signup/page.js   # Signup page
│   │   │   ├── globals.css          # Global styles
│   │   │   ├── layout.js            # Root layout
│   │   │   └── page.js              # Home page
│   │   ├── components/
│   │   │   ├── applications/
│   │   │   │   ├── ApplicationsTable.js
│   │   │   │   └── ApplicationModal.js
│   │   │   └── layout/
│   │   │       └── Dashboard.js     # Main dashboard
│   │   ├── hooks/
│   │   │   ├── useAuth.js           # Authentication hook
│   │   │   └── useApplications.js   # Applications hook
│   │   ├── services/
│   │   │   └── api.js               # API service
│   │   └── package.json
│   ├── migrations/
│   │   └── 001_initial_schema.sql   # Database schema
│   ├── .env.example                 # Environment variables template
│   └── package.json                 # Root package.json
└── README.md
```

## 🔧 Development Commands

```bash
# Install dependencies
npm run install:all

# Development
npm run dev                 # Start both frontend and backend
npm run dev:frontend        # Start only frontend
npm run dev:backend         # Start only backend

# Production
npm run build              # Build frontend for production
npm start                  # Start production server

# Database
cd backend && npm run migrate  # Run database migrations
```

## 🔒 Security Features

- **Password Hashing**: Bcrypt with salt rounds
- **JWT Authentication**: Secure token-based auth
- **Rate Limiting**: API endpoint protection
- **Input Validation**: Server-side validation for all inputs
- **SQL Injection Prevention**: Parameterized queries
- **CORS Configuration**: Controlled cross-origin requests
- **Security Headers**: Helmet.js middleware

## 📱 Responsive Design

The application is fully responsive and works across:
- **Desktop**: Full feature set with optimized layout
- **Tablet**: Adapted interface for medium screens
- **Mobile**: Touch-friendly mobile interface

## 🎨 UI/UX Features

- **Modern Design**: Clean, minimal interface
- **Dark/Light Mode**: User preference toggle
- **Smooth Animations**: Framer Motion transitions
- **Accessible Components**: Next UI accessibility features
- **Loading States**: User feedback during operations
- **Error Handling**: Graceful error messages
- **Toast Notifications**: Success/error feedback

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Commit changes: `git commit -am 'Add new feature'`
4. Push to branch: `git push origin feature/new-feature`
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Troubleshooting

### Common Issues

1. **Database Connection Error**:
   - Verify PostgreSQL is running
   - Check database credentials in `.env`
   - Ensure database exists

2. **JWT Token Issues**:
   - Check `JWT_SECRET` in `.env`
   - Clear browser localStorage if needed

3. **Port Already in Use**:
   - Change `PORT` in `.env`
   - Kill existing processes: `lsof -ti:3000 | xargs kill -9`

4. **Module Not Found**:
   - Run `npm run install:all`
   - Clear node_modules: `rm -rf node_modules && npm install`

### Getting Help

- Check the browser console for frontend errors
- Check server logs for backend errors
- Verify API endpoints with tools like Postman
- Ensure all environment variables are set correctly

## 🚀 Deployment

### Backend Deployment (Heroku/Railway/DigitalOcean)
1. Set environment variables
2. Run database migrations
3. Deploy backend code
4. Update CORS origins

### Frontend Deployment (Vercel/Netlify)
1. Set `NEXT_PUBLIC_API_URL` to your backend URL
2. Deploy frontend code
3. Update backend CORS origins

---

**Built with ❤️ using modern web technologies** 