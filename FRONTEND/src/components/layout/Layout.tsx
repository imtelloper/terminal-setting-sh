import React from 'react';
import HorizontalNav from './HorizontalNav';
import VerticalNav from './VerticalNav';
import Footer from "./Footer";
import {ScrollTop} from "./ScrollTop";

const Layout = ({children}) => (
    <div id="navContainer">
        <VerticalNav/>
        <div className="rightContentContainer">
            <div className="horizontalNavContainer"><HorizontalNav/>
            </div>
            <div className="contentContainer">{children}</div>
        </div>
        <Footer/>
    </div>
);

export default Layout;
