import React from 'react';
import FlowBuilder from '../components/FlowBuilder';

const DashboardPage = () => {
  return (
    <div className='p-6'>
      <h1 className='text-2xl font-bold mb-4'>Setup Automation</h1>
      <div className='bg-white rounded shadow p-4'>
        <FlowBuilder />
      </div>
    </div>
  );
};

export default DashboardPage;
