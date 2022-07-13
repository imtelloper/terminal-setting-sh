import React from 'react';
import '../style/components/NavBar.scss';
import '../style/DesignSystem.scss';
import { useNavigate } from 'react-router-dom';
import Logo from '../images/safety.ai_logo.png';
import PlusIcon from '../images/plusIcon.png';
import { AppsSharp, FolderRounded, Person, Settings } from '@material-ui/icons';

const NaviBar = () => {
  const navigate = useNavigate();

  const handleHamBtn = (e) => {
    const target = e.currentTarget;
    target.classList.toggle('hamBtnActive');
  };

  return (
    <>
      <div className="mainTopContainer">
        <div>
          <div className="hamBtnBox">
            <div className="hamBtn" onClick={handleHamBtn}>
              <span className="first" />
              <span className="second" />
              <span className="third" />
            </div>
          </div>
          <button
            className="logo"
            onClick={() => {
              navigate('/');
            }}
          >
            <img src={Logo} alt="" />
          </button>
          <div className="menuBar">
            <ul>
              <li>System Settings<span>▼</span></li>
              <li>Manage Account<span>▼</span></li>
              <button className="btnXS defaultPrimary">Company</button>
            </ul>
          </div>
        </div>
        <div className="iconBox">
          <button
            onClick={() => {
              navigate('/login');
            }}
          >
            <span className="box" />
            <span className="icon">
              <Person />
            </span>
          </button>
          <button
            onClick={() => {
              navigate('/setting');
            }}
          >
            <span className="box" />
            <span className="icon">
              <Settings />
            </span>
          </button>
          <button
            onClick={() => {
              navigate('/setting');
            }}
          >
            <span className="box" />
            <span className="icon">
              <AppsSharp/>
            </span>
          </button>
        </div>
      </div>
      <div className="menuBox">
        <div className="menuContent">
          <div className="AIBox recipeAIBox">
            <div className="titleBox">
              <span>Recipe.AI</span>
              <span>Project NAME</span>
            </div>
            <ul>
              <li><span><FolderRounded/></span>현상분석</li>
              <li><span><FolderRounded/></span>Level 2 Menu</li>
              <li><span><FolderRounded/></span>Level 2 Menu</li>
              <li><span><FolderRounded/></span>Level 2 Menu</li>
              <li><span><FolderRounded/></span>Level 2 Menu</li>
              <li><span><FolderRounded/></span>Level 2 Menu</li>
              <li><span><FolderRounded/></span>Level 2 Menu</li>
            </ul>
          </div>
          <div className="AIBox inspectionAIBox">
            <div className="titleBox">
              <span>Inspection.AI</span>
              <span>Project NAME</span>
            </div>
            <ul>
              <li><span><FolderRounded/></span>AI 비전 검사</li>
              <li><span><FolderRounded/></span>Level 2 Menu
                <ul className="subMenu">
                  <li><span><FolderRounded/></span>Level 3 Menu</li>
                  <li><span><FolderRounded/></span>Level 3 Menu</li>
                  <li><span><FolderRounded/></span>Level 3 Menu</li>
                </ul>
              </li>
              <li><span><FolderRounded/></span>Level 2 Menu</li>
              <li><span><FolderRounded/></span>Level 2 Menu</li>
              <li><span><FolderRounded/></span>Level 2 Menu</li>
              <li><span><FolderRounded/></span>Level 2 Menu</li>
              <li><span><FolderRounded/></span>Level 2 Menu</li>
            </ul>
          </div>
          <div className="AIBox inspectionAIBox"/>
          <div className="AIBox inspectionAIBox">
            <button className="iconBtnL defaultES">
              <span className="iconL">
                <img src={PlusIcon}/>
              </span>
              <span className="txt">BUTTON</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default NaviBar;
