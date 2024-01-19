// Admin.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../style/Admin.css';

const apiURL = `https://feature-request-backend.onrender.com`||'http://localhost:8000';
const Admin = () => {
    const [featureRequests, setFeatureRequests] = useState([]);

    useEffect(() => {
        fetchFeatureRequests();
    }, []);

    const fetchFeatureRequests = async () => {
        try {
            const response = await axios.get(`${apiURL}/feature-requests`);
            setFeatureRequests(response.data);
        } catch (error) {
            console.error('Error fetching feature requests:', error);
        }
    };

    const handleStatusUpdate = (featureRequestId, newStatus) => {
        try {
            // Optimistically update the local state
            setFeatureRequests((prevFeatureRequests) => {
                return prevFeatureRequests.map((request) => {
                    if (request._id === featureRequestId) {
                        // Update the status locally
                        return { ...request, status: newStatus };
                    }
                    return request;
                });
            });

            // Send the request to update the status on the server
            axios.put(`${apiURL}/updateStatus/${featureRequestId}`, {
                status: newStatus,
            });
        } catch (error) {
            console.error('Error updating feature request status:', error);
        }
    };

    const handleDelete = async (featureRequestId) => {
        try {
          // Optimistically remove the item from the local state
          setFeatureRequests((prevFeatureRequests) =>
            prevFeatureRequests.filter((request) => request._id !== featureRequestId)
          );
      
          // Send the request to delete the feature request on the server
          await axios.delete(`${apiURL}/feature-requests/${featureRequestId}`);

        } catch (error) {
          console.error('Error deleting feature request:', error);
        }
      };

    return (
        <div className="container">
            <h2 className="header">ADMIN DASHBOARD</h2>
            <div className="dashboard-section">
                <h3>All Feature Requests</h3>
                <table className="feature-requests-table">
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Description</th>
                            <th>Status</th>
                            <th>Action</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {featureRequests.map((request) => (
                            <tr key={request._id}>
                                <td>{request.title}</td>
                                <td>{request.description}</td>
                                <td>{request.status}</td>
                                <td>
                                    <button
                                        className="success-button"
                                        onClick={() => handleStatusUpdate(request._id, 'success')}
                                    >
                                        Mark as Success
                                    </button>
                                </td>
                                <td>
                                    <button
                                        className="delete-button"
                                        onClick={() => handleDelete(request._id, 'delete')}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Admin;
