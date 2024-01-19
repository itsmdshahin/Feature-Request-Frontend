// FeatureRequestList.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SearchBar from '../SearchBar';
import SortDropdown from '../SortDropdown';
import '../../style/FeatureRequestList.css'; // Import the CSS file
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons';

const apiURL = `https://feature-request-backend.onrender.com`||'http://localhost:8000';


const FeatureRequestList = () => {
  const [featureRequests, setFeatureRequests] = useState([]);
  const [sortOption, setSortOption] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      try {
        const response = await axios.get(`${apiURL}/feature-requests?sort=${sortOption}&search=${searchTerm}`);
        setFeatureRequests(response.data || []);

      } catch (error) {
        console.error('Error fetching feature requests:', error.response ? error.response.data.message : 'Unknown error');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [sortOption, searchTerm]);

  const handleSort = (selectedOption) => {
    setSortOption(selectedOption);
  };

  const handleSearch = (searchTerm) => {
    setSearchTerm(searchTerm);
  };

  const handleLike = async (requestId) => {
    try {
      const existingVote = featureRequests.find((request) => request._id === requestId);
      const newVote = existingVote.vote + (existingVote.hasVoted ? -1 : 1);
      const response = await axios.put(`${apiURL}/feature-requests/${requestId}`, { featureRequestId: requestId, vote: newVote });

      setFeatureRequests((prevFeatureRequests) =>
        prevFeatureRequests.map((request) =>
          request._id === requestId
            ? {
                ...request,
                vote: response.data.updatedFeatureRequest.vote,
                hasVoted: !existingVote.hasVoted,
              }
            : request
        )
      );
    } catch (error) {
      console.error('Error handling like:', error.response ? error.response.data.message : 'Unknown error');
    }
  };

  return (
    <div className="feature-request-list">
      <h2>Feature Requests</h2>
      <SearchBar onSearch={handleSearch} />
      <SortDropdown onSort={handleSort} />
      <ul>
        {isLoading && <li className="loading-indicator">Loading...</li>}
        {Array.isArray(featureRequests) && featureRequests.length ? (
          featureRequests.map((request) => (
            <li key={request._id} className="feature-request-item">
              <div className="request-details">
                <strong className="feature-request-title">{request.title}</strong>
                <p className="feature-request-description">{request.description}</p>
                <h6 className={`status ${request.status.toLowerCase()}`}>{request.status}</h6>
              </div>
              <div className="like-container">
                <button onClick={() => handleLike(request._id)}>
                  <FontAwesomeIcon icon={faThumbsUp} />
                  {request.vote}
                </button>
              </div>
            </li>
          ))
        ) : (
          <li className="no-results">No feature requests found</li>
        )}
      </ul>
    </div>
  );
};

export default FeatureRequestList;
