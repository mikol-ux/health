import { Metadata } from "next";
import Image from "next/image";

// Define the metadata for the page
export const metadata: Metadata = {
  title: "About Us - Our Hospital",
  description:
    "Learn more about our hospital, our mission, and our dedicated team of professionals.",
};

export default function About() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Hero Section */}
      <section className="text-center mb-12">
        <div className="bg-blue-100 p-8 rounded-lg shadow-md">
          <h1 className="text-5xl font-bold text-blue-800 mb-4">About Us</h1>
          <p className="text-xl text-blue-600">
            Committed to providing the best healthcare services.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="mb-12">
        <h2 className="text-4xl font-semibold text-blue-800 mb-4">
          Our Mission
        </h2>
        <p className="text-lg text-blue-600">
          Our mission is to deliver high-quality healthcare services with
          compassion and respect. We strive to improve the health and well-being
          of our community through excellence in patient care, education, and
          research.
        </p>
      </section>

      {/* Values Section */}
      <section className="mb-12">
        <h2 className="text-4xl font-semibold text-blue-800 mb-4">
          Our Values
        </h2>
        <ul className="text-lg text-blue-600 list-disc list-inside">
          <li>Compassion</li>
          <li>Integrity</li>
          <li>Excellence</li>
          <li>Innovation</li>
          <li>Collaboration</li>
        </ul>
      </section>

      {/* Services Section */}
      <section className="mb-12">
        <h2 className="text-4xl font-semibold text-blue-800 mb-8">
          Our Services
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="text-center p-6 bg-blue-50 rounded-lg shadow-md">
            <Image
              src="/images/service1.jpg"
              alt="Service 1"
              width={200}
              height={200}
              className="mx-auto mb-4"
            />
            <h3 className="text-xl font-semibold text-blue-800">
              General Medicine
            </h3>
            <p className="text-blue-600">
              Comprehensive healthcare services for all ages.
            </p>
          </div>
          <div className="text-center p-6 bg-blue-50 rounded-lg shadow-md">
            <Image
              src="/images/service2.jpg"
              alt="Service 2"
              width={200}
              height={200}
              className="mx-auto mb-4"
            />
            <h3 className="text-xl font-semibold text-blue-800">Surgery</h3>
            <p className="text-blue-600">
              State-of-the-art surgical procedures and care.
            </p>
          </div>
          <div className="text-center p-6 bg-blue-50 rounded-lg shadow-md">
            <Image
              src="/images/service3.jpg"
              alt="Service 3"
              width={200}
              height={200}
              className="mx-auto mb-4"
            />
            <h3 className="text-xl font-semibold text-blue-800">Pediatrics</h3>
            <p className="text-blue-600">
              Specialized care for infants, children, and adolescents.
            </p>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="mb-12">
        <h2 className="text-4xl font-semibold text-blue-800 mb-8">
          Meet Our Team
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          <div className="text-center">
            <Image
              src="/images/doctor1.jpg"
              alt="Doctor 1"
              width={128}
              height={128}
              className="mx-auto rounded-full mb-4"
            />
            <h3 className="text-xl font-semibold text-blue-800">
              Dr. Jane Smith
            </h3>
            <p className="text-blue-600">Chief Medical Officer</p>
          </div>
          <div className="text-center">
            <Image
              src="/images/doctor2.jpg"
              alt="Doctor 2"
              width={128}
              height={128}
              className="mx-auto rounded-full mb-4"
            />
            <h3 className="text-xl font-semibold text-blue-800">
              Dr. John Doe
            </h3>
            <p className="text-blue-600">Head of Surgery</p>
          </div>
          {/* Add more team members as needed */}
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="mb-12">
        <h2 className="text-4xl font-semibold text-blue-800 mb-8">
          Testimonials
        </h2>
        <div className="bg-blue-50 p-8 rounded-lg shadow-md">
          <blockquote className="text-lg text-blue-600 italic mb-4">
            "The best hospital experience I've ever had. The staff is
            compassionate and the care is top-notch."
          </blockquote>
          <p className="text-right text-blue-800 font-semibold">- John Smith</p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="text-center">
        <h2 className="text-4xl font-semibold text-blue-800 mb-4">
          Contact Us
        </h2>
        <p className="text-lg text-blue-600">
          If you have any questions, please feel free to{" "}
          <a href="/contact" className="text-blue-500 hover:underline">
            contact us
          </a>
          .
        </p>
      </section>
    </div>
  );
}
