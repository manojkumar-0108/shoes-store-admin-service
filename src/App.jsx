/**
 * Pacakages Import 
 */
import { useState, useContext } from 'react'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Route, Routes } from 'react-router-dom'

/**
 * Components Import statements
 */
import Navbar from './components/Navbar/Navbar'
import Sidebar from './components/Sidebar/Sidebar';
import Add from './pages/add-page/Add';
import List from './pages/list-page/List';
import Orders from './pages/orders-page/Orders';
import './index.css';

import { StoreContext } from './Context/StoreContext'


/**
 * Other Imports
 */

import LoginPopup from './components/LoginPopup/LoginPopup'

/**
 * Home Page of the admin service
 * @returns 
 */
function App() {

  const [showLogin, setShowLogin] = useState(false);
  const { appLoading } = useContext(StoreContext);



  return (
    <div className='app'>
      <ToastContainer />
      {showLogin ? <LoginPopup setShowLogin={setShowLogin} /> : <></>}
      <Navbar setShowLogin={setShowLogin} />
      <hr />
      <div className="app-content">
        <Sidebar />

        <Routes>
          <Route path="/add" element={<Add />} />
          <Route path="/list" element={<List />} />
          <Route path="/orders" element={<Orders />} />
        </Routes>

      </div>


      {appLoading && (
        <div className="loading-overlay">
          <div className="spinner-container">
            <div className="spinner"></div>
            <div>Processing...</div>
          </div>
        </div>
      )}


    </div>

  );
}

export default App
