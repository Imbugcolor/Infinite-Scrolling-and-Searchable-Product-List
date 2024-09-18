import { Dispatch } from "redux";
import {
  FilterProduct,
  GET_PRODUCTS,
  ProductActionType,
  SET_LOADING,
  UPDATE_PRODUCTS,
} from "../interfaces/productState.interface";
import { TOAST, ToastActionType } from "../interfaces/toastState.interface";
import { productApis } from "../../apis/product.api";

export const getProducts =
  ({
    limit = 0,
    skip = 0,
    search = "",
    filter = { sortBy: '' },
  }: {
    limit?: number;
    skip?: number;
    search?: string;
    filter?: FilterProduct;
  }) =>
  async (dispatch: Dispatch<ToastActionType | ProductActionType>) => {
    try {
      dispatch({ type: SET_LOADING, payload: true })
      const res = await productApis.getList(limit, skip, search, filter);

      dispatch({
        type: GET_PRODUCTS,
        payload: {
          data: res.products,
          total: res.total,
          limit: res.limit,
          skip: res.skip,
          category: '',
          search,
          filter
        },
      });

      dispatch({ type: SET_LOADING, payload: false })

    } catch (err: any) {
      dispatch({type: TOAST, payload: { errors: err.message }})
      console.log(err);
    }
};

export const updateProductList = ({ limit, skip, search, filter }
  : { limit: number, skip: number, search?: string, filter?: FilterProduct }) => 
    async(dispatch: Dispatch<ToastActionType | ProductActionType>) => {
  try {
    const res = await productApis.getList(limit, skip, search, filter);

    dispatch({
      type: UPDATE_PRODUCTS,
      payload: {
        data: res.products,
        total: res.total,
        limit: res.limit,
        skip: res.skip,
      },
    });

  } catch (err: any) {
    dispatch({type: TOAST, payload: { errors: err.message }})
    console.log(err);
  }
};

export const getProductsByCategory =
  ({
    limit = 0,
    skip = 0,
    category
  }: {
    limit?: number;
    skip?: number;
    category: string
  }) =>
  async (dispatch: Dispatch<ToastActionType | ProductActionType>) => {
    try {
      const res = await productApis.getProductListByCategory({limit, skip, category});

      dispatch({
        type: GET_PRODUCTS,
        payload: {
          data: res.products,
          total: res.total,
          limit: res.limit,
          skip: res.skip,
          search: '',
          category,
          filter: { sortBy: '' }
        },
      });

    } catch (err: any) {
      dispatch({type: TOAST, payload: { errors: err.message }})
      console.log(err);
    }
};
