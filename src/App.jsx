import React, { useState, useEffect } from 'react';

// Main App Component
export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Use useEffect to handle URL hash changes for a simple, self-contained "router"
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (['home', 'projects', 'contact'].includes(hash)) {
        setCurrentPage(hash);
      } else {
        setCurrentPage('home');
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    handleHashChange(); // Initial check

    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Helper function to navigate and close mobile menu
  const navigate = (page) => {
    setCurrentPage(page);
    window.location.hash = page;
    setIsMenuOpen(false);
  };

  // The main layout of the application
  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 font-sans antialiased flex flex-col items-center">
      {/* Header component containing both desktop and mobile navigation */}
      <Header navigate={navigate} isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
      
      <main className="container mx-auto p-4 md:p-8 flex-grow">
        {(() => {
          switch (currentPage) {
            case 'projects':
              return <ProjectsSection />;
            case 'contact':
              return <ContactSection />;
            default:
              return <HomeSection />;
          }
        })()}
      </main>
      <Footer />
    </div>
  );
}

// Data for the portfolio. You can easily edit this!
const portfolioData = {
  name: "Akinwoleola Clinton",
  role: "Full-Stack Developer",
  experience: "2 Years of Experience", // Added years of experience
  bio: "I am a passionate web developer dedicated to creating intuitive and visually compelling digital experiences. I approach every project with grit and dedication, committed to seeing challenges through to a polished conclusion. I am a lifelong learner, constantly exploring new technologies to expand my skills and deliver better results. I specialize in the MERN stack and love creating beautiful and performant user interfaces.",
  skills: [
    { name: 'React', level: 'Expert' },
    { name: 'JavaScript', level: 'Expert' },
    { name: 'Node.js', level: 'Intermediate' },
    { name: 'Tailwind CSS', level: 'Expert' },
    { name: 'MongoDB', level: 'Beginner' },
  ],
  projects: [
    {
      title: 'Multi-Step Form App',
      description: 'A responsive multi-step form built to demonstrate user data collection and validation. Features clear navigation and a clean, modern UI.',
      techStack: ['React', 'Tailwind CSS', 'Vite'],
      link: 'https://multi-stepss.pages.dev/',
      github: 'https://github.com/Clinton6801/multi-step.git',
    },
    {
      title: 'E-commerce Storefront',
      description: 'A modern e-commerce platform featuring product listings, a shopping cart, and a checkout flow. Built with a focus on a seamless user experience.',
      techStack: ['React', 'Node.js', 'MongoDB', 'Express'],
      link: 'https://e-commerce-d4q.pages.dev/',
      github: 'https://github.com/Clinton6801/e-commerce.git',
    },
    {
      title: 'Interactive Tic-Tac-Toe Game',
      description: 'A classic Tic-Tac-Toe game created with React to showcase state management and component-based architecture. Includes a win condition and turn-based logic.',
      techStack: ['React', 'JavaScript', 'CSS'],
      link: 'https://tic-tac-toe-8tg.pages.dev/',
      github: 'https://github.com/Clinton6801/tic-tac-toe.git',
    },
    {
      title: 'Movie Rating App',
      description: 'This application is a dynamic movie rating platform that seamlessly integrates with a third-party API to provide users with up-to-date movie information. Users can browse a comprehensive list of films, view detailed descriptions, cast information, and see real-time ratings.',
      techStack: ['React', 'JavaScript', 'CSS'],
      link: 'https://moviess-rcu.pages.dev/',
      github: 'https://github.com/Clinton6801/tic-tac-toe.git',
    },
  ],
  contact: {
    email: 'akinwoleolaclinton@gmail.com',
    phone: '+234 903 778 9995',
    linkedin: 'https://linkedin.com/in/akinwoleolaclinton',
    github: 'https://github.com/Clinton6801',
    location: 'Lagos, Nigeria',
    resume: 'https://docs.google.com/document/d/1234567890/edit?usp=sharing' // Placeholder resume link
  }
};

