// frontend/src/components/Comment/CommentForm.jsx
import React, { useState } from 'react';
import axios from 'axios';

const CommentForm = ({ featureRequestId }) => {
  const [text, setText] = useState('');

  const handleCreateComment = () => {
    // Send a POST request to your backend for creating a comment
    axios.post('http://localhost:8000/comments', { featureRequestId, text })
      .then(response => {
        // Optionally, handle successful creation (redirect, show success message, etc.)
        console.log('Comment created successfully');
      })
      .catch(error => {
        // Handle creation error (show error message, etc.)
        console.error('Comment creation error:', error.response ? error.response.data.message : 'Unknown error');
      });
  };

  return (
    <div>
      <h3>Add Comment</h3>
      <form>
        <label>
          Comment:
          <textarea value={text} onChange={(e) => setText(e.target.value)} />
        </label>
        <button type="button" onClick={handleCreateComment}>
          Add Comment
        </button>
      </form>
    </div>
  );
};

export default CommentForm;