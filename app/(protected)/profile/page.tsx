"use client";
import React from "react";
import { auth } from "@/auth";
import Link from "next/link";
import { useSession } from "next-auth/react";

const Profilelink = () => {
  const { data: session, update } = useSession();
  const profile = session?.user.profile;

  if (!profile) {
    return (
      <div className="container mx-auto mt-8 px-4 text-center">
        <Link href="/create-profile">
          <a className="text-blue-600 hover:underline">
            No profile found. <span>Create one</span>
          </a>
        </Link>
      </div>
    );
  }

  const commonFields = (
    <>
      <div className="p-4 border-b">
        <h5 className="font-semibold text-gray-600">Full Name</h5>
        <p className="text-lg">{profile.fullname}</p>
      </div>
      <div className="p-4 border-b">
        <h5 className="font-semibold text-gray-600">Date of Birth</h5>
        <p className="text-lg">{profile.dob}</p>
      </div>
      <div className="p-4 border-b">
        <h5 className="font-semibold text-gray-600">Gender</h5>
        <p className="text-lg">{profile.gender}</p>
      </div>
      <div className="p-4 border-b">
        <h5 className="font-semibold text-gray-600">Phone</h5>
        <p className="text-lg">{profile.phone}</p>
      </div>
      <div className="p-4 border-b">
        <h5 className="font-semibold text-gray-600">Address</h5>
        <p className="text-lg">{profile.address}</p>
      </div>
    </>
  );

  const roleSpecificFields = {
    DOCTOR: (
      <>
        <div className="p-4 border-b">
          <h5 className="font-semibold text-gray-600">
            Medical License Number
          </h5>
          <p className="text-lg">{profile.medicalLicenseNumber}</p>
        </div>
        <div className="p-4 border-b">
          <h5 className="font-semibold text-gray-600">Specialization</h5>
          <p className="text-lg">{profile.specialization}</p>
        </div>
        <div className="p-4 border-b">
          <h5 className="font-semibold text-gray-600">Years of Experience</h5>
          <p className="text-lg">{profile.yearsOfExperience}</p>
        </div>
      </>
    ),
    NURSE: (
      <>
        <div className="p-4 border-b">
          <h5 className="font-semibold text-gray-600">
            Nursing License Number
          </h5>
          <p className="text-lg">{profile.nursingLicenseNumber}</p>
        </div>
        <div className="p-4 border-b">
          <h5 className="font-semibold text-gray-600">Department</h5>
          <p className="text-lg">{profile.department}</p>
        </div>
        <div className="p-4 border-b">
          <h5 className="font-semibold text-gray-600">Years of Experience</h5>
          <p className="text-lg">{profile.yearsOfExperience}</p>
        </div>
      </>
    ),
    STAFF: (
      <>
        <div className="p-4 border-b">
          <h5 className="font-semibold text-gray-600">Position</h5>
          <p className="text-lg">{profile.position}</p>
        </div>
        <div className="p-4 border-b">
          <h5 className="font-semibold text-gray-600">Department</h5>
          <p className="text-lg">{profile.department}</p>
        </div>
      </>
    ),
    PATIENT: (
      <>
        <div className="p-4 border-b">
          <h5 className="font-semibold text-gray-600">Next of Kin</h5>
          <p className="text-lg">{profile.nextofkin}</p>
        </div>
        <div className="p-4 border-b">
          <h5 className="font-semibold text-gray-600">
            Next of Kin Phone number
          </h5>
          <p className="text-lg">{profile.nextofphone}</p>
        </div>
      </>
    ),
  };

  const role = session?.user.role;

  return (
    <div className="container mx-auto mt-8 px-4">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="bg-gray-100 text-black p-6 border-b">
          <h2 className="text-3xl font-bold">User Profile</h2>
          <p className="text-lg">Detailed Information</p>
        </div>
        <div className="bg-white p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          {commonFields}
          {role && roleSpecificFields[role]}
        </div>
      </div>
    </div>
  );
};

export default Profilelink;
