import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { isDimensionsSelector } from "~/redux/selectors";
import { updateIsDimensions } from "~/redux/slice/DimensionsSlice";

const MAX_INNERWIDTH = 991;

const useWindowDimensions = () => {

    const isDimensions = useSelector(isDimensionsSelector);

    const dispatch = useDispatch();

    useEffect(() => {
        function handleResize() {
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

export default useWindowDimensions;
