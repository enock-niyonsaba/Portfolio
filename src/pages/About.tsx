import React from 'react';
import { Book, Award, Code, Brain, Trophy, Target, Heart } from 'lucide-react';

const About = () => {
  return (
    <div className="min-h-screen pt-16 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 mb-4">
            About Me
          </h1>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
           As a determined problem solver and passionate defender against digital threats, I am an aspiring cybersecurity specialist with a strong foundation in programming, networking, and real-world cybersecurity tools. My journey began with a fascination for hacking tricks, fueling my commitment to combat the growing challenge of cybercrime in Africa. Through hands-on practice and certifications, I aim to build scalable, practical solutions that bridge the cybersecurity gap in underrepresented regions while staying at the forefront of emerging threats and technologies.
          </p>
        </div>

        {/* Education Section */}
        <div className="mb-16 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
          <div className="flex items-center mb-6">
            <Book className="w-8 h-8 text-indigo-600 dark:text-indigo-400 mr-3" />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Education & Certifications</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Education</h3>
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                <p className="font-medium text-gray-900 dark:text-white">High School Diploma</p>
                <p className="text-gray-600 dark:text-gray-300">Specialized in Software Development</p>
                <p className="text-indigo-600 dark:text-indigo-400">Strong GPA Score</p>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Certifications</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <Award className="w-5 h-5 text-indigo-600 dark:text-indigo-400 mr-2 mt-1 flex-shrink-0" />
                  <span className="text-gray-700 dark:text-gray-300">ALX Pathway Program</span>
                </li>
                <li className="flex items-start">
                  <Award className="w-5 h-5 text-indigo-600 dark:text-indigo-400 mr-2 mt-1 flex-shrink-0" />
                  <span className="text-gray-700 dark:text-gray-300">AWS Cloud Computing Program</span>
                </li>
                <li className="flex items-start">
                  <Award className="w-5 h-5 text-indigo-600 dark:text-indigo-400 mr-2 mt-1 flex-shrink-0" />
                  <span className="text-gray-700 dark:text-gray-300">Cyber Security Certification</span>
                </li>
                <li className="flex items-start">
                  <Award className="w-5 h-5 text-indigo-600 dark:text-indigo-400 mr-2 mt-1 flex-shrink-0" />
                  <span className="text-gray-700 dark:text-gray-300">Google IT Support Certificate</span>
                </li>
                <li className="flex items-start">
                  <Award className="w-5 h-5 text-indigo-600 dark:text-indigo-400 mr-2 mt-1 flex-shrink-0" />
                  <span className="text-gray-700 dark:text-gray-300">Microsoft Learn Student Ambassador Certificate</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Technical Skills Section */}
        <div className="mb-16 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
          <div className="flex items-center mb-6">
            <Code className="w-8 h-8 text-indigo-600 dark:text-indigo-400 mr-3" />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Technical Skills</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { skill: 'Cybersecurity Fundamentals', level: 90 },
              { skill: 'Networking (CCNA in progress)', level: 55 },
              { skill: 'MERN Stack', level: 95 },
              { skill: 'Tailwind CSS & Responsive Design', level: 95 },
              { skill: 'Cloud Computing & AWS', level: 60 },
              { skill: 'Frontend Development', level: 90 },
              { skill: 'Version Control (Git/GitHub)', level: 92 },
            ].map((item, index) => (
              <div key={index} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                <p className="font-medium text-gray-900 dark:text-white mb-2">{item.skill}</p>
                <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-indigo-600 to-purple-600 h-2 rounded-full"
                    style={{ width: `${item.level}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Soft Skills & Leadership */}
        <div className="mb-16 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
          <div className="flex items-center mb-6">
            <Brain className="w-8 h-8 text-indigo-600 dark:text-indigo-400 mr-3" />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Soft Skills & Leadership</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Leadership Roles</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <Trophy className="w-5 h-5 text-indigo-600 dark:text-indigo-400 mr-2 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">Environmental Leader</p>
                    <p className="text-gray-600 dark:text-gray-300">In charge of Cleaning and Environment in high school</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <Trophy className="w-5 h-5 text-indigo-600 dark:text-indigo-400 mr-2 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">Basketball Team Captain</p>
                    <p className="text-gray-600 dark:text-gray-300">Led team to win two championship cups</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <Trophy className="w-5 h-5 text-indigo-600 dark:text-indigo-400 mr-2 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">Refectory Manager</p>
                    <p className="text-gray-600 dark:text-gray-300">Managed high school refectory operations</p>
                  </div>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Key Skills</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <Brain className="w-5 h-5 text-indigo-600 dark:text-indigo-400 mr-2 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">Problem-Solving</p>
                    <p className="text-gray-600 dark:text-gray-300">Developing innovative tech solutions for implementation in April</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <Brain className="w-5 h-5 text-indigo-600 dark:text-indigo-400 mr-2 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">Project Management</p>
                    <p className="text-gray-600 dark:text-gray-300">Coordinating NCDs raising diseases project</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <Brain className="w-5 h-5 text-indigo-600 dark:text-indigo-400 mr-2 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">Team Collaboration</p>
                    <p className="text-gray-600 dark:text-gray-300">Leading multiple ongoing projects with effective communication</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Projects Section */}
        <div className="mb-16 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
          <div className="flex items-center mb-6">
            <Target className="w-8 h-8 text-indigo-600 dark:text-indigo-400 mr-3" />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Notable Projects</h2>
          </div>
          <div className="space-y-8">
            <div className="border-l-4 border-indigo-600 dark:border-indigo-400 pl-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">FISHA System</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-2">
                A solution for monitoring aquatic environments, integrating sensors, and focusing on African issues.
              </p>
              <div className="flex space-x-4">
                <a
                  href="https://gamma.app/docs/The-FISHA-System-Presented-by-fp05twbrbpdtn5j"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo-600 dark:text-indigo-400 hover:underline"
                >
                  View Presentation
                </a>
                <a
                  href="https://drive.google.com/file/d/1yUBGl0djQnAfD-pmeX3eJXHhc1yfhaF9/view?usp=sharing"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo-600 dark:text-indigo-400 hover:underline"
                >
                  Watch Pitch
                </a>
              </div>
            </div>
            <div className="border-l-4 border-indigo-600 dark:border-indigo-400 pl-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Car Rental Platform</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Modern platform for rental management with ML-enhanced location matching.
              </p>
            </div>
            <div className="border-l-4 border-indigo-600 dark:border-indigo-400 pl-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Tinder Clone</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Created during a workshop hosted by DevTown, certified by Google Student Clubs.
              </p>
            </div>
          </div>
        </div>

        {/* Vision and Hobbies */}
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
            <div className="flex items-center mb-6">
              <Target className="w-8 h-8 text-indigo-600 dark:text-indigo-400 mr-3" />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Career Vision</h2>
            </div>
            <p className="text-gray-600 dark:text-gray-300">
              My vision is to bridge the gap in cybersecurity talent in Africa, empowering communities through education,
              technology, and innovative solutions.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
            <div className="flex items-center mb-6">
              <Heart className="w-8 h-8 text-indigo-600 dark:text-indigo-400 mr-3" />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Personal Interests</h2>
            </div>
            <ul className="space-y-3">
              <li className="flex items-start">
                <Heart className="w-5 h-5 text-indigo-600 dark:text-indigo-400 mr-2 mt-1 flex-shrink-0" />
                <span className="text-gray-700 dark:text-gray-300">Playing God</span>
              </li>
              <li className="flex items-start">
                <Heart className="w-5 h-5 text-indigo-600 dark:text-indigo-400 mr-2 mt-1 flex-shrink-0" />
                <span className="text-gray-700 dark:text-gray-300">Reading Books</span>
              </li>
              <li className="flex items-start">
                <Heart className="w-5 h-5 text-indigo-600 dark:text-indigo-400 mr-2 mt-1 flex-shrink-0" />
                <span className="text-gray-700 dark:text-gray-300">Spending time with elders, learning from their stories and wisdom</span>
              </li>
              <li className="flex items-start">
                <Heart className="w-5 h-5 text-indigo-600 dark:text-indigo-400 mr-2 mt-1 flex-shrink-0" />
                <span className="text-gray-700 dark:text-gray-300">Participating in hackathons</span>
              </li>
              <li className="flex items-start">
                <Heart className="w-5 h-5 text-indigo-600 dark:text-indigo-400 mr-2 mt-1 flex-shrink-0" />
                <span className="text-gray-700 dark:text-gray-300">Contributing to open-source projects</span>
              </li>
              <li className="flex items-start">
                <Heart className="w-5 h-5 text-indigo-600 dark:text-indigo-400 mr-2 mt-1 flex-shrink-0" />
                <span className="text-gray-700 dark:text-gray-300">Sports and Basketball</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;