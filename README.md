# Fitness CRM - Comprehensive Training Management Platform

A modern, full-featured fitness CRM application built with Next.js, TypeScript, and Tailwind CSS. This platform provides both coach and client interfaces with comprehensive features for managing fitness programs, tracking progress, and facilitating communication.

## 🚀 Features

### For Coaches
- **Client Management**: Add, edit, and manage client profiles
- **Workout Templates**: Create and assign workout templates to clients
- **Macro Tracking**: Set macro targets (protein, carbs, fats, calories) for clients
- **Check-in Monitoring**: View client daily check-ins with mood, energy, sleep, and water intake
- **Progress Analytics**: Track client progress with detailed statistics
- **Branding System**: Customize app colors and appearance
- **Dashboard Overview**: Comprehensive dashboard with key metrics and recent activity

### For Clients
- **Daily Check-ins**: Submit mood, energy, sleep, water intake, and optional weight
- **Calendar View**: Interactive calendar with goal tracking and task completion
- **Goal Management**: Set and track fitness goals with progress monitoring
- **Task Tracking**: Complete daily, weekly, and monthly tasks assigned by coach
- **Macro Logging**: Log daily meals and track macro progress
- **Workout Tracking**: Log workouts and track exercise performance
- **Progress Photos**: Upload progress photos with notes

## 🛠️ Technology Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **State Management**: React Hooks
- **Forms**: React Hook Form with Zod validation
- **Charts**: Recharts
- **Date Handling**: date-fns
- **Authentication**: NextAuth.js (ready for implementation)

## 📁 Project Structure

```
src/
├── app/                    # Next.js app router pages
│   ├── api/               # API routes
│   │   └── macros/        # Macro tracking API
│   ├── client/            # Client-side pages
│   │   ├── page.tsx       # Client dashboard
│   │   ├── login/         # Client login
│   │   ├── register/      # Client registration
│   │   └── ...            # Other client pages
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Main dashboard
├── components/            # React components
│   ├── CalendarView.tsx   # Calendar with goal tracking
│   ├── CheckInSystem.tsx  # Daily check-in system
│   ├── CoachDashboard.tsx # Coach dashboard
│   ├── MacroTracking.tsx  # Macro tracking interface
│   ├── WorkoutTemplateManager.tsx # Workout template system
│   ├── BrandingSystem.tsx # Branding customization
│   └── ...                # Other components
├── contexts/              # React contexts
│   └── ThemeContext.tsx   # Theme management
├── lib/                   # Utility functions
└── types/                 # TypeScript type definitions
    └── index.ts           # Core types
```

## 🎯 Key Components

### 1. CalendarView Component
- Interactive calendar with goal and task tracking
- Visual progress indicators
- Goal and task management with completion tracking
- Color-coded event types

### 2. CheckInSystem Component
- Daily mood and energy tracking (1-5 scale)
- Sleep duration and water intake logging
- Optional weight tracking
- Progress photo uploads
- Coach visibility for monitoring

### 3. MacroTracking Component
- Set macro targets (protein, carbs, fats, calories)
- Daily meal logging with macro breakdown
- Progress tracking with visual indicators
- Coach assignment and monitoring

### 4. WorkoutTemplateManager Component
- Create workout templates with exercises and sets
- Assign templates to specific clients
- Exercise library with muscle group categorization
- Difficulty levels and duration estimation

### 5. BrandingSystem Component
- Custom color palette selection
- Predefined theme options
- Live preview with responsive design
- CSS generation and export/import functionality

### 6. CoachDashboard Component
- Client overview with statistics
- Recent activity feed
- Quick access to client management tools
- Progress tracking and analytics

## 🔧 Installation & Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd fitness-crm
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your configuration
   ```

4. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📱 Usage

### Coach Workflow
1. **Dashboard**: View overview of all clients and recent activity
2. **Client Management**: Add new clients and manage existing ones
3. **Workout Templates**: Create templates and assign to clients
4. **Macro Tracking**: Set targets and monitor client nutrition
5. **Check-ins**: Review client daily check-ins and progress
6. **Branding**: Customize app appearance with your brand colors

### Client Workflow
1. **Daily Check-in**: Submit mood, energy, sleep, and water intake
2. **Calendar**: View goals and tasks, mark completed items
3. **Nutrition**: Log meals and track macro progress
4. **Workouts**: Complete assigned workouts and log results
5. **Progress**: Upload photos and track weight changes

## 🎨 Customization

### Branding System
The app includes a comprehensive branding system that allows coaches to:
- Choose from predefined color themes
- Create custom color palettes
- Preview changes in real-time
- Export/import brand settings
- Generate custom CSS

### Theme Options
- Ocean Blue
- Forest Green
- Sunset Orange
- Royal Purple
- Midnight Dark

## 🔌 API Integration

The application is designed to work with REST APIs. Current mock implementations can be replaced with real API calls:

- **Macro API**: `/api/macros` - Handle macro targets and logging
- **Client API**: `/api/clients` - Manage client data
- **Workout API**: `/api/workouts` - Handle workout templates and sessions
- **Check-in API**: `/api/checkins` - Process daily check-ins

## 🚀 Deployment

The application is ready for deployment on platforms like:
- **Vercel** (recommended for Next.js)
- **Netlify**
- **AWS Amplify**
- **Railway**

### Vercel Deployment
1. Connect your GitHub repository to Vercel
2. Configure environment variables
3. Deploy automatically on push to main branch

## 🔒 Security Considerations

- Input validation with Zod schemas
- XSS protection with React's built-in sanitization
- CSRF protection ready for implementation
- Secure authentication flow (NextAuth.js ready)

## 📊 Performance Features

- Server-side rendering with Next.js
- Image optimization
- Code splitting and lazy loading
- Responsive design for all devices
- Optimized bundle size

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- Icons by [Lucide](https://lucide.dev/)
- Inspired by Trainerize and Elite Trainer platforms

## 📞 Support

For support and questions:
- Create an issue in the GitHub repository
- Contact the development team
- Check the documentation for common solutions

---

**Fitness CRM** - Transform your fitness coaching business with comprehensive client management and tracking tools.
