import RoomCard from '@/components/RoomCard';
import axios from 'axios';
import Link from 'next/link';
import React from 'react'

const Rooms = async ({ params }) => {
    const { data: rooms } = await axios.get(`${process.env.API_URL}/room?buildingId=${params?.buildingId}`);

    return (
        <div className="min-h-screen">
            <div className="flex justify-end px-10 py-4">
                <Link href={`/buildings/${params?.buildingId}/rooms/add`}>
                    <button className="text-white font-medium bg-black px-2 py-1 rounded-md">Add Room</button>
                </Link>
            </div>
            <div className="grid grid-cols-4">
                {rooms?.map((room) => (
                    <RoomCard room={room} key={room.id} baseURL={process.env.API_URL} />
                ))}
            </div>
        </div>
    )
}

export default Rooms