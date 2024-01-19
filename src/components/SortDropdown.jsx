// SortDropdown.jsx
import React from 'react';

const SortDropdown = ({ onSort }) => {
  return (
    <div className="sort-dropdown">
      <label htmlFor="sort">Sort By:</label>
      <select id="sort" onChange={(e) => onSort(e.target.value)}>
        <option value="">Select</option>
        <option value="lowestVote">Lowest Vote</option>
        <option value="highestVote">Highest Vote</option>
        <option value="oldest">Oldest</option>
        <option value="newest">Newest</option>
        <option value="aToZ">Z - A</option>
        <option value="zToA">A - Z</option>
        <option value="successful">Successful</option>
        <option value="pending">Pending</option>
      </select>
    </div>
  );
};

export default SortDropdown;
