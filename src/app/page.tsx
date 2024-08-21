import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center p-6 bg-cover bg-center " style={{ backgroundImage: "url('/blink_factory.webp')" }}>
      {/* Large title at the top center */}
      <div className="bg-black bg-opacity-75 p-8 rounded-xl">

      <h1 className="text-2xl font-bold mb-4 text-white">Blink Boilerplate</h1>
      <div className="text-white mb-6">Click on a link to view the actual page.</div>
      <div className="bg-black bg-opacity-50 rounded-lg shadow-lg p-6">
        <div className="grid grid-cols-1 gap-6">
          <Link href="/blink" className="group relative block overflow-hidden rounded-lg shadow-lg">
            <Image
              src="/tipjar.png"
              alt="Blink Image"
              width={300}
              height={300}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              <h2 className="text-white text-2xl font-semibold">Blink Page</h2>
            </div>
          </Link>
          {/* Add more links to other pages as needed */}
        </div>
      </div>
      </div>
    </main>
  );
}
