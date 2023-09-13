import React, { useEffect, useState } from 'react'
import styles from '../style/User.module.css';
import PropTypes from 'prop-types'
import {
  getDate, getDay, getDays,
  getMonths, getOptionSelect, getValueMaxIndexByArray,
  getValueString, getYears
} from '~/utils/HandleValue';
import Selects from '~/components/select';
import { EMPTY_ARRAY, FEBRUARY, MAX_MONTH, MIN_DATE, MONTH } from '~/constants/AppConstant';
import { isEmptyArray } from '~/utils/CheckValue';
import FormCollapse from '~/components/form/FormCollapse';
import InputGroup from '~/components/form/InputGroup';
import Label from '~/components/form/Label';
import InputImage from '~/components/form/InputImage';
import Errors from '~/components/form/Errors';
import Input from '~/components/form/Input';


const FormUserDetails = ({ register, getValues, errors, setValue, setError, onBlur, allGender }) => {

  const [years, setYears] = useState([]);

  const [months, setMonths] = useState(MONTH);

  const [days, setDays] = useState([]);

  useEffect(() => {
    const loadData = () => {
      setYears(getYears());

      const day = getValues('day');
      const month = getValues('month');
      const year = getValues('year');

      if (day === MIN_DATE.DAY || month === MIN_DATE.MONTH || year === MIN_DATE.YEAR) return;

      if (year === getDate.getFullYear()) {
        setMonths(getMonths(getDate.getMonth() + 1));
      }

      setDays(getDays(getDay(month, year)))
    }
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleChangeYear = (option) => {
    setValue('year', option?.value, {
      shouldValidate: true,
      shouldTouch: true
    })

    const month = getValues('month');

    const day = getDay(month, option?.value);

    const date = new Date();

    const maxMonth = getValueMaxIndexByArray(months)?.value;
    if (maxMonth < MAX_MONTH && option?.value < date?.getFullYear()) {
      setMonths(getMonths(MAX_MONTH));
    }

    // getMonth : 0-11 -> month + 1;
    const monthCurrent = date?.getMonth() + 1;
    if (option?.value === date?.getFullYear() && month < MAX_MONTH) {
      setMonths(getMonths(monthCurrent));
    }

    if (isEmptyArray(days)) {
      setDays(getDays(day));
    }

    if (option?.value === date?.getFullYear() && month > monthCurrent) {
      setValue('month', MIN_DATE.MONTH);
      setValue('day', MIN_DATE.DAY);
      setDays(EMPTY_ARRAY);
      return;
    }

    const maxDay = getValueMaxIndexByArray(days)?.value;
    if (day > maxDay) {
      setDays(getDays(day));
    }

    if (month > FEBRUARY || month < FEBRUARY) return;

    if (getValues('day') > day) {
      setValue('day', MIN_DATE.DAY);
    }

    if (day === maxDay) return;

    setDays(getDays(day))
  }

  const handleChangeMonth = (option) => {
    const year = getValues('year');

    setValue('month', option?.value, {
      shouldValidate: true,
      shouldTouch: true
    })

    if (option?.value === MIN_DATE.MONTH || year === MIN_DATE.YEAR) return;

    const day = getDay(option?.value, year);
    if (isEmptyArray(days)) {
      setDays(getDays(day));
      return;
    }

    const maxDay = getValueMaxIndexByArray(days)?.value;
    if (day > maxDay || day < maxDay) {
      setDays(getDays(day));
    }

    if (getValues('day') > day) {
      setValue('day', MIN_DATE.DAY);
    }
  }

  const handleChangeDay = (option) => {
    setValue('day', option?.value, {
      shouldValidate: true,
      shouldTouch: true
    })
  }

  return (
    <>
      <FormCollapse title='Users Infomation'>
        <InputGroup className={'mb-7'} >
          <Label className={'fs-6 mb-2 d-block'} title={'Avatar'} />
          <div className='d-flex justify-content-center'>
            <InputImage
              name='image'
              className={`image-input-circle ${styles.avatar}`}
              setError={setError}
              setValue={setValue}
              errors={errors?.image}
              value={getValues('image')}
            />
          </div>
          <div className='form-text d-flex justify-content-center'>
            Allowed file types: png, jpg, jpeg.
          </div>
          {errors.image && <Errors title={errors.image.message} />}
        </InputGroup>
        <InputGroup className={'mb-7'} >
          <Label className={'fs-6 mb-2'} title={'Họ'} />
          <Input
            className={'form-control form-control-solid mb-3 mb-lg-0'}
            type={'text'}
            name={'firstName'}
            placeholder={'Vui lòng nhập vào họ'}
            onBlur={onBlur}
            values={getValueString(getValues('firstName'))}
          />
          {errors.firstName && <Errors title={errors.firstName.message} />}
        </InputGroup>
        <InputGroup className={'mb-7'} >
          <Label className={'fs-6 mb-2'} title={'Tên'} />
          <Input
            className={'form-control form-control-solid mb-3 mb-lg-0'}
            type={'text'}
            name={'lastName'}
            placeholder={'Vui lòng nhập vào tên'}
            onBlur={onBlur}
            values={getValueString(getValues('lastName'))}
          />
          {errors.lastName && <Errors title={errors.lastName.message} />}
        </InputGroup>
        <InputGroup className={'mb-7'} >
          <Label className={'fs-6 mb-2'} title={'Số điện thoại'} />
          <Input
            className={'form-control form-control-solid mb-3 mb-lg-0'}
            type={'number'}
            name={'phone'}
            placeholder={'Vui lòng nhập vào số điện thoại'}
            onBlur={onBlur}
            values={getValueString(getValues('phone'))}
          />
          {errors.phone && <Errors title={errors.phone.message} />}
        </InputGroup>
        <InputGroup className={'mb-7'} >
          <Label className={'fs-6 mb-2'} title={'Ngày sinh'} />
          <div className='d-flex fv-row row-cols-3'>
            <div className='pe-5'>
              <Selects
                options={years}
                onChange={(option) => handleChangeYear(option)}
                placeholder={'Chọn Năm'}
                value={getOptionSelect(years, getValues('year'))}
                noOptionsMessage={() => "Chọn Năm"}
              />
              {errors.year && <Errors title={errors.year.message} />}
            </div>
            <div className='pe-5'>
              <Selects
                options={months}
                onChange={(option) => handleChangeMonth(option)}
                placeholder={'Chọn Tháng'}
                value={getOptionSelect(months, getValues('month'))}
                noOptionsMessage={() => "Chọn Năm"}
              />
              {errors.month && <Errors title={errors.month.message} />}
            </div>
            <div className='pe-5'>
              <Selects
                options={days}
                onChange={(option) => handleChangeDay(option)}
                placeholder={'Chọn Ngày'}
                value={getOptionSelect(days, getValues('day'))}
                noOptionsMessage={() => "Chọn Ngày"}
              />
              {errors.day && <Errors title={errors.day.message} />}
            </div>
          </div>
        </InputGroup>
        <InputGroup className={'mb-7'} >
          <Label className={'fs-6 mb-2'} title={'Giới tính'} />
          <div className='d-flex fv-row row-cols-3'>
            {
              allGender?.map((gender, index) => (
                <div className='form-check form-check-custom form-check-solid' key={index}>
                  <input
                    type='radio'
                    className={'form-check-input'}
                    value={gender?.value}
                    {...register('gender')}
                  />
                  <label className='form-check-label'>
                    <div className='fw-bold text-gray-800'>{gender?.label}</div>
                  </label>
                </div>
              ))
            }
          </div>
          {errors.gender && <Errors title={errors.gender.message} />}
        </InputGroup>
      </FormCollapse>
    </>
  )
}

FormUserDetails.propTypes = {
  register: PropTypes.func.isRequired,
  errors: PropTypes.object,
  getValues: PropTypes.func.isRequired,
  setValue: PropTypes.func.isRequired,
  setError: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired,
  allGender: PropTypes.array
}

export default FormUserDetails
