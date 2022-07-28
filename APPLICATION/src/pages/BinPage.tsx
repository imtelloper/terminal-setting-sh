import React, { useState } from 'react';
import '../style/pages/BinPage.scss';
import { CalendarToday, Delete, Image, ViewHeadline, ViewList } from '@material-ui/icons';
import { MdDownload, MdGridView } from 'react-icons/md';
import AlarmPopup from '../components/AlarmPopup';

const BinPage = () => {
  const [txtChangeState, setTxtChangeState] = useState('모두 다운로드');
  const [alarmPopupState, setAlarmPopupState] = useState(false);

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


  const openAlarmPopup = () => {
    setAlarmPopupState(!alarmPopupState);
  };
  return (
    <div className="binWrap">
      <div className="binContainer">
        <div className="binTitleBox">
          <div className="title">
            <span>휴지통</span>
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
                {/*<span onClick={handleToggleBtn}>*/}
                {/*  <MdGridView style={{ fontSize: '24px' }} />*/}
                {/*</span>*/}
                {/*<span onClick={handleToggleBtn}>*/}
                {/*  <ViewHeadline style={{ fontSize: '24px' }} />*/}
                {/*</span>*/}
                {/*<span onClick={handleToggleBtn}>*/}
                {/*  <ViewList style={{ fontSize: '24px' }} />*/}
                {/*</span>*/}
                <span>
                  <MdGridView style={{ fontSize: '24px' }} />
                </span>
                <span>
                  <ViewHeadline style={{ fontSize: '24px' }} />
                </span>
                <span>
                  <ViewList style={{ fontSize: '24px' }} />
                </span>
              </div>
            </div>
            <div className="right">
              <button className="iconBtnL normalPrimary">
                <span className="iconL">
                  <MdDownload style={{ fontSize: '24px' }} />
                </span>
                <span className="txt" onClick={openAlarmPopup}>{txtChangeState}</span>
              </button>
              <button className="iconBtnL normalPrimary">
                <span className="iconL">
                  <Delete style={{ fontSize: '24px' }} />
                </span>
                <span className="txt">
                  모두 버리기
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* 1. grid view */}
        <div className="binConWrap binGridView">
          <div className="binContent">
            <div className="binBox" >
              <input type="checkbox" onChange={handleChecked} />
              <div className="binImg" />
              <div className="binTitle">
                <span>H1공장크레인_CAM2_20220715_13:00</span>
                <span className="binIcon">
                  <Image style={{ fontSize: '28px' }} />
                </span>
              </div>
            </div>
            <div className="binBox" >
              <input type="checkbox" onChange={handleChecked} />
              <div className="binImg" />
              <div className="binTitle">
                <span>H1공장크레인_CAM2_20220715_13:00</span>
                <span className="binIcon">
                  <Image style={{ fontSize: '28px' }} />
                </span>
              </div>
            </div>
            <div className="binBox" >
              <input type="checkbox" onChange={handleChecked} />
              <div className="binImg" />
              <div className="binTitle">
                <span>H1공장크레인_CAM2_20220715_13:00</span>
                <span className="binIcon">
                  <Image style={{ fontSize: '28px' }} />
                </span>
              </div>
            </div>
            <div className="binBox" >
              <input type="checkbox" onChange={handleChecked} />
              <div className="binImg" />
              <div className="binTitle">
                <span>H1공장크레인_CAM2_20220715_13:00</span>
                <span className="binIcon">
                  <Image style={{ fontSize: '28px' }} />
                </span>
              </div>
            </div>
            <div className="binBox" >
              <input type="checkbox" onChange={handleChecked} />
              <div className="binImg" />
              <div className="binTitle">
                <span>H1공장크레인_CAM2_20220715_13:00</span>
                <span className="binIcon">
                  <Image style={{ fontSize: '28px' }} />
                </span>
              </div>
            </div>
            <div className="binBox" >
              <input type="checkbox" onChange={handleChecked} />
              <div className="binImg" />
              <div className="binTitle">
                <span>H1공장크레인_CAM2_20220715_13:00</span>
                <span className="binIcon">
                  <Image style={{ fontSize: '28px' }} />
                </span>
              </div>
            </div>
            <div className="binBox" >
              <input type="checkbox" onChange={handleChecked} />
              <div className="binImg" />
              <div className="binTitle">
                <span>H1공장크레인_CAM2_20220715_13:00</span>
                <span className="binIcon">
                  <Image style={{ fontSize: '28px' }} />
                </span>
              </div>
            </div>
            <div className="binBox" >
              <input type="checkbox" onChange={handleChecked} />
              <div className="binImg" />
              <div className="binTitle">
                <span>H1공장크레인_CAM2_20220715_13:00</span>
                <span className="binIcon">
                  <Image style={{ fontSize: '28px' }} />
                </span>
              </div>
            </div>
          </div>
          <div className="binContent">
            <div className="binBox" >
              <input type="checkbox" onChange={handleChecked} />
              <div className="binImg" />
              <div className="binTitle">
                <span>H1공장크레인_CAM2_20220715_13:00</span>
                <span className="binIcon">
                  <Image style={{ fontSize: '28px' }} />
                </span>
              </div>
            </div>
            <div className="binBox" >
              <input type="checkbox" onChange={handleChecked} />
              <div className="binImg" />
              <div className="binTitle">
                <span>H1공장크레인_CAM2_20220715_13:00</span>
                <span className="binIcon">
                  <Image style={{ fontSize: '28px' }} />
                </span>
              </div>
            </div>
            {/* 클래스명 + s_ => 스켈레톤박스 */}
            <div className="s_binBox binBox">
              <div className="s_binImg binImg" />
              <div className="s_binTitle binTitle">
                <span />
                <span />
              </div>
            </div>
            <div className="s_binBox binBox">
              <div className="s_binImg binImg" />
              <div className="s_binTitle binTitle">
                <span />
                <span />
              </div>
            </div>
            <div className="s_binBox binBox">
              <div className="s_binImg binImg" />
              <div className="s_binTitle binTitle">
                <span />
                <span />
              </div>
            </div>
            <div className="s_binBox binBox">
              <div className="s_binImg binImg" />
              <div className="s_binTitle binTitle">
                <span />
                <span />
              </div>
            </div>
            <div className="s_binBox binBox">
              <div className="s_binImg binImg" />
              <div className="s_binTitle binTitle">
                <span />
                <span />
              </div>
            </div>
            <div className="s_binBox binBox">
              <div className="s_binImg binImg" />
              <div className="s_binTitle binTitle">
                <span />
                <span />
              </div>
            </div>
          </div>
          <div className="binContent">
            <div className="s_binBox binBox">
              <div className="s_binImg binImg" />
              <div className="s_binTitle binTitle">
                <span />
                <span />
              </div>
            </div>
            <div className="s_binBox binBox">
              <div className="s_binImg binImg" />
              <div className="s_binTitle binTitle">
                <span />
                <span />
              </div>
            </div>
            <div className="s_binBox binBox">
              <div className="s_binImg binImg" />
              <div className="s_binTitle binTitle">
                <span />
                <span />
              </div>
            </div>
            <div className="s_binBox binBox">
              <div className="s_binImg binImg" />
              <div className="s_binTitle binTitle">
                <span />
                <span />
              </div>
            </div>
            <div className="s_binBox binBox">
              <div className="s_binImg binImg" />
              <div className="s_binTitle binTitle">
                <span />
                <span />
              </div>
            </div>
            <div className="s_binBox binBox">
              <div className="s_binImg binImg" />
              <div className="s_binTitle binTitle">
                <span />
                <span />
              </div>
            </div>
            <div className="s_binBox binBox">
              <div className="s_binImg binImg" />
              <div className="s_binTitle binTitle">
                <span />
                <span />
              </div>
            </div>
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
                <input type="checkbox" onChange={handleChecked} />
              </div>
              <div className="binTitle">이름</div>
              <div className="binDate">저장된 날짜</div>
              <div className="binSize">크기</div>
              <div className="binGroup">캠 그룹</div>
            </div>
            {/* 반복되는 binBox */}
            <div className="binBox">
              <div className="binInput">
                <input type="checkbox" onChange={handleChecked} />
              </div>
              <div className="binTitle">
                <Image style={{ color: '#979797' }} />
                <span>H1공장크레인_CAM2_20220715_13:00</span>
              </div>
              <div className="binDate">2020-07-25 오후 1:00</div>
              <div className="binSize">5,465KB</div>
              <div className="binGroup">H1공장크레인</div>
            </div>
            <div className="binBox">
              <div className="binInput">
                <input type="checkbox" onChange={handleChecked} />
              </div>
              <div className="binTitle">
                <Image style={{ color: '#979797' }} />
                <span>H1공장크레인_CAM2_20220715_13:00</span>
              </div>
              <div className="binDate">2020-07-25 오후 1:00</div>
              <div className="binSize">5,465KB</div>
              <div className="binGroup">H1공장크레인</div>
            </div>
            <div className="binBox">
              <div className="binInput">
                <input type="checkbox" onChange={handleChecked} />
              </div>
              <div className="binTitle">
                <Image style={{ color: '#979797' }} />
                <span>H1공장크레인_CAM2_20220715_13:00</span>
              </div>
              <div className="binDate">2020-07-25 오후 1:00</div>
              <div className="binSize">5,465KB</div>
              <div className="binGroup">H1공장크레인</div>
            </div>
            <div className="binBox">
              <div className="binInput">
                <input type="checkbox" onChange={handleChecked} />
              </div>
              <div className="binTitle">
                <Image style={{ color: '#979797' }} />
                <span>H1공장크레인_CAM2_20220715_13:00</span>
              </div>
              <div className="binDate">2020-07-25 오후 1:00</div>
              <div className="binSize">5,465KB</div>
              <div className="binGroup">H1공장크레인</div>
            </div>
            <div className="binBox">
              <div className="binInput">
                <input type="checkbox" onChange={handleChecked} />
              </div>
              <div className="binTitle">
                <Image style={{ color: '#979797' }} />
                <span>H1공장크레인_CAM2_20220715_13:00</span>
              </div>
              <div className="binDate">2020-07-25 오후 1:00</div>
              <div className="binSize">5,465KB</div>
              <div className="binGroup">H1공장크레인</div>
            </div>
          </div>
        </div>

        {/* 3.list View */}
        <div className="binConWrap listView">
          <div className="binContent">
            <div className="binBox">
              <div className="binInput">
                <input type="checkbox" />
              </div>
              <div className="binPreview">미리보기</div>
              <div className="binTitle">이름</div>
              <div className="binDate">저장된 날짜</div>
              <div className="binSize">크기</div>
              <div className="binGroup">캠 그룹</div>
            </div>
            <div className="binBox">
              <div className="binInput">
                <input type="checkbox" onChange={handleChecked} />
              </div>
              <div className="binPreview">
                <img />
              </div>
              <div className="binTitle">H1공장크레인_CAM2_20220715_13:00</div>
              <div className="binDate">2020-07-25 오후 1:00</div>
              <div className="binSize">5,465KB</div>
              <div className="binGroup">H1공장크레인</div>
            </div>
            <div className="binBox">
              <div className="binInput">
                <input type="checkbox" onChange={handleChecked} />
              </div>
              <div className="binPreview">
                <img />
              </div>
              <div className="binTitle">H1공장크레인_CAM2_20220715_13:00</div>
              <div className="binDate">2020-07-25 오후 1:00</div>
              <div className="binSize">5,465KB</div>
              <div className="binGroup">H1공장크레인</div>
            </div>
            <div className="binBox">
              <div className="binInput">
                <input type="checkbox" onChange={handleChecked} />
              </div>
              <div className="binPreview">
                <img />
              </div>
              <div className="binTitle">H1공장크레인_CAM2_20220715_13:00</div>
              <div className="binDate">2020-07-25 오후 1:00</div>
              <div className="binSize">5,465KB</div>
              <div className="binGroup">H1공장크레인</div>
            </div>
          </div>
        </div>

        <div className="bottomBtnBox">
          <div className="pageBtn" />
        </div>

        {alarmPopupState && (
          <AlarmPopup openAlarmPopup={openAlarmPopup} />
        )}
      </div>
    </div>
  );
};

export default BinPage;
