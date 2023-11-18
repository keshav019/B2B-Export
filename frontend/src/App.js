import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Footer from './globalComponents/Footer';
import Header from './globalComponents/Header';
import Home from './globalComponents/Home';
import Login from './globalComponents/Login';
import Register from './globalComponents/Register';
import Profile from './globalComponents/Profile';
import UserDetails from './admin/UserDetails';
import AddUser from './admin/AddUser';
import AddProduct from './vendor/AddProduct';
function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/:id" element={<Profile />} />
        <Route path="/admin/user/:id" element={<UserDetails />} />
        <Route path="/admin/user/add" element={<AddUser />} />
        <Route path="/vendor/product/add" element={<AddProduct />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
