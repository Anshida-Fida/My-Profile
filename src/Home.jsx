import { useState } from "react";
import "./Home.css"
import { useNavigate } from "react-router-dom";
import { getAuth , onAuthStateChanged , signOut } from "firebase/auth";
import { useEffect  } from "react";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { storage, db } from "./config/config";



function App() {
   const [isauthenticated,setisauthenticated]=useState(false);
        const auth = getAuth();
    useEffect(()=>{
  
  onAuthStateChanged(auth, (user) => {
    if (user) {
      setisauthenticated(true)
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/auth.user
      const uid = user.uid;
      console.log(uid)
      // ...
    } else {
      setisauthenticated(false)
      // User is signed out
      // ...
    }
  });
  
    },[])
  const navigate = useNavigate ();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [profile_images, setProfile_images] = useState("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSXRSeXnOPiNB3n9KFivNAe5WBbLjVyiFWOW71NL05NQ&s=10");
 
useEffect(() => {
  const loadedProfile_images = async () => {
    const docRef = doc(db, "profile", "profile_images");
    const docSnap = await getDoc(docRef);
    if ( docSnap.exists()) {
      setProfile_images(docSnap.data().img_url);
    }
  };
  loadedProfile_images();
}, []);


  const handleLogout = () => {
    signOut(auth)
    .then(() => {
      navigate("/");
    })
    .catch((error) => {
      console.log(error);
    })
  }
  const uploadProfileImage = async (file) => {
  try {
    const auth = getAuth();
    const user = auth.currentUser;

    if (!user) {
      console.log("User not logged in");
      return;
    }
  const uid = user.uid;

    // Upload image
    const storageRef = ref(storage, `profile_images/${uid}`);
    await uploadBytes(storageRef, file);

    // Get download URL
    const imageUrl = await getDownloadURL(storageRef);

    // Save URL to Firestore
    await setDoc(doc(db, "profile", "profile_images"), {
      img_url: imageUrl,
    }, { merge: true});
    setProfile_images(imageUrl);

    console.log("Profile image updated successfully!");
  } catch (error) {
    console.error(error);
  }
};

  
  return (

    <div className="portfolio-page" >
   
 
      <nav>
        <h2>MY PORTFOLIO</h2>
         <ul>
          <li onClick={() => navigate("/")}>Home</li>
          <li onClick={() => navigate("/about")}>About</li>
          <li onClick={() => navigate("/skills")}>Skills</li>
          <li onClick={() => navigate("/experience")}>Experience</li>
          <li onClick={() => navigate("/projects")}>Projects</li>
          <li onClick={() => navigate("/contact")}>Contact</li>
          {isauthenticated &&
          <>
          <li onClick={() => navigate("/table")}>Messages</li>
          <li onClick={() => navigate("/addskills")}>AddSkills</li>
           </>
           }
          {isauthenticated ?(
            <li onClick={handleLogout}>LogOut</li>
          
          ):(
            <li onClick={() => navigate("/login")}>Login</li>
          )}
        
            
          
        </ul>
      </nav>
      <section id="Home" >
        <div className="home-content">
         <img 
  
    src={profile_images}
    alt="Anshida Fida"
    className="profile-img"
   />
   {auth.currentUser?(
   
<input
  type="file"
  accept="image/*"
  onChange={(e) => {
    const file = e.target.files[0];
    if (file) {
      uploadProfileImage(file);
    }
  }}
/>):null}
        
       <h1>Hello, I'm Anshida Fida</h1>



        <p>
          I am a BCA student with a passion for web development,
          data analytics, and machine learning. I enjoy learning
          new technologies and building responsive, user-friendly
          websites and applications.
        </p>

        

        <button>Download Resume</button>
        </div>
      </section>
 
    
      <section >
        <h2>About Me</h2>
<h2>Hello, I'm Anshida Fida</h2>
<div className="about-box">

        <p>
          I am a BCA student with a passion for web development,
          data analytics, and machine learning. I enjoy learning
          new technologies and building responsive, user-friendly
          websites and applications.
        </p>

        <p>
          Currently, I am gaining practical experience through my
          internship in KenMark Softwares, where I work with HTML        
          React, and Making projects. I am always eager
          to improve my technical skills and contribute to
          meaningful projects.
        </p>
        </div>
       <div className="about-info">
          <div>
            <h3> Education</h3>
            <p>BCA - Nilgiri College of Arts and Science</p>
          </div>

          <div>
            <h3> Interests</h3>
            <p>Web Development, Data Analytics, AI</p>
          </div>

          <div>
            <h3> Location</h3>
            <p>India</p>
          </div>
        </div>

      </section>

     
      <section>
        <h2>Skills</h2>

      <div className="skills-container">
  <div className="skill-group">
            <h3>Frontend</h3>
            <p>HTML</p>
            <p>CSS</p>
            <p>JavaScript</p>
            <p>React.js</p>
        </div>

        <div className="skill-group">
            <h3>Programming</h3>
            <p>Python</p>
            <p>C</p>
            <p>Java</p>
        </div>

        <div className="skill-group">
            <h3>Database</h3>
            <p>MySQL</p>
        </div>
      </div>
      </section>

     
      <section>
        <h2>Work Experience</h2>

      
    <div className="experience-card">
        <h2> Data Analytics Intern</h2>
        <h3>Acadeno Technologies</h3>
    

        <ul>
            <li>Worked with Python.</li>
            <li>Machine Learning.</li>
            <li>Data Analysis.</li>
        </ul>
    </div>
      </section>

   
      <section>
        <h2>Projects</h2>

       <div className="project-container">

        <div className="project-card">
          <h2>Portfolio Website</h2>
          <p>
            Developed a responsive personal portfolio using React.js
            to showcase my skills, projects, and experience.
          </p>
         
        </div>

        <div className="project-card">
          <h2>Credit Card Fraud Detection</h2>
          <p>
            Built a machine learning model using Python to identify
            fraudulent credit card transactions.
          </p>
        
        </div>

        <div className="project-card">
          <h2>Sales Dashboard</h2>
          <p>
            Created an interactive Power BI dashboard to analyze
            sales performance and business insights.
          </p>
          
        </div>

      </div>
      </section>

   
      <section>
       
        <h2>Contact Me</h2>
        
        <form >
          <input
            type="text"
            placeholder="Your Name"
            required
          />
          <input
            type="email"
            placeholder="Your Email"
            required
          />
          <textarea
            rows="6"
            placeholder="Your Message"
            required
          ></textarea>
           <button type="submit">Send Message</button>
      </form>
      <div className="contact-info">
          <h2>Conatct Me</h2>

          <p> Email: anshidafida@example.com</p>

          <p> Phone: +91 8590939512</p>

          <p> Location: Kerala, India</p>

          
        </div>
      </section>

      <footer>
        <p>© 2026 Anshida | All Rights Reserved</p>
      </footer>

    </div>
  );
}


export default App;




