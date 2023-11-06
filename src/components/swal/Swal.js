import Swal from "sweetalert2"

export const warning = (name) => {
    return {
        text: name,
        icon: 'warning',
        customClass: {
            icon: 'swal2-icon',
            popup: 'swal2-popup',
            confirmButton: 'btn btn-primary',
            cancelButton: 'btn btn-danger',
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
            popup: 'swal2-popup',
            confirmButton: 'btn btn-danger',
            cancelButton: 'btn btn-primary',
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
            popup: 'swal2-popup',
            confirmButton: 'btn btn-danger',
            cancelButton: 'btn btn-primary',
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
        customClass: {
            popup: 'colored-toast'
        },
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