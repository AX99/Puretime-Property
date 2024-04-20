import React from "react";

import { useModal } from "../context/modalContext";
import Eyebrow from "./eyebrow";

const Modal = () => {
    const { isModalOpen, closeModal, modalData } = useModal();

    const handleCloseModal = (e) => {
        if (e.target.id === "contact_modal") closeModal();
    };

    return (
        <>
            {isModalOpen &&
                (<div id="contact_modal" onClick={handleCloseModal} className="fixed z-[10000] inset-0 bg-black bg-opacity-30 backdrop-blur-sm items-center flex flex-col justify-center overflow-hidden mx-auto ">
                    <div className="w-full p-6 m-auto bg-white rounded-md shadow-xl shadow-primary-600/40 lg:max-w-xl">
                        <div>
                            <span onClick={closeModal} className="inline-block p-2 overflow-hidden text-center relative top-0 right-0 float-right text-body-lg text-primary-600 cursor-pointer whitespace-nowrap align-middle m-0">&times;</span>
                        </div>
                        <div
                            className="container mx-auto bg-white px-9 pt-1 pb-4 shadow rounded-4"
                        >
                            <div className="relative flex flex-col justify-center overflow-hidden">
                                <div className="w-full pt-6 m-auto bg-white rounded-md shadow-xl shadow-rose-600/40 lg:max-w-xl">
                                    <Eyebrow className="underline opacity-100" label="Complete the form to receive your offer." />
                                    <form
                                        id="contact_form"
                                        name="contact"
                                        method="POST"
                                        data-netlify="true"
                                        data-netlify-honeypot="bot-field" className="mt-6">
                                        <div className="hidden">
                                            <label>
                                                Don’t fill this out if you’re human: <input name="bot-field" />
                                            </label>

                                        </div>
                                        <div className="mb-2">
                                            <label
                                                htmlFor="firstName"
                                                className="block 
                                        font-size-4 font-weight-semibold text-black-2 line-height-reset
                                        text-sm "
                                            >
                                                First Name:
                                            </label>
                                            <input
                                                type="text"
                                                className="block w-full px-4 py-2 mt-2 text-indigo-700 bg-white border rounded-md focus:border-indigo-400 focus:ring-indigo-300 focus:outline-none focus:ring focus:ring-opacity-40"
                                                placeholder="First Name"
                                                id="firstName"
                                                name="firstName"
                                                required
                                            />
                                        </div>
                                        <div className="mb-2">
                                            <label
                                                htmlFor="lastName"
                                                className="block 
                                        font-size-4 font-weight-semibold text-black-2 line-height-reset
                                        text-sm "
                                            >
                                                Last Name:
                                            </label>
                                            <input
                                                type="text"
                                                className="block w-full px-4 py-2 mt-2 text-indigo-700 bg-white border rounded-md focus:border-indigo-400 focus:ring-indigo-300 focus:outline-none focus:ring focus:ring-opacity-40"
                                                placeholder="Last Name"
                                                id="lastName"
                                                name="lastName"
                                                required
                                            />
                                        </div>
                                        <div className="mb-2">
                                            <label
                                                htmlFor="phonenumber"
                                                className="block 
                                        font-size-4 font-weight-semibold text-black-2 line-height-reset
                                        text-sm "
                                            >
                                                Phone Number:
                                            </label>
                                            <input
                                                type="phonenumber"
                                                className="block w-full px-4 py-2 mt-2 text-indigo-700 bg-white border rounded-md focus:border-indigo-400 focus:ring-indigo-300 focus:outline-none focus:ring focus:ring-opacity-40"
                                                placeholder="Phone Number"
                                                id="phonenumber"
                                                name="phonenumber"
                                                required
                                            />
                                        </div>
                                        <div className="mb-2">
                                            <label
                                                htmlFor="email"
                                                className="block 
                                        font-size-4 font-weight-semibold text-black-2 line-height-reset
                                        text-sm "
                                            >
                                                Email:
                                            </label>
                                            <input
                                                type="email"
                                                className="block w-full px-4 py-2 mt-2 text-indigo-700 bg-white border rounded-md focus:border-indigo-400 focus:ring-indigo-300 focus:outline-none focus:ring focus:ring-opacity-40"
                                                id="email"
                                                name="email"
                                                placeholder="Email"
                                                required
                                            />
                                        </div>
                                        <div className="mb-2">
                                            <label
                                                htmlFor="address"
                                                className="block 
                                        font-size-4 font-weight-semibold text-black-2 line-height-reset
                                        text-sm "
                                            >
                                                First Line of Address:
                                            </label>
                                            <input
                                                type="text"
                                                className="block w-full px-4 py-2 mt-2 text-indigo-700 bg-white border rounded-md focus:border-indigo-400 focus:ring-indigo-300 focus:outline-none focus:ring focus:ring-opacity-40"
                                                id="address"
                                                name="address"
                                                placeholder="First Line of Address"
                                                required
                                            />
                                        </div>
                                        <div className="mb-2">
                                            <label
                                                htmlFor="postcode"
                                                className="block 
                                        font-size-4 font-weight-semibold text-black-2 line-height-reset
                                        text-sm "
                                            >
                                                Postcode:
                                            </label>
                                            <input
                                                type="text"
                                                className="block w-full px-4 py-2 mt-2 text-indigo-700 bg-white border rounded-md focus:border-indigo-400 focus:ring-indigo-300 focus:outline-none focus:ring focus:ring-opacity-40"
                                                id="postcode"
                                                name="postcode"
                                                placeholder="Postcode"
                                                defaultValue={modalData ? modalData.postcode : ""}
                                                required
                                            />
                                        </div>
                                        <div className="mt-8 justify-center">
                                            <input
                                                type="submit"
                                                className={`cursor-pointer mx-auto rounded-full flex items-center justify-center bg-primary-600 text-white font-semibold px-5 py-3 text-body-xs uppercase w-100 form-control text-center `}
                                                form="contact_form"
                                                name="submit"
                                                value="Submit"
                                                required
                                            />
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>)}
        </>
    );
};

export default Modal;