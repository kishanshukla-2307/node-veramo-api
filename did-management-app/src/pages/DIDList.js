import React, { useState, useEffect } from 'react';
import { Table } from 'react-bootstrap';
import axios from 'axios';

const DIDList = () => {
  const [dids, setDids] = useState([]);

  useEffect(() => {
    const fetchDIDs = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/did/list');
        setDids(response.data);
      } catch (error) {
        console.error('Error fetching DIDs:', error);
      }
    };

    fetchDIDs();
  }, []);

  return (
    <Table striped bordered hover responsive>
      <thead>
        <tr>
          <th>DID</th>
          <th>Controller</th>
          <th>Created</th>
        </tr>
      </thead>
      <tbody>
        {dids.map((did, index) => (
          <tr key={index}>
            <td>{did.did}</td>
            <td>{did.controllerKeyId}</td>
            <td>{new Date(did.created).toLocaleString()}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default DIDList;
