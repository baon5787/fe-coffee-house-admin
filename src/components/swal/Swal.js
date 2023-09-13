import Swal from 'sweetalert2'
import './Swal.css'

export const warning = (name) => {
    return {
        text: name,
        icon: 'warning',
        customClass: {
            confirmButton: 'btn fw-bold btn-danger',
            cancelButton: 'btn fw-bold btn-active-light-primary',
        },
        buttonsStyling: false,
        heightAuto: false,
        showCancelButton: true,
        confirmButtonText: 'Yes, delete!',
        cancelButtonText: 'No, cancel',
    }
}


export const success = (name) => {
    return {
        text: name,
        icon: 'success',
        customClass: {
            confirmButton: 'btn fw-bold btn-danger',
            cancelButton: 'btn fw-bold btn-active-light-primary',
        },
        buttonsStyling: false,
        heightAuto: false,
        confirmButtonText: 'Ok!',
    }
}

export const error = (name) => {
    return {
        text: name,
        icon: 'error',
        customClass: {
            confirmButton: 'btn fw-bold btn-danger',
            cancelButton: 'btn fw-bold btn-active-light-primary',
        },
        buttonsStyling: false,
        heightAuto: false,
        confirmButtonText: 'Ok!',
    }
}

export const toastOption = () => {
    return {
        toast: true,
        position: 'top',
        showConfirmButton: false,
        timer: 3000,
    }
}

export const swalMixin = () => {
    const option = toastOption();

    return Swal.mixin(option);
}

export const swalMixinSuccess = (data) => {
    swalMixin().fire({
        icon: 'success',
        title: data
    });
}

export const swalMixinError = (data) => {
    swalMixin().fire({
        icon: 'error',
        title: data
    });
} 
