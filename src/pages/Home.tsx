import React, { useEffect, useRef } from 'react';
import { Github, Linkedin, Mail, Download, Code2, Shield, Terminal } from 'lucide-react';
import { Link } from 'react-router-dom';

const Home = () => {
  const iconRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('slide-in');
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll('.animate-on-scroll');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen pt-16 bg-gradient-animate bg-gradient-to-br from-gray-50 via-indigo-50 to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-float"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-float" style={{ animationDelay: '-1.5s' }}></div>
        <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-float" style={{ animationDelay: '-3s' }}></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative">
        <div className="text-center">
          <div className="mb-8 relative">
            <div className="w-50 h-60 rounded-full mx-auto overflow-hidden border-4 border-indigo-500 dark:border-indigo-400 animate-pulse-slow">
  <img 
    src="https://your-image-url.com/your-profile-picture.jpg" 
    alt="Enock NIYONSABA" 
    className="w-full h-full object-cover"
  />
</div>
            <div className="absolute inset-0 w-40 h-40 mx-auto rounded-full border-2 border-indigo-500 opacity-50 animate-pulse" style={{ animationDelay: '-0.5s' }}></div>
          </div>

          <div className="zigzag-line mx-auto max-w-md"></div>

          <div className="animate-on-scroll opacity-0">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 dark:from-indigo-400 dark:via-purple-400 dark:to-pink-400 mb-4">
              Enock NIYONSABA
            </h1>
          </div>

          <div className="animate-on-scroll opacity-0" style={{ animationDelay: '0.2s' }}>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
              Cybersecurity Enthusiast | Software Engineer | Student Leader
            </p>
          </div>

          {/* Elevator Pitch Video Section */}
          <div className="max-w-3xl mx-auto mb-12 animate-on-scroll opacity-0" style={{ animationDelay: '0.3s' }}>
            <div className="relative bg-gray-200 dark:bg-gray-700 rounded-lg shadow-lg overflow-hidden" style={{ paddingTop: '56.25%' }}>
              <iframe
                className="absolute inset-0 w-full h-full"
                poster="https://media.istockphoto.com/id/1226991733/photo/successful-motivational-speaker-talking-about-happiness-self-success-empowerment-efficiency.jpg?s=1024x1024&w=is&k=20&c=yvrKoU6u3oICBSpWJHQQJkhNMYTU4Ql6-4-iXG5MX_I="
                src="https://www.youtube.com/embed/siSAHaFK5oA"
                title="Elevator Pitch - Enock NIYONSABA"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>

          <div ref={iconRef} className="flex justify-center space-x-6 mb-12 animate-on-scroll opacity-0" style={{ animationDelay: '0.4s' }}>
            <a
              href="https://github.com/enock-niyonsaba"
              target="_blank"
              rel="noopener noreferrer"
              className="icon-hover p-3 bg-gray-800 dark:bg-gray-700 text-white rounded-full hover:bg-gray-700 dark:hover:bg-gray-600 transition-all"
            >
              <Github className="w-6 h-6" />
            </a>
            <a
              href="https://www.linkedin.com/in/enock-niyonsaba-58b02432a"
              target="_blank"
              rel="noopener noreferrer"
              className="icon-hover p-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-all"
            >
              <Linkedin className="w-6 h-6" />
            </a>
            <a
              href="mailto:enockccg28@gmail.com"
              className="icon-hover p-3 bg-red-600 text-white rounded-full hover:bg-red-700 transition-all"
            >
              <Mail className="w-6 h-6" />
            </a>
          </div>

          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12 animate-on-scroll opacity-0" style={{ animationDelay: '0.6s' }}>
            <a
              href="/resume.pdf"
              download
              className="icon-hover inline-flex items-center px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105"
            >
              <Download className="w-5 h-5 mr-2" />
              Download Resume
            </a>
            <Link
              to="/portfolio"
              className="icon-hover inline-flex items-center px-6 py-3 bg-white dark:bg-gray-800 text-gray-900 dark:text-white font-semibold rounded-lg border-2 border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-300 transform hover:scale-105"
            >
              View Portfolio
            </Link>
          </div>

          <div className="gradient-line my-8 max-w-2xl mx-auto"></div>

          <div className="flex justify-center gap-8 mb-12 animate-on-scroll opacity-0" style={{ animationDelay: '0.8s' }}>
            <div className="flex flex-col items-center">
              <Shield className="w-8 h-8 text-indigo-600 dark:text-indigo-400 animate-float" />
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">Security First</p>
            </div>
            <div className="flex flex-col items-center">
              <Code2 className="w-8 h-8 text-purple-600 dark:text-purple-400 animate-float" style={{ animationDelay: '-1s' }} />
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">Clean Code</p>
            </div>
            <div className="flex flex-col items-center">
              <Terminal className="w-8 h-8 text-pink-600 dark:text-pink-400 animate-float" style={{ animationDelay: '-2s' }} />
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">Innovation</p>
            </div>
          </div>

          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto animate-on-scroll opacity-0" style={{ animationDelay: '0.5s' }}>
            I'm a passionate cybersecurity enthusiast and software engineer with a strong foundation in full-stack development.
            Currently pursuing my degree while leading various tech initiatives and contributing to open-source projects.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;