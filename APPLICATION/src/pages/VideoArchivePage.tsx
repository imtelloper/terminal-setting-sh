import React, { useState } from 'react';
import '../style/DesignSystem.scss';
import '../style/pages/VideoArchive.scss';
import {
  CalendarToday,
  Delete,
  Videocam,
  ViewHeadline,
  ViewList,
} from '@material-ui/icons';
import { MdDownload, MdGridView } from 'react-icons/md';
import VideoPopup from '../components/VideoPopup';
import { useNavigate } from 'react-router-dom';

const VideoArchive = () => {
  const navigation = useNavigate();
  const [isOpenPopupState, setIsOpenPopupState] = useState(false);
  const [txtChangeState, setTxtChangeState] = useState('모두 다운로드');

  const openVideoPopup = () => {
    setIsOpenPopupState(!isOpenPopupState);
  };

  const closeVideoPopup = () => {
    setIsOpenPopupState(!isOpenPopupState);
  };

  const handleChecked = (e) => {
    const isChecked = e.currentTarget.checked;
    // if (isChecked > 0) {
    //   setTxtChangeState('선택 다운로드');
    // } else {
    //   setTxtChangeState('모두 다운로드');
    // }
    isChecked > 0
      ? setTxtChangeState('선택 다운로드')
      : setTxtChangeState('모두 다운로드');
  };

  return (
    <div className="videoArchiveWrap">
      <div className="videoArchiveContainer">
        <div className="videoTitleBox">
          <div className="title">
            <Videocam style={{ fontSize: '28px' }} />
            <span>영상 보관함</span>
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
                <MdGridView style={{ fontSize: '24px' }} />
                <ViewHeadline style={{ fontSize: '24px' }} />
                <ViewList style={{ fontSize: '24px' }} />
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
        <div className="videoContentBox">
          <div className="videoContent">
            <div className="videoBox" onClick={openVideoPopup}>
              <input type="checkbox" onChange={handleChecked} />
              <div className="videoImg" />
              <div className="videoTitle">
                <span>H1공장크레인_CAM2_20220715_13:00</span>
                <span className="videoIcon">
                  <Videocam style={{ fontSize: '28px', color: '#979797' }} />
                </span>
              </div>
            </div>
            <div className="videoBox" onClick={openVideoPopup}>
              <input type="checkbox" onChange={handleChecked} />
              <div className="videoImg" />
              <div className="videoTitle">
                <span>H1공장크레인_CAM2_20220715_13:00</span>
                <span className="videoIcon">
                  <Videocam style={{ fontSize: '28px', color: '#979797' }} />
                </span>
              </div>
            </div>
            <div className="videoBox" onClick={openVideoPopup}>
              <input type="checkbox" onChange={handleChecked} />
              <div className="videoImg" />
              <div className="videoTitle">
                <span>H1공장크레인_CAM2_20220715_13:00</span>
                <span className="videoIcon">
                  <Videocam style={{ fontSize: '28px', color: '#979797' }} />
                </span>
              </div>
            </div>
            <div className="videoBox" onClick={openVideoPopup}>
              <input type="checkbox" onChange={handleChecked} />
              <div className="videoImg" />
              <div className="videoTitle">
                <span>H1공장크레인_CAM2_20220715_13:00</span>
                <span className="videoIcon">
                  <Videocam style={{ fontSize: '28px', color: '#979797' }} />
                </span>
              </div>
            </div>
            <div className="videoBox" onClick={openVideoPopup}>
              <input type="checkbox" onChange={handleChecked} />
              <div className="videoImg" />
              <div className="videoTitle">
                <span>H1공장크레인_CAM2_20220715_13:00</span>
                <span className="videoIcon">
                  <Videocam style={{ fontSize: '28px', color: '#979797' }} />
                </span>
              </div>
            </div>
            <div className="videoBox" onClick={openVideoPopup}>
              <input type="checkbox" onChange={handleChecked} />
              <div className="videoImg" />
              <div className="videoTitle">
                <span>H1공장크레인_CAM2_20220715_13:00</span>
                <span className="videoIcon">
                  <Videocam style={{ fontSize: '28px', color: '#979797' }} />
                </span>
              </div>
            </div>
            <div className="videoBox" onClick={openVideoPopup}>
              <input type="checkbox" />
              <div className="videoImg" />
              <div className="videoTitle">
                <span>H1공장크레인_CAM2_20220715_13:00</span>
                <span className="videoIcon">
                  <Videocam style={{ fontSize: '28px', color: '#979797' }} />
                </span>
              </div>
            </div>
            <div className="videoBox" onClick={openVideoPopup}>
              <input type="checkbox" onChange={handleChecked} />
              <div className="videoImg" />
              <div className="videoTitle">
                <span>H1공장크레인_CAM2_20220715_13:00</span>
                <span className="videoIcon">
                  <Videocam style={{ fontSize: '28px', color: '#979797' }} />
                </span>
              </div>
            </div>
          </div>
          <div className="videoContent">
            <div className="videoBox" onClick={openVideoPopup}>
              <input type="checkbox" onChange={handleChecked} />
              <div className="videoImg" />
              <div className="videoTitle">
                <span>H1공장크레인_CAM2_20220715_13:00</span>
                <span className="videoIcon">
                  <Videocam style={{ fontSize: '28px', color: '#979797' }} />
                </span>
              </div>
            </div>
            <div className="videoBox" onClick={openVideoPopup}>
              <input type="checkbox" onChange={handleChecked} />
              <div className="videoImg" />
              <div className="videoTitle">
                <span>H1공장크레인_CAM2_20220715_13:00</span>
                <span className="videoIcon">
                  <Videocam style={{ fontSize: '28px', color: '#979797' }} />
                </span>
              </div>
            </div>
            {/* 클래스명 + s_ => 스켈레톤박스 */}
            <div className="s_videoBox videoBox">
              <div className="s_videoImg videoImg" />
              <div className="s_videoTitle videoTitle">
                <span />
                <span />
              </div>
            </div>
            <div className="s_videoBox videoBox">
              <div className="s_videoImg videoImg" />
              <div className="s_videoTitle videoTitle">
                <span />
                <span />
              </div>
            </div>
            <div className="s_videoBox videoBox">
              <div className="s_videoImg videoImg" />
              <div className="s_videoTitle videoTitle">
                <span />
                <span />
              </div>
            </div>
            <div className="s_videoBox videoBox">
              <div className="s_videoImg videoImg" />
              <div className="s_videoTitle videoTitle">
                <span />
                <span />
              </div>
            </div>
            <div className="s_videoBox videoBox">
              <div className="s_videoImg videoImg" />
              <div className="s_videoTitle videoTitle">
                <span />
                <span />
              </div>
            </div>
            <div className="s_videoBox videoBox">
              <div className="s_videoImg videoImg" />
              <div className="s_videoTitle videoTitle">
                <span />
                <span />
              </div>
            </div>
          </div>
          <div className="videoContent">
            <div className="s_videoBox videoBox">
              <div className="s_videoImg videoImg" />
              <div className="s_videoTitle videoTitle">
                <span />
                <span />
              </div>
            </div>
            <div className="s_videoBox videoBox">
              <div className="s_videoImg videoImg" />
              <div className="s_videoTitle videoTitle">
                <span />
                <span />
              </div>
            </div>
            <div className="s_videoBox videoBox">
              <div className="s_videoImg videoImg" />
              <div className="s_videoTitle videoTitle">
                <span />
                <span />
              </div>
            </div>
            <div className="s_videoBox videoBox">
              <div className="s_videoImg videoImg" />
              <div className="s_videoTitle videoTitle">
                <span />
                <span />
              </div>
            </div>
            <div className="s_videoBox videoBox">
              <div className="s_videoImg videoImg" />
              <div className="s_videoTitle videoTitle">
                <span />
                <span />
              </div>
            </div>
            <div className="s_videoBox videoBox">
              <div className="s_videoImg videoImg" />
              <div className="s_videoTitle videoTitle">
                <span />
                <span />
              </div>
            </div>
            <div className="s_videoBox videoBox">
              <div className="s_videoImg videoImg" />
              <div className="s_videoTitle videoTitle">
                <span />
                <span />
              </div>
            </div>
            <div className="s_videoBox videoBox">
              <div className="s_videoImg videoImg" />
              <div className="s_videoTitle videoTitle">
                <span />
                <span />
              </div>
            </div>
          </div>
        </div>

        <div className="bottomBtnBox">
          <button
            className="btnR normalPrimary"
            onClick={() => {
              navigation('/imgArchive');
            }}
          >
            사진 보관함
          </button>
          <div className="pageBtn" />
        </div>

        {isOpenPopupState && (
          <VideoPopup
            openVideoPopup={openVideoPopup}
            closeVideoPopup={closeVideoPopup}
          />
        )}
      </div>
    </div>
  );
};

export default VideoArchive;
