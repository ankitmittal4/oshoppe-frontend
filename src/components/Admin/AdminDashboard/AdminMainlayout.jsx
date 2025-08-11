import React from 'react';
import {
    BrowserRouter as Router,
    Route,
    Routes,
    useLocation,
} from 'react-router-dom';
import Dashboard from './AdminDashboard';
import ProductManagement from './ProductManagement';
import AdminSidebar from './AdminSidebar';
import AdminNavbar from './AdminNavbar';
// import Navbar from './components/Navbar';
// import Sidebar from './components/Sidebar';
// import Dashboard from './pages/Dashboard';
// import ProductManagement from './pages/ProductManagement';
// ...import other pages

const AdminMainlayout = ({ component }) => {
    const location = useLocation();
    //console.log(location);
    return (
        <>
            <AdminNavbar />
            <div className="flex pt-14">
                <AdminSidebar />
                <div className="flex-1">
                    <div className="pt-4 pl-4">
                        {/* <Routes>
              <Route path="/admin-dashboard/home" exact component={Dashboard} />
              <Route path="/product-management" component={ProductManagement} /> 
           
            </Routes> */}
                        {/* {location.pathname === "/admin-dashboard" && <Dashboard />}
            {location.pathname === "/product-management" && (
              <ProductManagement />
            )} */}
                        {component}
                    </div>
                </div>
            </div>
        </>
    );
};

export default AdminMainlayout;
