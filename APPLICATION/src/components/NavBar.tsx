import React from 'react';
import '../style/components/NavBar.scss';
import 'style/DesignSystem.scss';
import { useNavigate } from 'react-router-dom';
import {
  ArrowDropDown,
  Delete,
  FolderRounded,
  PhotoLibrary,
  Settings,
} from '@material-ui/icons';

const NaviBar = () => {
  const navigate = useNavigate();

  const handleMenuBar = (e) => {
    const target = e.currentTarget;
    console.log(target);
    target.classList.toggle('menuBarActive');
  };

  // 드롭 다운 메뉴
  const handleDropdown = (e) => {
    if (e.target.closest('.dropdown-list') === null) {
      const showState = e.currentTarget
        .querySelector('.dropdown-list')
        .classList.contains('dropdownActive');
      closeOtherMenu();
      if (!showState)
        e.currentTarget
          .querySelector('.dropdown-list')
          .classList.add('dropdownActive');
    }
  };

  const closeOtherMenu = (e) => {
    document
      .querySelector('.dropdown-list.dropdownActive')
      ?.classList.remove('dropdownActive');
  };

  document.querySelector('html').addEventListener('click', (e) => {
    if (
      e.target.closest('.btn-dropdown') === null &&
      e.target.closest('.dropdown-list') === null && // dropdown
      e.target.closest('.view-all-menu') === null &&
      e.target.closest('.all-menu') === null
    ) {
      // topmenu
      document
        .querySelector('.dropdown-list.dropdownActive')
        ?.classList.remove('dropdownActive');
    }
  });
  return (
    <>
      <div className="header">
        <div className="menu">
          <div className="view-all-menu">
            <div className="menu-bar" onClick={handleMenuBar}>
              <span />
              <span />
              <span />
            </div>
            {/* <div className="all-menu"> */}
            {/* <ul> */}
            {/*   <li> */}
            {/*     <p>Recipe.AI</p> */}
            {/*     <h5>Project NAME</h5> */}
            {/*     <ul> */}
            {/*       <li> */}
            {/*         <span> */}
            {/*           <FolderRounded /> */}
            {/*         </span> */}
            {/*         현상분석 */}
            {/*       </li> */}
            {/*     </ul> */}
            {/*   </li> */}
            {/* </ul> */}
            {/* </div> */}
          </div>
          <div
            className="company-logo"
            onClick={() => {
              navigate('/');
            }}
          />
          <div className="block" />
          <div className="breadcrumb">
            {/* PROJECT NAME / LEVEL 1 MENU */}
            <div className="btn-dropdown" onClick={handleDropdown}>
              <span>
                PROJECT NAME / LEVEL 1 MENU
                <i>
                  <ArrowDropDown />
                </i>
              </span>
              <ul className="dropdown-list">
                <li>
                  <span>
                    <FolderRounded />
                  </span>
                  Level 2 Page
                </li>
                <li>
                  <span>
                    <FolderRounded />
                  </span>
                  Level 2 Page
                </li>
                <li>
                  <span>
                    <FolderRounded />
                  </span>
                  Level 2 Page
                </li>
              </ul>
            </div>

            {/* LEVEL 2 MENU */}
            <div className="btn-dropdown" onClick={handleDropdown}>
              <span>
                LEVEL 2 MENU
                <i>
                  <ArrowDropDown />
                </i>
              </span>
              <ul className="dropdown-list">
                <li>
                  <span>
                    <FolderRounded />
                  </span>
                  menu1
                </li>
                <li>
                  <span>
                    <FolderRounded />
                  </span>
                  menu2
                </li>
                <li>
                  <span>
                    <FolderRounded />
                  </span>
                  menu3
                </li>
              </ul>
            </div>

            {/* LEVEL 3 MENU */}
            <div className="btn-dropdown" onClick={handleDropdown}>
              <span>
                LEVEL 3 MENU
                <i>
                  <ArrowDropDown />
                </i>
              </span>
              <ul className="dropdown-list">
                <li>
                  <span>
                    <FolderRounded />
                  </span>
                  menu1
                </li>
                <li>
                  <span>
                    <FolderRounded />
                  </span>
                  menu2
                </li>
                <li>
                  <span>
                    <FolderRounded />
                  </span>
                  menu3
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="private">
          <div className="block" />
          {/* 오른쪽 아이콘 */}
          <div className="btn-dropdown">
            <span>
              <PhotoLibrary
                onClick={() => {
                  navigate('/videoArchive');
                }}
              />
            </span>
          </div>
          <div className="btn-dropdown">
            <span>
              <Delete
                onClick={() => {
                  navigate('/bin');
                }}
              />
            </span>
          </div>
          <div className="group btn-dropdown">
            <span>
              <Settings onClick={() => navigate('/setting')} />
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default NaviBar;
