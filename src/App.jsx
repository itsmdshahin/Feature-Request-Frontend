// frontend/src/App.jsx
import React from 'react'; 
import Routes from './Routes/Routes';
import Header from './components/Header';
import Footer from './components/Footer';

const App = () => {
  return (
    <>
      <div>
        <Header />
        <Routes />
        <Footer />
      </div>
      </>
  );
};

export default App;