// Header component with navigation links and the mobile menu dropdown
function Header({ navigate, isMenuOpen, setIsMenuOpen }) {
  const NavLink = ({ page, children }) => (
    <button
      onClick={() => navigate(page)}
      className="text-lg font-medium hover:text-indigo-400 transition-colors duration-200"
    >
      {children}
    </button>
  );

  return (
    <header className="sticky top-0 z-50 w-full bg-slate-900 bg-opacity-90 backdrop-blur-md shadow-lg py-4">
      <nav className="container mx-auto px-4 md:px-8 flex justify-between items-center">
        {/* Logo/Name */}
        <h1 className="text-2xl font-bold text-indigo-400">
          <button onClick={() => navigate('home')}>Clinton's Portfolio</button>
        </h1>
        
        {/* Mobile Menu Button - shows on small screens */}
        <div className="md:hidden">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-slate-100 focus:outline-none p-2">
            {isMenuOpen ? (
              // Close Icon (X)
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              // Hamburger Icon
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Desktop Navigation - hidden on small screens */}
        <div className="hidden md:flex gap-8">
          <NavLink page="home">About</NavLink>
          <NavLink page="projects">Projects</NavLink>
          <NavLink page="contact">Contact</NavLink>
        </div>
      </nav>

      {/* Mobile Dropdown Menu - appears when 'isMenuOpen' is true */}
      <div className={`md:hidden absolute inset-x-0 top-full z-40 bg-slate-800 shadow-lg transition-all duration-300 ease-in-out ${isMenuOpen ? 'block opacity-100 translate-y-0' : 'hidden opacity-0 -translate-y-full'}`}>
        <div className="flex flex-col items-center gap-4 py-4">
          <button
            onClick={() => navigate('home')}
            className="text-lg font-medium w-full text-center hover:text-indigo-400 transition-colors duration-200"
          >
            About
          </button>
          <button
            onClick={() => navigate('projects')}
            className="text-lg font-medium w-full text-center hover:text-indigo-400 transition-colors duration-200"
          >
            Projects
          </button>
          <button
            onClick={() => navigate('contact')}
            className="text-lg font-medium w-full text-center hover:text-indigo-400 transition-colors duration-200"
          >
            Contact
          </button>
        </div>
      </div>
    </header>
  );
}

// Home Section (includes About and Skills)
function HomeSection() {
  return (
    <section id="home" className="space-y-16">
      <AboutSection />
      <hr className="border-slate-700" />
      <SkillsSection />
    </section>
  );
}

// About Section Component
function AboutSection() {
  return (
    <section id="about" className="text-center py-12 md:py-24">
      <div className="flex flex-col items-center">
        <img
          src="./clinton.jpg"
          alt="Your profile picture"
          className="w-36 h-36 md:w-48 md:h-48 rounded-full object-cover mb-6 shadow-2xl border-4 border-indigo-500"
        />
        <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-2">{portfolioData.name}</h2>
        <p className="text-xl md:text-2xl text-indigo-400 font-semibold mb-1">{portfolioData.role}</p>
        <p className="text-lg font-medium text-slate-300 mb-4">{portfolioData.experience}</p> {/* Added years of experience */}
        <p className="text-md md:text-lg max-w-2xl text-slate-300 leading-relaxed">{portfolioData.bio}</p>
      </div>
    </section>
  );
}

// Skills Section Component
function SkillsSection() {
  return (
    <section id="skills" className="py-12 md:py-24">
      <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-8">My Skills</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {portfolioData.skills.map((skill, index) => (
          <div key={index} className="bg-slate-800 p-6 rounded-xl shadow-lg border border-slate-700">
            <h3 className="text-xl font-semibold mb-2 flex items-center gap-2 text-indigo-300">
              💻 {skill.name}
            </h3>
            <p className="text-slate-400">{skill.level}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

// Projects Section Component
function ProjectsSection() {
  return (
    <section id="projects" className="py-12 md:py-24">
      <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-8">My Projects</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {portfolioData.projects.map((project, index) => (
          <div key={index} className="bg-slate-800 rounded-xl shadow-lg overflow-hidden border border-slate-700 hover:shadow-2xl transition-shadow duration-300 ease-in-out">
            <div className="p-6">
              <h3 className="text-2xl font-bold text-indigo-300 mb-2">{project.title}</h3>
              <p className="text-slate-400 mb-4">{project.description}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {project.techStack.map((tech, i) => (
                  <span key={i} className="bg-slate-700 text-sm font-medium px-3 py-1 rounded-full text-indigo-200">
                    {tech}
                  </span>
                ))}
              </div>
              <div className="flex gap-4">
                <a href={project.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-indigo-400 hover:text-indigo-300 font-medium transition-colors">
                  🔗 Live Demo
                </a>
                <a href={project.github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-slate-400 hover:text-slate-300 font-medium transition-colors">
                  <img src="./github-logo-icon.png" alt="GitHub Logo" className="w-6 h-6" /> GitHub
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// Contact Section Component
function ContactSection() {
  return (
    <section id="contact" className="py-12 md:py-24 max-w-3xl mx-auto">
      <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-8">Get in Touch</h2>
      <div className="bg-slate-800 p-8 rounded-xl shadow-lg border border-slate-700 text-center">
        <p className="text-slate-300 text-lg mb-6">I'm currently open to new opportunities. Feel free to reach out!</p>
        <div className="flex flex-col sm:flex-row justify-center gap-6 mb-8">
          <a href={`mailto:${portfolioData.contact.email}`} className="flex items-center gap-2 text-indigo-400 font-medium hover:text-indigo-300 transition-colors">
              <img src="./gmail.png" alt="Gmail Logo" className="w-6 h-6" /> {portfolioData.contact.email}
          </a>
          <a href={`tel:${portfolioData.contact.phone}`} className="flex items-center gap-2 text-indigo-400 font-medium hover:text-indigo-300 transition-colors">
            <img src="./calll.png" alt="Calll Logo" className="w-6 h-6" /> {portfolioData.contact.phone}
          </a>
          <span className="flex items-center gap-2 text-slate-400">
            <img src="./location.png" alt="Location Logo" className="w-6 h-6" /> {portfolioData.contact.location}
          </span>
        </div>
        <div className="flex justify-center gap-4 flex-wrap">
          {/* Resume link with text label and styling */}
          <a href={portfolioData.contact.resume} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm text-slate-100 bg-slate-700 hover:bg-indigo-600 transition-colors duration-200 px-4 py-2 rounded-full shadow-md">
            📄 Resume
          </a>
          {/* GitHub link with text label and styling */}
          <a href={portfolioData.contact.github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm text-slate-100 bg-slate-700 hover:bg-indigo-600 transition-colors duration-200 px-4 py-2 rounded-full shadow-md">
            <img src="./github-logo-icon.png" alt="GitHub Logo" className="w-6 h-6" /> GitHub
          </a>
          {/* LinkedIn link with text label and styling */}
          <a href={portfolioData.contact.linkedin} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm text-slate-100 bg-slate-700 hover:bg-indigo-600 transition-colors duration-200 px-4 py-2 rounded-full shadow-md">
            <img src="./linkedln.png" alt="LinkedIn Logo" className="w-6 h-6" /> LinkedIn
          </a>
        </div>
      </div>
    </section>
  );
}

// Footer Component
function Footer() {
  return (
    <footer className="w-full bg-slate-900 py-6 text-center text-slate-500 text-sm">
      <p>&copy; {new Date().getFullYear()} {portfolioData.name}. All rights reserved.</p>
    </footer>
  );
}
