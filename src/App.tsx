import { Routes, Route } from 'react-router-dom';
import Tutorial_Page from './Tutorial_Page';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Tutorial_Page />} />
    </Routes>
  );
}

export default App;
