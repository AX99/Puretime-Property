import React from "react";

// Hidden form identical to modal form, so netlify can register the form before it is rendered 

const HiddenForm = () => {
    return (
        <>
            <form className="hidden" netflify>
                <input type="hidden" name="form-name" value="contact" />
                <input type="text" name="firstName" />
                <input type="text" name="lastName" />
                <input type="phonenumber" name="phonenumber" />
                <input type="email" name="email" />
                <input type="text" name="address" />
                <input type="text" name="postcode" />
                <input type="submit" name="submit" />
            </form>
        </>
    )
}

export default HiddenForm