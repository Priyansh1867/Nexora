const fs = require('fs');
const path = require('path');

const queries = {
  html: "HTML CSS Full Course",
  js: "JavaScript Full Course",
  react: "React JS Full Course",
  node: "Node JS Full Course",
  python: "Python Django Full Course",
  go: "Go Programming Full Course",
  postgres: "PostgreSQL Full Course",
  mongo: "MongoDB Full Course",
  redis: "Redis Full Course",
  ml: "Machine Learning Python Full Course",
  dl: "PyTorch Full Course",
  nlp: "Natural Language Processing Python",
  cpp: "C++ Data Structures Full Course",
  java: "Java Algorithms Full Course",
  dp: "Dynamic Programming Full Course",
  docker: "Docker Kubernetes Full Course",
  cicd: "CI CD GitHub Actions Full Course",
  aws: "AWS Cloud Practitioner Full Course"
};

const predefinedCourses = {
  html: { title: "HTML & CSS Crash Course", channel: "Net Ninja", image: "/images/categories/category_frontend_1784799053689.jpg" },
  js: { title: "Modern JavaScript (ES6+)", channel: "Traversy Media", image: "/images/categories/category_frontend_1784799053689.jpg" },
  react: { title: "React 19 Complete Guide", channel: "Codevolution", image: "/images/categories/category_frontend_1784799053689.jpg" },
  node: { title: "Node.js & Express Masterclass", channel: "Net Ninja", image: "/images/categories/category_backend_1784799066478.jpg" },
  python: { title: "Python Django Fundamentals", channel: "Corey Schafer", image: "/images/categories/category_backend_1784799066478.jpg" },
  go: { title: "Go API Development", channel: "FreeCodeCamp", image: "/images/categories/category_backend_1784799066478.jpg" },
  postgres: { title: "PostgreSQL for Developers", channel: "Amigoscode", image: "/images/categories/category_database_1784799077589.jpg" },
  mongo: { title: "MongoDB Essentials", channel: "Net Ninja", image: "/images/categories/category_database_1784799077589.jpg" },
  redis: { title: "Redis Caching in Node", channel: "Traversy Media", image: "/images/categories/category_database_1784799077589.jpg" },
  ml: { title: "Machine Learning with Python", channel: "FreeCodeCamp", image: "/images/categories/category_aiml_1784799097581.jpg" },
  dl: { title: "Deep Learning (PyTorch)", channel: "FreeCodeCamp", image: "/images/categories/category_aiml_1784799097581.jpg" },
  nlp: { title: "Natural Language Processing", channel: "Sentdex", image: "/images/categories/category_aiml_1784799097581.jpg" },
  cpp: { title: "Data Structures in C++", channel: "take U forward", image: "/images/categories/category_dsa_1784799107990.jpg" },
  java: { title: "Algorithms in Java", channel: "Kunal Kushwaha", image: "/images/categories/category_dsa_1784799107990.jpg" },
  dp: { title: "Dynamic Programming Guide", channel: "take U forward", image: "/images/categories/category_dsa_1784799107990.jpg" },
  docker: { title: "Docker & Kubernetes Basics", channel: "TechWorld with Nana", image: "/images/categories/category_devops_1784799119435.jpg" },
  cicd: { title: "CI/CD with GitHub Actions", channel: "TechWorld with Nana", image: "/images/categories/category_devops_1784799119435.jpg" },
  aws: { title: "AWS Cloud Practitioner", channel: "FreeCodeCamp", image: "/images/categories/category_devops_1784799119435.jpg" },
};

async function run() {
  const finalData = {};
  for (const [key, query] of Object.entries(queries)) {
    console.log(`Fetching videos for ${query}...`);
    try {
      const response = await fetch(`http://localhost:5000/api/youtube/search?q=${encodeURIComponent(query)}`);
      const data = await response.json();
      
      finalData[key] = {
        ...predefinedCourses[key],
        lessons: Array.isArray(data) ? data.slice(0, 5) : []
      };
      
      // Delay to not bombard backend/youtube
      await new Promise(resolve => setTimeout(resolve, 500));
    } catch (e) {
      console.error(`Failed for ${key}`, e);
    }
  }

  const content = `export const coursesData = ${JSON.stringify(finalData, null, 2)};\n`;
  const outPath = path.join(__dirname, '..', 'client', 'src', 'data', 'coursesData.js');
  fs.writeFileSync(outPath, content);
  console.log("Written successfully to", outPath);
}

run();
