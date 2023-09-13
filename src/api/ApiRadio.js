import { PATH_API } from "~/constants/Paths";
import { headers } from "./AxiosClient";
import { getRadioGenderFailed, getRadioGenderSuccess } from "~/redux/slice/GenderSlice";

export const getRadioGender = async (accesToken, dispatch, axiosJwt) => {
    try {
        const res = await axiosJwt.get(PATH_API.RADIO + PATH_API.GENDER, headers(accesToken));
        dispatch(getRadioGenderSuccess(res?.data));
        return res.data;
    } catch (error) {
        dispatch(getRadioGenderFailed());
    }
}
