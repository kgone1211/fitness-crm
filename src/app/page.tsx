import Layout from '@/components/Layout';
import Dashboard from '@/components/Dashboard';

export default function Home() {
  // In a real app, this would come from authentication context
  const trainerId = '1';

  return (
    <Layout userRole="coach">
      <Dashboard trainerId={trainerId} />
    </Layout>
  );
}
