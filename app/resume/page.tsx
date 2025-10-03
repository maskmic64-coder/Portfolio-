"use client"

export default function ResumePage() {
  return (
    <div className="min-h-screen bg-white p-8">
      <div className="max-w-4xl mx-auto bg-white shadow-lg">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-8">
          <h1 className="text-4xl font-bold mb-2">HET MEHTA</h1>
          <h2 className="text-xl mb-4">Software Developer Engineer</h2>
          <div className="flex flex-wrap gap-4 text-sm">
            <a href="mailto:mehtahet619@gmail.com" className="hover:underline">
              mehtahet619@gmail.com
            </a>
            <a
              href="https://github.com/mehtahet619"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              Github
            </a>
            <a
              href="https://www.linkedin.com/in/het-mehta-5b9a47236/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              LinkedIn
            </a>
            <a
              href="https://leetcode.com/u/mehtahet619/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              LeetCode
            </a>
          </div>
        </div>

        {/* Profile */}
        <div className="p-8">
          <section className="mb-6">
            <h3 className="text-2xl font-bold text-blue-600 border-b-2 border-blue-600 pb-2 mb-4">PROFILE</h3>
            <p className="text-gray-700 leading-relaxed">
              I'm a Software Engineer skilled in C++, Java, and Python with a strong foundation in data structures and
              algorithms (645+ problems solved). Experienced in building scalable systems, developing AI/ML and NLP
              solutions, and working with distributed architectures and cloud technologies.
            </p>
          </section>

          {/* Education */}
          <section className="mb-6">
            <h3 className="text-2xl font-bold text-blue-600 border-b-2 border-blue-600 pb-2 mb-4">EDUCATION</h3>
            <div className="mb-3">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-bold text-lg">B.Tech, Computer Science – G.C.E.T</h4>
                  <p className="text-gray-600">Current CGPA: 8.59 | SGPA: 8.67 (up to 6th semester)</p>
                </div>
                <span className="text-gray-600">2022 – 2026 (Expected)</span>
              </div>
            </div>
            <div className="space-y-1 text-sm">
              <p>
                <span className="font-semibold">10th ICSE:</span> 86.4% – Q.A.C.S.
              </p>
              <p>
                <span className="font-semibold">12th CBSE:</span> 78.8% – AMICUS International
              </p>
            </div>
          </section>

          {/* Experience */}
          <section className="mb-6">
            <h3 className="text-2xl font-bold text-blue-600 border-b-2 border-blue-600 pb-2 mb-4">EXPERIENCE</h3>
            <div>
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-bold text-lg">Tatvasoft</h4>
                <span className="text-gray-600">May 2025 - Jun 2025</span>
              </div>
              <ul className="list-disc list-inside space-y-1 text-gray-700">
                <li>Optimized APIs with async Node.js, reducing response time by 40%.</li>
                <li>Achieved 95%+ test coverage and faster CI/CD deployment.</li>
                <li>Boosted frontend speed 2.3× with React.js optimizations.</li>
                <li>Processed 1M+ IoT data points/day using AWS Lambda.</li>
              </ul>
              <p className="text-sm text-gray-600 mt-2">
                <span className="font-semibold">Skills:</span> C++, Java, Python, Node.js, React.js, AWS, Distributed
                Systems, Problem-Solving
              </p>
            </div>
          </section>

          {/* Projects */}
          <section className="mb-6">
            <h3 className="text-2xl font-bold text-blue-600 border-b-2 border-blue-600 pb-2 mb-4">PROJECTS</h3>

            {/* Project 1 */}
            <div className="mb-4">
              <h4 className="font-bold text-lg">1. Carbon Footprint Tracker (Odoo 1st Runner-Up)</h4>
              <ul className="list-disc list-inside space-y-1 text-gray-700 ml-4">
                <li>Built a full-stack platform to track and reduce emissions in red-zone industries.</li>
                <li>Enabled real-time IoT data ingestion (1M+ points/day) with Flask + Node.js + Supabase.</li>
                <li>Deployed with CI/CD pipelines; achieved 20% reduction through optimized data-driven insights.</li>
              </ul>
              <p className="text-sm text-gray-600 mt-1">
                <span className="font-semibold">Tech Stack:</span> Python, Flask, React.js, Node.js, Supabase, IoT,
                CI/CD
              </p>
              <a
                href="https://github.com/mehtahet619"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 text-sm hover:underline"
              >
                GitHub →
              </a>
            </div>

            {/* Project 2 */}
            <div className="mb-4">
              <h4 className="font-bold text-lg">2. Network Intrusion Detection System (NIDS)</h4>
              <ul className="list-disc list-inside space-y-1 text-gray-700 ml-4">
                <li>Developed a real-time monitoring system with Snort for packet analysis and ELK dashboards.</li>
                <li>Optimized Flask APIs and containerized services for scalable, low-latency threat detection.</li>
                <li>Integrated ML models (CNN-LSTM, Random Forest, XGBoost) for improved accuracy.</li>
              </ul>
              <p className="text-sm text-gray-600 mt-1">
                <span className="font-semibold">Tech Stack:</span> Python, Flask, Scikit-learn, Snort, Wireshark, ELK
                Stack, Docker
              </p>
              <a
                href="https://github.com/mehtahet619"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 text-sm hover:underline"
              >
                GitHub →
              </a>
            </div>

            {/* Project 3 */}
            <div className="mb-4">
              <h4 className="font-bold text-lg">3. AI Legal Research Engine</h4>
              <ul className="list-disc list-inside space-y-1 text-gray-700 ml-4">
                <li>
                  Built an NLP assistant using LegalBERT and T5 to automatically extract legal information and assist in
                  decision-making.
                </li>
                <li>Improved legal research efficiency by 15%.</li>
              </ul>
              <p className="text-sm text-gray-600 mt-1">
                <span className="font-semibold">Tech Stack:</span> Python, Django, React.js, LegalBERT, T5,
                Elasticsearch, NLP
              </p>
              <a
                href="https://github.com/mehtahet619"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 text-sm hover:underline"
              >
                GitHub →
              </a>
            </div>
          </section>

          {/* Skills */}
          <section className="mb-6">
            <h3 className="text-2xl font-bold text-blue-600 border-b-2 border-blue-600 pb-2 mb-4">SKILLS</h3>
            <div className="space-y-3 text-sm">
              <div>
                <span className="font-semibold text-gray-800">Programming & Software Development:</span>
                <span className="text-gray-700">
                  {" "}
                  Python, Java, C, C++, C#, .NET, JavaScript, HTML, CSS, ReactJS, NodeJS, ExpressJS, Django, Shell
                  Scripting, SDLC, Agile
                </span>
              </div>
              <div>
                <span className="font-semibold text-gray-800">Data Structures & Algorithms:</span>
                <span className="text-gray-700">
                  {" "}
                  645+ problems solved (421 on LeetCode). Strong in Arrays, Strings, Linked Lists, Stacks, Queues,
                  Trees, Graphs, Hashing, Dynamic Programming, and Recursion. Proficient in OOP, Debugging
                </span>
              </div>
              <div>
                <span className="font-semibold text-gray-800">AI & Machine Learning:</span>
                <span className="text-gray-700">
                  {" "}
                  NLP, Scikit-learn, TensorFlow, Keras, Pandas, NumPy, Hugging Face Transformers, LangChain, Gemini API,
                  Vector Databases (Pinecone, FAISS, ChromaDB), Retrieval-Augmented Generation (RAG)
                </span>
              </div>
              <div>
                <span className="font-semibold text-gray-800">Web & API Technologies:</span>
                <span className="text-gray-700"> HTTP, REST APIs, AJAX, Secure API Development</span>
              </div>
              <div>
                <span className="font-semibold text-gray-800">Databases:</span>
                <span className="text-gray-700"> SQL, NoSQL, Oracle, Teradata, MongoDB, PostgreSQL, Supabase</span>
              </div>
              <div>
                <span className="font-semibold text-gray-800">Testing & Code Quality:</span>
                <span className="text-gray-700">
                  {" "}
                  Unit Testing, Integration Testing, Performance Testing, API Testing (Postman)
                </span>
              </div>
              <div>
                <span className="font-semibold text-gray-800">System Design & Architecture:</span>
                <span className="text-gray-700">
                  {" "}
                  ATOM Principles (Scalability, Simplicity, Modularity, Flexibility), System Documentation, Unix, Linux,
                  distributed systems, scalable design
                </span>
              </div>
              <div>
                <span className="font-semibold text-gray-800">Cloud & Deployment:</span>
                <span className="text-gray-700">
                  {" "}
                  Flask, FastAPI, Docker, CI/CD (Jenkins, GitHub Actions), AWS (EC2, S3), Kubernetes (Basic)
                </span>
              </div>
              <div>
                <span className="font-semibold text-gray-800">Security & Payments:</span>
                <span className="text-gray-700">
                  {" "}
                  TCP/IP, Authentication & Authorization, Encryption, OWASP Top 10, Transaction Integrity, Fraud
                  Detection, PCI-DSS Awareness
                </span>
              </div>
              <div>
                <span className="font-semibold text-gray-800">Tools & Utilities:</span>
                <span className="text-gray-700"> Git, Postman, Systemd, Cron Jobs</span>
              </div>
            </div>
          </section>

          {/* Achievements */}
          <section className="mb-6">
            <h3 className="text-2xl font-bold text-blue-600 border-b-2 border-blue-600 pb-2 mb-4">
              ACHIEVEMENTS AND LEADERSHIP
            </h3>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>
                <span className="font-semibold">ISRO IRoC-U 2025</span> – Selected among top 170 teams (out of 1600+);
                building Martian Terrain Navigation System (Fully-funded)
              </li>
              <li>
                <span className="font-semibold">Odoo Hackathon – 1st Runners-Up:</span> Built Carbon Footprint Tracker
                reducing emissions by 20%
              </li>
              <li>
                <span className="font-semibold">NUV ACM 25 - Winner:</span> Built Real-time Campus Monitoring & Threat
                Prediction and Reduction System
              </li>
              <li>
                <span className="font-semibold">Open Source Contributor</span> – GssoC 2025 and OSCI 2025
              </li>
              <li>
                <span className="font-semibold">Tech Speaker</span> – Delivered technical seminars on GitHub,
                Competitive Programming (CP), and Hackathon strategy
              </li>
              <li>
                <span className="font-semibold">IIT Indore Hackathon</span> (Fluxus Finalist)
              </li>
              <li>
                <span className="font-semibold">CSI Core Team</span> - Technical Head and{" "}
                <span className="font-semibold">GeeksforGeeks</span> - Campus Ambassador
              </li>
            </ul>
          </section>
        </div>

        {/* Print Instructions */}
        <div className="p-8 bg-gray-50 border-t print:hidden">
          <p className="text-center text-gray-600">
            To save as PDF: Press <kbd className="px-2 py-1 bg-gray-200 rounded">Ctrl/Cmd + P</kbd> and choose "Save as
            PDF"
          </p>
        </div>
      </div>

      <style jsx global>{`
        @media print {
          body {
            print-color-adjust: exact;
            -webkit-print-color-adjust: exact;
          }
          .print\\:hidden {
            display: none !important;
          }
          @page {
            margin: 0.5cm;
          }
        }
      `}</style>
    </div>
  )
}
