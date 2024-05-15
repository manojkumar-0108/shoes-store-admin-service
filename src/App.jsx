/**
 * Pacakages Import 
 */
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

/**
 * Other Imports
 */

/**
 * Home Page of the admin service
 * @returns 
 */
function App() {

  return (
    <div className='app'>
      <ToastContainer />
      <Navbar />
      <hr />

      <div className="app-content">
        <Sidebar />

        <Routes>
          <Route path="/add" element={<Add />} />
          <Route path="/list" element={<List />} />
          <Route path="/orders" element={<Orders />} />
        </Routes>

      </div>
    </div>

  );
}

export default App
