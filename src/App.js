import './App.css';
import'bootstrap/dist/css/bootstrap.css';
import {Routes,Route} from "react-router-dom";
import Login from './components/Login';
import Question from './components/Question';
import SignUp from './components/SignUp';
import Protected from './components/Protected';
import FAQ from './components/FAQ';
import AudioUpload from './components/AudioUpload';


function App() {
  return (
    <div className="App">
        <Routes>
          <Route path="/login" element={<Login/>}></Route>
          <Route path="/signup" element={<SignUp/>}></Route>
          <Route path="/question" element={<Question/>}></Route>
          <Route path="/faq" element={<FAQ/>}></Route>
          <Route path="/audio" element={<AudioUpload/>}></Route>
        </Routes>
    </div>
  );
}

export default App;
