import Layout from '@/components/Layout';
import Dashboard from '@/components/Dashboard';
import { SimpleWhopIntegration } from '@/components/SimpleWhopIntegration';
import { ThemeProvider } from '@/contexts/ThemeContext';

export default function Home() {
  // In a real app, this would come from authentication context
  const trainerId = '1';

  return (
    <ThemeProvider>
      <SimpleWhopIntegration>
        <Layout>
          <Dashboard trainerId={trainerId} />
        </Layout>
      </SimpleWhopIntegration>
    </ThemeProvider>
  );
}