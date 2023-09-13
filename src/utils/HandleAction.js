import { success, warning } from "~/components/swal/Swal";
import { warningTitle } from "./StringConcatention";
import Swal from "sweetalert2";
import { isValueFunction, isValueString } from "./CheckValue";

export const getAction = (api, pathVariable, option, title, dispatch, navigate, axiosJwt,
    accessToken) => {
    if (!isValueFunction(api) || !isValueString(pathVariable) || !isValueString(option)
        || !isValueString(title) || !isValueFunction(dispatch) || !isValueFunction(navigate)
        || !isValueFunction(axiosJwt) || !isValueString(accessToken)) {
        throw new Error('Error props');
    }

    Swal.fire(warning(warningTitle(option, title)))
        .then(async (result) => {
            if (result.isConfirmed) {
                const data = await api(pathVariable, accessToken,
                    dispatch, navigate, axiosJwt);
                if (data) {
                    Swal.fire(success(`${data}${title}.`));
                }
            }
        })
}