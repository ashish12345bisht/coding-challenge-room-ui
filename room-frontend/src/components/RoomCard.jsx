"use client"
import axios from 'axios';
import { CircleMinus, CirclePlus, Pencil, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const RoomCard = ({ room, baseURL }) => {
    const router = useRouter();

    const handleDelete = async () => {
        let response = await axios.delete(`${baseURL}/room/${room.id}`);
        router.refresh()
    }

    const updateTemp = async (temperature) => {
        let response = await axios.put(`${baseURL}/room/${room.id}`, { occupant_name: room?.occupant_name, temperature, buildingId: room?.buildingId });
        router.refresh()
    }

    return (
        <div className="w-[200px] h-[250px] text-center shadow-md rounded-md m-2 hover:scale-105 duration-300 transition-all bg-slate-700 p-4 flex flex-col justify-around items-center ">
            <div>
                <h2 className="text-white font-extrabold"> {room?.occupant_name || "NA"}</h2>
            </div>
            <h2 className="text-white font-extrabold">Temperature:</h2>
            <div className='flex justify-around items-center w-full'>
                <CircleMinus onClick={() => updateTemp(parseInt(room?.temperature) - 1)} className='text-white cursor-pointer' />
                <span className="text-white font-medium">{room?.temperature || "NA"} &deg; C</span>
                <CirclePlus onClick={() => updateTemp(parseInt(room?.temperature) + 1)} className='text-white cursor-pointer' />
            </div>
            {/* Be able to show the updated cooling/heating statuses of the rooms based on the new temperature */}
            <div className='flex flex-col items-center text-white'>
                <span>Cooling : {room?.cooling_status ? "On" : "Off"}</span>
                <span>Heating : {room?.heating_status ? "On" : "Off"}</span>
            </div>
            <div className='flex justify-around items-center w-2/3'>
                <Link href={`/buildings/${room?.buildingId}/rooms/add?roomId=${room?.id}`}>
                    <Pencil className='text-white' />
                </Link>
                <Trash2 onClick={handleDelete} className='text-white cursor-pointer' />
            </div>
        </div>
    )
}

export default RoomCard