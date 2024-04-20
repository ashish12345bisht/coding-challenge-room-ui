import axios from "axios";

export default async function addBuilding(body) {
    console.log(body);
    const data = await axios.post(`/building`, body);
    console.log(data)
    return data;
}