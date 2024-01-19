import axios from 'axios';
import { useEffect, useState } from "react";
import '../style/Profile.css';
// import '../services/services';

const Profile = () => {
  

  const [userDetails, setUserDetails] = useState({}); 
  const userId = localStorage.getItem('userId');
  console.log('User ID:', userId);
  const apiURL = `https://feature-request-backend.onrender.com`||'http://localhost:8000';
  useEffect(() => {
    const fetchData = async () => {
      try {        
        const response = await axios.get(`${apiURL}/auth/getUser/${userId}`);
        console.log('User Details:', response.data);
        setUserDetails(response.data);
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };
  
    fetchData();
  }, [userId]);
  
  

  const handleLogout = () => { 
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('userEmail'); 
    
  };

  return (
    <>
      <div className='profile'>
        <div className='header'>
          <h1 className='mainprofile'>
            Name : {userDetails.username || userDetails.email || "SHAHIN"}  
          </h1>
          <button onClick={handleLogout}>Logout</button>
        </div> 
      </div>
    </>
  );
}

export default Profile;
