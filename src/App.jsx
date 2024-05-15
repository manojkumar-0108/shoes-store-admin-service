/**
 * Pacakages Import 
 */
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

/**
 * Components Import statements
 */
import Navbar from './components/Navbar/Navbar'
import Sidebar from './components/Sidebar/Sidebar';

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
      </div>
    </div>

  );
}

export default App
