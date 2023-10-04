import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { createAxios } from '~/api/AxiosClient';
import { currentPageSelector, filtersSelector, userSelector } from '~/redux/selectors';
import { loginSuccess } from '~/redux/slice/AuthSlice';
import { resetFiltersByPage } from '~/utils/HandleTable';

const useTable = () => {
    const dispatch = useDispatch();

    const navigate = useNavigate();

    const user = useSelector(userSelector);

    const filters = useSelector(filtersSelector);

    const page = useSelector(currentPageSelector);

    let axiosJwt = createAxios(user, dispatch, loginSuccess, navigate);

    const currentPage = useOutletContext();

    const newFilters = resetFiltersByPage(currentPage, page, filters);

    const accessToken = user?.accessToken;

    return {
        dispatch,
        navigate,
        accessToken,
        page,
        axiosJwt,
        newFilters,
        currentPage
    }
}

export default useTable;
