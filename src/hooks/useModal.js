import { useState } from "react";


const useModal = () => {

    const [showing, setShowing] = useState(false);

    const openModal = () => setShowing(true);

    const closeModal = () => setShowing(false);

    return {
        showing,
        openModal,
        closeModal
    }
}

export default useModal;
