import React, { useState } from "react";
import "../style/ErrorMsgModal.scss";
import { FiAlertTriangle, FiX } from "react-icons/fi";

const ErrorMsgModal = () => {
  // const [isModalOpen, setIsModalOpen] = useState(false);
  const modal = document.querySelector(".modalPageContainer")

  const closeModal = () => {
    const closeBtn = modal.querySelector(".modalEndButton")
    closeBtn.addEventListener("click", e => {
      modal.style.display = "none"
    })
  };

  // modal.addEventListener("click", e => {
  //   const evTarget = e.target
  //   if(evTarget.classList.contains("modal-overlay")) {
  //     modal.style.display = "none"
  //   }
  // })

  window.addEventListener("keyup", e => {
    if(modal.style.display === "flex" && e.key === "Escape") {
      modal.style.display = "none"
    }
  })

  return (
    <>
      <div className="modalPageContainer">
        <div className="errorModal">
          <div className="errorModalTopContainer">
            <div className="errorTitle">
              <FiAlertTriangle size="30px" />
              <div>Error :</div>
            </div>
            <div className="modalEndButton" onClick={closeModal}>
              <FiX size="20px" />
            </div>
          </div>

          <div className="modalContent">
            <p>서버 연결이 원활하지 않습니다.</p>
            <p>서버 연결 후 다시 시도해주세요.</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ErrorMsgModal;
