import React, { useEffect, useMemo, useState } from 'react';
import '../style/pages/SensingView.scss';
import Api from '../api/Api';
import { camPort1Ip, camPort2Ip, camPort3Ip, camPort4Ip } from './ObservePage';

const SensingView = () => {
  const [urlState, setUrlState] = useState([]);
  const [videoSrcState, setVideoSrcState] = useState([]);
  const [captureSrcState, setCaptureSrcState] = useState('');

  useEffect(() => {
    Api.archive
      .findData({ fileType: 'video' })
      .then((videoRes) => {
        const urlData = [];
        videoRes.forEach((data, idx) => {
          Api.tracker.getOneData(data.trackerId).then((res) => {
            switch (res.camPort) {
              case 'cam1':
                urlData.push(
                  `http://${camPort1Ip}:81/${data.path
                    .split('/')
                    .slice(5)
                    .join('/')}`
                );
                break;
              case 'cam2':
                urlData.push(
                  `http://${camPort2Ip}:81/${data.path
                    .split('/')
                    .slice(5)
                    .join('/')}`
                );
                break;
              case 'cam3':
                urlData.push(
                  `http://${camPort3Ip}:81/${data.path
                    .split('/')
                    .slice(5)
                    .join('/')}`
                );
                break;
              case 'cam4':
                urlData.push(
                  `http://${camPort4Ip}:81/${data.path
                    .split('/')
                    .slice(5)
                    .join('/')}`
                );
                break;
              default:
                console.log('default');
            }
            videoRes.length === idx + 1 && setVideoSrcState(urlData);
          });
        });
      })
      .catch((error) => console.error(error));

    Api.archive
      .findData({ fileType: 'img' })
      .then((archiveRes) => {
        console.log('img archiveRes', archiveRes);
        const urlData = [];
        archiveRes.forEach((data, idx) => {
          Api.tracker.getOneData(data.trackerId).then((res) => {
            switch (res.camPort) {
              case 'cam1':
                urlData.push(
                  `http://${camPort1Ip}:81/${data.path
                    .split('/')
                    .slice(5)
                    .join('/')}`
                );
                break;
              case 'cam2':
                urlData.push(
                  `http://${camPort2Ip}:81/${data.path
                    .split('/')
                    .slice(5)
                    .join('/')}`
                );
                break;
              case 'cam3':
                urlData.push(
                  `http://${camPort3Ip}:81/${data.path
                    .split('/')
                    .slice(5)
                    .join('/')}`
                );
                break;
              case 'cam4':
                urlData.push(
                  `http://${camPort4Ip}:81/${data.path
                    .split('/')
                    .slice(5)
                    .join('/')}`
                );
                break;
              default:
                console.log('default');
            }
            console.log('2urlData', urlData);
            archiveRes.length === idx + 1 && setUrlState(urlData);
          });
        });
      })
      .catch((error) => console.error(error));
  }, []);

  const setCaptureImg = (e) => {
    const target = e.currentTarget;
    const dType = target.getAttribute('datatype');
    setCaptureSrcState(dType);
  };
  const urlStateMap = useMemo(() => {
    return urlState.map((src, idx) => (
      // <img src={src} alt="" width={100} height={80} key={idx}/>
      <div datatype={src} onClick={setCaptureImg}>
        {src}
      </div>
    ));
  }, [urlState]);

  return (
    <div className="sensingViewContainer">
      <div className="sensingLeft">
        <div className="leftBox">
          <div className="titleBox">
            <p>sensing</p>
            <span>sensing View</span>
          </div>
          <div className="clickTabWrap">
            <div className="clickTabBox">
              <div className="clickTab imgTab">
                <input
                  type="radio"
                  className="clickTab"
                  name="tabs"
                  id="tab1"
                />
                <label className="clickLabel" htmlFor="tab1">
                  이미지
                </label>
                <div className="contentBox imgContentBox">
                  <div className="urlStateMap imgContent">{urlStateMap}</div>
                </div>
              </div>

              <div className="clickTab videoTab">
                <input
                  type="radio"
                  className="clickTab"
                  name="tabs"
                  id="tab2"
                />
                <label className="clickLabel" htmlFor="tab2">
                  비디오
                </label>
                <div className="contentBox videoContentBox">
                  <div className="urlStateMap videoContent">
                    {videoSrcState.map((src) => (
                      <div>{src}</div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="sensingRight">
        <div className="rightBox">
          <img src={captureSrcState} alt="" width={512} height={384} />
        </div>
      </div>
    </div>
  );
};

export default SensingView;
