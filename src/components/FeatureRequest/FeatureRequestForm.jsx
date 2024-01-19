// frontend/src/components/FeatureRequest/FeatureRequestForm.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../../style/FeatureRequestForm.css';

const apiURL = `https://feature-request-backend.onrender.com`||'http://localhost:8000';

const FeatureRequestForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState(null);

  const handleCreateFeatureRequest = () => {
    
    // Send a POST request to your backend for creating a feature request
    axios.post(`${apiURL}/feature-requests`, { title, description })
      .then(response => {
        setIsSuccess(true); // Show success notification
        setTitle(''); // Clear form fields
        setDescription(''); 
        console.log('Feature request created successfully');
      })
      .catch(error => {
        // Handle creation error (show error message, etc.)
        console.error('Feature request creation error:', error.response.data.message);
      });
  };

  useEffect(() => {
    // Clear notifications after a few seconds
    const timeoutId = setTimeout(() => {
      setIsSuccess(false);
      setError(null);
    }, 3000);

    return () => clearTimeout(timeoutId);
  }, [isSuccess, error]);


  return (
    <div className="feature-request-form">  {/* Add the class name here */}
      <h2>Create Feature Request</h2>
      {isSuccess && <div className="success-notification">Feature request created successfully!</div>}
      <form>
        <label>
          TITLE
          <input type="text" className="feature-request-input" value={title} onChange={(e) => setTitle(e.target.value)} />
        </label>
        <label>
          DETAILS
          <textarea className="feature-request-textarea" value={description} onChange={(e) => setDescription(e.target.value)} />
        </label>
        <button type="button" className="feature-request-button" onClick={handleCreateFeatureRequest}>
          SUBMIT
        </button>
      </form>
    </div>
  );
};

export default FeatureRequestForm;
