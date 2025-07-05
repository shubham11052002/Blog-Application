import React, { useState, useEffect } from "react";
import axios from "axios";

function About() {
  const [profile, setProfile] = useState([]);
  const baseURL = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    const fetchAdmins = async () => {
      try {
        const { data } = await axios.get(`${baseURL}/my-profile`, {
          withCredentials: true,
        });
        setProfile([data.user]);
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };
    fetchAdmins();
  }, [baseURL]);

  return (
    <div className="container mx-auto mt-[72px] px-6 md:px-12 py-12 space-y-12">
      <h1 className="text-4xl font-bold text-center text-indigo-700">
        About Me
      </h1>

      {profile.map((user, idx) => (
        <div key={idx} className="text-gray-700 text-lg leading-relaxed max-w-4xl mx-auto text-center">
          <p>
            Hello, I'm{" "}
            <strong className="text-indigo-800">{user.name}</strong>, a
            passionate and proficient{" "}
            <span className="font-semibold">full-stack developer</span>. I
            specialize in building dynamic, responsive, and user-friendly web
            applications that deliver seamless digital experiences.
          </p>
        </div>
      ))}

      <section className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-semibold text-indigo-700 mb-4">
          🛠 Technical Expertise
        </h2>
        <ul className="list-disc pl-6 space-y-2 text-gray-700 text-base">
          <li>
            <strong>Front-End:</strong> React.js, Angular, Vue.js, HTML5, CSS3,
            and responsive design.
          </li>
          <li>
            <strong>Back-End:</strong> Node.js, Express.js, Django; with
            experience in MongoDB, MySQL, and PostgreSQL.
          </li>
          <li>
            <strong>DevOps:</strong> Docker, Kubernetes, and CI/CD pipelines.
          </li>
          <li>
            <strong>Cloud:</strong> AWS, Azure, and Google Cloud platforms.
          </li>
        </ul>
      </section>

      <section className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-semibold text-indigo-700 mb-4">
          🌟 Professional Highlights
        </h2>
        <ul className="list-disc pl-6 space-y-2 text-gray-700 text-base">
          <li>
            Built and deployed high-quality full-stack applications with clean
            architecture.
          </li>
          <li>
            Collaborated in cross-functional teams to deliver on tight deadlines.
          </li>
          <li>
            Lifelong learner committed to keeping up with tech advancements.
          </li>
        </ul>
      </section>

      <section className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-semibold text-indigo-700 mb-4">
          💬 Personal Inspiration
        </h2>
        <p className="text-gray-700 text-base leading-relaxed">
          I draw inspiration from growth—both as a developer and as a human. The
          ever-evolving tech world motivates me to constantly learn, innovate,
          and collaborate with driven individuals. Whether it’s through mentorship,
          teamwork, or friendships—I value growth-fueled relationships.
        </p>
      </section>

      <section className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-semibold text-indigo-700 mb-4">
          🔗 Final Note
        </h2>
        <p className="text-gray-700 text-base leading-relaxed">
          My mission is to craft digital solutions that are intuitive, elegant,
          and impactful. Whether it’s front-end design or back-end logic, I aim to
          write code that’s clean, efficient, and meaningful.
        </p>
      </section>
    </div>
  );
}

export default About;
