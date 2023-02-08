import { operations } from "../reducers/productReducer";




export const AddProduct = (payload) => {
  return (dispatch) => {
    dispatch({
      type: operations.Add,
      payload
    });
  };
};

export const EditProduct = (payload) => {
  return (dispatch) => {
    dispatch({
      type: operations.Edit,
      payload
    });
  };
};

export const DeleteProduct = (payload) => {
  return (dispatch) => {
    dispatch({
      type: operations.Delete,
      payload
    });
  };
};

export const incrementActivePage = (payload) => {
  return (dispatch) => {
    dispatch({
      type: 'increment',
      payload
    });
  };
};
export const decrementActivePage = (payload) => {
  return (dispatch) => {
    dispatch({
      type: 'decrement',
      payload
    });
  };
};
export const goToPage = (payload) => {
  return (dispatch) => {
    dispatch({
      type: 'goToPage',
      payload
    });
  };
};