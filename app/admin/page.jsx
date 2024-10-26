import React from "react";
import Layout from "@/components/layout";
import Image from "next/image";
import Link from "next/link";
import NavBar from "@/components/NavBar";

const Adminpage = () => {
  return (
    <Layout>
      <div className="grid grid-cols-3 pt-10 gap-4 p-4">
        {/* First Row: 2 Cards */}
        <Link href="/admin/doctor-register">
          <div className="bg-white shadow-md rounded-lg p-6 cursor-pointer hover:shadow-lg  flex flex-col items-center">
            <Image
              src="/vet/doctor.png"
              alt="Doctor Register"
              width={100}
              height={100}
              className="mb-4"
            />
            <p>Doctor Register</p>
          </div>
        </Link>
        <Link href="/admin/staff-register">
          <div className="bg-white shadow-md rounded-lg p-6 cursor-pointer hover:shadow-lg flex flex-col items-center">
            <Image
              src="/vet/staff-ad.png"
              alt="Staff Register"
              width={100}
              height={100}
              className="mb-4"
            />
            <p>Staff Register</p>
          </div>
        </Link>
        <Link href="/admin/treatmnet-history">
          <div className="bg-white shadow-md rounded-lg p-6 cursor-pointer hover:shadow-lg  flex flex-col items-center">
            <Image
              src="/vet/staff-ad.png"
              alt="Staff Register"
              width={100}
              height={100}
              className="mb-4"
            />
            <p>Treatment History</p>
          </div>
        </Link>

        {/* Second Row: 3 Cards */}
        <div className="col-span-1 grid grid-cols-1 gap-4">
          <Link href="/admin/financial-recodes">
            <div className="bg-white shadow-md rounded-lg p-6 cursor-pointer hover:shadow-lg   flex flex-col items-center">
              <Image
                src="/vet/money-bag_2953423.png"
                alt="Financial Records"
                width={100}
                height={100}
                className="mb-4"
              />
              <p>Financial Records</p>
            </div>
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default Adminpage;