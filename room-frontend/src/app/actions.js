import { confirmAlert } from "react-confirm-alert";

export const generateConfirm = (func) => {
    confirmAlert({
        title: 'Confirm to submit',
        message: 'Are you sure to do this.',
        buttons: [
            {
                label: 'Yes',
                onClick: func
            },
            {
                label: 'No',
                onClick: () => { }
            }
        ]
    });
}
