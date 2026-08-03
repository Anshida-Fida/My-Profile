import { useState, useEffect } from "react"
import  "./Experience.css"
import { collection, getDocs, limit, orderBy, query , updateDoc, doc, addDoc, deleteDoc, } from "firebase/firestore";
import {db} from "./config/config"

export default function Experience() {
    const [company, setCompany] = useState("");
    const [YearofExperience, setYearofExperience] = useState("");

    const [experiences, setExperiences] = useState([]);
    const [editId, setEditId] = useState(null);

    
  // Fetch Experiences
  const fetchExperiences = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "Experience"));

      const data = querySnapshot.docs.map((document) => ({
        id: document.id,
        ...document.data(),
      }));
            setExperiences(data);
    } catch (error) {
      console.log(error);
    }
  };

   
     useEffect(() => {
       fetchExperiences();
  }, []);

  // Add / Update
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!company ||  !YearofExperience) {
      alert("Please fill all fields");
      return;
    }

    try {
      if (editId) {
        await updateDoc(doc(db, "Experience", editId), {
          company,
          YearofExperience,
        });

        alert("Experience Updated Successfully");
      } else {
        await addDoc(collection(db, "Experience"), {
          company,
          YearofExperience,
        });

        alert("Experience Added Successfully");
      }

      setCompany("");
    
      setYearofExperience("");
      setEditId(null);

      fetchExperiences();
    } catch (error) {
      console.log(error);
    }
  };

  // Edit
  const handleEdit = (item) => {
    setCompany(item.company);

    setYearofExperience(item.YearofExperience);
    setEditId(item.id);
  };

  // Delete
  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "Experience", id));
      alert("Experience Deleted Successfully");
      fetchExperiences();
    } catch (error) {
      console.log(error);
    }
  };

  return (
   <section className="experience">
    <h1>Experience</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Company Name"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
        />

        

        <textarea
          type="text"
          placeholder="Year of Experience"
          value={YearofExperience}
          onChange={(e) => setYearofExperience(e.target.value)}
        />

        <button type="submit">
          {editId ? "Update Experience" : "Add Experience"}
        </button>
      </form>

      <h3>Experience List</h3>

      <table className="experience-table">
        <thead>
          <tr>
            <th>No.</th>
            <th>Company</th>
        
            <th>Years of Experience</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>

        <tbody>
          {experiences.length === 0 ? (
            <tr>
              <td colSpan="6">No Experience Added</td>
            </tr>
          ) : (
            experiences.map((item, index) => (
              <tr key={item.id}>
                <td>{index + 1}</td>
                <td>{item.company}</td>
               
                <td>{item.YearofExperience}</td>

                <td>
                  <button
                    type="button"
                    className="edit-btn"
                    onClick={() => handleEdit(item)}
                  >
                    Edit
                  </button>
                </td>

                <td>
                  <button
                    type="button"
                    className="delete-btn"
                    onClick={() => handleDelete(item.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>


</section>
  )
}
