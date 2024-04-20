import axios from "axios";
import { confirmAlert } from "react-confirm-alert";

export default async function addBuilding(body) {
    console.log(body);
    const data = await axios.post(`/building`, body);
    console.log(data)
    return data;
}


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
