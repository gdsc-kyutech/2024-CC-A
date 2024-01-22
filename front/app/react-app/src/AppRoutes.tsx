import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const AppRoutes: React.FC = () => {
    return (
        <Router>
            <Routes>
                {/* <Route path="/" exact component={Home} /> */}
                {/* <Route path="/about" component={About} /> */}
                {/* <Route path="/contact" component={Contact} /> */}
            </Routes>
        </Router>
    );
};

export default AppRoutes;
