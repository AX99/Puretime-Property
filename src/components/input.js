import React, { useState } from "react";

const Input = () => {
    // const [formData, setFormData] = useState({
    //     formPostcode: ''
    // });

    // const handleChange = (e) => {
    //     console.log(e.target.name, e.target.value);
    //     setFormData({
    //         ...formData,
    //         [e.target.name]: e.target.value
    //     });
    // };

    // console.log(formData);
    return (
        <div id="banner_input" className="bg-neutral-900 relatve">
            <div className="container mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-4 py-4 md:py-6">
                    <div className=
                        "col-span-1 items-center lg:col-start-2 lg:col-span-2">
                        <div className="rounded-full overflow-hidden relative">
                            <div id="div_input" className="w-full relative">
                                <input
                                    type="text"
                                    className="w-full bg-neutral-800 text-body-lg hidden md:inline-block font-light px-6 py-4"
                                    placeholder="Enter Your Postcode For A Free Valuation"
                                // onChange={handleChange}
                                />
                                <input
                                    type="text"
                                    className="w-full bg-neutral-800 inline-block md:hidden text-body-md font-light px-6 py-4"
                                    placeholder="Enter Your Postcode"
                                // onChange={handleChange}
                                />
                                <button
                                    className="absolute top-0 right-0
                                    grid-cols-4 bg-primary-600 text-body-md md:text-body-lg font-light px-6 py-4"
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
