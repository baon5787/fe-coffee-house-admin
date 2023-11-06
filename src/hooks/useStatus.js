import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { getSelectStatuses } from '~/api/ApiSelect';
import { statusSelector } from '~/redux/selectors';
import { isEmptyArray } from '~/utils/CheckValue';
import useJwt from './useJwt';

const useStatus = () => {
    const status = useSelector(statusSelector);

    const { accessToken, dispatch, axiosJwt } = useJwt();

    const [allStatus, setAllStatus] = useState();

    useEffect(() => {
        const loadStatus = async () => {
            let statuses = status;
            if (isEmptyArray(statuses)) {
                const data = await getSelectStatuses(accessToken, dispatch, axiosJwt);
                if (data !== undefined) {
                    statuses = data;
                }
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

export default useStatus