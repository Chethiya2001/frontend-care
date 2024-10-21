import Layout from "@/components/layout";
import NavBar from "@/components/NavBar";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  const options = { year: "numeric", month: "long", day: "numeric" }; // Formatting options
  const currentDate = new Date().toLocaleDateString(undefined, options); // Get current date in words
  const currentTime = new Date().toLocaleTimeString(); // Get current time
  return (
    <Layout>
      <p className="mt-5 mb-2 text-center text-5xl font-serif font-thin ">
        Welcome to WeCare
      </p>
      <div className="flex justify-between items-center mt-20 px-10">
        {" "}
        <p className="text-3xl font-medium">{currentDate}</p>{" "}
        <p className="text-6xl font-bold">{currentTime}</p>{" "}
      </div>
      <div>
        <p className="pt-20 px-10 text-left text-lg font-serif font-thin ">
          shoutcuts
        </p>
        <div className=" px-10 border-b min-w-400 mt-5 " />
      </div>
      <div className="container mx-auto">
        {/* Cards Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10 px-10">
          {/* Staff Login Card */}
          <Link href="/staff">
            <div className=" rounded-lg shadow-2xl p-4 hover:shadow-3xl transition-shadow duration-300 flex flex-col items-center h-full">
              <Image
                src="/staff.png"
                alt="Staff Login"
                width={150}
                height={150}
                className="object-cover"
              />
              <h3 className="text-xl font-bold text-center mt-4">
                Staff Login
              </h3>
            </div>
          </Link>

          {/* Consult Login Card */}
          <Link href="/consultant">
            <div className=" rounded-lg shadow-2xl p-4 hover:shadow-3xl transition-shadow duration-300 flex flex-col items-center h-full">
              <Image
                src="/conslt.png"
                alt="Consult Login"
                width={150}
                height={150}
                className="object-cover"
              />
              <h3 className="text-xl font-bold text-center mt-4">
                Consult Login
              </h3>
            </div>
          </Link>

          {/* Admin Login Card */}
          <Link href="/admin">
            <div className="rounded-lg shadow-2xl p-4 hover:shadow-3xl transition-shadow duration-300 flex flex-col items-center hover:shadow-3xl h-full">
              <Image
                src="/admin.png"
                alt="Admin Login"
                width={150}
                height={150}
                className="object-cover"
              />
              <h3 className="text-xl font-bold text-center mt-4">
                Admin Login
              </h3>
            </div>
          </Link>
        </div>
      </div>
    </Layout>
  );
}
