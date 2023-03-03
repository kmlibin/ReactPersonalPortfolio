import React, { useState } from "react";

//components, pages, wrappers
import { AppWrap, MotionWrap } from "../../wrapper";

//sanity
import { client } from "../../client";

//styles
import "./Footer.scss";

const Footer: React.FC = () => {
  const [formData, setFormData] = useState<{
    name: string;
    email: string;
    message: string;
  }>({
    name: "",
    email: "",
    message: "",
  });

  const [isFormSubmitted, setIsFormSubmitted] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  //destructure values from state object
  const { name, email, message } = formData;

  //adds input changes to state object
  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault()
    setLoading(true);
    
    //URL-encode the form data for netlify
    const encode = (data: { [key: string]: string }): string => {
      return Object.keys(data)
        .map((key) => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
        .join("&");
    };

    try {
      // send data to Netlify
      const netlifyResponse = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: encode({ "form-name": "contact", ...formData }),
      });
  
      if (!netlifyResponse.ok) {
        throw new Error("Network response was not ok");
      }

    //creates object to send to sanity
    const contact = {
      _type: "contact",
      name: name,
      email: email,
      message: message,
    };

    client.create(contact).then(() => {
      setLoading(false);
      setIsFormSubmitted(true);
    });

    setIsFormSubmitted(true)
  }catch (error) {
    console.error(error)
  } finally {
    setLoading(false)
  }

  };



  return (
    <>
      

      {!isFormSubmitted ? (
        <div className="app__footer-form app__flex">
          <h2 className="head-text">Let's Get Acquainted!</h2>
          <form name="contact" method="POST" data-netlify="true" onSubmit={handleSubmit} action="/">
          <input type="hidden" name="form-name" value="contact" />
          <div className="app__flex">
            <input
              className="p-text"
              type="text"
              name="name"
              placeholder="your name"
              value={name}
              onChange={handleChangeInput}
            />
          </div>

          <div className="app__flex">
            
            <input
              className="p-text"
              type="email"
              name="email"
              placeholder="your email"
              value={email}
              onChange={handleChangeInput}
            />
          </div>

          <div>
            <textarea
              className="p-text"
              name="message"
              placeholder="your message"
              value={message}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>): void =>
                setFormData({ ...formData, message: e.target.value })
              }
            />
          </div>
          <button type="submit" className="p-text">
            {loading ? "Sending..." : "Send Message"}
          </button>
          </form>
        </div>
      ) : (
        <div>
          <h3 className="head-text">Thank you for getting in touch!</h3>
        </div>
      )}
    </>
  );
};

export default AppWrap(
  MotionWrap(Footer, "app__footer"),
  "contact",
  "app__footerbg"
);
