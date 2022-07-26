import React from "react";
import { BrowserRouter, Route, NavLink } from "react-router-dom";
import Button from 'devextreme-react/button';
import "../../contents/styles/layout/navigation.css";
import "material-icons";
import Dropdown from "../common/Dropdown"
import AllMenu from "../common/AllMenu"

function Navbar() {

  const showMenu = (e) => {
    e.target.classList.toggle('show');
  };
  return (
    <div className="header dx-swatch-ix-pds">
      <div className="menu">
        <div className="view-all-menu" onClick={showMenu}>
          <div className="menu-bar">
            <span></span>
            <span></span>
            <span></span>
          </div>
          <div className="all-menu">
            <ul>
              <li>
                <div className="service-title">
                  <p>Recipe.AI</p>
                  <h5>Project 1</h5>
                </div>
                <ul className="level1">
                  <AllMenu level1="level1_1" level2={['level2_1', 'level2_2', 'level2_3']}/>
                  <AllMenu level1="level1_2" level2={['level2_1', 'level2_2', 'level2_3']}/>
                  <AllMenu level1="level1_3" level2={['level2_1', 'level2_2', 'level2_3']}/>
                </ul>
              </li>
              <li>
                <div className="service-title">
                  <p>Inspection.AI</p>
                  <h5>Project NAME</h5>
                </div>
                <ul className="level1">
                  <li>
                    <p className="level1-menu"><i className="material-icons-outlined">folder</i><span>analysis</span></p>
                    <ul className="level2">
                      <li><p className="level2-menu"><i className="material-icons">folder</i><span>level2</span></p></li>
                      <li><p className="level2-menu"><i className="material-icons">folder</i><span>level2</span></p></li>
                      <li><p className="level2-menu"><i className="material-icons">folder</i><span>level2</span></p></li>
                    </ul>
                  </li>
                  <li>
                    <p className="level1-menu"><i className="material-icons-outlined">folder</i><span>analysis</span></p>
                    <ul className="level2">
                      <li><p className="level2-menu"><i className="material-icons">folder</i><span>level2</span></p></li>
                      <li><p className="level2-menu"><i className="material-icons">folder</i><span>level2</span></p></li>
                      <li><p className="level2-menu"><i className="material-icons">folder</i><span>level2</span></p></li>
                    </ul>
                  </li>
                  <li>
                    <p className="level1-menu"><i className="material-icons-outlined">folder</i><span>analysis</span></p>
                    <ul className="level2">
                      <li><p className="level2-menu"><i className="material-icons">folder</i><span>level2</span></p></li>
                      <li><p className="level2-menu"><i className="material-icons">folder</i><span>level2</span></p></li>
                      <li><p className="level2-menu"><i className="material-icons">folder</i><span>level2</span></p></li>
                    </ul>
                  </li>
                  <li>
                    <p className="level1-menu"><i className="material-icons-outlined">folder</i><span>analysis</span></p>
                    <ul className="level2">
                      <li><p className="level2-menu"><i className="material-icons">folder</i><span>level2</span></p></li>
                      <li><p className="level2-menu"><i className="material-icons">folder</i><span>level2</span></p></li>
                      <li><p className="level2-menu"><i className="material-icons">folder</i><span>level2</span></p></li>
                    </ul>
                  </li>
                </ul>
              </li>
              <li>
                <button className="btn-add-service"><i className="material-icons">add_circle</i>ADD AI SERVICE</button>
              </li>
            </ul>
          </div>
        </div>
        <div className="company-logo"></div>
        <div className="block"></div>
        <div className="breadcrumb">
          <Dropdown type="level1" subMenu={['sub1', 'sub2', 'sub3']} name="Project NAME"/>
          <Dropdown type="level2" subMenu={['sub1', 'sub2', 'sub3']} name="Level 2 Menu" />
          <Dropdown type="level3" subMenu={['sub1', 'sub2', 'sub3']} name="Level 3 Menu" />
        </div>
      </div>
      <div className="private">
        <div className="block"></div>
        <Dropdown type="profile" subMenu={['My Page', 'Log out']}/>
        <div className="btn-dropdown">
          <span className="material-icons">settings</span>
          <ul className="dropdown-list">
            <li>menu1</li>
            <li>menu2</li>
            <li>menu3</li>
          </ul>
        </div>
        <div className="group btn-dropdown">
          <span className="material-icons">apps</span>
          <ul className="dropdown-list">
            <li>menu1</li>
            <li>menu2</li>
            <li>menu3</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
