import React, { useState } from 'react';
import '../style/DesignSystem.scss';
import '../style/pages/ImgArchive.scss';
import {
  CalendarToday,
  Delete,
  Image,
  ViewHeadline,
  ViewList,
} from '@material-ui/icons';
import { MdDownload, MdGridView } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import ImgPopup from '../components/ImgPopup';

const ImgArchive = () => {
  const navigation = useNavigate();
  const [isOpenPopupState, setIsOpenPopupState] = useState(false);
  const [txtChangeState, setTxtChangeState] = useState('모두 다운로드');

  const openImgPopup = () => {
    setIsOpenPopupState(!isOpenPopupState);
  };

  const closeImgPopup = () => {
    setIsOpenPopupState(!isOpenPopupState);
  };

  const handleChecked = (e) => {
    const isChecked = e.currentTarget.checked;
    console.log(isChecked, '체크됨');
    // if (isChecked > 0) {
    //   setTxtChangeState('선택 다운로드');
    // } else if (isChecked === 0) {
    //   setTxtChangeState('모두 다운로드');
    // }
    isChecked > 0
      ? setTxtChangeState('선택 다운로드')
      : setTxtChangeState('모두 다운로드');
  };

  // const handleGrid = (e) => {
  //   e.currentTarget.classList.add('gridActive');
  //   console.log(e.currentTarget);
  // };
  //
  // const handleHeadline = (e) => {
  //   e.currentTarget.classList.add('headlineActive');
  //   console.log(e.currentTarget);
  // };
  //
  // const handleListview = (e) => {
  //   e.currentTarget.classList.add('listViewActive');
  //   console.log(e.currentTarget);
  // };

  return (
    <div className="imgArchiveWrap">
      <div className="imgArchiveContainer">
        <div className="imgTitleBox">
          <div className="title">
            <Image style={{ fontSize: '28px' }} />
            <span>사진 보관함</span>
          </div>
          <div className="titleCon">
            <div className="left">
              <div className="leftCon">
                <span>캠 그룹 선택</span>
                <select className="nameSelect">
                  <option>H1 공장 크레인</option>
                  <option>H2 공장 크레인</option>
                  <option>H3 공장 크레인</option>
                </select>
              </div>
              <div className="leftCon dateBox">
                <CalendarToday />
                <span>날짜 변경</span>
                <input type="text" placeholder="YYYY - MM - DD" />
              </div>
              <div className="leftCon">
                <select className="arraySelect">
                  <option>새로운 순</option>
                  <option>오래된 순</option>
                </select>
              </div>
              <div className="leftCon leftIcon">
                {/*<MdGridView onClick={handleGrid} style={{ fontSize: '24px' }} />*/}
                <MdGridView style={{ fontSize: '24px' }} />
                {/*<ViewHeadline*/}
                {/*  onClick={handleHeadline}*/}
                {/*  style={{ fontSize: '24px' }}*/}
                {/*/>*/}
                <ViewHeadline
                  style={{ fontSize: '24px' }}
                />
                {/*<ViewList*/}
                {/*  onClick={handleListview}*/}
                {/*  style={{ fontSize: '24px' }}*/}
                {/*/>*/}
                <ViewList
                  style={{ fontSize: '24px' }}
                />
              </div>
            </div>
            <div className="right">
              <button className="iconBtnL normalPrimary">
                <span className="iconL">
                  <MdDownload style={{ fontSize: '24px' }} />
                </span>
                <span className="txt">{txtChangeState}</span>
              </button>
              <button className="iconBtnL normalPrimary">
                <span className="iconL">
                  <Delete style={{ fontSize: '24px' }} />
                </span>
                <span className="txt">모두 버리기</span>
              </button>
            </div>
          </div>
        </div>

        {/* 1. grid view */}
        <div className="imgGridView">
          <div className="imgContent">
            <div className="imgBox" onClick={openImgPopup}>
              <input type="checkbox" onChange={handleChecked} />
              <div className="imgImg" />
              <div className="imgTitle">
                <span>H1공장크레인_CAM2_20220715_13:00</span>
                <span className="imgIcon">
                  <Image style={{ fontSize: '28px' }} />
                </span>
              </div>
            </div>
            <div className="imgBox" onClick={openImgPopup}>
              <input type="checkbox" onChange={handleChecked} />
              <div className="imgImg" />
              <div className="imgTitle">
                <span>H1공장크레인_CAM2_20220715_13:00</span>
                <span className="imgIcon">
                  <Image style={{ fontSize: '28px' }} />
                </span>
              </div>
            </div>
            <div className="imgBox" onClick={openImgPopup}>
              <input type="checkbox" onChange={handleChecked} />
              <div className="imgImg" />
              <div className="imgTitle">
                <span>H1공장크레인_CAM2_20220715_13:00</span>
                <span className="imgIcon">
                  <Image style={{ fontSize: '28px' }} />
                </span>
              </div>
            </div>
            <div className="imgBox" onClick={openImgPopup}>
              <input type="checkbox" onChange={handleChecked} />
              <div className="imgImg" />
              <div className="imgTitle">
                <span>H1공장크레인_CAM2_20220715_13:00</span>
                <span className="imgIcon">
                  <Image style={{ fontSize: '28px' }} />
                </span>
              </div>
            </div>
            <div className="imgBox" onClick={openImgPopup}>
              <input type="checkbox" onChange={handleChecked} />
              <div className="imgImg" />
              <div className="imgTitle">
                <span>H1공장크레인_CAM2_20220715_13:00</span>
                <span className="imgIcon">
                  <Image style={{ fontSize: '28px' }} />
                </span>
              </div>
            </div>
            <div className="imgBox" onClick={openImgPopup}>
              <input type="checkbox" onChange={handleChecked} />
              <div className="imgImg" />
              <div className="imgTitle">
                <span>H1공장크레인_CAM2_20220715_13:00</span>
                <span className="imgIcon">
                  <Image style={{ fontSize: '28px' }} />
                </span>
              </div>
            </div>
            <div className="imgBox" onClick={openImgPopup}>
              <input type="checkbox" onChange={handleChecked} />
              <div className="imgImg" />
              <div className="imgTitle">
                <span>H1공장크레인_CAM2_20220715_13:00</span>
                <span className="imgIcon">
                  <Image style={{ fontSize: '28px' }} />
                </span>
              </div>
            </div>
            <div className="imgBox" onClick={openImgPopup}>
              <input type="checkbox" onChange={handleChecked} />
              <div className="imgImg" />
              <div className="imgTitle">
                <span>H1공장크레인_CAM2_20220715_13:00</span>
                <span className="imgIcon">
                  <Image style={{ fontSize: '28px' }} />
                </span>
              </div>
            </div>
          </div>
          <div className="imgContent">
            <div className="imgBox" onClick={openImgPopup}>
              <input type="checkbox" onChange={handleChecked} />
              <div className="imgImg" />
              <div className="imgTitle">
                <span>H1공장크레인_CAM2_20220715_13:00</span>
                <span className="imgIcon">
                  <Image style={{ fontSize: '28px' }} />
                </span>
              </div>
            </div>
            <div className="imgBox" onClick={openImgPopup}>
              <input type="checkbox" onChange={handleChecked} />
              <div className="imgImg" />
              <div className="imgTitle">
                <span>H1공장크레인_CAM2_20220715_13:00</span>
                <span className="imgIcon">
                  <Image style={{ fontSize: '28px' }} />
                </span>
              </div>
            </div>
            {/* 클래스명 + s_ => 스켈레톤박스 */}
            <div className="s_imgBox imgBox">
              <div className="s_imgImg imgImg" />
              <div className="s_imgTitle imgTitle">
                <span />
                <span />
              </div>
            </div>
            <div className="s_imgBox imgBox">
              <div className="s_imgImg imgImg" />
              <div className="s_imgTitle imgTitle">
                <span />
                <span />
              </div>
            </div>
            <div className="s_imgBox imgBox">
              <div className="s_imgImg imgImg" />
              <div className="s_imgTitle imgTitle">
                <span />
                <span />
              </div>
            </div>
            <div className="s_imgBox imgBox">
              <div className="s_imgImg imgImg" />
              <div className="s_imgTitle imgTitle">
                <span />
                <span />
              </div>
            </div>
            <div className="s_imgBox imgBox">
              <div className="s_imgImg imgImg" />
              <div className="s_imgTitle imgTitle">
                <span />
                <span />
              </div>
            </div>
            <div className="s_imgBox imgBox">
              <div className="s_imgImg imgImg" />
              <div className="s_imgTitle imgTitle">
                <span />
                <span />
              </div>
            </div>
          </div>
          <div className="imgContent">
            <div className="s_imgBox imgBox">
              <div className="s_imgImg imgImg" />
              <div className="s_imgTitle imgTitle">
                <span />
                <span />
              </div>
            </div>
            <div className="s_imgBox imgBox">
              <div className="s_imgImg imgImg" />
              <div className="s_imgTitle imgTitle">
                <span />
                <span />
              </div>
            </div>
            <div className="s_imgBox imgBox">
              <div className="s_imgImg imgImg" />
              <div className="s_imgTitle imgTitle">
                <span />
                <span />
              </div>
            </div>
            <div className="s_imgBox imgBox">
              <div className="s_imgImg imgImg" />
              <div className="s_imgTitle imgTitle">
                <span />
                <span />
              </div>
            </div>
            <div className="s_imgBox imgBox">
              <div className="s_imgImg imgImg" />
              <div className="s_imgTitle imgTitle">
                <span />
                <span />
              </div>
            </div>
            <div className="s_imgBox imgBox">
              <div className="s_imgImg imgImg" />
              <div className="s_imgTitle imgTitle">
                <span />
                <span />
              </div>
            </div>
            <div className="s_imgBox imgBox">
              <div className="s_imgImg imgImg" />
              <div className="s_imgTitle imgTitle">
                <span />
                <span />
              </div>
            </div>
            <div className="s_imgBox imgBox">
              <div className="s_imgImg imgImg" />
              <div className="s_imgTitle imgTitle">
                <span />
                <span />
              </div>
            </div>
          </div>
        </div>

        {/* 2. view headline */}
        <div className="viewHeadline">
          <div className="imgContent">
            <div className="imgBox">
              <div className="imgInput">
                <input type="checkbox" onChange={handleChecked} />
              </div>
              <div className="imgTitle">이름</div>
              <div className="imgDate">저장된 날짜</div>
              <div className="imgSize">크기</div>
              <div className="imgGroup">캠 그룹</div>
            </div>
            {/* 반복되는 imgBox */}
            <div className="imgBox">
              <div className="imgInput">
                <input type="checkbox" onChange={handleChecked} />
              </div>
              <div className="imgTitle">
                <Image style={{ color: '#979797' }} />
                <span>H1공장크레인_CAM2_20220715_13:00</span>
              </div>
              <div className="imgDate">2020-07-25 오후 1:00</div>
              <div className="imgSize">5,465KB</div>
              <div className="imgGroup">H1공장크레인</div>
            </div>
            <div className="imgBox">
              <div className="imgInput">
                <input type="checkbox" onChange={handleChecked} />
              </div>
              <div className="imgTitle">
                <Image style={{ color: '#979797' }} />
                <span>H1공장크레인_CAM2_20220715_13:00</span>
              </div>
              <div className="imgDate">2020-07-25 오후 1:00</div>
              <div className="imgSize">5,465KB</div>
              <div className="imgGroup">H1공장크레인</div>
            </div>
            <div className="imgBox">
              <div className="imgInput">
                <input type="checkbox" onChange={handleChecked} />
              </div>
              <div className="imgTitle">
                <Image style={{ color: '#979797' }} />
                <span>H1공장크레인_CAM2_20220715_13:00</span>
              </div>
              <div className="imgDate">2020-07-25 오후 1:00</div>
              <div className="imgSize">5,465KB</div>
              <div className="imgGroup">H1공장크레인</div>
            </div>
            <div className="imgBox">
              <div className="imgInput">
                <input type="checkbox" onChange={handleChecked} />
              </div>
              <div className="imgTitle">
                <Image style={{ color: '#979797' }} />
                <span>H1공장크레인_CAM2_20220715_13:00</span>
              </div>
              <div className="imgDate">2020-07-25 오후 1:00</div>
              <div className="imgSize">5,465KB</div>
              <div className="imgGroup">H1공장크레인</div>
            </div>
            <div className="imgBox">
              <div className="imgInput">
                <input type="checkbox" onChange={handleChecked} />
              </div>
              <div className="imgTitle">
                <Image style={{ color: '#979797' }} />
                <span>H1공장크레인_CAM2_20220715_13:00</span>
              </div>
              <div className="imgDate">2020-07-25 오후 1:00</div>
              <div className="imgSize">5,465KB</div>
              <div className="imgGroup">H1공장크레인</div>
            </div>
          </div>
        </div>

        {/* 3.list View */}
        <div className="listView">
          <div className="imgContent">
            <div className="imgBox">
              <div className="imgInput">
                <input type="checkbox" />
              </div>
              <div className="imgPreview">미리보기</div>
              <div className="imgTitle">이름</div>
              <div className="imgDate">저장된 날짜</div>
              <div className="imgSize">크기</div>
              <div className="imgGroup">캠 그룹</div>
            </div>
            <div className="imgBox">
              <div className="imgInput">
                <input type="checkbox" onChange={handleChecked} />
              </div>
              <div className="imgPreview">
                <img />
              </div>
              <div className="imgTitle">H1공장크레인_CAM2_20220715_13:00</div>
              <div className="imgDate">2020-07-25 오후 1:00</div>
              <div className="imgSize">5,465KB</div>
              <div className="imgGroup">H1공장크레인</div>
            </div>
            <div className="imgBox">
              <div className="imgInput">
                <input type="checkbox" onChange={handleChecked} />
              </div>
              <div className="imgPreview">
                <img />
              </div>
              <div className="imgTitle">H1공장크레인_CAM2_20220715_13:00</div>
              <div className="imgDate">2020-07-25 오후 1:00</div>
              <div className="imgSize">5,465KB</div>
              <div className="imgGroup">H1공장크레인</div>
            </div>
            <div className="imgBox">
              <div className="imgInput">
                <input type="checkbox" onChange={handleChecked} />
              </div>
              <div className="imgPreview">
                <img />
              </div>
              <div className="imgTitle">H1공장크레인_CAM2_20220715_13:00</div>
              <div className="imgDate">2020-07-25 오후 1:00</div>
              <div className="imgSize">5,465KB</div>
              <div className="imgGroup">H1공장크레인</div>
            </div>
          </div>
        </div>

        <div className="bottomBtnBox">
          <button
            className="btnR normalPrimary"
            onClick={() => {
              navigation('/videoArchive');
            }}
          >
            영상 보관함
          </button>
          <div className="pageBtn" />
        </div>

        {isOpenPopupState && (
          <ImgPopup openImgPopup={openImgPopup} closeImgPopup={closeImgPopup} />
        )}
      </div>
    </div>
  );
};

export default ImgArchive;
