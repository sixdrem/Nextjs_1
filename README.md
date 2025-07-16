# Next.js Authentication & User Management System

A robust, full-stack authentication and user management platform built with [Next.js](https://nextjs.org), [React](https://react.dev), [Tailwind CSS](https://tailwindcss.com/), and [MongoDB](https://www.mongodb.com/). This project is designed for scalable, secure, and modern web applications, featuring user registration, login, email verification, protected routes, and user profiles.

---

## 🚀 Features
- User registration with email verification
- Secure login with JWT (httpOnly cookies)
- Protected routes using Next.js middleware
- User profile management (including dynamic profile pages)
- Logout functionality
- Email notifications via Nodemailer (Mailtrap for development)
- MongoDB/Mongoose for persistent storage
- Built with Next.js 15 App Router and React 19
- Styled with Tailwind CSS for rapid UI development

---

## 📦 Prerequisites
- Node.js (v18 or higher recommended)
- npm, yarn, or pnpm
- MongoDB instance (local or cloud)

---

## 🛠️ Getting Started

### 1. Clone the repository
```bash
git clone <your-company-repo-url>
cd <project-folder>
```

### 2. Install dependencies
```bash
npm install
# or
yarn install
```

### 3. Configure environment variables
Create a `.env` file in the root directory:
```
MONGO_URI=your_mongodb_connection_string
TOKEN_SECRET=your_jwt_secret
DOMAIN=http://localhost:3000
```

### 4. Run the development server
```bash
npm run dev
```
Visit [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🗂️ Folder Structure
```
src/
  app/
    login/         # Login page
    signup/        # Signup page
    profile/       # Profile page (and [id] for dynamic profiles)
    verifyemail/   # Email verification page
    api/           # API routes (users, auth, etc.)
  models/          # Mongoose models
  helpers/         # Utility functions (mailer, token)
  dbConfig/        # Database connection config
  middleware.ts    # Route protection logic
```

---

## 🧩 Customization & Extensibility
- **UI/UX:** Modify any page in `src/app/` and use Tailwind CSS for styling.
- **Add Features:** Add new pages, API routes, or models as needed.
- **Email:** Update `src/helpers/mailer.ts` for your email provider.

---

## 🤝 Contributing
We welcome contributions from everyone! Please follow these steps:
1. Fork the repository
2. Create a new branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -am 'Add new feature'`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Open a Pull Request

Please read our [Code of Conduct](#code-of-conduct) before contributing.

---

## 📜 License

This project is licensed under the MIT License. See the [LICENSE](#mit-license) section for details.

---

## 📄 Code of Conduct

We are committed to fostering a welcoming and inclusive environment. Please be respectful and considerate in all interactions. Harassment or discrimination of any kind will not be tolerated.

---

## 📝 MIT License

```
MIT License

Copyright (c) 2024 <Your Company Name>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

---


