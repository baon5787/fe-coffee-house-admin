import { useSelector } from "react-redux";
import { errorCategorySelector, isSelectedCategorySelector, titleErrorCategorySelector } from "~/redux/selectors";

const useCategory = () => {
    const error = useSelector(errorCategorySelector);

    const msg = useSelector(titleErrorCategorySelector);

    const isSelected = useSelector(isSelectedCategorySelector);

    console.log(isSelected);

    return {
        error,
        msg,
        isSelected
    }
}

export default useCategory