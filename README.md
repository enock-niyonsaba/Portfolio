# Enock NIYONSABA Portfolio Website

![Portfolio Preview](https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80)

A modern, responsive portfolio website showcasing Enock NIYONSABA's skills, projects, and achievements in cybersecurity and software engineering.

## 🚀 Features

- **Responsive Design**: Fully responsive layout that works on all devices
- **Dark/Light Mode**: Toggle between dark and light themes with automatic system preference detection
- **Interactive UI**: Smooth animations and transitions for an engaging user experience
- **Portfolio Showcase**: Filterable project gallery with detailed information
- **Testimonials System**: Allow visitors to submit testimonials with approval workflow
- **Contact Form**: Integrated contact form with email notifications
- **Admin Dashboard**: Secure admin area to manage testimonials and messages
- **Authentication**: Secure login system for admin access

## 🛠️ Technologies Used

- **Frontend**:
  - React.js with TypeScript
  - React Router for navigation
  - Tailwind CSS for styling
  - Lucide React for icons

- **Backend**:
  - Supabase for database and authentication
  - Resend for email notifications

- **Development**:
  - Vite for fast development and building
  - ESLint for code quality
  - TypeScript for type safety

## 📋 Pages

1. **Home**: Introduction and overview
2. **About**: Detailed information about skills, education, and experience
3. **Portfolio**: Showcase of projects with filtering capabilities
4. **Testimonials**: Display of client/colleague testimonials with submission form
5. **Contact**: Contact form and information
6. **Admin**: Dashboard for managing testimonials and messages
7. **Login**: Secure admin login page

## 🔧 Setup and Installation

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/enock-niyonsaba/portfolio.git
   cd portfolio
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory with the following variables:
   ```
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   VITE_RESEND_API_KEY=your_resend_api_key
   VITE_ADMIN_PASSWORD=your_admin_password
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

## 🗄️ Database Structure

The project uses Supabase with the following tables:

### Testimonials Table
- `id`: UUID (Primary Key)
- `name`: Text (Not Null)
- `role`: Text (Not Null)
- `message`: Text (Not Null)
- `rating`: Integer (1-5)
- `display_picture`: Text (URL)
- `image_data`: Text (Base64)
- `created_at`: Timestamp
- `approved`: Boolean (Default: false)

### Contact Messages Table
- `id`: UUID (Primary Key)
- `name`: Text (Not Null)
- `email`: Text (Not Null)
- `subject`: Text (Not Null)
- `message`: Text (Not Null)
- `created_at`: Timestamp
- `read`: Boolean (Default: false)

## 🔐 Authentication

The admin authentication system uses a simple password-based login for the admin user (email: enockccg28@gmail.com). In a production environment, it's recommended to implement a more robust authentication system.

## 📱 Responsive Design

The website is fully responsive and optimized for:
- Mobile devices
- Tablets
- Desktops
- Large screens

## 🌙 Dark Mode

The website includes a dark mode toggle that:
- Respects the user's system preferences by default
- Allows manual toggling between light and dark modes
- Persists the user's preference using localStorage

## 🚀 Deployment

### Build for Production

```bash
npm run build
```

This will generate optimized production files in the `dist` directory.

### Deployment Options

The site can be deployed to various platforms:
- Netlify
- Vercel
- GitHub Pages
- Any static hosting service

## 🧪 Future Enhancements

- Blog section for sharing articles and insights
- Project detail pages with more comprehensive information
- Integration with GitHub API to automatically fetch and display repositories
- Multi-language support
- Advanced analytics dashboard
- PDF resume generation

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👤 Author

**Enock NIYONSABA**
- GitHub: [@enock-niyonsaba](https://github.com/enock-niyonsaba)
- LinkedIn: [Enock NIYONSABA](https://www.linkedin.com/in/enock-niyonsaba-58b02432a)
- Email: enockccg28@gmail.com

---

Made with ❤️ by Enock NIYONSABA