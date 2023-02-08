import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { offset } from "../Pages/Products";
import { bindActionCreators } from "redux";
import { actionCreators } from "../state";
export const Pagination = ({ pages, setProductsToView }) => {
  const dispatch = useDispatch();
  const { decrementActivePage, incrementActivePage,goToPage } = bindActionCreators(
    actionCreators,
    dispatch
  );
  const state = useSelector((state) => state.product);
  // const [activePage, setActivePage] = useState(1);
  const activePage = useSelector((state) => state.activePage);
  const handleNext = () => {
    dispatch(incrementActivePage());
  };
  const handlePrevious = () => {
    // setActivePage(parseInt(activePage) - 1);
    dispatch(decrementActivePage());
  };
  const setCurrentPage = (page) => {
  dispatch(goToPage(page))
  };
  useEffect(() => {
    setProductsToView(
      state.products.slice(
        (activePage - 1) * offset,
        (activePage - 1) * offset + offset
      )
    );
    console.log(
      state.products.slice(
        (activePage - 1) * offset,
        (activePage - 1) * offset + offset
      ),
      activePage,
      offset,'line 33 from  pagination'
    );
  }, [activePage]);
  return pages.length > 0 ? (
    <div className="">
      {" "}
      <ul className="pagination w-25 my-3 mx-auto">
        {" "}
        <li
          className={[
            "page-item",
            parseInt(activePage) === 1 ? " disabled" : "",
          ]}
        >
          {" "}
          {parseInt(activePage) === 1 ? (
            <button className="page-link">Previous</button>
          ) : (
            <button className="page-link" onClick={handlePrevious}>
              {" "}
              Previous
            </button>
          )}
        </li>{" "}
        {pages.map((item, index) => (
          <li
            className={[
              "page-item ",
              parseInt(activePage) === index + 1 ? " active" : "",
            ]}
            key={item}
          >
            {" "}
            <button
              className="page-link"
              onClick={() => setCurrentPage(index + 1)}
            >
              {" "}
              {item}
            </button>{" "}
          </li>
        ))}
        <li className="page-item">
          {" "}
          {pages.length === parseInt(activePage) ? (
            <button className="page-link disabled">Next</button>
          ) : (
            <button className="page-link" onClick={handleNext}>
              {" "}
              Next
            </button>
          )}
        </li>{" "}
      </ul>
    </div>
  ) : (
    <span>No data found...</span>
  );
};
export default Pagination;
