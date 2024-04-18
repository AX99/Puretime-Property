import React from "react";
// import { useStaticQuery, graphql } from "gatsby";


const Input = () => {

    return (
        <div className="bg-neutral-900">
            <div className="container mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-4 py-4 md:py-6"
                // "flex flex-row md:items-center items-start self-auto gap-5 py-6"
                >
                    <div className=
                        "col-span-1 items-center lg:col-start-2 lg:col-span-2"
                    // "lg:flex lg:flex-row justify-center grid rounded-full md:grid-cols-2 grid-cols-1 grow xl:gap-16  md:gap-x-10 md:gap-y-8 gap-6"
                    >
                        <div className="rounded-full overflow-hidden relative">
                            <div className="w-full">
                                <input
                                    type="text"
                                    className="w-full bg-neutral-800 text-body-lg hidden md:inline-block font-light px-6 py-4"
                                    placeholder="Enter Your Postcode For A Free Valuation"
                                />
                                <input
                                    type="text"
                                    className="w-full bg-neutral-800 inline-block md:hidden text-body-lg font-light px-6 py-4"
                                    placeholder="Enter Your Postcode"
                                />
                                <button
                                    className="absolute top-0 right-0
                                    grid-cols-4 bg-primary-600 text-body-lg font-light px-6 py-4"
                                >
                                    Get Offer
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Input;
