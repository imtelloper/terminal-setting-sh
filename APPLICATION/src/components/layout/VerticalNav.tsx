import React, { useEffect, useState } from 'react';
import MaterialIcon from 'react-google-material-icons';
import axios from 'axios';
import '../../styles/components/module/VerticalNav.scss';
import { Link, useNavigate } from 'react-router-dom';
import Api from '../../api/Api';
import { useSWRState } from '../../fetcher/useSWRState';

const VerticalNav = () => {
  const navigate = useNavigate();
  const [tabStatus, setTabStatus] = useState('');
  const { data: swrState, mutate: setSwrState } = useSWRState();
  const [userCurrentIp, setUserCurrentIp] = useState('');
  const api = new Api();
  const iconWidthHeight = 24;
  const [menuClicked, setMenuClicked] = useState(false);

  const onClickTab = (e) => {
    const tabType = e.currentTarget.getAttribute('datatype');
    setTabStatus(tabType);
    switch (tabType) {
      case 'Load':
        navigate('/load');
        break;
      case 'Image Load':
        navigate('/imageLoad');
        break;
      case 'Clinical Data Load':
        navigate('/clinicalDataLoad');
        break;
      case 'Ananlysis Option':
        navigate('/analysisOption');
        break;
      case 'Analysis':
        navigate('/analysis');
        break;
      case 'Report':
        navigate('/report');
        break;
    }
  };

  const logout = () => {
    navigate('/');
  };

  const tabStatusChangeByUrlParam = () => {
    const getUrlParam = window.location.href.split('/');
    const urlParam = getUrlParam[getUrlParam.length - 1];
    switch (urlParam) {
      case 'main':
        break;
      case 'load':
        setTabStatus('Load');
        break;
      case 'clinicalDataLoad':
        setTabStatus('Clinical Data Load');
        break;
      case 'imageLoad':
        setTabStatus('Image Load');
        break;
      case 'analysisOption':
        setTabStatus('Ananlysis Option');
        break;
      case 'analysis':
        setTabStatus('Analysis');
        break;
      case 'report':
        setTabStatus('Report');
        break;
    }
  };

  useEffect(() => {
    const getIpData = async () => {
      const res = await axios.get('https://geolocation-db.com/json/');
      setUserCurrentIp(res.data.IPv4);
    };
    getIpData();
    tabStatusChangeByUrlParam();
  }, []);

  const handleClickMenu = () => {
    setMenuClicked(!menuClicked);
  };

  const handleClickHref = (e) => {
    const target = e.currentTarget;
    const dataType = target.getAttribute('datatype');
    const pathObj = {
      dashboard: 'selfLearningDashboard',
      membershipPlan: 'membershipPlan',
      mypage: 'myPage',
    };
    navigate(`/${pathObj[dataType]}`);
  };

  const verticalLiFrame = (data: {
    datatype: string;
    iconType: string;
    navText: string;
    callback: (any) => void;
  }) => (
    <li
      className="verticalNavLi"
      datatype={data.datatype}
      onClick={data.callback}
    >
      <div className="verticalNavLiIcon">
        <div className="iconbox">
          <MaterialIcon icon={data.iconType} size={iconWidthHeight} />
        </div>
        {menuClicked && <div className="verticalNavLiText">{data.navText}</div>}
      </div>
    </li>
  );

  return (
    <>
      <nav className={`verticalNav ${menuClicked && 'verticalMenuClicked'}`}>
        <li
          className="logoBox verticalNavLi"
          datatype="logo"
          onClick={() => navigate('/')}
        >
          <div className="verticalNavLiIcon">아이콘</div>
        </li>
        <ul className="verticalNavTopUl">
          {verticalLiFrame({
            datatype: 'menu',
            iconType: 'menu',
            navText: '메뉴 접기',
            callback: handleClickMenu,
          })}
          {verticalLiFrame({
            datatype: 'dashboard',
            iconType: 'apps',
            navText: '셀프 러닝 AI Dashboard',
            callback: handleClickHref,
          })}
          {verticalLiFrame({
            datatype: 'membershipPlan',
            iconType: 'rocket_launch',
            navText: '멤버쉽 플랜',
            callback: handleClickHref,
          })}
        </ul>

        <ul className="verticalNavBottomUl">
          {verticalLiFrame({
            datatype: 'ask',
            iconType: 'help_outline',
            navText: '문의하기',
            callback: handleClickHref,
          })}
          {verticalLiFrame({
            datatype: 'logout',
            iconType: 'logout',
            navText: '로그아웃',
            callback: handleClickHref,
          })}
        </ul>
      </nav>
      <div className="emptyNav" />
    </>
  );
};

export default VerticalNav;
