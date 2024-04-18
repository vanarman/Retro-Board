import { Container } from '@mui/material';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import BoardPage from './pages/BoardPage';

function App() {
  return (
    <Container maxWidth="lg">
      <Router>
        <Routes>
          <Route path="/" element={<BoardPage />} />
        </Routes>
      </Router>
    </Container>
  );
}

export default App;
