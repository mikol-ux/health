import React from "react";
import { auth } from "@/auth";
import Link from "next/link";

const Profilelink = async () => {
  const user = await auth();
  const profile = user?.user.profile;

  if (!profile) {
    return (
      <Link href="create-profile">
        no profile <span>create one</span>
      </Link>
    );
  }

  const commonFields = (
    <>
      <div className="p-4">
        <h5 className="font-semibold">Full Name</h5>
        <p>{profile.fullname}</p>
      </div>
      <div className="p-4">
        <h5 className="font-semibold">Date of Birth</h5>
        <p>{profile.dob}</p>
      </div>
      <div className="p-4">
        <h5 className="font-semibold">Gender</h5>
        <p>{profile.gender}</p>
      </div>
      <div className="p-4">
        <h5 className="font-semibold">Phone</h5>
        <p>{profile.phone}</p>
      </div>
      <div className="p-4">
        <h5 className="font-semibold">Address</h5>
        <p>{profile.address}</p>
      </div>
    </>
  );

  const roleSpecificFields = {
    DOCTOR: (
      <>
        <div className="p-4">
          <h5 className="font-semibold">Medical License Number</h5>
          <p>{profile.medicalLicenseNumber}</p>
        </div>
        <div className="p-4">
          <h5 className="font-semibold">Specialization</h5>
          <p>{profile.specialization}</p>
        </div>
        <div className="p-4">
          <h5 className="font-semibold">Years of Experience</h5>
          <p>{profile.yearsOfExperience}</p>
        </div>
      </>
    ),
    NURSE: (
      <>
        <div className="p-4">
          <h5 className="font-semibold">Nursing License Number</h5>
          <p>{profile.nursingLicenseNumber}</p>
        </div>
        <div className="p-4">
          <h5 className="font-semibold">Department</h5>
          <p>{profile.department}</p>
        </div>
        <div className="p-4">
          <h5 className="font-semibold">Years of Experience</h5>
          <p>{profile.yearsOfExperience}</p>
        </div>
      </>
    ),
    STAFF: (
      <>
        <div className="p-4">
          <h5 className="font-semibold">Position</h5>
          <p>{profile.position}</p>
        </div>
        <div className="p-4">
          <h5 className="font-semibold">Department</h5>
          <p>{profile.department}</p>
        </div>
      </>
    ),
    PATIENT: (
      <>
        <div className="p-4">
          <h5 className="font-semibold">Next of Kin</h5>
          <p>{profile.nextofkin}</p>
        </div>
        <div className="p-4">
          <h5 className="font-semibold">Next of Kin Phone number</h5>
          <p>{profile.nextofphone}</p>
        </div>
      </>
    ),
  };

  const role = user?.user.role;

  return (
    <div className="container mx-auto mt-8 px-4">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="bg-blue-500 text-white p-6">
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
