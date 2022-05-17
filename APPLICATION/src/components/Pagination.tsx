import React, { useCallback, useEffect, useMemo, useState } from "react";
import "../style/Pagination.scss";

const Pagination = ({ currentPage, postsPerPage, totalPosts, paginate }) => {
  const [pageNumberState, setPageNumberState] = useState([]);
  const [startPageState, setStartPageState] = useState(0);
  const [limitPageState, setLimitPageState] = useState(5);

  const changePageNum = (currentPage) => {
    if (currentPage >= 4) {
      setStartPageState(currentPage - 3);
      setLimitPageState(currentPage + 2);
    } else if (currentPage >= pageNumberState[pageNumberState.length - 3]) {
      setStartPageState(pageNumberState[pageNumberState.length - 5]);
      setLimitPageState(pageNumberState[pageNumberState.length - 1]);
    } else if (currentPage <= 3) {
      setStartPageState(0);
      setLimitPageState(5);
    }
  };

  const setPageLiColor = (currentPage) => {
    const linearGradientSet = "linear-gradient(200.96deg, #9cccf1 20%, #dabef3 41.77%, #90aef0 120.35%)"
    const pageLiEle = (document.querySelector(`#pageLi${currentPage}`) as HTMLDivElement)
    if(pageLiEle){
      pageLiEle.style.background = linearGradientSet
      pageLiEle.style.color = "#ffffff"
      pageLiEle.style.borderRadius = "3px"
    }
  };

  useEffect(() => {
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
      pageNumbers.push(i);
    }
    setPageNumberState(pageNumbers);
  }, [postsPerPage, totalPosts]);

  useEffect(() => {
    currentPage === 1 && setPageLiColor(1);
  }, [pageNumberState, startPageState, limitPageState]);

  useEffect(() => {
    currentPage === pageNumberState[pageNumberState.length - 1] && setPageLiColor(pageNumberState[pageNumberState.length - 1]);
  }, [pageNumberState, startPageState, limitPageState]);

  useEffect(() => {
    changePageNum(currentPage);
    document.querySelectorAll(".pageLi").forEach(ele => {
      (ele as HTMLDivElement).style.background = "";
      (ele as HTMLDivElement).style.color = "#404a54";
      (ele as HTMLDivElement).style.borderRadius = "0";
    });
    setPageLiColor(currentPage);
  }, [currentPage]);

  return (
    <div className="paginationContainer">
      <button className="pageBtn" onClick={() => {
        paginate(pageNumberState[0]);
      }}>
        &lt;&lt;
      </button>
      <button className="pageBtn" onClick={() => {
        currentPage > 1
          ? paginate(currentPage - 1)
          : paginate(pageNumberState[0]);
      }}>
        &lt;
      </button>
      {
        pageNumberState.slice(startPageState, limitPageState).map((number) => (
          <div key={number} id={`pageLi${number}`} className="pageLi" onChange={changePageNum}>
            <div onClick={() => paginate(number)} className="pageLink" onChange={changePageNum}>
              {number}
            </div>
          </div>
        ))
      }
      <button className="pageBtn" onClick={() => {
        currentPage < pageNumberState[pageNumberState.length - 1]
          ? paginate(currentPage + 1)
          : paginate(pageNumberState[pageNumberState.length - 1]);
      }}>
        &gt;
      </button>
      <button className="pageBtn" onClick={() => {
        paginate(pageNumberState[pageNumberState.length - 1]);
      }}>
        &gt;&gt;
      </button>
    </div>
  );
};

export default Pagination;
