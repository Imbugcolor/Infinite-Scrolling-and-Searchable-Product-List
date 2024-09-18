import { Dispatch } from "redux";
import { TOAST, ToastActionType } from "../interfaces/toastState.interface";
import { CategoriesActionType, GET_CATEGORIES } from "../interfaces/categoriesSate.interface";
import { productApis } from "../../apis/product.api";

export const getCategories =
  () =>
  async (dispatch: Dispatch<ToastActionType | CategoriesActionType>) => {
    try {
      const res = await productApis.getCategories();

      dispatch({
        type: GET_CATEGORIES,
        payload: res
      });

    } catch (err: any) {
      dispatch({type: TOAST, payload: { errors: err.message }})
      console.log(err);
    }
  };