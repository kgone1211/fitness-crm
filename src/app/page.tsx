import Layout from '@/components/Layout';
import Dashboard from '@/components/Dashboard';
import { ThemeProvider } from '@/contexts/ThemeContext';

export default function Home() {
  // In a real app, this would come from authentication context
  const trainerId = '1';

  return (
    <ThemeProvider>
      <Layout>
        <Dashboard trainerId={trainerId} />
      </Layout>
    </ThemeProvider>
  );
}