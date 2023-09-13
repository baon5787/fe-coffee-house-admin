import { headers, headersAndCancelToken, headersPostAndPutImage } from "~/api/AxiosClient";
import { ERROR, PATH_API } from "~/constants/Paths";
import { updateCurrentPage } from "~/redux/slice/FiltersSlice";
import { getUsersFailed, getUsersStart, getUsersSuccess } from "~/redux/slice/UserSlice";
import { addIsCheckedToList } from "~/utils/HandleValue";
import { setErrorAddFormUser } from "../validation/UserValidation";
import { errorForm } from "~/helper/AppString";
import { swalMixin } from "~/components/swal/Swal";
import { setErrorUpdateFormUser } from "../validation/UserDetailsValidation";

export const getUsers = async (filters, accesToken, dispatch, axiosJwt, page, currentPage,
    cancelToken) => {

    dispatch(getUsersStart());

    try {
        const res = await axiosJwt.get(PATH_API.USERS + PATH_API.PARAMS + filters,
            headersAndCancelToken(accesToken, cancelToken));
        if (page !== currentPage) dispatch(updateCurrentPage(currentPage));
        dispatch(getUsersSuccess({
            users: addIsCheckedToList(res?.data?.users),
            totalPage: res?.data?.totalPage
        }));
    } catch (error) {
        dispatch(getUsersFailed());
    }
}

export const getSearchUsers = async (filters, accesToken, dispatch, axiosJwt, cancelToken) => {

    dispatch(getUsersStart());

    const url = PATH_API.USERS + PATH_API.SEARCH + PATH_API.PARAMS + filters

    try {
        const res = await axiosJwt.get(url, headersAndCancelToken(accesToken, cancelToken));
        dispatch(getUsersSuccess({
            users: addIsCheckedToList(res?.data?.users),
            totalPage: res?.data?.totalPage
        }));
    } catch (error) {
        dispatch(getUsersFailed());
    }
}

export const getUserByEmail = async (email, accesToken, dispatch, axiosJwt) => {
    // dispatch(getProductBySkuStart());

    try {
        const res = await axiosJwt.get(PATH_API.USERS + '/' + email, headers(accesToken))
        // dispatch(getProductBySkuSuccess());
        return res.data;
    } catch (error) {
        if (error.response?.status === 400) {
            console.log(error.response?.data);
        }
        // dispatch(getProductBySkuFailed());
    }
}

export const createUser = async (user, accesToken, dispatch, axiosJwt, setError) => {
    try {
        const res = await axiosJwt.post(PATH_API.USERS, user, headersPostAndPutImage(accesToken))
        return res?.data;
    } catch (error) {
        const res = error?.response;

        if (res?.status === 400) {
            setErrorAddFormUser(res?.data, setError);
            swalMixin().fire({
                icon: 'error',
                title: errorForm
            })
        }

        if (res?.status === 413) {
            swalMixin().fire({
                icon: 'error',
                title: res?.data?.error
            })
        }
        return ERROR;
    }
}

export const updateUser = async (email, user, accessToken, dispatch, axiosJwt, setUserDetails,
    setError) => {

    try {
        const res = await axiosJwt.put(PATH_API.USERS + "/" + email, user,
            headersPostAndPutImage(accessToken));
        setUserDetails(res?.data);
        return `Cập nhật thành công tài khoản nhân viên`;
    } catch (error) {

        const res = error?.response;

        if (error?.response?.status === 401) {
            swalMixin().fire({
                icon: 'error',
                title: res?.data?.error
            })
        }
        if (error?.response?.status === 400) {
            setErrorUpdateFormUser(res?.data, setError);
            swalMixin().fire({
                icon: 'error',
                title: errorForm
            })
        }
        return ERROR;
    }
}
