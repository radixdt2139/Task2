import * as Yup from "yup";
export const validationSchema = Yup.object().shape({
  title: Yup.string()
    .required("Fullname is required")
    .min(3, "title must be at least 3 characters"),
  category: Yup.number().required("Category is required"),
  price: Yup.number().required("Price is required"),
  stock_quantity: Yup.string().required("Stock quantity is mandatory."),
  status: Yup.string().required("Status is required."),
});
