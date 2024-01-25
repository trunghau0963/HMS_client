import React from "react";
import Link from "next/link";
import Image from "next/image";
const Drugs = () => {
  const drugs = [
    { name: "Drug 1", dosage: "10mg" },
    { name: "Drug 2", dosage: "20mg" },
    { name: "Drug 3", dosage: "30mg" },
    { name: "Drug 4", dosage: "40mg" },
    { name: "Drug 5", dosage: "50mg" },
    { name: "Drug 6", dosage: "60mg" },
    { name: "Drug 7", dosage: "70mg" },
    { name: "Drug 8", dosage: "80mg" },
    { name: "Drug 9", dosage: "90mg" },
    { name: "Drug 10", dosage: "100mg" },
  ];
  return (
    <section className="w-full py-12">
      <div className="container grid gap-6 md:gap-8 px-4 md:px-6 max-w-xl mx-auto lg:max-w-none">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-8">
          <div className="grid gap-1">
            <h1 className="text-2xl font-bold tracking-tight">
              Drug Catalogue
            </h1>
            <p className="text-gray-500 dark:text-gray-400">
              Explore our comprehensive list of drugs.
            </p>
          </div>
        </div>
        <div className="grid lg:grid-cols-3 gap-8">
          {drugs.map((drug, index) => (
            <div className="grid gap-6 relative group" key={index}>
                <Link className="absolute inset-0 z-10" href="#">
                    <span className="sr-only">View</span>
                </Link>
                <Image
                    alt="Drug Image"
                    className="rounded-lg object-cover w-full aspect-[3/4] group-hover:opacity-50 transition-opacity"
                    height="450"
                    src="/items/drug.svg"
                    width="450"
                />
                <div className="grid gap-1">
                    <h3 className="font-semibold">{drug.name}</h3>
                    <p className="text-sm leading-none">
                        Brief description of {drug.name}
                    </p>
                    <p className="text-sm leading-none">
                        Dosage: {drug.dosage}
                    </p>
                </div>
                <p className="font-semibold underline underline-offset-4">
                    Details
                </p>
            </div>
          ))}
          {/* <div className="grid gap-6 relative group">
            <Link className="absolute inset-0 z-10" href="#">
              <span className="sr-only">View</span>
            </Link>
            <Image
              alt="Drug Image"
              className="rounded-lg object-cover w-full aspect-[3/4] group-hover:opacity-50 transition-opacity"
              height="450"
              src="/items/drug.svg"
              width="450"
            />
            <div className="grid gap-1">
              <h3 className="font-semibold">Drug 2</h3>
              <p className="text-sm leading-none">
                Brief description of Drug 2.
              </p>
            </div>
            <p className="font-semibold underline underline-offset-4">
              Details
            </p>
          </div>
          <div className="grid gap-6 relative group">
            <Link className="absolute inset-0 z-10" href="#">
              <span className="sr-only">View</span>
            </Link>
            <Image
              alt="Drug Image"
              className="rounded-lg object-cover w-full aspect-[3/4] group-hover:opacity-50 transition-opacity"
              height="450"
              src="/items/drug.svg"
              width="450"
            />
            <div className="grid gap-1">
              <h3 className="font-semibold">Drug 3</h3>
              <p className="text-sm leading-none">
                Brief description of Drug 3.
              </p>
            </div>
            <p className="font-semibold underline underline-offset-4">
              Details
            </p>
          </div> */}
        </div>
      </div>
    </section>
  );
};

export default Drugs;
