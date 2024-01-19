import React from 'react'
import '../style/home.css';
import FeatureRequestList from '../components/FeatureRequest/FeatureRequestList';
import FeatureRequestForm from '../components/FeatureRequest/FeatureRequestForm'; 

const Home = () => {
  return (
    <div className='mainhome'>
        <div className="leftside">
           <FeatureRequestForm /> 
        </div>
        <div className="rightside">
            <FeatureRequestList />
        </div>
    </div>
  )
}

export default Home