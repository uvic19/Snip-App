import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Snip from './components/Snip';
import ViewSnip from './components/ViewSnip';

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <div>
        <Navbar />
        <Home />
      </div>
    ),
  },
  {
    path: "/snips",
    element: (
      <div>
        <Navbar />
        <Snip />
      </div>
    ),
  },
  {
    path: "/snips/:id",
    element: (
      <div>
        <Navbar />
        <ViewSnip />
      </div>
    ),
  },
]);

function App() {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
