import React, { useState, useEffect } from 'react'
import './Contact.css'
import { collection, addDoc, getDocs, doc , serverTimestamp } from 'firebase/firestore'
import { app,db } from './config/config'


export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const getData = async () => {
  const querySnapshot = await getDocs(collection(db, "messages"));
    querySnapshot.forEach((doc) => {
    console.log(doc.id, doc.data());
  });
};

getData();

    const handleSubmit = async (e) => {
    e.preventDefault();

      try {
      await addDoc(collection(db, "messages"), {
        name,
        email,
        message,
        date: serverTimestamp(),  
        
      });

            alert("Message Sent Successfully!");

      setName("");
      setEmail("");
      setMessage("");
    } catch (err) {
      console.log(`${doc.id} =>`, doc.data());
      alert("Something went wrong");
    }
  };

  return (

    <section className="contact">
      <h1>Contact Me</h1>

      <div className="contact-container">
        <form onSubmit = {handleSubmit}className="contact-form">

          <input
            type="text"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            
            
          />

          <input
            type="email"
            placeholder="Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <textarea
            rows="6"
            placeholder="Your Message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          ></textarea>

          <button type="submit">Send Message</button>

        </form>

        <div className="contact-info">
          <h2>Conatct Me</h2>

          <p> Email: anshidafida@example.com</p>
         <p> Location: Kerala, India</p>

          
        </div>

      </div>
    </section>
  )
}
