import React, { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "./config/config";
import { useNavigate } from "react-router-dom";
import './SkillForm.css'

export default function SkillForm() {
  const [Skill, setSkill] = useState("");
  const [order, setOrder] = useState("");

  const navigate = useNavigate();

  const handleSave = async () => {
    if (Skill === "" || order === "") {
      alert("Please fill all fields");
      return;
    }

    try {
      await addDoc(collection(db, "skills"), {
        skill: Skill,
        order: Number(order),
      });

      alert("Skill Added Successfully");

      navigate("/skills");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="form-container">
      <h2>Add Skill</h2>

      <input
        type="text"
        placeholder="Skill Name"
        value={Skill}
        onChange={(e) => setSkill(e.target.value)}
      />

      <input
        type="number"
        placeholder="Order"
        value={order}
        onChange={(e) => setOrder(e.target.value)}
      />

      <button onClick={handleSave}>Save</button>
    </div>
  );
}