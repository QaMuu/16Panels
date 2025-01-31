import { Routes, Route } from 'react-router-dom';

import {Home} from './pages/Home';
import {ViewerPanels} from "./pages/ViewerPanels.tsx";

function App() {

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/viewer-panels" element={<ViewerPanels />} />
    </Routes>
  )
}

export default App
