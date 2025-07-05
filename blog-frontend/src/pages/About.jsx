import React, { useState,useEffect } from "react";
import axios from "axios";

function About() {
  const [profile,setProfile] = useState([]);
  useEffect(() => {
    const fetchAdmins = async () => {
      try {
        const { data } = await axios.get("https://blog-application-23z7.onrender.com/my-profile", {
          withCredentials: true,
        });
        console.log(data.user, "profile data");
        setProfile([data.user]); 
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };
    fetchAdmins();
  }, []);

  return (
    <div className="container mx-auto my-12 px-6 md:px-12 space-y-10">
      <h1 className="text-3xl md:text-4xl font-bold text-indigo-800 mb-6">
        About Me
      </h1>

     {
      profile.map((element,idx)=>{ 
       return (
        <p  
        className="text-gray-700 leading-relaxed text-lg">
        Hello, I'm <strong>{element.name}</strong> 
        <strong className="text-indigo-700 font-semibold hover:scale-105 transition-transform duration-500">
        </strong>
        , a passionate and proficient full-stack developer. I specialize in
        building dynamic, responsive, and user-friendly web applications that
        deliver seamless digital experiences.
      </p>
       )
      })
     }

      <section>
        <h2 className="text-2xl font-semibold text-indigo-700 mb-2">
          🛠 Technical Expertise
        </h2>
        <ul className="list-disc list-inside space-y-3 text-gray-700 text-base leading-relaxed">
          <li>
            <strong>Front-End:</strong> Skilled in React.js, Angular, Vue.js,
            HTML5, CSS3, and responsive design principles.
          </li>
          <li>
            <strong>Back-End:</strong> Proficient in Node.js, Express.js,
            Django, with database experience in MySQL, PostgreSQL, and MongoDB.
          </li>
          <li>
            <strong>DevOps:</strong> Hands-on with Docker, Kubernetes, and
            CI/CD tools for streamlined deployment.
          </li>
          <li>
            <strong>Cloud:</strong> Familiar with AWS, Azure, and Google Cloud
            for scalable application hosting.
          </li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-indigo-700 mb-2">
          🌟 Professional Highlights
        </h2>
        <ul className="list-disc list-inside space-y-3 text-gray-700 text-base leading-relaxed">
          <li>
            Delivered high-quality full-stack applications with attention to
            detail and clean architecture.
          </li>
          <li>
            Collaborated in cross-functional teams and met tight deadlines with
            consistent results.
          </li>
          <li>
            Dedicated to continuous learning and staying ahead of tech trends.
          </li>
        </ul>
      </section>

      <section>
  <h2 className="text-2xl font-semibold text-indigo-700 mb-2">
    💬 Personal Inspiration
  </h2>
  <p className="text-gray-700 text-base leading-relaxed">
    I draw inspiration from the everyday pursuit of growth — both as a
    developer and as a person. The ever-evolving world of technology constantly
    motivates me to learn, adapt, and innovate. I believe in surrounding myself
    with passionate, driven individuals who challenge me to be better every day.
    Whether it's a mentor, a colleague, or a close friend, I value relationships
    that spark curiosity and fuel ambition.
  </p>
</section>


      <section>
        <h2 className="text-2xl font-semibold text-indigo-700 mb-2">
          🔗 Final Note
        </h2>
        <p className="text-gray-700 text-base leading-relaxed">
          I'm driven by a mission to create intuitive and impactful digital
          solutions. Whether building front-end interfaces or working on complex
          back-end logic, I’m all about delivering real value with clean,
          maintainable code.
        </p>
      </section>
    </div>
  );
}

export default About;
