import React, { useEffect, useRef, useState } from "react";
import { Formik, Form, Field, useFormik } from "formik";
import * as Yup from "yup";

import { useDispatch, useSelector } from "react-redux";
import { actionCreators, store } from "../state";
import { bindActionCreators } from "redux";
import { useId } from "react";
import { Pagination } from "../components/Pagination";
import { useNavigate } from "react-router-dom";
import { validationSchema } from "../ValidationSchema/AddEditValidationSchema";
// const validationSchema = Yup.object().shape({
//   title: Yup.string()
//     .required("Fullname is required")
//     .min(3, "title must be at least 3 characters"),
//   category: Yup.number().required("Category is required"),
//   Price: Yup.number().required("Price is required"),
//   stock_quantity: Yup.number().required("Stock quantity is mandatory."),
//   status: Yup.string().required("Status is required."),
// });
export const offset = 6;
export const Products = ({ products }) => {
  const initialState = {
    title: "",
    category: "",
    price: "",
    stock_quantity: "",
    status: 0,
  };
  const navigate = useNavigate();
  const { values, handleChange, errors, touched, handleSubmit, isValid } =
    useFormik({
      initialValues: initialState,
      validationSchema: validationSchema,
      onSubmit: (values) => {
        console.log(values, "values");
      },
    });
  const totalPages = [
    ...Array.from(
      { length: Math.ceil(products.length / offset) },
      (_, i) => i + 1
    ),
  ];
  const v = useId();
  const state = useSelector((state) => state.product);
  const activePage = useSelector((state) => state.activePage);

  const [sortKey, setSortKey] = useState("asc");
  const [productsToView, setProductsToView] = useState([]);

  const searchTextRef = useRef(null);

  const [addProductState, setAddProductState] = useState({
    title: "",
    category: "",
    price: "",
    stock_quantity: "",
    status: 0,
  });
  const [operation, setOperation] = useState(null);
  const dispatch = useDispatch();

  const { AddProduct, EditProduct, DeleteProduct } = bindActionCreators(
    actionCreators,
    dispatch
  );

  const filterProducts = (text) => {
    const data = products.filter((item) => {
      return item.title
        .toLowerCase()
        .replace(" ", "")
        .includes(text.toString().replace("", ""));
    });
    setProductsToView(data);
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
      offset,
      "line 62 from  Product"
    );
  }, [state]);

  return (
    <>
      <h1 className="text-center mt-3 mb-5">Products</h1>
      <div className="mx-5 mt-5">
        <div className="row mb-4">
          <div className="col-4">
            <select
              className="form-control"
              onChange={(e) => {
                setSortKey(e.target.value);
              }}
            >
              <option value={"asc"}>Ascending</option>
              <option value={"desc"}>Descending</option>
            </select>
          </div>
          <div className="col-4">
            <input
              ref={searchTextRef}
              onChange={() => {
                filterProducts(searchTextRef.current.value);
              }}
              className="form-control"
              type="text"
              placeholder="search product here"
            />
          </div>
          <div className="col-4">
            {" "}
            <div className="row">
              <div className="col-6">
                {" "}
                <button
                  onClick={() => {
                    setOperation("add");
                    setAddProductState(initialState);
                  }}
                  type="button"
                  class="btn btn-primary text-end"
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal"
                >
                  Add Product
                </button>
              </div>
              <div className="col-6">
                <button
                  className="btn btn-secondary text-end"
                  onClick={() => {
                    localStorage.removeItem("token");
                    navigate("/");
                  }}
                >
                  LogOut
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="row g-4">
          {" "}
          {productsToView.length > 0 ? (
            productsToView
              .sort((a, b) => {
                if (sortKey === "asc") {
                  if (a.title < b.title) {
                    return -1;
                  }
                  if (a.title > b.title) {
                    return 1;
                  }
                  return 0;
                } else {
                  if (a.title > b.title) {
                    return -1;
                  }
                  if (a.title < b.title) {
                    return 1;
                  }
                  return 0;
                }
              })
              .map((product, index) => {
                return (
                  <div
                    key={product._id + index}
                    className="col-4   "
                    // style={{ height: "24rem" }}
                  >
                    <div className="border">
                      <div className="card border border-0">
                        <div className="row">
                          <div className="col-6">
                            {" "}
                            <img
                              width={"300px"}
                              height={"300px"}
                              src={`${product.image[0]}`}
                              className="card-img-top"
                              alt="..."
                            />
                          </div>
                          <div className="col-6">
                            <div>
                              {" "}
                              <span>Title : </span>{" "}
                              <span className="card-text">{product.title}</span>
                            </div>
                            <div>
                              {" "}
                              <span>Category : </span>
                              <span>{product.category}</span>
                            </div>
                            <div>
                              {" "}
                              <span>Price : </span>
                              <span>
                                <del> {product.price} </del>{" "}
                                {Math.ceil(product.price * 0.9)}{" "}
                              </span>
                            </div>
                            <div>
                              {" "}
                              <span>Status : </span>
                              <span>
                                {product.status ? "varified" : "unvarified"}
                              </span>
                            </div>
                            <div>
                              {" "}
                              <span>Stock Quantity : </span>
                              <span>
                                {product.stock_quantity > 0
                                  ? product.stock_quantity
                                  : "N/A"}
                              </span>
                            </div>
                            <div className="row mt-3 mb-3">
                              <div className="col-6">
                                <button
                                  type="button"
                                  class="btn btn-primary"
                                  data-bs-toggle="modal"
                                  data-bs-target="#exampleModal"
                                  onClick={() => {
                                    setOperation("edit");
                                    setAddProductState(product);
                                  }}
                                >
                                  Edit
                                </button>
                              </div>
                              <div className="col-6">
                                <button
                                  type="button"
                                  className="btn btn-success"
                                  onClick={() => {
                                    dispatch(
                                      DeleteProduct({
                                        _id: product._id,
                                      })
                                    );
                                  }}
                                >
                                  Delete
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
          ) : (
            <h3>No Found Any Data</h3>
          )}
          <Pagination
            setProductsToView={setProductsToView}
            pages={totalPages}
          />
        </div>
      </div>
      <div
        class="modal fade"
        id="exampleModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">
                {operation === "add" ? "Add Product" : "Edit Product"}
              </h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              {/* <form>
                <div class="mb-3">
                  <label class="form-label">Title</label>
                  <input
                    required
                    type="text"
                    class="form-control"
                    value={addProductState.title}
                    onChange={(e) => {
                      setAddProductState({
                        ...addProductState,
                        title: e.target.value,
                      });
                    }}
                  />
                </div>
                <div class="mb-3">
                  <label class="form-label">Category</label>
                  <input
                    value={addProductState.category}
                    onChange={(e) => {
                      setAddProductState({
                        ...addProductState,
                        category: e.target.value,
                      });
                    }}
                    type="text"
                    class="form-control"
                  />
                </div>
                <div class="mb-3">
                  <label class="form-label">Price</label>
                  <input
                    onChange={(e) => {
                      setAddProductState({
                        ...addProductState,
                        price: e.target.value,
                      });
                    }}
                    type="number"
                    class="form-control"
                    value={addProductState.price}
                  />
                </div>
                <div class="mb-3">
                  <label class="form-label">Status</label>
                  <select
                    type="text"
                    class="form-control"
                    value={addProductState.status}
                    onChange={(e) => {
                      setAddProductState({
                        ...addProductState,
                        status: e.target.value,
                      });
                    }}
                  >
                    <option value={1}>Varified</option>
                    <option value={0}>Unvarified</option>
                  </select>
                </div>
                <div class="mb-3">
                  <label class="form-label">Stock Quantity</label>
                  <input
                    onChange={(e) => {
                      setAddProductState({
                        ...addProductState,
                        stock_quantity: e.target.value,
                      });
                    }}
                    type="number"
                    class="form-control"
                    value={addProductState.stock_quantity}
                  />
                </div>
              </form> */}
              <form>
                <div class="mb-3">
                  <label class="form-label">Title</label>
                  <input
                    required
                    name="title"
                    type="text"
                    class="form-control"
                    value={values.title}
                    onChange={handleChange}
                  />
                  {errors.title && touched.title ? (
                    <p className="text-danger mt-2">{errors.title}</p>
                  ) : null}
                </div>
                <div class="mb-3">
                  <label class="form-label">Category</label>
                  <input
                    name="category"
                    value={values.category}
                    onChange={handleChange}
                    type="text"
                    class="form-control"
                  />
                  {errors.category && touched.category ? (
                    <p className="text-danger mt-2">{errors.category}</p>
                  ) : null}
                </div>
                <div class="mb-3">
                  <label class="form-label">Price</label>
                  <input
                    name="price"
                    onChange={handleChange}
                    type="number"
                    class="form-control"
                    value={values.price}
                  />
                  {errors.price && touched.price ? (
                    <p className="text-danger mt-2">{errors.price}</p>
                  ) : null}
                </div>
                <div class="mb-3">
                  <label class="form-label">Status</label>
                  <select
                    name="status"
                    type="text"
                    class="form-control"
                    value={values.status}
                    onChange={handleChange}
                  >
                    <option value={1}>Varified</option>
                    <option value={0}>Unvarified</option>
                  </select>
                  {errors.status && touched.status ? (
                    <p className="text-danger mt-2">{errors.status}</p>
                  ) : null}
                </div>
                <div class="mb-3">
                  <label class="form-label">Stock Quantity</label>
                  <input
                    onChange={handleChange}
                    type="number"
                    name="stock_quantity"
                    class="form-control"
                    value={values.stock_quantity}
                  />
                  {errors.stock_quantity && touched.stock_quantity ? (
                    <p className="text-danger mt-2">{errors.stock_quantity}</p>
                  ) : null}
                </div>
              </form>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="submit"
                onClick={() => {
                  const value = handleSubmit();
                  if (Object.keys(errors).length !== 0) return;

                  if (operation === "add") {
                    AddProduct({
                      ...values,
                      image: [
                        "https://test-winty.s3.us-west-2.amazonaws.com/uploads/product/1674554603805_istdea4ujb.jpg",
                      ],
                      _id: v,
                    });
                    // setAddProductState({
                    //   title: "",
                    //   category: "",
                    //   price: "",
                    //   stock_quantity: "",
                    //   status: 0,
                    // });
                  } else {
                    EditProduct({
                      values,
                    });
                  }
                }}
                class="btn btn-primary"
              >
                {operation === "add" ? "Create" : "Edit"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
