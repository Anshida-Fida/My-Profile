import React, { useEffect, useState } from "react";
import { collection, getDocs, limit, orderBy, query } from "firebase/firestore";
import { db } from "./config/config";
import "./table.css"

export default function Table() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const Ref=collection(db, "messages")
        const q=query(Ref,orderBy("date","asc"))
        const querySnapshot = await getDocs(q);

        const data = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setMessages(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div style={{ padding: "30px" }}>
      <h2 style={{ textAlign: "center" }}>Messages</h2>

      <table
        border="1"
        cellPadding="10"
        style={{
          width: "100%",
          borderCollapse: "collapse",
          textAlign: "center",
        }}
      >
        <thead>
          <tr>
           <th>sl.No</th>
            <th>Name</th>
            <th>Email</th>
            <th>Message</th>
            <th>Date</th>
          </tr>
        </thead>

        <tbody>
          {messages.map((item,index) => (
            <tr key={item.id}>
              <td>{index+1}</td>
              <td>{item.name}</td>
              <td>{item.email}</td>
              <td>{item.message}</td>
              <td>
                {item.date
                  ? item.date.toDate().toLocaleDateString()
                  : "No Date"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}