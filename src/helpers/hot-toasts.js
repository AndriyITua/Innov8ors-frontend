import toast from "react-hot-toast";

export const notifySuccessToast = message => toast.success(message);

export const notifyOnlogginError = errorMessage => toast.error(errorMessage);
