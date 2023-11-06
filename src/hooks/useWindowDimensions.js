import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MAX_INNERWIDTH } from "~/constants/AppConstant";
import { isDimensionsSelector } from "~/redux/selectors";
import { updateIsDimensions } from "~/redux/slice/DimensionsSlice";

const useWindowDimensions = () => {
    const isDimensions = useSelector(isDimensionsSelector);

    const dispatch = useDispatch();

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= MAX_INNERWIDTH) {
                dispatch(updateIsDimensions(false));
            }
            if (window.innerWidth < MAX_INNERWIDTH) {
                dispatch(updateIsDimensions(true));
            }
        }

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [window.innerWidth]);

    return isDimensions;
}

export default useWindowDimensions