import { useSelector } from "react-redux";
import {
    errorSizeSelector, isSelectedSizeSelector, titleErrorSizeSelector
} from "~/redux/selectors";
import { isError } from "~/utils/CheckValue";

const useSize = () => {

    const msg = useSelector(titleErrorSizeSelector);

    const isSelected = useSelector(isSelectedSizeSelector);

    const error = isError(useSelector(errorSizeSelector), msg);

    return {
        error,
        msg,
        isSelected
    }
}

export default useSize