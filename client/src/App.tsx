import { Routes, Route } from 'react-router-dom';

import {ControlPanels} from './pages/ControlPanels.tsx';
import {ViewerPanels} from "./pages/ViewerPanels.tsx";

function App() {

  return (
    <Routes>
      <Route path="/" element={<ViewerPanels />} />
      <Route path="/control" element={<ControlPanels />} />
    </Routes>
  )
}

export default App
