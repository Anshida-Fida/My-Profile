import React from 'react';
import "./About.css";
import { collection, getDocs, limit, orderBy, query , updateDoc, doc, addDoc, deleteDoc, } from "firebase/firestore";
import {auth, db} from "./config/config";
import { useEffect, useState } from "react";

export default function About() {
    const [editing, setEditing] = useState(false);
      const [about, setAbout] = useState(
    "I am a BCA student interested in Web Development, Artificial Intelligence, and Machine Learning."
  );

  const [docId, setDocId] = useState("");
  
  useEffect(() => {
    fetchAbout();
  }, []);

  const fetchAbout = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "about"));

      if (!querySnapshot.empty) {
        const document = querySnapshot.docs[0];
        setDocId(document.id);
        setAbout(document.data().about);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSave = async () => {
    try {
      if (docId) {
        // Update existing document
        await updateDoc(doc(db, "about", docId), {
          about: about,
        });

        alert("About Updated Successfully");
      } else {
        // Add new document
        const docRef = await addDoc(collection(db, "about"), {
          about: about,
        });

        setDocId(docRef.id);

        alert("About Added Successfully");
      }

      setEditing(false);
      fetchAbout();
    } catch (error) {
      console.log(error);
      alert(error.message);
    }
  };
  
  return (
    
    <section className="about">
      <h1>About Me</h1>

      <div className="about-card">
        <h2>Hello, I'm Anshida Fida</h2>
      
              {editing ? (
        <>
          <textarea
            rows="6"
            cols="60"
            value={about}
            onChange={(e) => setAbout(e.target.value)}
          />

          <br />
          <br />

          <button onClick={handleSave}>Save</button>

          <button
            onClick={() => setEditing(false)}
            style={{ marginLeft: "10px" }}
          >
            Cancel
          </button>
        </>
      ) : (
        <>
          <p>{about}</p>
        {auth.currentUser?(
          <button onClick={() => setEditing(true)}>Edit</button>
        ):null}
        </>
      )}
    </div>
  

       
        

  
    </section>
  )
}
