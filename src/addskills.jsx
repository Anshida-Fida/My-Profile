import React, { useEffect, useState } from "react";
import "./addskills.css"
import { useNavigate } from "react-router-dom";

import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { db } from "./config/config";

export default function AddSkills() {
  const [skills, setSkills] = useState([]);
  const [skill, setSkill] = useState("");
  const [editId, setEditId] = useState(null);

  const navigate = useNavigate();

  const [order, setOrder] = useState("");

 

  // Fetch Skills
  const fetchSkills = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "skills"));

      const data = querySnapshot.docs.map((document) => ({
        id: document.id,
        ...document.data(),
      }));

      setSkills(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchSkills();
  }, []);

  // Add or Update Skill
  const handleSubmit = async () => {
    if (skill.trim() === "") {
      alert("Please enter a skill");
      return;
    }

    try {
      if (editId) {
        await updateDoc(doc(db, "skills", editId), {
          skill,
           order: Number(order),
        });

        alert("Skill Updated Successfully");
        setEditId(null);
      } else {
        await addDoc(collection(db, "skills"), {
           skill,
           order: Number(order),
        });

        alert("Skill Added Successfully");
      }

      setSkill("");
      fetchSkills();
    } catch (error) {
      console.log(error);
    }
  };

  // Delete Skill
 const handleDelete = async (id) => {
  try {
    await deleteDoc(doc(db, "skills", id));

    alert("Skill Deleted Successfully");

    fetchSkills();
  } catch (error) {
    console.log(error);
  }
};

  // Edit Skill
  const handleEdit = (item) => {
     navigate("/SkillForm", {
        state: item,
       });
    setSkill(item.skill);

    setEditId(item.id);
  };

  return (
    <div className="skills-container">
      <h2>Manage Skills</h2>

      <div className="input-section">
       
          <button onClick={() => navigate("/SkillForm")}> 
            {editId  ? "Update Skill" : "Add Skill"}
  </button>
       


      </div>

      <table className="skills-table">
        <thead>
          <tr>
           
            <th>Skill</th>
              <th>Order</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {skills.length > 0 ? (
            skills.map((item) => (
              <tr key={item.id}>
              <td>{item.skill}</td>
               <td>{item.order}</td>

                <td>
                  <button
                    className="edit-btn"
                    onClick={() => handleEdit(item)}
                  >
                    Edit
                  </button>

                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(item.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3">No Skills Found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}