import React from 'react'
import PropTypes from 'prop-types'
import Selects from '~/components/select';
import { getOptionSelect, getValueString } from '~/utils/HandleValue';
import { getSelectDistrict, getSelectWard } from '~/api/ApiSelect';
import FormCollapse from '~/components/form/FormCollapse';
import InputGroup from '~/components/form/InputGroup';
import Label from '~/components/form/Label';
import Errors from '~/components/form/Errors';
import Textarea from '~/components/form/Textarea';

const FormAddress = (props) => {

    const {
        allProvince, allDistrict, allWard,
        setAllDistrict, setAllWard, setValue,
        getValues, accessToken, axiosJwt,
        errors, onBlur
    } = props;

    const handleChangePhovine = (option) => {
        setValue('phovine', option?.value, {
            shouldValidate: true,
            shouldTouch: true
        })
        getSelectDistrict(option?.value, accessToken, axiosJwt)
            .then((data) => setAllDistrict(data));
        setAllWard([]);
        setValue('district', '');
        setValue('ward', '');
    }

    const handleChangeDistrict = (option) => {
        setValue('district', option?.value, {
            shouldValidate: true,
            shouldTouch: true
        })
        getSelectWard(getValues('phovine'), option?.value, accessToken, axiosJwt)
            .then((data) => setAllWard(data));
        setValue('ward', '');
    }

    const handleChangeWard = (option) => {
        setValue('ward', option?.value, {
            shouldValidate: true,
            shouldTouch: true
        })
    }

    return (
        <FormCollapse title='Address Details'>
            <InputGroup className={'mb-7'} >
                <Label className={'fs-6 mb-2'} title={'Tỉnh/Thành phố'} />
                <Selects
                    options={allProvince}
                    onChange={(option) => handleChangePhovine(option)}
                    placeholder={'Chọn Tỉnh/Thành phố'}
                    value={getOptionSelect(allProvince, getValues('phovine'))}
                    noOptionsMessage={() => "Chọn Tỉnh/Thành phố"}
                />
                {errors.phovine && <Errors title={errors.phovine.message} />}
            </InputGroup>
            <InputGroup className={'mb-7'} >
                <Label className={'fs-6 mb-2'} title={'Quận/Huyện'} />
                <Selects
                    options={allDistrict}
                    onChange={(option) => handleChangeDistrict(option)}
                    placeholder={'Chọn Quận/Huyện'}
                    value={getOptionSelect(allDistrict, getValues('district'))}
                    noOptionsMessage={() => "Chọn Quận/Huyện"}
                />
                {errors.district && <Errors title={errors.district.message} />}
            </InputGroup>
            <InputGroup className={'mb-7'} >
                <Label className={'fs-6 mb-2'} title={'Phường/Xã'} />
                <Selects
                    options={allWard}
                    onChange={(option) => handleChangeWard(option)}
                    placeholder={'Chọn Phường/Xã'}
                    value={getOptionSelect(allWard, getValues('ward'))}
                    noOptionsMessage={() => "Chọn Phường/Xã"}
                />
                {errors.ward && <Errors title={errors.ward.message} />}
            </InputGroup>
            <InputGroup className={'mb-7'} >
                <Label className={'fs-6 mb-2'} title={'Địa chỉ'} />
                <Textarea
                    className={'form-control-solid min-h-150px'}
                    placeholder={'Vui lòng nhập nội dung sản phẩm'}
                    name={'address'}
                    onBlur={onBlur}
                    values={getValueString(getValues('address'))}
                />
                {errors.address && <Errors title={errors.address.message} />}
            </InputGroup>
        </FormCollapse>
    )
}

FormAddress.propTypes = {
    allProvince: PropTypes.array.isRequired,
    allDistrict: PropTypes.array.isRequired,
    allWard: PropTypes.array.isRequired,
    setAllDistrict: PropTypes.func.isRequired,
    setAllWard: PropTypes.func.isRequired,
    setValue: PropTypes.func.isRequired,
    getValues: PropTypes.func.isRequired,
    accessToken: PropTypes.string.isRequired,
    axiosJwt: PropTypes.func.isRequired,
    onBlur: PropTypes.func.isRequired,
    errors: PropTypes.object
}

export default FormAddress;
