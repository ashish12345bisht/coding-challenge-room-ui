"use client";

import addBuilding from "@/app/actions";
import ErrorMessage from "@/components/ErrorMessage";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import z from 'zod'
// Component purpose  -
// A building should have the ability to add additional Rooms
// A building should have the ability to change the requested temperature
const AddBuilding = () => {
    const [temperature, setTemperature] = useState(20) //The default requested temperature should be 20.0 °C
    const [name, setName] = useState("")
    const [errors, setErrors] = useState([])
    const router = useRouter()
    const searchParams = useSearchParams()
    const buildingId = searchParams.get('buildingId')

    useEffect(() => {
        const prefill = async () => {
            const { data: room } = await axios.get(`https://coding-challenge-room-ui.onrender.com/building/${buildingId}`)
            setTemperature(room?.temperature)
            setName(room?.name)
        }
        if (buildingId) {
            prefill()
        }
    }, [])
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
            if (buildingId) {
                const response = await axios.put(`https://coding-challenge-room-ui.onrender.com/building/${buildingId}`, { name, temperature: Number(temperature), buildingId })
            } else {
                const response = await axios.post(`https://coding-challenge-room-ui.onrender.com/building`, { name, temperature: Number(temperature) })
            }
            router.push("/buildings")
            router.refresh()
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
            <h2 className="text-[28px] px-10 py-5 font-semibold text-center">{buildingId ? "Edit" : "Add"} building</h2>
            <form
                className="flex flex-col gap-10 p-10 max-w-[500px] m-auto bg-white rounded-lg w-1/2 md:w-full"
                method="post"
                onSubmit={onSubmit}
            >
                <div>
                    <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                        Name <span className="text-red-500">*</span>
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

export default AddBuilding