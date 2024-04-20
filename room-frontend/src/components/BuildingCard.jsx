"use client"
import { generateConfirm } from '@/app/actions';
import axios from 'axios';
import { Pencil, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import 'react-confirm-alert/src/react-confirm-alert.css';


const BuildingCard = ({ building, baseURL }) => {
    const router = useRouter();

    const handleDelete = async () => {
        generateConfirm(async () => {
            let response = await axios.delete(`${baseURL}/building/${building.id}`);
            router.refresh()
        })
    }
    return (
        <div className="w-[160px] h-[200px] text-center shadow-md rounded-md m-2 hover:scale-105 duration-300 transition-all bg-slate-700 p-4 flex flex-col justify-around items-center ">
            <div>
                <h2 className="text-white font-extrabold"> {building?.name || "NA"}</h2>
                <span className="text-white font-medium">Temperature: {building?.temperature || "NA"}</span>
            </div>
            <Link href={`/buildings/${building.id}/rooms`}>
                <button className="text-white font-medium bg-black px-2 py-1 rounded-sm max-w-[100px]">Rooms &gt;</button>
            </Link>
            <div className='flex justify-around items-center w-2/3'>
                <Link href={`/buildings/add?buildingId=${building?.id}`}>
                    <Pencil className='text-white' />
                </Link>
                <Trash2 onClick={handleDelete} className='text-white cursor-pointer' />
            </div>
        </div>
    )
}

export default BuildingCard