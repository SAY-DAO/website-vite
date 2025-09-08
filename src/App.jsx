import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Loader from './components/Loader';

const Home = lazy(() => import('./pages/Home'));
const Reports = lazy(() => import('./pages/Reports'));
// other pages lazy-import as needed...

export default function App() {
  return (
    <Suspense fallback={<Loader />}>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/reports" element={<Reports />} />
          {/* add other routes here */}
        </Routes>
      </Layout>
    </Suspense>
  );
}
