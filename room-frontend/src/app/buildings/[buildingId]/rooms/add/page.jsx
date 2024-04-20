"use client";

import addBuilding from "@/app/actions";
import ErrorMessage from "@/components/ErrorMessage";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import z from 'zod'

// Component purpose -
// Be able to show each Room as a card with the properties, temperature values and heating/cooling status
// Have a method for the user to add, remove and edit rooms in a building

const randomTemp = Math.floor(Math.random() * 31) + 10 // Initially a room's temperature should be a random value between 10 °C and 40 °C.
const AddRoom = ({ params }) => {
    const [temperature, setTemperature] = useState(randomTemp)
    const [name, setName] = useState("")
    const [errors, setErrors] = useState([])
    const router = useRouter();
    const searchParams = useSearchParams()
    const roomId = searchParams.get('roomId')

    useEffect(() => {
        const prefill = async () => {
            const { data: room } = await axios.get(`http://localhost:8000/room/${roomId}`)
            setTemperature(room?.temperature)
            setName(room?.occupant_name)
        }
        if (roomId) {
            prefill()
        }
    }, [])

    const buildingId = params.buildingId;
    const onSubmit = async (e) => {
        e.preventDefault();

        try {
            const mySchema = z.object({
                name: z.string().min(3),
                temperature: z.coerce.number().min(10).max(40),
            });
            // validate form data
            const res = await mySchema.parse({
                name: name,
                temperature: temperature,
            });
            if (roomId) {
                const response = await axios.put(`http://localhost:8000/room/${roomId}`, { occupant_name: name, temperature: Number(temperature), buildingId })
            } else {
                const response = await axios.post(`http://localhost:8000/room`, { occupant_name: name, temperature: Number(temperature), buildingId })
            }
            router.push(`/buildings/${buildingId}/rooms`)
        } catch (error) {
            console.error("catch error", error);
            let errArr = [];
            const errors = error.errors
            for (let i = 0; i < errors?.length; i++) {
                errArr.push({ for: errors[i].path[0], message: errors[i].message });
            }
            setErrors(errArr);
        }
    };
    return (
        <div className="min-h-screen">
            <h2 className="text-[28px] px-10 py-5 font-semibold text-center">{roomId ? "Edit" : "Add"} Room</h2>
            <form
                className="flex flex-col gap-10 p-10 max-w-[500px] m-auto bg-white rounded-lg w-1/2 md:w-full"
                method="post"
                onSubmit={onSubmit}
            >
                <div>
                    <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                        Occupant Name <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        placeholder="Name"
                        className="w-full rounded-lg border-[1.5px] px-5 py-3 text-black outline-none transition focus:border-blue-500 active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                        onChange={(e) => setName(e.target.value)}
                        value={name}
                    />
                    <ErrorMessage errors={errors} name={"name"} />
                </div>
                <div>
                    <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                        Temperature <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="number"
                        placeholder="Temperature"
                        className="w-full rounded-lg border-[1.5px] px-5 py-3 text-black outline-none transition focus:border-blue-500 active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                        onChange={(e) => setTemperature(e.target.value)}
                        value={temperature}
                    />
                    <ErrorMessage errors={errors} name={"temperature"} />
                </div>
                <div className="text-center">
                    <button
                        type="submit"
                        className="h-10 w-32 rounded-md bg-blue-600 font-medium text-white"
                    >
                        Save
                    </button>
                </div>
            </form>
        </div>
    )
}

export default AddRoom