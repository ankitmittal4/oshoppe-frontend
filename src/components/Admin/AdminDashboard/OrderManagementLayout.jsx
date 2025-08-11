import React from 'react';
import { Route, Routes } from 'react-router-dom';
import OrderManagement from './OrderManagement';
import OrderDetails from './OrderDetails';

function OrderManagementLayout() {
    return (
        <main className="flex-1">
            <Routes>
                <Route
                    path=""
                    element={<OrderManagement />}
                />
                <Route
                    path="order-details/:id"
                    element={<OrderDetails />}
                />

                {/* <Route path="logout" element={<Logout />} /> */}
            </Routes>
        </main>
    );
}

export default OrderManagementLayout;
