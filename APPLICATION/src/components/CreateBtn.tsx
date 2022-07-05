import React from 'react';
import '../style/components/CreateBtn.scss';
import {flushSync} from 'react-dom';
import { AiOutlinePlusCircle } from 'react-icons/ai';

type Props = {
  videoFrameState: Array<any>;
  setVideoFrameState: React.Dispatch<any>;
};

const CreateBtn = ({videoFrameState, setVideoFrameState}) => {

  const createCanvas = (e) => {
    const target = e.currentTarget;
    const dType = parseInt(target.getAttribute('datatype'), 10);
    const newArr = videoFrameState;
    newArr[dType].yellowCanvasVisible = true;
    flushSync(() => setVideoFrameState([]));
    flushSync(() => setVideoFrameState(newArr));
  };

  return (
    <div className="safetyCreateBtnContainer">
      <button className="safetyCreateBtn" datatype={idx.toString()} onClick={createCanvas}>
        <span><AiOutlinePlusCircle/></span>
        <span>ADD</span>
      </button>
    </div>
  );
};

export default CreateBtn;
