import Layout from '@/components/Layout';
import Dashboard from '@/components/Dashboard';
import { WhopApp } from '@/components/WhopApp';
import { ThemeProvider } from '@/contexts/ThemeContext';

export default function Home() {
  // In a real app, this would come from authentication context
  const trainerId = '1';

  return (
    <ThemeProvider>
      <WhopApp>
        <Layout>
          <Dashboard trainerId={trainerId} />
        </Layout>
      </WhopApp>
    </ThemeProvider>
  );
}