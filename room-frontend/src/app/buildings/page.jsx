import BuildingCard from "@/app/components/BuildingCard";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";

// Component purpose -
// Have a card or header that shows the properties of the Building
export default async function Buildings() {
    const { data: buildings } = await axios.get(`${process.env.API_URL}/building`);

    return (
        <div className="min-h-screen">
            <div className="flex justify-end flex-wrap items-center px-10 py-4">
                <div className="text-center w-full text-[30px] font-semibold">Buildings</div>
                <div className="absolute bottom-[2%] right-2">
                    <Link href="/buildings/add">
                        <button className="text-white font-medium bg-black px-2 py-1 rounded-md">Add Building</button>
                    </Link>
                </div>
            </div>
            <div className="grid grid-cols-4">
                {buildings?.map((building) => (
                    <BuildingCard building={building} key={building.id} baseURL={process.env.API_URL} />
                ))}
            </div>
        </div>
    );
}