import axios from 'axios';

const page = async () => {
    const { data: rooms } = await axios.get(`${process.env.API_URL}/room`);
    console.log(rooms)
    return (
        <div></div>
    )
}

export default page