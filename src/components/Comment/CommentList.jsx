// frontend/src/components/Comment/CommentList.jsx
import React from 'react';

const CommentList = ({ comments }) => {
  return (
    <div>
      <h3>Comments</h3>
      <ul>
        {comments.map((comment) => (
          <li key={comment._id}>
            <p>{comment.text}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CommentList;