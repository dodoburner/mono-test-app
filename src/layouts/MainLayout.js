/* eslint-disable */
import { Outlet } from 'react-router-dom';
import Header from '../components/Header';

export default function MainLayout() {
  return (
    <div className="vh-100">
      <Header />
      <div className="container">
        <Outlet />
      </div>
    </div>
  );
}
