import { redirect } from "next/navigation";

export default async function Home() {
  redirect("/buildings")
  return (
    <div className="min-h-screen">
    </div>
  );
}