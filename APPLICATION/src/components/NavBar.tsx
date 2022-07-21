import React from 'react';
// import '../style/components/ㅇㄹㅁ.scss';
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
                      <span>
                        <FolderRounded />
                      </span>
                      현상분석
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
          <div
            className="company-logo"
            onClick={() => {
              navigate('/');
            }}
          />
          <div className="block" />
          <div className="breadcrumb">
            <div className="btn-dropdown">
              <span>
                Project NAME / Level 1 Menu
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
            <div className="btn-dropdown">
              <span>
                Level 2 Menu{' '}
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
            <div className="btn-dropdown">
              <span>
                Level 3 Menu
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
          <div className="btn-dropdown">
            <span>
              <Person />
            </span>
            <ul className="dropdown-list">
              <li>
                <span>
                  <MdManageAccounts />
                </span>
                My Page
              </li>
              <li>
                <span>
                  <BiLogOut />
                </span>
                menu2
              </li>
            </ul>
          </div>
          <div className="btn-dropdown">
            <span>
              <Settings onClick={() => navigate('/setting')} />
            </span>
            <ul className="dropdown-list">
              <li>menu1</li>
              <li>menu2</li>
              <li>menu3</li>
            </ul>
          </div>
          <div className="group btn-dropdown">
            <span>
              <Apps />
            </span>
            <ul className="dropdown-list">
              <li>menu1</li>
              <li>menu2</li>
              <li>menu3</li>
            </ul>
          </div>
        </div>
      </div>

      {/* <div className="header"> */}
      {/*  <div className="menu"> */}
      {/*    /!* 헤더 햄버튼, 로고 영역 *!/ */}
      {/*    <div className="menuBarBox"> */}
      {/*      <div className="menuBar" onClick={handleMenuBar}> */}
      {/*        <span className="first" /> */}
      {/*        <span className="second" /> */}
      {/*        <span className="third" /> */}
      {/*      </div> */}
      {/*    </div> */}
      {/*    <button */}
      {/*      className="companyLogo" */}
      {/*      onClick={() => { */}
      {/*        navigate('/'); */}
      {/*      }} */}
      {/*    > */}
      {/*      <img src={Logo} alt="" /> */}
      {/*    </button> */}
      {/*    /!* 헤더 드롭다운 영역 *!/ */}
      {/*    <div className="breadCrumb"> */}
      {/*      <div className="btnDropdown"> */}
      {/*        <span className="dropdownTitle"> */}
      {/*          Project NAME / Level 1 Menu */}
      {/*          <i> */}
      {/*            <ArrowDropDown /> */}
      {/*          </i> */}
      {/*        </span> */}
      {/*        <ul className="dropdowList"> */}
      {/*          <li> */}
      {/*            <span> */}
      {/*              <FolderRounded /> */}
      {/*            </span> */}
      {/*            menu1 */}
      {/*          </li> */}
      {/*          <li> */}
      {/*            <span> */}
      {/*              <FolderRounded /> */}
      {/*            </span> */}
      {/*            menu2 */}
      {/*          </li> */}
      {/*          <li> */}
      {/*            <span> */}
      {/*              <FolderRounded /> */}
      {/*            </span> */}
      {/*            menu3 */}
      {/*          </li> */}
      {/*        </ul> */}
      {/*      </div> */}
      {/*      <div className="btnDropdown"> */}
      {/*        <span className="dropdownTitle"> */}
      {/*          Level 2 Menu */}
      {/*          <i> */}
      {/*            <ArrowDropDown /> */}
      {/*          </i> */}
      {/*        </span> */}
      {/*        <ul className="dropdownList"> */}
      {/*          <li> */}
      {/*            <span> */}
      {/*              <FolderRounded /> */}
      {/*            </span> */}
      {/*            menu1 */}
      {/*          </li> */}
      {/*          <li> */}
      {/*            <span> */}
      {/*              <FolderRounded /> */}
      {/*            </span> */}
      {/*            menu2 */}
      {/*          </li> */}
      {/*          <li> */}
      {/*            <span> */}
      {/*              <FolderRounded /> */}
      {/*            </span> */}
      {/*            menu3 */}
      {/*          </li> */}
      {/*        </ul> */}
      {/*      </div> */}
      {/*      <div className="btnDropdown"> */}
      {/*        <span className="dropdownTitle"> */}
      {/*          Level 3 Menu */}
      {/*          <i> */}
      {/*            <ArrowDropDown /> */}
      {/*          </i> */}
      {/*        </span> */}
      {/*        <ul className="dropdownList"> */}
      {/*          <li> */}
      {/*            <span> */}
      {/*              <FolderRounded /> */}
      {/*            </span> */}
      {/*            menu1 */}
      {/*          </li> */}
      {/*          <li> */}
      {/*            <span> */}
      {/*              <FolderRounded /> */}
      {/*            </span> */}
      {/*            menu2 */}
      {/*          </li> */}
      {/*          <li> */}
      {/*            <span> */}
      {/*              <FolderRounded /> */}
      {/*            </span> */}
      {/*            menu3 */}
      {/*          </li> */}
      {/*        </ul> */}
      {/*      </div> */}
      {/*    </div> */}
      {/*  </div> */}
      {/*  /!* 헤더 아이콘 영역 *!/ */}
      {/*  <div className="private"> */}
      {/*    <div className="btnDropdown"> */}
      {/*      <button */}
      {/*        onClick={() => { */}
      {/*          navigate('/login'); */}
      {/*        }} */}
      {/*      > */}
      {/*        <span> */}
      {/*          <Person /> */}
      {/*        </span> */}
      {/*      </button> */}
      {/*      <ul> */}
      {/*        <li> */}
      {/*          <span> */}
      {/*            <MdManageAccounts /> */}
      {/*          </span> */}
      {/*          My Page */}
      {/*        </li> */}
      {/*        <li> */}
      {/*          <span> */}
      {/*            <BiLogOut /> */}
      {/*          </span> */}
      {/*          Log Out */}
      {/*        </li> */}
      {/*      </ul> */}
      {/*    </div> */}
      {/*    <div className="btnDropdown"> */}
      {/*      <button */}
      {/*        onClick={() => { */}
      {/*          navigate('/setting'); */}
      {/*        }} */}
      {/*      > */}
      {/*        <span> */}
      {/*          <Settings /> */}
      {/*        </span> */}
      {/*      </button> */}
      {/*      <ul className="dropdownList"> */}
      {/*        <li>menu1</li> */}
      {/*        <li>menu2</li> */}
      {/*        <li>menu3</li> */}
      {/*      </ul> */}
      {/*    </div> */}
      {/*    <div className="btnDropdown"> */}
      {/*      <button */}
      {/*        onClick={() => { */}
      {/*          navigate('/'); */}
      {/*        }} */}
      {/*      > */}
      {/*        <span> */}
      {/*          <Apps /> */}
      {/*        </span> */}
      {/*      </button> */}
      {/*      <ul className="dropdownList"> */}
      {/*        <li>menu1</li> */}
      {/*        <li>menu2</li> */}
      {/*        <li>menu3</li> */}
      {/*      </ul> */}
      {/*    </div> */}
      {/*    /!* <ul className="dropdownList"> *!/ */}
      {/*    /!*  <li> *!/ */}
      {/*    /!*    <span><Settings /></span>MyPage *!/ */}
      {/*    /!*  </li> *!/ */}
      {/*    /!*  <li> *!/ */}
      {/*    /!*    <span><BiLogOut /></span>menu2 *!/ */}
      {/*    /!*  </li> *!/ */}
      {/*    /!* </ul> *!/ */}
      {/*  </div> */}
      {/*  /!* <div className="iconBox"> *!/ */}
      {/*  /!*  <button *!/ */}
      {/*  /!*    onClick={() => { *!/ */}
      {/*  /!*      navigate('/login'); *!/ */}
      {/*  /!*    }} *!/ */}
      {/*  /!*  > *!/ */}
      {/*  /!*    <span className="box" /> *!/ */}
      {/*  /!*    <span className="icon"> *!/ */}
      {/*  /!*      <Person /> *!/ */}
      {/*  /!*    </span> *!/ */}
      {/*  /!*  </button> *!/ */}
      {/*  /!*  <button *!/ */}
      {/*  /!*    onClick={() => { *!/ */}
      {/*  /!*      navigate('/setting'); *!/ */}
      {/*  /!*    }} *!/ */}
      {/*  /!*  > *!/ */}
      {/*  /!*    <span className="box" /> *!/ */}
      {/*  /!*    <span className="icon"> *!/ */}
      {/*  /!*      <Settings /> *!/ */}
      {/*  /!*    </span> *!/ */}
      {/*  /!*  </button> *!/ */}
      {/*  /!*  <button *!/ */}
      {/*  /!*    onClick={() => { *!/ */}
      {/*  /!*      navigate('/setting'); *!/ */}
      {/*  /!*    }} *!/ */}
      {/*  /!*  > *!/ */}
      {/*  /!*    <span className="box" /> *!/ */}
      {/*  /!*    <span className="icon"> *!/ */}
      {/*  /!*      <AppsSharp/> *!/ */}
      {/*  /!*    </span> *!/ */}
      {/*  /!*  </button> *!/ */}
      {/*  /!* </div> *!/ */}
      {/* </div> */}
      {/* <div className="menuBox"> */}
      {/*  <div className="menuContent"> */}
      {/*    <div className="AIBox recipeAIBox"> */}
      {/*      <div className="titleBox"> */}
      {/*        <span>Recipe.AI</span> */}
      {/*        <span>Project NAME</span> */}
      {/*      </div> */}
      {/*      <ul> */}
      {/*        <li> */}
      {/*          <span><ArrowDropDown /></span> */}
      {/*          <span><FolderRounded /></span> */}
      {/*          현상분석 */}
      {/*        </li> */}
      {/*        <li> */}
      {/*          <span>▼</span> */}
      {/*          <span><FolderRounded /></span> */}
      {/*          Level 2 Menu */}
      {/*          /!*<ul className="subMenu">*!/ */}
      {/*          /!*  <li><span><FolderRounded/></span>Level 3 Menu</li>*!/ */}
      {/*          /!*  <li><span><FolderRounded/></span>Level 3 Menu</li>*!/ */}
      {/*          /!*  <li><span><FolderRounded/></span>Level 3 Menu</li>*!/ */}
      {/*          /!*</ul>*!/ */}
      {/*        </li> */}
      {/*        <li> */}
      {/*          <span>▼</span> */}
      {/*          <span><FolderRounded/></span> */}
      {/*          Level 2 Menu */}
      {/*        </li> */}
      {/*        <li> */}
      {/*          <span>▼</span> */}
      {/*          <span><FolderRounded/></span> */}
      {/*          Level 2 Menu */}
      {/*        </li> */}
      {/*        <li> */}
      {/*          <span>▼</span> */}
      {/*          <span><FolderRounded/></span> */}
      {/*          Level 2 Menu */}
      {/*        </li> */}
      {/*        <li> */}
      {/*          <span>▼</span> */}
      {/*          <span><FolderRounded/></span> */}
      {/*          Level 2 Menu */}
      {/*        </li> */}
      {/*        <li> */}
      {/*          <span>▼</span> */}
      {/*          <span><FolderRounded/></span> */}
      {/*          Level 2 Menu */}
      {/*        </li> */}
      {/*        <li> */}
      {/*          <span>▼</span> */}
      {/*          <span><FolderRounded/></span> */}
      {/*          Level 2 Menu */}
      {/*        </li> */}
      {/*        <li> */}
      {/*          <span>▼</span> */}
      {/*          <span><FolderRounded/></span> */}
      {/*          Level 2 Menu */}
      {/*        </li> */}
      {/*      </ul> */}
      {/*    </div> */}
      {/*    <div className="AIBox inspectionAIBox"> */}
      {/*      <div className="titleBox"> */}
      {/*        <span>Inspection.AI</span> */}
      {/*        <span>Project NAME</span> */}
      {/*      </div> */}
      {/*      <ul> */}
      {/*        <li> */}
      {/*          <span>▼</span> */}
      {/*          <span><FolderRounded/></span> */}
      {/*          Level 2 Menu */}
      {/*        </li> */}
      {/*        <li> */}
      {/*          <span>▼</span> */}
      {/*          <span><FolderRounded/></span> */}
      {/*          Level 2 Menu */}
      {/*          /!*<ul className="subMenu">*!/ */}
      {/*          /!*  <li><span><FolderRounded/></span>Level 3 Menu</li>*!/ */}
      {/*          /!*  <li><span><FolderRounded/></span>Level 3 Menu</li>*!/ */}
      {/*          /!*  <li><span><FolderRounded/></span>Level 3 Menu</li>*!/ */}
      {/*          /!*</ul>*!/ */}
      {/*        </li> */}
      {/*        <li> */}
      {/*          <span>▼</span> */}
      {/*          <span><FolderRounded/></span> */}
      {/*          Level 2 Menu */}
      {/*        </li> */}
      {/*        <li> */}
      {/*          <span>▼</span> */}
      {/*          <span><FolderRounded/></span> */}
      {/*          Level 2 Menu */}
      {/*        </li> */}
      {/*        <li> */}
      {/*          <span>▼</span> */}
      {/*          <span><FolderRounded/></span> */}
      {/*          Level 2 Menu */}
      {/*        </li> */}
      {/*      </ul> */}
      {/*    </div> */}
      {/*    <div className="AIBox inspectionAIBox"/> */}
      {/*    <div className="AIBox addIconBox"> */}
      {/*      <button className="iconBtnL defaultES"> */}
      {/*        <span className="iconL"> */}
      {/*          <AddCircle /> */}
      {/*        </span> */}
      {/*        <span className="txt">ADD AI SERVICE</span> */}
      {/*      </button> */}
      {/*    </div> */}
      {/*  </div> */}
      {/* </div> */}
    </>
  );
};

export default NaviBar;
