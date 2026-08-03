import React from 'react'
import "./skills.css"

export default function Skills() {
  return (
    <section className="skills">
      <h1>My Skills</h1>

      <div className="skills-container">

        <div className="skill-card">
          <p>HTML</p>
          <p>CSS</p>
          <p>JavaScript</p>
          <p>React.js</p>
        </div>

        <div className="skill-card">
          <h2>Programming</h2>
          <p>Python</p>
          <p>C</p>
          <p>Java</p>
        </div>

        <div className="skill-card">
          <p>MySQL</p>
        </div>
      </div>
    </section>
  )
}
