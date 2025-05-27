import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import HomePage from './pages/HomePage';
import SearchResults from './pages/SearchResults';
import WagonSelection from './pages/WagonSelection';
import PassengerDetails from './pages/PassengerDetails';
import Payment from './pages/Payment';
import Confirmation from './pages/Confirmation';
import SuccessOrder from './pages/SuccessOrder';
import Header from './components/common/Header';
import Footer from './components/common/Footer/Footer';
import NavigationSteps from './components/common/NavigationSteps';


const AppContent = () => {
    const location = useLocation();
    const isMainPage = location.pathname === '/';
    const isSuccessPage = location.pathname === '/success';

    const showNavigationSteps = !isMainPage && !isSuccessPage;

    return (
        <div className="flex flex-col min-h-screen">
            <Header isMainPage={isMainPage} />

            {showNavigationSteps && <NavigationSteps />}

            <div className="flex-grow">
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/search" element={<SearchResults />} />
                    <Route path="/wagon-selection" element={<WagonSelection />} />
                    <Route path="/passenger-details" element={<PassengerDetails />} />
                    <Route path="/payment" element={<Payment />} />
                    <Route path="/confirmation" element={<Confirmation />} />
                    <Route path="/success" element={<SuccessOrder />} />
                </Routes>
            </div>

            <Footer />
        </div>
    );
};

const App = () => (
    <Router>
      <AppContent />
    </Router>
);

export default App;
