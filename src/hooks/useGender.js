import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { getRadioGender } from '~/api/ApiRadio';
import { genderSelector } from '~/redux/selectors';
import PropTypes from 'prop-types'
import { isEmptyArray } from '~/utils/CheckValue';

const useGender = (accessToken, dispatch, axiosJwt) => {
    const gender = useSelector(genderSelector);

    const [allGender, setAllGender] = useState();

    useEffect(() => {
        const loadGender = async () => {
            let genders = gender;
            if (isEmptyArray(genders)) {
                const data = await getRadioGender(accessToken, dispatch, axiosJwt);
                genders = data;
            }
            setAllGender(genders)
        }
        loadGender()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return {
        allGender
    }
}

useGender.propTypes = {
    accessToken: PropTypes.string.isRequired,
    dispatch: PropTypes.func.isRequired,
    axiosJwt: PropTypes.func.isRequired,
}

export default useGender;
