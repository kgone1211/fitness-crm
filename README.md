# Fitness CRM

A comprehensive fitness client management system built with Next.js, featuring both trainer and client portals with Whop integration.

## 🚀 Features

### For Trainers
- **Client Management**: Add, edit, and track client information
- **Progress Tracking**: Monitor weight, measurements, and progress photos
- **Workout Management**: Create and track workout sessions
- **Nutrition Tracking**: Set macro targets and log daily nutrition
- **Analytics Dashboard**: Comprehensive progress analytics and insights
- **Schedule Management**: Calendar view of client appointments
- **Color Customization**: Customizable theme colors

### For Clients
- **Personal Dashboard**: Individual client portal with personal data
- **Progress Tracking**: View weight charts and workout history
- **Workout Sessions**: Start, track, and complete workouts
- **Nutrition Logging**: Track daily macros and nutrition goals
- **Goal Setting**: Set and track personal fitness objectives
- **Schedule View**: Calendar of upcoming appointments

### Whop Integration
- **Seamless Integration**: Works within Whop platform
- **User Authentication**: Automatic user detection
- **Data Isolation**: Secure client data separation
- **Responsive Design**: Works on all devices

## 🛠️ Tech Stack

- **Frontend**: Next.js 15, React, TypeScript
- **Styling**: Tailwind CSS
- **Charts**: Recharts
- **Icons**: Lucide React
- **State Management**: React Context
- **Database**: Mock database (easily replaceable)

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/fitness-crm.git
   cd fitness-crm
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🚀 Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy automatically

### Other Platforms
- **Netlify**: Deploy the `.next` folder
- **Custom Server**: Run `npm run build && npm start`

## 🔧 Configuration

### Environment Variables
Create a `.env.local` file:
```env
NODE_ENV=development
WHOP_APP_ID=your_whop_app_id
WHOP_APP_SECRET=your_whop_app_secret
```

### Whop Integration
1. Create a Whop app at [Whop Developer Portal](https://whop.com/developers)
2. Set your app URL to your deployed URL
3. Configure permissions: `user:read`, `company:read`

## 📱 Usage

### Trainer Portal
- **Dashboard**: `http://localhost:3000/`
- **Clients**: `http://localhost:3000/clients`
- **Workouts**: `http://localhost:3000/workouts`
- **Analytics**: `http://localhost:3000/analytics`
- **Settings**: `http://localhost:3000/settings`

### Client Portal
- **Login**: `http://localhost:3000/client/login`
- **Dashboard**: `http://localhost:3000/client`
- **Progress**: `http://localhost:3000/client/progress`
- **Workouts**: `http://localhost:3000/client/workouts`
- **Nutrition**: `http://localhost:3000/client/nutrition`
- **Goals**: `http://localhost:3000/client/goals`
- **Schedule**: `http://localhost:3000/client/schedule`

### Demo Credentials
- **Email**: `alice@example.com`
- **Password**: `password`

## 🧪 Testing

### Test Whop Integration
Visit `http://localhost:3000/test-whop` to debug Whop integration.

### Build Test
```bash
npm run build
npm start
```

## 📁 Project Structure

```
src/
├── app/                    # Next.js app router pages
│   ├── client/            # Client portal pages
│   ├── api/               # API routes
│   └── ...                # Other pages
├── components/            # React components
│   ├── Layout.tsx         # Main layout
│   ├── ClientLayout.tsx   # Client portal layout
│   └── ...                # Other components
├── contexts/              # React contexts
├── lib/                   # Utility functions
├── types/                 # TypeScript type definitions
└── ...
```

## 🔒 Security Features

- **Data Isolation**: Each client only sees their own data
- **Authentication**: Secure login system
- **CORS Protection**: Proper headers for iframe embedding
- **Input Validation**: Form validation and sanitization

## 🎨 Customization

### Theme Colors
- Visit Settings page to customize colors
- Supports HEX and RGBA color formats
- Live preview of color changes
- Export/import color schemes

### Adding New Features
1. Create components in `src/components/`
2. Add pages in `src/app/`
3. Update types in `src/types/`
4. Add API routes in `src/app/api/`

## 📚 Documentation

- [Client Portal Guide](./CLIENT_PORTAL.md)
- [Whop Deployment Guide](./WHOP_DEPLOYMENT.md)
- [API Documentation](./API.md)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit changes: `git commit -m 'Add feature'`
4. Push to branch: `git push origin feature-name`
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

- **Issues**: [GitHub Issues](https://github.com/yourusername/fitness-crm/issues)
- **Discussions**: [GitHub Discussions](https://github.com/yourusername/fitness-crm/discussions)
- **Email**: your.email@example.com

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- Tailwind CSS for the utility-first CSS
- Recharts for beautiful charts
- Lucide for the icon library
- Whop for the integration platform

## 📈 Roadmap

- [ ] Real database integration
- [ ] Mobile app (React Native)
- [ ] Push notifications
- [ ] Video integration
- [ ] Advanced analytics
- [ ] Multi-language support
- [ ] Payment integration
- [ ] Social features

---

**Made with ❤️ for fitness professionals and their clients**