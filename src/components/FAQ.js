import React, { useState,useEffect } from "react";
import axios from "axios";
import FaqDisplay from "./FaqDisplay";

import { useCookies } from 'react-cookie';

import "./Faq.css"

function FAQ() {

    const [cookies, setCookie] = useCookies(['username']);
    console.log('cookie',cookies.username)


    let [faqs, setFaqs] = useState([]);
    useEffect(() => {
        axios.get("http://127.0.0.1:8000/api/all_ans/", {
        params: {
            username: cookies.username
        }
        })
        .then((response) => {
            console.log('uk',response);
            faqs=response.data.message;
            setFaqs(Object.keys(faqs).map((key) => ({
              id: key,
              ...faqs[key],
            })));
        })
        .catch((err) => {
            console.log('ukk',err.response);
            
            
        })
    }, []);


  const toggleFAQ = (index) => {
    setFaqs(
      faqs.map((faq, i) => {
        if (i === index) {
          faq.open = !faq.open;
        } else {
          faq.open = false;
        }

        return faq;
      })
    );
  };

  return (
    <div className="FAQS">
      <header>
        <h1>FAQ Page</h1>
      </header>

      <div className="faqs">
        {faqs.map((faq, i) => (
          <FaqDisplay faq={faq} index={i} toggleFAQ={toggleFAQ} />
        ))}
      </div>
    </div>
  );
}

export default FAQ;
