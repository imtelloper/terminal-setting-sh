import React from 'react';
import './style/DesignSystem.scss';
import { IoArrowDownCircle } from 'react-icons/io5';

const DesignSystem = () => {
  return (
    <>
      {/* 버튼 사이즈별 btnXS btnS btnR btnL */}
      {/* 버튼 색상별 default, normal, success, warning, danger, special 에 Primary, ES, Outlined, Text 클래스명을 조합하여 사용 */}

      {/* 아이콘 버튼 사이즈별 iconBtnXS iconBtnS iconBtnL */}
      {/* 아이콘 버튼은 button 안 span 에 아이콘, 텍스트를 넣어 사용합니다 */}

      {/* XSmall */}
      <button className="iconBtnXXS">
        <span className="txt">BUTTON</span>
      </button>

      <button className="iconBtnS">
        <span className="iconS" />
        <span className="txt">BUTTON</span>
      </button>

      <button className="iconBtnL">
        <span className="iconL" />
        <span className="txt">BUTTON</span>
      </button>
      <br />
      <button className="btnXS specialES">BUTTON</button>
      <br />
      <button className="btnXS specialOutlined">BUTTON</button>
      <br />
      <button className="btnXS specialText">BUTTON</button>
      <br />

      {/* Small */}
      <button className="btnS specialPrimary">BUTTON</button>
      <br />
      <button className="btnS specialES">BUTTON</button>
      <br />
      <button className="btnS specialOutlined">BUTTON</button>
      <br />
      <button className="btnS specialGhost">BUTTON</button>
      <br />

      {/* Regular */}
      <button className="btnR specialPrimary">BUTTON</button>
      <br />
      <button className="btnR specialES">BUTTON</button>
      <br />
      <button className="btnR specialOutlined">BUTTON</button>
      <br />
      <button className="btnR specialGhost">BUTTON</button>
      <br />

      {/* Large */}
      <button className="btnL specialPrimary">BUTTON</button>
      <br />
      <button className="btnL specialES">BUTTON</button>
      <br />
      <button className="btnL specialOutlined">BUTTON</button>
      <br />
      <button className="btnL specialGhost">BUTTON</button>
      <br />
    </>
  );
};

export default DesignSystem;
