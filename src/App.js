import { Routes, Route, BrowserRouter, useNavigate } from 'react-router-dom';
import Join from './components/Join/join.component';
import Wait from './components/Wait/wait.component';
import Game from './components/Game/game.component';
import './app.styles.scss';
import SnackBar from './components/Helpers/Snackbar/snackbar.component';
import Invalid from './components/Invalid/invalid.component';
function App() {
  return (
    <div className='app-container'>
      <SnackBar />
      <div className='content-container'>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Join />} />
            <Route path='/waiting' element={<Wait />} />
            <Route path='/game/:id' element={<Game />} />
            <Route path='*' element={<Invalid />} />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
