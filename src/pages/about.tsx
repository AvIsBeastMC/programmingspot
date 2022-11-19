import Head from "next/head";
import * as React from "react";
import Footer from "../components/Footer";

export default function AboutPage() {
  return (
    <>
      <Head>
        <title>About Us - ProgrammingSpot</title>
      </Head>
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-12 mx-auto">
          <div className="flex flex-col text-center w-full">
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <img src="/programmingspotlogo.png" width={50} alt="" data-aos="fade-in" data-aos-delay="300" />
            </div>
            <h1 className="text-4xl font-medium title-font my-4 text-gray-900 inter uppercase" data-aos="fade-in" data-aos-delay="600">
              {" "}
              ProgrammingSpot
            </h1>
            <p className="lg:w-2/3 mx-auto leading-relaxed text-base" data-aos="fade-in" data-aos-delay="900">
              In today’s scenario human beings are the most valuable resource.
              Today we can cook, drive, use a machine etc. because of our
              knowledge. <span className="border-b-2 border-gray-300 poppins">If we don’t educate ourselves then we won’t be able to
              do any of this stuff</span>. We often forget the importance of technology
              in our lives. The apps we use today like <span className="border-b-2 border-gray-300 poppins">Facebook, Instagram,
              WhatsApp etc. are made using technology</span>. But have you ever
              wondered that behind the scenes a person has used his/her
              knowledge to produce the app. <span className="border-b-2 border-gray-300 poppins">If we don't know about technology
              then we won’t be able to make such apps</span>. So, for this reason we
              made Programming Spot. <br /> <span className="border-b-2 border-gray-300 poppins">Coding isn’t a mandatory thing but it has a
              lot of importance if one learns it</span>. <br /> We know the future is all
              about technology. <span className="border-b-2 border-gray-300 poppins">If we want to have a better livelihood in the
              future, then learning to code will be advantageous</span>. In schools,
              the students willing to learn coding don’t get the opportunity due
              to study pressure from teachers and parents. Most parents don't
              know what coding is and they don’t let their child pursue a career
              in it. <span className="border-b-2 border-gray-300 poppins">We want to spread awareness about coding</span>. So, more people
              will be interested in it and they will become the future
              developers of the country. Learning to code will make our country
              technologically advanced. For this, we provide courses for various
              programming languages at a very reasonable price. We also make
              sure the courses are available in different languages so that
              different sets of people can understand the courses. <br /> <span className="border-b-2 border-gray-300 poppins">At last, we
              want to reach everyone who is really willing to learn to code but isn't
              getting the opportunity to do so. </span>
            </p>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
