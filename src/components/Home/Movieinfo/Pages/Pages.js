import { React, useEffect, useState } from "react";

import Axios from "axios";
import ReactPaginate from "react-paginate";
import styles from "./Pages.module.css";
import { useParams } from "react-router-dom";

function Pages() {
  const [commentInfo, setCommentInfo] = useState([]);

  const { id } = useParams();

  const [pageNumber, setPageNumber] = useState(0);

  const usersPerPages = 5;
  const pagesVisited = pageNumber * usersPerPages;

  useEffect(() => {
    Axios.get("http://localhost:4000/commentpost/get", {
      params: { movieId: id },
    }).then((res) => {
      setCommentInfo([...res.data]);
    });
  }, [commentInfo, id]);

  const displayUsers = commentInfo
    .slice(pagesVisited, pagesVisited + usersPerPages)
    .map((commentInfo) => (
      <div className={styles.PagesBox_Post}>
        <h3 className={styles.PagesBox_Post_User}>{commentInfo.postUser}</h3>
        <h3 className={styles.PagesBox_Post_Text}>{commentInfo.postText}</h3>
        <h3 className={styles.PagesBox_Post_Text}>{commentInfo.createdAt}</h3>
      </div>
    ));

  const pageCount = Math.ceil(commentInfo.length / usersPerPages);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  return (
    <div className={styles.PagesBox}>
      {displayUsers}
      <ReactPaginate
        previousLabel={"이전"}
        nextLabel={"다음"}
        pageCount={pageCount}
        onPageChange={changePage}
        containerClassName={styles.paginationBtn}
        previousLinkClassName={styles.previousBtn}
        activeClassName={styles.paginationActive}
      />
    </div>
  );
}

export default Pages;
