import React, { useState, useEffect } from 'react';
import { ExternalLink, Github, Play, FileText, Filter, Code2, Shield, Server, ArrowRight, Monitor, Smartphone, Cloud, Database, Layout, Activity, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Project {
  id: number;
  name: string;
  description: string;
  type: string[];
  technologies: string[];
  poster?: string;
  category: string;
  status: string;
  impact: string;
  links: {
    demo?: string;
    github?: string;
    pitch?: string;
    slides?: string;
  };
  year: number;
}

const projects: Project[] = [
  {
    id: 1,
    name: "Fish Kill Problem App",
    description: "A mobile app designed to address fish kill issues by providing real-time weather data and insights on aquatic environments. Integrates IoT sensors in ponds to monitor water conditions.",
    type: ["Mobile App", "Environmental Monitoring"],
    technologies: ["Flutter", "Firebase", "IoT Sensors", "REST API"],
    poster: "https://images.unsplash.com/photo-1534043464124-3be32fe000c9?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
    category: "Early Work",
    status: "Completed",
    impact: "Focused on Africa, enhancing pond management and reducing fish kills",
    links: {
      slides: "https://gamma.app/docs/The-FISHA-System-Presented-by-fp05twbrbpdtn5j",
      pitch: "https://drive.google.com/file/d/1yUBGl0djQnAfD-pmeX3eJXHhc1yfhaF9/view?usp=sharing"
    },
    year: 2023
  },
  {
    id: 2,
    name: "Tinder Clone",
    description: "A Tinder-like app focusing on swiping interactions and user-friendly designs. Developed during a workshop hosted by DevTown.",
    type: ["Mobile App", "UI/UX Design"],
    technologies: ["React Native", "Firebase"],
    poster: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
    category: "Early Work",
    status: "Completed",
    impact: "Developed advanced design and component structuring skills",
    links: {
      github: "https://github.com/enock-niyonsaba/tinder-clone"
    },
    year: 2023
  },
  {
    id: 3,
    name: "Professional Landing Page",
    description: "A modern landing page with admin-focused features, such as activity tracking and record management.",
    type: ["Web App", "Admin Dashboard"],
    technologies: ["React.js", "Tailwind CSS", "Figma", "Node.js"],
    poster: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
    category: "Intermediate Work",
    status: "Completed",
    impact: "Improved skills in design systems and creating optimized admin interfaces",
    links: {
      demo: "https://admin-dashboard.example.com",
      github: "https://github.com/enock-niyonsaba/admin-dashboard"
    },
    year: 2023
  },
  {
    id: 4,
    name: "CSS Workshop Projects",
    description: "A collection of advanced CSS designs and layouts created during a workshop by TWD Company.",
    type: ["Web Design", "Responsive UI"],
    technologies: ["HTML", "CSS", "JavaScript"],
    poster: "https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
    category: "Intermediate Work",
    status: "Completed",
    impact: "Strengthened UI/UX development skills",
    links: {
      demo: "https://css-workshop.example.com"
    },
    year: 2023
  },
  {
    id: 5,
    name: "MERN Activity Tracker",
    description: "A system to track activities and configuration changes for a VB project, including company details and license management.",
    type: ["Web App", "Monitoring System"],
    technologies: ["MongoDB", "Express.js", "React.js", "Node.js"],
    poster: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
    category: "Intermediate Work",
    status: "In Progress",
    impact: "Building skills in full-stack development and data synchronization",
    links: {
      github: "https://github.com/enock-niyonsaba/activity-tracker"
    },
    year: 2024
  },
  {
    id: 6,
    name: "Car Rental and Services App",
    description: "A comprehensive platform allowing users to rent cars, hire drivers, report lost documents, and access location-based suggestions.",
    type: ["Mobile App", "Web App", "Rental Platform"],
    technologies: ["React Native", "Firebase", "Machine Learning", "Tailwind CSS"],
    poster: "https://images.unsplash.com/photo-1550355291-bbee04a92027?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
    category: "Recent Projects",
    status: "Planning",
    impact: "Focused on scalability and enhancing local mobility services",
    links: {},
    year: 2024
  },
  {
    id: 7,
    name: "Non-Communicable Disease Detection App",
    description: "A mobile solution for early detection of unusual body signs, aiming to make healthcare accessible in rural areas.",
    type: ["Mobile App", "Healthcare Solution"],
    technologies: ["IoT", "AI", "Flutter", "Firebase"],
    poster: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
    category: "Recent Projects",
    status: "In Progress",
    impact: "Improving health monitoring and detection capabilities in underserved communities",
    links: {},
    year: 2024
  },
  {
    id: 8,
    name: "Cyber Hygiene Assessment Tool",
    description: "A web application that helps individuals and organizations evaluate their cybersecurity hygiene. Features include a questionnaire, scoring system, and personalized tips.",
    type: ["Web Tool", "Cybersecurity"],
    technologies: ["Python", "MongoDB", "Tailwind CSS"],
    poster: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
    category: "Cybersecurity Work",
    status: "Proposed",
    impact: "Aims to raise awareness about cybersecurity practices and provide actionable insights",
    links: {},
    year: 2024
  },
  {
    id: 9,
    name: "Secure Communication API",
    description: "An API service that offers secure message transmission using advanced encryption algorithms. Ideal for integrating into messaging platforms.",
    type: ["API", "Encryption Service"],
    technologies: ["Python", "FastAPI", "Docker"],
    poster: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
    category: "Cybersecurity Work",
    status: "Proposed",
    impact: "Provides practical skills in cryptography and API security design",
    links: {},
    year: 2024
  }
];

const Portfolio = () => {
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedTech, setSelectedTech] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [filteredProjects, setFilteredProjects] = useState<Project[]>(projects);

  const allTypes = Array.from(new Set(projects.flatMap(p => p.type)));
  const allTechnologies = Array.from(new Set(projects.flatMap(p => p.technologies)));
  const allCategories = Array.from(new Set(projects.map(p => p.category)));
  const allStatuses = Array.from(new Set(projects.map(p => p.status)));

  useEffect(() => {
    let filtered = projects;

    if (selectedTypes.length > 0) {
      filtered = filtered.filter(project =>
        project.type.some(type => selectedTypes.includes(type))
      );
    }

    if (selectedTech.length > 0) {
      filtered = filtered.filter(project =>
        project.technologies.some(tech => selectedTech.includes(tech))
      );
    }

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(project => project.category === selectedCategory);
    }

    if (selectedStatus !== 'all') {
      filtered = filtered.filter(project => project.status === selectedStatus);
    }

    setFilteredProjects(filtered);
  }, [selectedTypes, selectedTech, selectedCategory, selectedStatus]);

  const toggleType = (type: string) => {
    setSelectedTypes(prev =>
      prev.includes(type)
        ? prev.filter(t => t !== type)
        : [...prev, type]
    );
  };

  const toggleTech = (tech: string) => {
    setSelectedTech(prev =>
      prev.includes(tech)
        ? prev.filter(t => t !== tech)
        : [...prev, tech]
    );
  };

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case 'completed':
        return <Activity className="w-4 h-4 text-green-500" />;
      case 'in progress':
        return <Activity className="w-4 h-4 text-yellow-500" />;
      case 'planning':
        return <Activity className="w-4 h-4 text-blue-500" />;
      case 'proposed':
        return <Activity className="w-4 h-4 text-purple-500" />;
      default:
        return <Activity className="w-4 h-4 text-gray-500" />;
    }
  };

  return (
    <div className="min-h-screen pt-16 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 mb-4">
            Portfolio
          </h1>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Explore my journey through various projects, from early experiments to recent innovations in web development, mobile apps, and cybersecurity.
          </p>
        </div>

        {/* Filters */}
        <div className="mb-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <div className="flex items-center mb-4">
            <Filter className="w-5 h-5 text-indigo-600 dark:text-indigo-400 mr-2" />
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Filters</h2>
          </div>
          
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Category</h3>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setSelectedCategory('all')}
                  className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                    selectedCategory === 'all'
                      ? 'bg-indigo-600 text-white'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  All Categories
                </button>
                {allCategories.map(category => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                      selectedCategory === category
                        ? 'bg-indigo-600 text-white'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Project Type</h3>
              <div className="flex flex-wrap gap-2">
                {allTypes.map(type => (
                  <button
                    key={type}
                    onClick={() => toggleType(type)}
                    className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                      selectedTypes.includes(type)
                        ? 'bg-purple-600 text-white'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Technologies</h3>
              <div className="flex flex-wrap gap-2">
                {allTechnologies.map(tech => (
                  <button
                    key={tech}
                    onClick={() => toggleTech(tech)}
                    className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                      selectedTech.includes(tech)
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                    }`}
                  >
                    {tech}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Status</h3>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setSelectedStatus('all')}
                  className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                    selectedStatus === 'all'
                      ? 'bg-indigo-600 text-white'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  All Statuses
                </button>
                {allStatuses.map(status => (
                  <button
                    key={status}
                    onClick={() => setSelectedStatus(status)}
                    className={`px-3 py-1 rounded-full text-sm font-medium transition-colors flex items-center gap-2 ${
                      selectedStatus === status
                        ? 'bg-indigo-600 text-white'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                    }`}
                  >
                    {getStatusIcon(status)}
                    {status}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map(project => (
            <div
              key={project.id}
              className="project-card bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden"
            >
              <div className="relative">
                {project.poster ? (
                  <img
                    src={project.poster}
                    alt={project.name}
                    className="w-full h-48 object-cover"
                  />
                ) : (
                  <div className="w-full h-48 bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                    <Code2 className="w-12 h-12 text-gray-400 dark:text-gray-500" />
                  </div>
                )}
                <div className="overlay absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center space-x-4">
                  {project.links.demo && (
                    <a
                      href={project.links.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 bg-white rounded-full hover:bg-gray-100 transition-colors"
                      title="Live Demo"
                    >
                      <ExternalLink className="w-5 h-5 text-gray-900" />
                    </a>
                  )}
                  {project.links.github && (
                    <a
                      href={project.links.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 bg-white rounded-full hover:bg-gray-100 transition-colors"
                      title="GitHub Repository"
                    >
                      <Github className="w-5 h-5 text-gray-900" />
                    </a>
                  )}
                  {project.links.pitch && (
                    <a
                      href={project.links.pitch}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 bg-white rounded-full hover:bg-gray-100 transition-colors"
                      title="Pitch Video"
                    >
                      <Play className="w-5 h-5 text-gray-900" />
                    </a>
                  )}
                  {project.links.slides && (
                    <a
                      href={project.links.slides}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 bg-white rounded-full hover:bg-gray-100 transition-colors"
                      title="Presentation Slides"
                    >
                      <FileText className="w-5 h-5 text-gray-900" />
                    </a>
                  )}
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    {project.name}
                  </h3>
                  <div className="flex items-center gap-2">
                    {getStatusIcon(project.status)}
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {project.status}
                    </span>
                  </div>
                </div>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {project.description}
                </p>
                <div className="mb-4">
                  <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Impact
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {project.impact}
                  </p>
                </div>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map(tech => (
                    <span
                      key={tech}
                      className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {project.year}
                  </span>
                  <div className="flex space-x-2">
                    {project.type.map(type => (
                      <span
                        key={type}
                        className="text-sm text-indigo-600 dark:text-indigo-400"
                      >
                        {type}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Contact CTA */}
        <div className="mt-12 text-center">
          <Link
            to="/contact"
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105"
          >
            Let's Work Together
            <ArrowRight className="w-5 h-5 ml-2" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Portfolio;