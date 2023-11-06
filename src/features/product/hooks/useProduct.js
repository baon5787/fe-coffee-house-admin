import { useSelector } from "react-redux";
import {
    errorProductSelector, isSelectedProductsSelector, titleErrorProductSelector
} from "~/redux/selectors";

const useProduct = () => {
    const isSelected = useSelector(isSelectedProductsSelector);

    const error = useSelector(errorProductSelector);

    const msg = useSelector(titleErrorProductSelector);

    return {
        error,
        msg,
        isSelected
    }
}

export default useProduct