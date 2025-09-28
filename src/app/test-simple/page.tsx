'use client';

export default function TestSimplePage() {
  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>🧪 Simple Test Page</h1>
      <p>If you can see this, the app is working!</p>
      <p>Current URL: {typeof window !== 'undefined' ? window.location.href : 'Loading...'}</p>
      <p>Referrer: {typeof window !== 'undefined' ? document.referrer : 'Loading...'}</p>
      <p>Is in iframe: {typeof window !== 'undefined' ? (window.self !== window.top ? 'Yes' : 'No') : 'Loading...'}</p>
    </div>
  );
}
