import products from "../../assets/products.json";
import Categories from "../../assets/categories.json";

const initialState = {
  products: products.data.map((item) => {
    return {
      title: item.title,
      image: item.image,
      category: item.category,
      price: item.price,
      _id: item._id.$oid,
      status: item.status,
      stock_quantity: item.stock_quantity,
    };
  }),
  categories: Categories.data,
  activePage: 1,
};
export const operations = {
  Add: "add",
  Edit: "edit",
  Delete: "delete",
};
export const productReducer = (state = initialState, action) => {

  switch (action.type) {
    case operations.Add:


      const addedState = state.products.push(action.payload);
      const temp = state.products;


      return { ...state, products: temp };
    case operations.Edit:
      const tempArr = state.products;
      const indexes = state.products.map((item) => item._id);

      const index = indexes.indexOf(action.payload.addProductState._id);
      if (index > -1) {
        tempArr.splice(index, 1);
        tempArr.splice(index, 0, action.payload.addProductState);
      }

      return { ...state, products: tempArr };
    //   return state - action.payload;
    case operations.Delete:
      const deletedState = state.products.filter(
        (item) => item._id !== action.payload._id
      );
      return { ...state, products: deletedState };

    default:
      return state;
  }
};
export const activePageReducer = (state = initialState.activePage, action) => {
  switch (action.type) {
    case "increment":

      return state+1
    case "decrement":
     return state-1
     case "goToPage":
     return action.payload

    default:
      return state
  }
};
