import React, { useCallback, useState } from 'react';
import '../style/DesignSystem.scss';
import '../style/pages/VideoArchive.scss';
import {
  CalendarToday,
  Delete, Image,
  Videocam,
  ViewHeadline,
  ViewList
} from '@material-ui/icons';
import { MdDownload, MdGridView } from 'react-icons/md';
import VideoPopup from '../components/VideoPopup';
import { useNavigate } from 'react-router-dom';
import DownAlarmPopup from '../components/DownAlarmPopup';
import RemoveAlarmPopup from '../components/RemoveAlarmPopup';

const VideoArchive = () => {
  const navigation = useNavigate();
  const [isOpenPopupState, setIsOpenPopupState] = useState(false);
  const [downAlarmPopupState, setDownAlarmPopupState] = useState(false);
  const [removeAlarmPopupState, setRemoveAlarmPopupState] = useState(false);
  const [txtChangeState, setTxtChangeState] = useState('모두');
  const [checkedListState, setCheckedListsState] = useState([]);

  const openVideoPopup = () => {
    setIsOpenPopupState(!isOpenPopupState);
  };

  const openDownAlarmPopup = () => {
    setDownAlarmPopupState(!downAlarmPopupState);
  };

  const openRemoveAlarmPopup = () => {
    setRemoveAlarmPopupState(!removeAlarmPopupState);
  };

  const handleChecked = (e) => {
    const isChecked = e.currentTarget.checked;
    console.log(isChecked, '체크됨');
    isChecked > 0
      ? setTxtChangeState('선택')
      : setTxtChangeState('모두');

    if (isChecked) {
      document.querySelectorAll('.archiveImgsList').forEach((ele) => {
        (ele as HTMLInputElement).checked = true;
      });
    } else {
      document.querySelectorAll('.archiveImgsList').forEach((ele) => {
        (ele as HTMLInputElement).checked = false;
      });
    }
  };

  const dataLists = [
    {
      name: 'H1공장크레인_CAM2_20220715_13:00',
      date: '2020-07-25 오후 1:00',
      size: '5,465KB',
      groupName: 'H1공장크레인',
    },
    {
      name: 'H1공장크레인_CAM2_20220715_13:00',
      date: '2020-07-25 오후 1:00',
      size: '5,465KB',
      groupName: 'H1공장크레인',
    },
    {
      name: 'H1공장크레인_CAM2_20220715_13:00',
      date: '2020-07-25 오후 1:00',
      size: '5,465KB',
      groupName: 'H1공장크레인',
    },
    {
      name: 'H1공장크레인_CAM2_20220715_13:00',
      date: '2020-07-25 오후 1:00',
      size: '5,465KB',
      groupName: 'H1공장크레인',
    },
    {
      name: 'H1공장크레인_CAM2_20220715_13:00',
      date: '2020-07-25 오후 1:00',
      size: '5,465KB',
      groupName: 'H1공장크레인',
    },
    {
      name: 'H1공장크레인_CAM2_20220715_13:00',
      date: '2020-07-25 오후 1:00',
      size: '5,465KB',
      groupName: 'H1공장크레인',
    },
    {
      name: 'H1공장크레인_CAM2_20220715_13:00',
      date: '2020-07-25 오후 1:00',
      size: '5,465KB',
      groupName: 'H1공장크레인',
    },
    {
      name: 'H1공장크레인_CAM2_20220715_13:00',
      date: '2020-07-25 오후 1:00',
      size: '5,465KB',
      groupName: 'H1공장크레인',
    },
    {
      name: 'H1공장크레인_CAM2_20220715_13:00',
      date: '2020-07-25 오후 1:00',
      size: '5,465KB',
      groupName: 'H1공장크레인',
    },
  ];

  const onCheckedAll = useCallback(
    (checked) => {
      if (checked) {
        const checkedListArray = [];

        dataLists.forEach((list) => checkedListArray.push(list));

        setCheckedListsState(checkedListArray);
      } else {
        setCheckedListsState([]);
      }
    },
    [dataLists]
  );

  const onCheckedElement = useCallback(
    (checked, list) => {
      if (checked) {
        setCheckedListsState([...checkedListState, list]);
      } else {
        setCheckedListsState(checkedListState.filter((el) => el !== list));
      }
    },
    [checkedListState]
  );

  return (
    <div className="videoArchiveWrap">
      <div className="videoArchiveContainer">
        <div className="videoArchiveTitleBox">
          <div className="videoArchiveTitle">
            <Image style={{ fontSize: '28px' }} />
            <span>영상 보관함</span>
          </div>
          <div className="videoArchiveTitleCon">
            <div className="videoArchiveLeft">
              <div className="videoArchiveLeftCon">
                <span>캠 그룹 선택</span>
                <select className="nameSelect">
                  <option>H1 공장 크레인</option>
                  <option>H2 공장 크레인</option>
                  <option>H3 공장 크레인</option>
                </select>
              </div>
              <div className="videoArchiveLeftCon dateBox">
                <CalendarToday />
                <span>날짜 변경</span>
                <input type="text" placeholder="YYYY - MM - DD" />
              </div>
              <div className="videoArchiveLeftCon">
                <select className="arraySelect">
                  <option>새로운 순</option>
                  <option>오래된 순</option>
                </select>
              </div>
              <div className="videoArchiveLeftIcon">
                <input id="tab1" type="radio" name="tabs" defaultChecked />
                <label htmlFor="tab1">
                  <MdGridView style={{ fontSize: '24px' }} />
                </label>
                <input id="tab2" type="radio" name="tabs" />
                <label htmlFor="tab2">
                  <ViewHeadline style={{ fontSize: '24px' }} />
                </label>
                <input id="tab3" type="radio" name="tabs" />
                <label htmlFor="tab3">
                  <ViewList style={{ fontSize: '24px' }} />
                </label>
              </div>
            </div>
            <div className="videoArchiveRight">
              <button className="iconBtnL normalPrimary" onClick={openDownAlarmPopup}>
                <span className="iconL">
                  <MdDownload style={{ fontSize: '24px' }} />
                </span>
                <span className="txt">
                  {txtChangeState} 다운로드
                </span>
              </button>
              <button className="iconBtnL normalPrimary" onClick={openRemoveAlarmPopup}>
                <span className="iconL">
                  <Delete style={{ fontSize: '24px' }} />
                </span>
                <span className="txt">{txtChangeState} 버리기</span>
              </button>
            </div>
          </div>
        </div>

        {/* 1. grid view */}
        <div className="videoArchiveConWrap imgGridView">
          <div className="videoArchiveContent">
            {dataLists.map((list, idx) => (
              <div className="videoArchiveBox" key={idx}>
                <input
                  type="checkbox"
                  name="checkInput"
                  onChange={handleChecked}
                />
                <div className="videoArchiveImg" />
                <div className="videoArchiveTitle">
                  <span>{list.name}</span>
                  <span className="videoArchiveIcon">
                    <Image style={{ fontSize: '28px' }} />
                  </span>
                </div>
              </div>
            ))}
            <div className="s_videoBox videoArchiveBox">
              <div className="s_videoImg videoArchiveImg" />
              <div className="s_videoTitle videoArchiveTitle">
                <span />
                <span />
              </div>
            </div>
          </div>
        </div>

        {/* 2. view headline */}
        <div className="videoArchiveConWrap viewHeadline">
          <div className="videoArchiveContent">
            <div className="videoArchiveBox">
              <div className="videoArchiveInput">
                <input
                  type="checkbox"
                  id="allCheckInput"
                  name="checkInput"
                  onChange={(e) => {
                    handleChecked(e);
                    onCheckedAll(e.target.checked);
                  }}
                  checked={
                    checkedListState.length === 0
                      ? false
                      : checkedListState.length === dataLists.length
                  }
                />
              </div>
              <div className="videoArchiveTitle">이름</div>
              <div className="videoArchiveDate">저장된 날짜</div>
              <div className="videoArchiveSize">크기</div>
              <div className="videoArchiveGroup">캠 그룹</div>
            </div>
            {/* 반복되는 imgBox */}
            {dataLists.map((list, idx) => (
              <div className="videoArchiveBox" key={idx}>
                <div className="videoArchiveInput">
                  <input
                    type="checkbox"
                    name="checkInput"
                    className="archiveImgsList"
                    onChange={(e) => {
                      handleChecked(e);
                      onCheckedElement(e.target.checked, list);
                    }}
                  />
                </div>
                <div className="videoArchiveTitle">
                  <Image style={{ color: '#979797' }} />
                  <span>{list.name}</span>
                </div>
                <div className="videoArchiveDate">{list.date}</div>
                <div className="videoArchiveSize">{list.size}</div>
                <div className="videoArchiveGroup">{list.groupName}</div>
              </div>
            ))}
          </div>
        </div>

        {/* 3.list View */}
        <div className="videoArchiveConWrap listView">
          <div className="videoArchiveContent">
            <div className="videoArchiveBox">
              <div className="videoArchiveInput">
                <input type="checkbox" name="checkInput" />
              </div>
              <div className="videoArchivePreview">미리보기</div>
              <div className="videoArchiveTitle">이름</div>
              <div className="videoArchiveDate">저장된 날짜</div>
              <div className="videoArchiveSize">크기</div>
              <div className="videoArchiveGroup">캠 그룹</div>
            </div>
            {dataLists.map((list, idx) => (
              <div className="videoArchiveBox" key={idx}>
                <div className="videoArchiveInput">
                  <input
                    type="checkbox"
                    name="checkInput"
                    className="archiveImgsList"
                    onChange={handleChecked}
                  />
                </div>
                <div className="videoArchivePreview">
                  <img />
                </div>
                <div className="videoArchiveTitle">{list.name}</div>
                <div className="videoArchiveDate">{list.date}</div>
                <div className="videoArchiveSize">{list.size}</div>
                <div className="videoArchiveGroup">{list.groupName}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="videoArchiveBottomBtnBox">
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

        {isOpenPopupState && <VideoPopup openVideoPopup={openVideoPopup} />}
        {downAlarmPopupState && <DownAlarmPopup openDownAlarmPopup={openDownAlarmPopup} />}
        {removeAlarmPopupState && <RemoveAlarmPopup openRemoveAlarmPopup={openRemoveAlarmPopup} />}
      </div>
    </div>
  );
};

export default VideoArchive;
