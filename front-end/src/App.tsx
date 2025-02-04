import {BrowserRouter, Route, Routes} from 'react-router-dom';

import ProtectedRoute from './ProtectedRoute.tsx';

import FileUpload from './components/UploadForm.tsx';
import AuthProvider from './contexts/AuthContext.tsx';
import Login from './components/LoginForm.tsx';

import './App.css'

function App() {

      return (
            <div className="App">
                <BrowserRouter>
                    <AuthProvider>
                        <Routes>
                            <Route path='/login' element={<Login />} />
                            <Route element={<ProtectedRoute />}>
                                <Route path='/upload' element={<FileUpload />}/>
                            </Route>
                        </Routes>
                    </AuthProvider>
                </BrowserRouter>
            </div>
      )
}

export default App
