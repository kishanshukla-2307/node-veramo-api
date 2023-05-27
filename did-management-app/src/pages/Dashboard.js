import React from 'react';
import { Tabs, Tab } from 'react-bootstrap';
import DIDList from './DIDList';
import DIDManagement from './DIDManagement';

const Dashboard = () => {
  return (
    <div className="container mt-3">
      <Tabs defaultActiveKey="didList" id="did-management-tabs">
        <Tab eventKey="didList" title="DID List">
          <DIDList />
        </Tab>
        <Tab eventKey="didManagement" title="DID Management">
          <DIDManagement />
        </Tab>
      </Tabs>
    </div>
  );
};

export default Dashboard;
