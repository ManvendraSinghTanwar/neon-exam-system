# 🌟 Neon Exam System

A futuristic AI-powered examination system with a stunning cyberpunk neon design. Built with Next.js, TypeScript, and powered by Meta's Llama 3.3 70B model via Together AI.

## 📸 Screenshots

<p align="center">
  <img src="Screenshot 2025-08-15 233928.png" alt="Home Screen" width="400">
  <img src="Screenshot 2025-08-15 233941.png" alt="Admin Dashboard" width="400">
</p>

<p align="center">
  <img src="Screenshot 2025-08-15 233953.png" alt="Question Generation" width="400">
  <img src="Screenshot 2025-08-15 234034.png" alt="Exam Interface" width="400">
</p>

<p align="center">
  <img src="Screenshot 2025-08-15 234057.png" alt="Exam Taking Interface" width="400">
  <img src="Screenshot 2025-08-15 234115.png" alt="Results Dashboard" width="400">
</p>

## ✨ Features

### 🎯 Multi-Role Dashboard
- **Admin Dashboard**: Complete exam management and analytics
- **Faculty Dashboard**: Question creation and student monitoring
- **Student Dashboard**: Take exams with real-time tracking
- **Invigilator Dashboard**: Live proctoring and violation detection

### 🤖 AI-Powered Question Generation
- **Smart Question Creation**: Generate questions using Meta Llama 3.3 70B model
- **Multiple Question Types**: Multiple choice, descriptive, and more
- **Difficulty Levels**: Easy, Medium, Hard, Expert
- **Subject Customization**: Any subject or topic
- **Bulk Generation**: Create multiple questions at once

### 🎨 Cyberpunk Neon Design
- **Futuristic UI**: Stunning neon glow effects and animations
- **Dark Theme**: Eye-friendly dark mode with neon accents
- **Responsive Design**: Works perfectly on all devices
- **Interactive Elements**: Smooth hover effects and transitions

### 🚀 Advanced Exam Features
- **Real-time Exam Taking**: Live timer and auto-save
- **Instant Results**: Immediate scoring and feedback
- **Analytics Dashboard**: Comprehensive exam statistics
- **Violation Detection**: AI-powered cheating prevention
- **Bulk Student Management**: Easy student assignment and tracking
- **Secure Examination Environment**: Anti-cheating measures and proctoring
- **Comprehensive Analytics**: Performance tracking and violation detection

### 🎨 Design Highlights
- **Cyberpunk Neon Theme**: Futuristic dark theme with neon accents
- **Responsive Design**: Optimized for desktop, tablet, and mobile
- **Modern UI Components**: Built with Radix UI and Tailwind CSS
- **Smooth Animations**: Enhanced user experience with fluid transitions

### 🤖 AI Integration
- **Intelligent Question Generation**: Multiple question types and difficulty levels
- **Subject-Specific Content**: Customizable for different academic subjects
- **Quality Assurance**: AI-generated explanations and answer validation

## 🚀 Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS, Radix UI Components
- **AI Integration**: Together AI (Llama-3.3-70B-Instruct-Turbo-Free)
- **Icons**: Lucide React
- **Development**: ESLint, PostCSS

## 📦 Installation

### Prerequisites
- Node.js 18+ 
- npm or pnpm package manager
- Together AI API key

### Setup Instructions

1. **Clone the repository**
   ```bash
   git clone https://github.com/ManvendraSinghTanwar/neon-exam-system.git
   cd neon-exam-system
   ```

2. **Install dependencies**
   ```bash
   npm install --legacy-peer-deps
   # or
   pnpm install
   ```

3. **Environment Configuration**
   Create a `.env.local` file in the root directory:
   ```env
   TOGETHER_API_KEY1=your_together_ai_api_key_here
   ```

4. **Run the development server**
   ```bash
   npm run dev
   # or
   pnpm dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🎮 Usage

### Getting Started
1. **Select Your Role**: Choose from Admin, Faculty, Student, or Invigilator
2. **Dashboard Access**: Each role has a customized dashboard with relevant features
3. **Question Generation**: Use the AI-powered system to create exam questions
4. **Exam Management**: Create, schedule, and monitor examinations
5. **Analytics**: View comprehensive reports and performance metrics

### Role-Specific Features

#### 👨‍💼 Admin Dashboard
- System-wide analytics and monitoring
- User management and permissions
- Violation detection and security alerts
- Comprehensive reporting tools

#### 👨‍🏫 Faculty Dashboard
- Question bank management
- Exam creation and scheduling
- Student performance tracking
- Grade management

#### 👨‍🎓 Student Dashboard
- Available examinations
- Exam history and results
- Progress tracking
- Performance analytics

#### 👁️ Invigilator Dashboard
- Live exam monitoring
- Real-time violation alerts
- Student behavior tracking
- Incident reporting

## 🎨 Design System

### Color Palette
- **Primary**: Neon Teal (`#00ffcc`)
- **Secondary**: Neon Pink (`#ff007f`)
- **Background**: Dark (`#0e0e0e`)
- **Accent**: Various neon colors for highlights

### Typography
- **Primary Font**: Geist Sans
- **Monospace Font**: Geist Mono
- **Accent Font**: Playfair Display for headings

## 🔧 API Endpoints

### Question Generation
```typescript
POST /api/generate-questions
{
  "subject": "Mathematics",
  "difficulty": "intermediate",
  "questionType": "multiple-choice",
  "count": 10
}
```

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📋 Development Guidelines

- Follow TypeScript best practices
- Use meaningful commit messages
- Test your changes thoroughly
- Maintain consistent code formatting
- Update documentation as needed

## 🔐 Security

- Environment variables are properly secured
- API keys are excluded from version control
- Input validation and sanitization implemented
- Secure authentication practices followed

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Together AI** for providing the Llama-3.3-70B-Instruct-Turbo-Free model
- **Vercel** for the excellent Next.js framework
- **Radix UI** for accessible component primitives
- **Tailwind CSS** for the utility-first CSS framework


---

<div align="center">
  <strong>Built with ❤️ and ⚡ neon energy</strong>
</div>
