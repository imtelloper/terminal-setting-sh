import React from 'react';
import '../style/components/NavBar.scss';
import 'style/DesignSystem.scss';
import { useNavigate } from 'react-router-dom';
import Logo from '../images/safety.ai_logo.png';
import {
  Apps,
  ArrowDropDown,
  FolderRounded,
  Person,
  Settings,
} from '@material-ui/icons';
import { MdManageAccounts } from 'react-icons/md';
import { BiLogOut } from 'react-icons/bi';

const NaviBar = () => {
  const navigate = useNavigate();

  const handleMenuBar = (e) => {
    const target = e.currentTarget;
    target.classList.toggle('menuBarActive');
  };

  return (
    <>
      <div className="header">
        <div className="menu">
          <div className="view-all-menu">
            <div className="menu-bar">
              <span />
              <span />
              <span />
            </div>
            <div className="all-menu">
              <ul>
                <li>
                  <p>Recipe.AI</p>
                  <h5>Project NAME</h5>
                  <ul>
                    <li>
                      <span><FolderRounded/></span>현상분석
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
          <div className="company-logo" />
          <div className="block" />
          <div className="breadcrumb">
            <div className="btn-dropdown">
              <span>
                Project NAME / Level 1 Menu
                <i><ArrowDropDown/></i>
              </span>
              <ul className="dropdown-list">
                <li>
                  <span><FolderRounded /></span>menu1
                </li>
                <li>
                  <span><FolderRounded /></span>menu2
                </li>
                <li>
                  <span><FolderRounded /></span>menu3
                </li>
              </ul>
            </div>
            <div className="btn-dropdown">
              <span>
                Level 2 Menu <i><ArrowDropDown /></i>
              </span>
              <ul className="dropdown-list">
                <li>
                  <span><FolderRounded /></span>menu1
                </li>
                <li>
                  <span><FolderRounded /></span>menu2
                </li>
                <li>
                  <span><FolderRounded /></span>menu3
                </li>
              </ul>
            </div>
            <div className="btn-dropdown">
              <span>
                Level 3 Menu<i><ArrowDropDown /></i>
              </span>
              <ul className="dropdown-list">
                <li>
                  <span><FolderRounded /></span>menu1
                </li>
                <li>
                  <span><FolderRounded /></span>menu2
                </li>
                <li>
                  <span><FolderRounded /></span>menu3
                </li>
              </ul>
            </div>
          </div>
          <div className="block" />
        </div>
        <div className="private">
          <div className="block" />
          <div className="btn-dropdown">
            <span><Person /></span>
            <ul className="dropdown-list">
              <li>
                <span><MdManageAccounts /></span>My Page
              </li>
              <li>
                <span><BiLogOut /></span>menu2
              </li>
            </ul>
          </div>
          <div className="btn-dropdown">
            <span><Settings/></span>
            <ul className="dropdown-list">
              <li>menu1</li>
              <li>menu2</li>
              <li>menu3</li>
            </ul>
          </div>
          <div className="group btn-dropdown">
            <span><Apps /></span>
            <ul className="dropdown-list">
              <li>menu1</li>
              <li>menu2</li>
              <li>menu3</li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default NaviBar;
