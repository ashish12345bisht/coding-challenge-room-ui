import axios from "axios";
import Link from "next/link";

export default async function Home() {
  const { data: buildings } = await axios.get(`${process.env.API_URL}/building`);
  return (
    <div className="min-h-screen">
      <header className="flex justify-end px-10 py-4 gap-4">
        <Link href="/buildings">
          <button className="text-white font-medium bg-black px-2 py-1 rounded-md">Buildings</button>
        </Link>
        <Link href={"/rooms"}>
          <button className="text-white font-medium bg-black px-2 py-1 rounded-md">Rooms</button>
        </Link>
      </header>
      <section>
        dashboard
      </section>
    </div>
  );
}