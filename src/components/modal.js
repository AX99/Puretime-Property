import React, { useState } from "react";
import addtoMailchimp from "gatsby-plugin-mailchimp";

import { useModal } from "../context/modalContext";
import Eyebrow from "./eyebrow";

const Modal = () => {
  const { isModalOpen, closeModal, modalData } = useModal();

  const [state, setState] = useState({
    email: "",
    firstName: "",
    lastName: "",
    phonenumber: "",
    address: "",
    postcode: modalData ? modalData.postcode : "",
    message: "",
    showForm: true,
  });

  const handleInputChange = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await addtoMailchimp(state.email, {
      FNAME: state.firstName,
      LNAME: state.lastName,
      PHONE: state.phonenumber,
      ADDRESS: state.address,
      POSTCODE: state.postcode,
      VALUATION: state.valuation,
    });

    const newMessage =
      response.result === "success"
        ? `${response.msg}\n Keep an eye on your inbox and spam folder. We'll get back to you shortly.`
        : `Error: ${response.msg}`;

    setState((prevState) => ({
      ...prevState,
      message: newMessage,
      showForm: response.result === "success" ? false : true,
    }));

    // Hide the message after 6 seconds if the response is not successful
    if (!response.result === "success") {
      setTimeout(() => {
        setState((prevState) => ({
          ...prevState,
          message: "",
        }));
      }, 6000);
    }
  };

  const handleCloseModal = (e) => {
    if (e.target.id === "contact_modal") closeModal();
    if (!state.showForm) {
      setState({ ...state, showForm: true });
      setState({ ...state, message: "" });
    }
  };

  return (
    <>
      {" "}
      {isModalOpen && (
        <div
          id="contact_modal"
          onClick={handleCloseModal}
          className="fixed z-[10000] inset-0 bg-black bg-opacity-30 backdrop-blur-sm items-center flex flex-col justify-center overflow-hidden mx-auto "
        >
          <div className="w-full max-h-[90%] overflow-scroll p-6 m-auto bg-white rounded-md shadow-xl shadow-primary-600/40 lg:max-w-xl">
            <div>
              <span
                onClick={closeModal}
                className="inline-block p-2 overflow-hidden text-center relative top-0 right-0 float-right text-display-md text-primary-600 cursor-pointer whitespace-nowrap align-middle m-0"
              >
                &times;
              </span>
            </div>
            <div className="container mx-auto bg-white px-9 pt-1 pb-4 shadow rounded-4">
              <div className="relative flex flex-col justify-center overflow-hidden">
                <div className="w-full pt-6 m-auto bg-white rounded-md shadow-xl shadow-rose-600/40 lg:max-w-xl">
                  <Eyebrow
                    className="underline opacity-100"
                    label="Complete the form to receive your offer."
                  />

                  {state.showForm && (
                    <form
                      id="contact_form"
                      onSubmit={handleSubmit}
                      name="contact"
                      method="POST"
                      className="mt-6"
                    >
                      <div className="mb-2">
                        <label
                          htmlFor="firstName"
                          className="block font-size-4 font-weight-semibold text-black-2 line-height-reset text-sm"
                        >
                          First Name:<span className="text-red-600"> *</span>
                        </label>
                        <input
                          type="text"
                          value={state.firstName}
                          onChange={handleInputChange}
                          className="block w-full px-4 py-2 mt-2 text-indigo-700 bg-white border rounded-md focus:border-indigo-400 focus:ring-indigo-300 focus:outline-none focus:ring focus:ring-opacity-40"
                          placeholder="First Name"
                          name="firstName"
                          required
                        />
                      </div>
                      <div className="mb-2">
                        <label
                          htmlFor="lastName"
                          className="block font-size-4 font-weight-semibold text-black-2 line-height-reset text-sm"
                        >
                          Last Name:<span className="text-red-600"> *</span>
                        </label>
                        <input
                          type="text"
                          value={state.lastName}
                          onChange={handleInputChange}
                          className="block w-full px-4 py-2 mt-2 text-indigo-700 bg-white border rounded-md focus:border-indigo-400 focus:ring-indigo-300 focus:outline-none focus:ring focus:ring-opacity-40"
                          placeholder="Last Name"
                          name="lastName"
                          required
                        />
                      </div>
                      <div className="mb-2">
                        <label
                          htmlFor="phonenumber"
                          className="block font-size-4 font-weight-semibold text-black-2 line-height-reset text-sm"
                        >
                          Phone Number:<span className="text-red-600"> *</span>
                        </label>
                        <input
                          type="phonenumber"
                          value={state.phonenumber}
                          onChange={handleInputChange}
                          className="block w-full px-4 py-2 mt-2 text-indigo-700 bg-white border rounded-md focus:border-indigo-400 focus:ring-indigo-300 focus:outline-none focus:ring focus:ring-opacity-40"
                          placeholder="Phone Number"
                          name="phonenumber"
                          required
                        />
                      </div>
                      <div className="mb-2">
                        <label
                          htmlFor="email"
                          className="block font-size-4 font-weight-semibold text-black-2 line-height-reset text-sm"
                        >
                          Email:<span className="text-red-600"> *</span>
                        </label>
                        <input
                          type="email"
                          value={state.email}
                          onChange={handleInputChange}
                          className="block w-full px-4 py-2 mt-2 text-indigo-700 bg-white border rounded-md focus:border-indigo-400 focus:ring-indigo-300 focus:outline-none focus:ring focus:ring-opacity-40"
                          name="email"
                          placeholder="Email"
                          required
                        />
                      </div>
                      <div className="mb-2">
                        <label
                          htmlFor="address"
                          className="block font-size-4 font-weight-semibold text-black-2 line-height-reset text-sm"
                        >
                          First Line of Address:
                          <span className="text-red-600"> *</span>
                        </label>
                        <input
                          type="text"
                          value={state.address}
                          onChange={handleInputChange}
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
                          className="block font-size-4 font-weight-semibold text-black-2 line-height-reset text-sm"
                        >
                          Postcode:<span className="text-red-600"> *</span>
                        </label>
                        <input
                          type="text"
                          onChange={handleInputChange}
                          className="block w-full px-4 py-2 mt-2 text-indigo-700 bg-white border rounded-md focus:border-indigo-400 focus:ring-indigo-300 focus:outline-none focus:ring focus:ring-opacity-40"
                          id="postcode"
                          name="postcode"
                          placeholder="Postcode"
                          defaultValue={
                            modalData ? modalData.postcode : state.postcode
                          }
                          required
                        />
                      </div>
                      <div className="mb-2">
                        <label
                          htmlFor="valuation"
                          className="block font-size-4 font-weight-semibold text-black-2 line-height-reset text-sm"
                        >
                          Estimated Property Valuation:
                        </label>
                        <input
                          type="text"
                          onChange={handleInputChange}
                          className="block w-full px-4 py-2 mt-2 text-indigo-700 bg-white border rounded-md focus:border-indigo-400 focus:ring-indigo-300 focus:outline-none focus:ring focus:ring-opacity-40"
                          id="valuation"
                          name="valuation"
                          placeholder="£..."
                          value={state.valuation}
                        />
                      </div>
                      <div aria-hidden="true" className="hidden" hidden>
                        <input
                          type="text"
                          name="b_d0281388fbca39d6d0711dcea_4cd2acada4"
                          tabIndex="-1"
                          defaultValue=""
                        />
                      </div>
                      <div className="m-2 text-primary-600">
                        <p>
                          {" "}
                          <span className="text-red-600"> * </span> - Required
                          Fields
                        </p>
                      </div>
                      <div className="mt-8 justify-center">
                        <input
                          type="submit"
                          className="cursor-pointer mx-auto rounded-full flex items-center justify-center bg-primary-600 text-white font-semibold px-5 py-3 text-body-xs uppercase w-100 form-control text-center"
                          value="Submit"
                        />
                      </div>
                    </form>
                  )}
                  <div id="form_response" className="mt-2 text-primary-600">
                    <p> {state.message} </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}{" "}
    </>
  );
};
export default Modal;
