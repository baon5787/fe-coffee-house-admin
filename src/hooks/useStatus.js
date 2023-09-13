import { isEmptyArray } from "formik";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getSelectStatuses } from "~/api/ApiSelect";
import { statusSelector } from "~/redux/selectors";

const useStatus = (accessToken, dispatch, axiosJwt) => {
    const status = useSelector(statusSelector);

    const [allStatus, setAllStatus] = useState();

    useEffect(() => {
        const loadStatus = async () => {
            let statuses = status;
            if (isEmptyArray(statuses)) {
                const data = await getSelectStatuses(accessToken, dispatch, axiosJwt);
                statuses = data;
            }
            setAllStatus(statuses)
        }
        loadStatus()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return {
        allStatus
    }
}

export default useStatus;
