# Client Portal Documentation

## Overview

The Fitness CRM now includes a dedicated client portal that allows individual clients to access their personal fitness data without seeing other clients' information. This creates a secure, personalized experience for each client.

## Access Points

### For Clients
- **Client Login**: `http://localhost:3001/client/login`
- **Client Portal**: `http://localhost:3001/client` (after login)

### For Trainers
- **Main Dashboard**: `http://localhost:3001` (includes client portal access links)

## Demo Credentials

For testing purposes, use these credentials:
- **Email**: `alice@example.com`
- **Password**: `password`

## Client Portal Features

### 1. Dashboard (`/client`)
- **Personal Welcome**: Greets the client by name
- **Key Metrics**: Current weight, weekly workouts, total completed workouts
- **Goal Progress**: Visual progress bars for weight and workout goals
- **Recent Activity**: Last 3 workouts with status
- **Quick Actions**: Start workout, log weight, update goals

### 2. Progress Tracking (`/client/progress`)
- **Weight Chart**: Line chart showing weight progress over time
- **Workout Activity**: Bar chart of completed workouts
- **Statistics Cards**: Current weight, total workouts, monthly progress
- **Recent Measurements**: Table of recent measurements with changes
- **Time Range Filter**: Week, month, quarter, year views

### 3. Workouts (`/client/workouts`)
- **Workout Cards**: Visual cards for each workout session
- **Status Tracking**: Scheduled, in-progress, completed, paused
- **Active Workout**: Special interface for current workout
- **Exercise Details**: Shows exercises and sets for each workout
- **Filter Options**: All, scheduled, in-progress, completed
- **Quick Stats**: Completed, in-progress, and scheduled counts

### 4. Nutrition (`/client/nutrition`)
- **Daily Overview**: Calories, protein, carbs, fat totals
- **Macro Progress**: Visual progress bars for each macro
- **Macro Distribution**: Pie chart showing macro breakdown
- **Weekly Trend**: Bar chart of daily nutrition intake
- **Food Logs**: Recent meal logging history
- **Quick Actions**: Log breakfast, lunch, dinner

### 5. Goals (`/client/goals`)
- **Weight Goal**: Set and track target weight
- **Target Date**: When to achieve goals
- **Goal Description**: Detailed fitness objectives
- **Progress Tracking**: Visual progress indicators
- **Motivational Content**: Inspirational quotes and encouragement

### 6. Schedule (`/client/schedule`)
- **Calendar View**: Monthly calendar with workout appointments
- **Upcoming Workouts**: List of scheduled sessions
- **Quick Stats**: Weekly, monthly, and consistency metrics
- **Session Details**: Time, status, and exercise information

## Security Features

### Data Isolation
- Each client only sees their own data
- No access to other clients' information
- Secure data filtering based on client ID

### Authentication
- Simple login system (can be enhanced with real authentication)
- Session management
- Secure logout functionality

## Technical Implementation

### File Structure
```
src/app/client/
├── layout.tsx          # Client-specific layout with ThemeProvider
├── page.tsx            # Client dashboard
├── login/
│   └── page.tsx        # Client login page
├── progress/
│   └── page.tsx        # Progress tracking page
├── workouts/
│   └── page.tsx        # Workout management page
├── nutrition/
│   └── page.tsx        # Nutrition tracking page
├── goals/
│   └── page.tsx        # Goals management page
└── schedule/
    └── page.tsx        # Schedule and calendar page
```

### Components
```
src/components/
├── ClientLayout.tsx    # Client-specific navigation and layout
└── (existing components used in client pages)
```

### Key Features
- **Responsive Design**: Works on desktop, tablet, and mobile
- **Theme Support**: Uses the same color customization system
- **Real-time Data**: Updates reflect immediately
- **Interactive Charts**: Recharts for data visualization
- **Modern UI**: Clean, professional interface

## Usage Instructions

### For Trainers
1. Access the main dashboard at `http://localhost:3001`
2. Use the "Client Portal" section to access client login or view the portal
3. Share the client login URL with your clients: `http://localhost:3001/client/login`

### For Clients
1. Go to `http://localhost:3001/client/login`
2. Use demo credentials: `alice@example.com` / `password`
3. Explore the dashboard and various sections
4. Track progress, view workouts, and manage goals

## Future Enhancements

### Planned Features
- **Real Authentication**: JWT tokens, password reset, registration
- **Push Notifications**: Workout reminders, goal updates
- **Mobile App**: React Native or PWA version
- **Video Integration**: Exercise demonstration videos
- **Social Features**: Progress sharing, achievements
- **Advanced Analytics**: More detailed progress tracking
- **Meal Planning**: Integrated meal planning and recipes
- **Communication**: Direct messaging with trainer

### Technical Improvements
- **Database Integration**: Real database instead of mock data
- **API Security**: Proper authentication and authorization
- **Performance**: Caching, optimization, lazy loading
- **Testing**: Unit tests, integration tests, E2E tests
- **Monitoring**: Error tracking, analytics, performance monitoring

## Support

For questions or issues with the client portal, please refer to the main application documentation or contact the development team.


