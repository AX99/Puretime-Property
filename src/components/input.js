import React from "react";
// import { useStaticQuery, graphql } from "gatsby";


const Input = () => {

    return (
        <div className="bg-neutral-900">
            <div className="container mx-auto">
                <div className="flex flex-row md:items-center items-start self-auto gap-5 py-6">
                    {/* <div className="flex flex-row items-center self-auto md:gap-5 gap-2">
                        <p className="font-display text-display-xs italic text-white opacity-50 vertical-rl -rotate-180">
                            Postcode
                        </p>
                        <hr className="md:w-16 w-6  text-white opacity-50"></hr>
                    </div> */}
                    <div className="lg:flex lg:flex-row justify-center grid md:grid-cols-2 grid-cols-1 grow xl:gap-16  md:gap-x-10 md:gap-y-8 gap-6">
                        <input
                            type="text"
                            className="w-full bg-neutral-800 border border-neutral-700 rounded-full text-body-lg font-light px-6 py-4"
                            placeholder="Enter Your Postcode For A Free Valuation"
                        />
                        <button
                            className="grid-cols-4 bg-primary-600 rounded-full text-body-lg font-light px-6 py-4"
                        >
                            Get Offer
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Input;
