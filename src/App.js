import './App.css';
import Navbar from './components/Navbar/Navbar';
// import Homepage from './components/Homepage/Homepage';
import Homepage from './components/Homepage1/Homepage';
import FilterSidebar from './components/ProductList/Filter';
import Footer from './components/Footer';
import Filter from './components/ProductList/Filter';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ProductDetail from './components/ProductPage/Product';
import Cart from './components/Cart/Cart';
import Summary from './components/Cart/Summary';
import SignUp from './components/Userloginlogout/Signup';
import SignIn from './components/Userloginlogout/Signin';
import ProductList from './Productlist';
import AdminSignIn from './components/Admin/AdminSignin';
import AdminDashboard from './components/Admin/AdminDashboard/AdminDashboard';
import MainLayout from './components/MainLayout';
import { Protected } from './components/Protected/Protected';
import AdminMainlayout from './components/Admin/AdminDashboard/AdminMainlayout';
import ProductManagement from './components/Admin/AdminDashboard/ProductManagement';
import Category from './components/Admin/AdminDashboard/Settings/Category';
import SubCategory from './components/Admin/AdminDashboard/Settings/SubCategory';
import Brand from './components/Admin/AdminDashboard/Settings/Brand';
import Dashboard from './components/Admin/AdminDashboard/AdminDashboard';
import DealerForm from './components/Admin/AdminDashboard/DealerManagement';
import Tosts from './components/Tost/Tosts';
import Profile from './components/UserProfile/Profile';
import DealerLinking from './components/Admin/AdminDashboard/DealerLinking';
import CustomerManagements from './components/Admin/AdminDashboard/CustomerMngmnt';
import OrderManagement from './components/Admin/AdminDashboard/OrderManagement';
import OrderDetails from './components/Admin/AdminDashboard/OrderDetails';
import OrderManagementLayout from './components/Admin/AdminDashboard/OrderManagementLayout';
import TermsAndConditions from './components/Footer Links/TermsAndConditions';
import ReturnAndRefund from './components/Footer Links/ReturnAndRefund';
import PrivacyPolicy from './components/Footer Links/PrivacyPolicy';
import Warranty from './components/Footer Links/Warranty';
import ShippingPolicy from './components/Footer Links/Shipping';
import ContactUs from './components/Footer Links/ContactUs';
import OshoppeWorks from './components/Navbar/OshoppeWorks';
import Advisor from './components/Navbar/Advisor';
function App() {
    const withLayout = (Component) => (
        <MainLayout>
            <Component />
        </MainLayout>
    );
    const withoutLayout = (Component) => <Component />;

    return (
        <BrowserRouter>
            <Routes>
                <Route
                    path="/"
                    element={withLayout(Homepage)}
                />
                <Route
                    path="/oshoppe-works"
                    element={<OshoppeWorks />}
                />
                <Route
                    path="/be-an-advisor"
                    element={<Advisor />}
                />
                <Route
                    path="/signin"
                    element={<SignIn />}
                />
                <Route
                    path="/signup"
                    element={<SignUp />}
                />
                <Route
                    path="/products/:id"
                    element={withLayout(ProductDetail)}
                />
                <Route
                    path="/products"
                    element={withLayout(Filter)}
                />
                <Route
                    path="/productlist"
                    element={<ProductList />}
                />
                <Route
                    path="/cart"
                    element={withLayout(Cart)}
                />
                <Route
                    path="/cart/summary"
                    element={withLayout(Summary)}
                />
                <Route
                    path="/adminlogin"
                    element={<AdminSignIn />}
                />
                <Route
                // path="/tost"
                // element={<Tosts />}
                />

                <Route
                // path="/dealerlink"
                // element={<DealerLinking />}
                />

                <Route
                    path="profile/*"
                    element={withLayout(Profile)}
                />
                <Route element={<Protected />}>
                    {/* <Route path="/admin-dashboard" element={<AdminDashboard />} /> */}
                    <Route
                        path="/admin-dashboard"
                        element={<AdminMainlayout component={<Dashboard />} />}
                    />
                    {/* <Route path="/admin-dashboard/home" exact component={Dashboard} /> */}
                    <Route
                        path="/product-management"
                        element={
                            <AdminMainlayout
                                component={<ProductManagement />}
                            />
                        }
                    />
                    <Route
                        path="/dealer-management"
                        element={<AdminMainlayout component={<DealerForm />} />}
                    />
                    <Route
                        path="/customer-management"
                        element={
                            <AdminMainlayout
                                component={<CustomerManagements />}
                            />
                        }
                    />
                    <Route
                        path="order-management/*"
                        element={
                            <AdminMainlayout
                                component={<OrderManagementLayout />}
                            />
                        }
                    />
                    <Route
                        path="/settings/category"
                        element={<AdminMainlayout component={<Category />} />}
                    />
                    <Route
                        path="/settings/category/sub-category/:categoryId"
                        element={
                            <AdminMainlayout component={<SubCategory />} />
                        }
                    />

                    <Route
                        path="/settings/brand"
                        element={<AdminMainlayout component={<Brand />} />}
                    />
                </Route>
                <Route
                    path="/terms-conditions"
                    element={<TermsAndConditions />}
                />
                <Route
                    path="/privacy-policy"
                    element={<PrivacyPolicy />}
                />
                <Route
                    path="/return-refund"
                    element={<ReturnAndRefund />}
                />
                <Route
                    path="/warranty"
                    element={<Warranty />}
                />
                <Route
                    path="/shipping-policy"
                    element={<ShippingPolicy />}
                />
                <Route
                    path="/contact-us"
                    element={<ContactUs />}
                />
                {/* <Route path="/aboutus" element={<Aboutus/>}/> */}
                {/* <Route path="/contactus" element={<Contactus/>}/> */}
                {/* <Route path="/applyjobs/:id" element={<Applyjobs/>}/> */}
                {/* <Route element={<Protected/>}>
        <Route path="/createjobs" element={<Createjob/>}/>
        <Route path="/createjobs/:id" element={<Createjob/>}/>
        <Route path="/jobslist" element={<Jobslist/>}/>
    </Route> */}
                {/* <Route path="/adminlogin" element={<Adminlogin/>}/> */}
                {/* <Route path="/applyjobs" element={<Applyjobs/>}/> */}
            </Routes>
            {/* <Footer/> */}
        </BrowserRouter>
    );
}

export default App;

//TODO:
//BUG:
//HACK:
//INFO:
//NOTE:
//IDEA:
//FIXME:
