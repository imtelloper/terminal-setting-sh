import React, { useCallback, useState } from 'react';
import '../style/pages/BinPage.scss';
import {
  CalendarToday,
  Delete,
  Image,
  ViewHeadline,
  ViewList,
} from '@material-ui/icons';
import { MdDownload, MdGridView } from 'react-icons/md';
import DownAlarmPopup from '../components/DownAlarmPopup';

const BinPage = () => {
  const [txtChangeState, setTxtChangeState] = useState('모두 다운로드');
  const [downAlarmPopupState, setDownAlarmPopupState] = useState(false);
  const [checkedListState, setCheckedListsState] = useState([]);

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

  const openDownAlarmPopup = () => {
    setDownAlarmPopupState(!downAlarmPopupState);
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
    <div className="binWrap">
      <div className="binContainer">
        <div className="binTitleBox">
          <div className="binTitle">
            <Delete style={{ fontSize: '28px' }} />
            <span>휴지통</span>
          </div>
          <div className="binTitleCon">
            <div className="binLeft">
              <div className="binLeftCon">
                <span>캠 그룹 선택</span>
                <select className="nameSelect">
                  <option>H1 공장 크레인</option>
                  <option>H2 공장 크레인</option>
                  <option>H3 공장 크레인</option>
                </select>
              </div>
              <div className="binLeftCon dateBox">
                <CalendarToday />
                <span>날짜 변경</span>
                <input type="text" placeholder="YYYY - MM - DD" />
              </div>
              <div className="binLeftCon">
                <select className="arraySelect">
                  <option>새로운 순</option>
                  <option>오래된 순</option>
                </select>
              </div>
              <div className="binLeftIcon">
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
            <div className="binRight">
              <button className="iconBtnL normalPrimary">
                <span className="iconL">
                  <MdDownload style={{ fontSize: '24px' }} />
                </span>
                <span className="txt" onClick={openDownAlarmPopup}>
                  {txtChangeState}
                </span>
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
        <div className="binConWrap imgGridView">
          <div className="binContent">
            {dataLists.map((list, idx) => (
              <div className="binBox" key={idx}>
                <input
                  type="checkbox"
                  name="checkInput"
                  onChange={handleChecked}
                />
                <div className="binImg" />
                <div className="binTitle">
                  <span>{list.name}</span>
                  <span className="binIcon">
                    <Image style={{ fontSize: '28px' }} />
                  </span>
                </div>
              </div>
            ))}
            <div className="s_binBox binBox">
              <div className="s_binImg binImg" />
              <div className="s_binTitle binTitle">
                <span />
                <span />
              </div>
            </div>
          </div>
        </div>

        {/* 2. view headline */}
        <div className="binConWrap viewHeadline">
          <div className="binContent">
            <div className="binBox">
              <div className="binInput">
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
              <div className="binTitle">이름</div>
              <div className="binDate">저장된 날짜</div>
              <div className="binSize">크기</div>
              <div className="binGroup">캠 그룹</div>
            </div>
            {/* 반복되는 imgBox */}
            {dataLists.map((list, idx) => (
              <div className="binBox" key={idx}>
                <div className="binInput">
                  <input
                    type="checkbox"
                    name="checkInput"
                    className="binImgsList"
                    onChange={(e) => {
                      handleChecked(e);
                      onCheckedElement(e.target.checked, list);
                    }}
                  />
                </div>
                <div className="binTitle">
                  <Image style={{ color: '#979797' }} />
                  <span>{list.name}</span>
                </div>
                <div className="binDate">{list.date}</div>
                <div className="binSize">{list.size}</div>
                <div className="binGroup">{list.groupName}</div>
              </div>
            ))}
          </div>
        </div>

        {/* 3.list View */}
        <div className="binConWrap listView">
          <div className="binContent">
            <div className="binBox">
              <div className="binInput">
                <input type="checkbox" name="checkInput" />
              </div>
              <div className="binPreview">미리보기</div>
              <div className="binTitle">이름</div>
              <div className="binDate">저장된 날짜</div>
              <div className="binSize">크기</div>
              <div className="binGroup">캠 그룹</div>
            </div>
            {dataLists.map((list, idx) => (
              <div className="binBox" key={idx}>
                <div className="binInput">
                  <input
                    type="checkbox"
                    name="checkInput"
                    className="binImgsList"
                    onChange={handleChecked}
                  />
                </div>
                <div className="binPreview">
                  <img />
                </div>
                <div className="binTitle">{list.name}</div>
                <div className="binDate">{list.date}</div>
                <div className="binSize">{list.size}</div>
                <div className="binGroup">{list.groupName}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="binBottomBtnBox">
          <div className="pageBtn" />
        </div>

        {downAlarmPopupState && (
          <DownAlarmPopup openDownAlarmPopup={openDownAlarmPopup} />
        )}
      </div>
    </div>
  );
};

export default BinPage;
