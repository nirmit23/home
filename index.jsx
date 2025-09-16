import React, { useState, useEffect } from 'react';
import { Mail, Phone, Linkedin, Github, MapPin, Calendar, Code, Database, Cloud, Globe, ArrowRight, Star, Zap, Monitor } from 'lucide-react';

const Portfolio = () => {
  const [activeSection, setActiveSection] = useState('hero');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [stars, setStars] = useState([]);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'about', 'experience', 'projects', 'skills', 'contact'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    const handleMouseMove = (e) => {
      const newX = e.clientX;
      const newY = e.clientY;
      setMousePosition({ x: newX, y: newY });

      // Create new star on mouse move
      const newStar = {
        id: Date.now() + Math.random(),
        x: newX + (Math.random() - 0.5) * 40,
        y: newY + (Math.random() - 0.5) * 40,
        opacity: 1,
        scale: Math.random() * 0.5 + 0.3,
        rotation: Math.random() * 360,
        color: ['text-blue-400', 'text-gray-400', 'text-slate-400', 'text-blue-300'][Math.floor(Math.random() * 4)]
      };

      setStars(prevStars => {
        const filteredStars = prevStars.filter(star => star.opacity > 0);
        return [...filteredStars, newStar].slice(-15); // Keep only last 15 stars
      });
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);
    
    // Animate and fade out stars
    const starInterval = setInterval(() => {
      setStars(prevStars => 
        prevStars.map(star => ({
          ...star,
          opacity: star.opacity - 0.05,
          y: star.y - 1,
          rotation: star.rotation + 2
        })).filter(star => star.opacity > 0)
      );
    }, 50);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
      clearInterval(starInterval);
    };
  }, []);

  const scrollToSection = (sectionId) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 to-blue-600 relative overflow-hidden">
      {/* Pixel Pattern Background */}
      <div className="fixed inset-0 opacity-20 pointer-events-none">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            repeating-linear-gradient(
              45deg,
              transparent,
              transparent 10px,
              rgba(255,255,255,0.1) 10px,
              rgba(255,255,255,0.1) 20px
            ),
            repeating-linear-gradient(
              -45deg,
              transparent,
              transparent 10px,
              rgba(255,255,255,0.05) 10px,
              rgba(255,255,255,0.05) 20px
            )
          `
        }}></div>
      </div>

      {/* Floating Tech Icons Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 text-6xl text-white/10 transform rotate-12 animate-pulse">💻</div>
        <div className="absolute top-40 right-32 text-5xl text-white/10 transform -rotate-12 animate-pulse delay-1000">⚙️</div>
        <div className="absolute bottom-32 left-40 text-4xl text-white/10 transform rotate-45 animate-pulse delay-2000">🔧</div>
        <div className="absolute top-60 left-1/3 text-3xl text-white/10 transform -rotate-45 animate-pulse delay-3000">📱</div>
        <div className="absolute bottom-60 right-40 text-5xl text-white/10 transform rotate-12 animate-pulse delay-4000">🖥️</div>
        <div className="absolute top-80 right-20 text-4xl text-white/10 transform -rotate-12 animate-pulse delay-5000">💾</div>

        {/* Floating Stars - Highest Z-Index */}
        <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 10000 }}>
          {stars.map((star) => (
            <div
              key={star.id}
              className={`absolute text-xs ${star.color} transition-all duration-75 ease-out`}
              style={{
                left: star.x,
                top: star.y,
                opacity: star.opacity,
                transform: `scale(${star.scale}) rotate(${star.rotation}deg)`,
                fontSize: '12px'
              }}
            >
              ✨
            </div>
          ))}
        </div>
      </div>

      {/* Navigation - Mac Style */}
      <nav className="fixed top-0 w-full z-40">
        <div className="bg-gray-100/95 backdrop-blur-xl border-b-2 border-gray-300 shadow-md">
          <div className="max-w-6xl mx-auto px-6 py-3">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <div className="ml-4 text-lg font-bold text-gray-800">
                  Nirmit Shah - Portfolio
                </div>
              </div>
              <div className="hidden md:flex space-x-1">
                {['About', 'Experience', 'Projects', 'Skills', 'Contact'].map((item) => (
                  <button
                    key={item}
                    onClick={() => scrollToSection(item.toLowerCase())}
                    className={`px-4 py-2 rounded text-sm font-medium transition-all duration-200 ${
                      activeSection === item.toLowerCase() 
                        ? 'bg-blue-500 text-white shadow-md' 
                        : 'text-gray-700 hover:bg-gray-200 hover:text-blue-600'
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section - Mac Window Style */}
      <section id="hero" className="pt-24 pb-16 relative">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <div className="bg-gray-100 rounded-lg border-2 border-gray-300 shadow-2xl mb-8 relative overflow-hidden">
            {/* Mac Window Header */}
            <div className="bg-gray-200 border-b border-gray-300 px-4 py-3 flex items-center">
              <div className="flex space-x-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              </div>
              <div className="flex-1 text-center text-gray-600 text-sm font-medium">
                Nirmit Shah - Software Engineer
              </div>
            </div>
            
            <div className="p-12 bg-white">
              <div className="w-32 h-32 mx-auto mb-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center text-white text-4xl font-bold shadow-lg border-2 border-gray-300">
                NS
              </div>
              <h1 className="text-5xl md:text-6xl font-bold text-gray-800 mb-6">
                Nirmit Shah 👋
              </h1>
              <p className="text-3xl md:text-4xl text-gray-600 mb-4 font-bold">
                Code. Create. Scale. ⚡
              </p>
              <p className="text-xl md:text-2xl text-blue-600 mb-6 font-medium">
                Full-Stack Engineer & Cloud Architect
              </p>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-8 leading-relaxed">
                I turn complex problems into elegant solutions. From React frontends to AWS infrastructure, 
                I build applications that scale from <span className="font-semibold text-gray-800">319K+ users</span> to enterprise-level systems. 
                Currently engineering the future at <span className="font-semibold text-blue-600">Northeastern University</span> 🎯
              </p>
              <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-500 mb-8">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                  Available for opportunities
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span>
                  Boston, MA
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-gray-500 rounded-full animate-pulse"></span>
                  Open to remote work
                </div>
              </div>
              <div className="flex flex-wrap justify-center gap-6">
                <a href="mailto:shah.nirm@northeastern.edu" 
                   className="group inline-flex items-center px-8 py-4 bg-blue-500 hover:bg-blue-600 text-white rounded border-2 border-blue-600 font-bold shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-1">
                  <Mail className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform" />
                  Let's Build Something
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </a>
                <button 
                  onClick={() => scrollToSection('projects')}
                  className="group inline-flex items-center px-8 py-4 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded border-2 border-gray-300 font-bold shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-1">
                  <Zap className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform text-blue-500" />
                  See My Work
                  <Star className="w-4 h-4 ml-2 group-hover:rotate-180 transition-transform text-blue-500" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section - Mac Dialog Style */}
      <section id="about" className="py-16 relative">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center text-white mb-12 drop-shadow-lg">
            About Me 🎯
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gray-100 rounded-lg border-2 border-gray-300 shadow-xl hover:shadow-2xl transition-all duration-300">
              <div className="bg-gray-200 border-b border-gray-300 px-4 py-2 flex items-center">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                  <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                </div>
                <div className="flex-1 text-center text-gray-600 text-sm">About.txt</div>
              </div>
              <div className="p-8 bg-white">
                <p className="text-lg text-gray-700 mb-8 leading-relaxed">
                  I'm a passionate Software Development Engineer with expertise in full-stack development, 
                  cloud computing, and modern web technologies. Currently pursuing my Master's in Computer 
                  Software Engineering at Northeastern University.
                </p>
                <div className="space-y-4">
                  {[
                    { icon: MapPin, text: "Boston, MA" },
                    { icon: Phone, text: "(857) 398-8283" },
                    { icon: Mail, text: "shah.nirm@northeastern.edu" },
                    { icon: Linkedin, text: "linkedin.com/in/shah-nirmit/" }
                  ].map((item, index) => (
                    <div key={index} className="flex items-center text-gray-700 group">
                      <div className="p-2 rounded bg-blue-100 mr-4 group-hover:bg-blue-200 transition-colors">
                        <item.icon className="w-5 h-5 text-blue-600" />
                      </div>
                      {item.text}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="bg-gray-100 rounded-lg border-2 border-gray-300 shadow-xl hover:shadow-2xl transition-all duration-300">
              <div className="bg-gray-200 border-b border-gray-300 px-4 py-2 flex items-center">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                  <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                </div>
                <div className="flex-1 text-center text-gray-600 text-sm">Education.doc</div>
              </div>
              <div className="p-8 bg-white">
                <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                  <span className="text-3xl mr-3">🎓</span>
                  Education
                </h3>
                <div className="space-y-6">
                  <div className="relative pl-6 border-l-4 border-blue-500">
                    <h4 className="font-bold text-gray-800 text-lg">Master of Science in Computer Software Engineering</h4>
                    <p className="text-blue-600 font-semibold">Northeastern University</p>
                    <p className="text-gray-500">Boston, MA • Present</p>
                  </div>
                  <div className="relative pl-6 border-l-4 border-gray-400">
                    <h4 className="font-bold text-gray-800 text-lg">Bachelor of Engineering in Information Technology</h4>
                    <p className="text-gray-600 font-semibold">University of Mumbai</p>
                    <p className="text-gray-500">Mumbai, India • May 2022</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-16 relative">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center text-white mb-12 drop-shadow-lg">
            Experience 💼
          </h2>
          <div className="space-y-8">
            
            {/* Enlabel Global Services */}
            <div className="bg-gray-100 rounded-lg border-2 border-gray-300 shadow-xl hover:shadow-2xl transition-all duration-300">
              <div className="bg-gray-200 border-b border-gray-300 px-4 py-2 flex items-center">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                  <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                </div>
                <div className="flex-1 text-center text-gray-600 text-sm">Enlabel Global Services Inc.</div>
              </div>
              <div className="p-8 bg-white">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-800 flex items-center mb-2">
                      <Zap className="w-6 h-6 mr-3 text-blue-500" />
                      Software Development Engineer
                    </h3>
                    <p className="text-xl text-blue-600 font-semibold">Enlabel Global Services Inc.</p>
                    <p className="text-gray-600">Boston, Massachusetts</p>
                  </div>
                  <div className="flex items-center text-gray-500 mt-2 lg:mt-0 bg-gray-100 px-4 py-2 rounded border border-gray-300">
                    <Calendar className="w-4 h-4 mr-2" />
                    June 2024 - January 2025
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  {[
                    { icon: "✅", text: "Stabilized CI/CD pipelines by debugging 40+ failing test cases, cutting failures by 25%" },
                    { icon: "⚡", text: "Accelerated release readiness by 30% through 163+ automated tests" },
                    { icon: "🔧", text: "Engineered full-stack SaaS features with reusable React components" },
                    { icon: "📈", text: "Delivered responsive website driving 15% increase in user engagement" }
                  ].map((achievement, index) => (
                    <div key={index} className="flex items-start group/item">
                      <span className="text-2xl mr-3 group-hover/item:scale-125 transition-transform">{achievement.icon}</span>
                      <span className="text-gray-700">{achievement.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Finalyca Technologies */}
            <div className="bg-gray-100 rounded-lg border-2 border-gray-300 shadow-xl hover:shadow-2xl transition-all duration-300">
              <div className="bg-gray-200 border-b border-gray-300 px-4 py-2 flex items-center">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                  <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                </div>
                <div className="flex-1 text-center text-gray-600 text-sm">Finalyca Technologies Pvt. Ltd</div>
              </div>
              <div className="p-8 bg-white">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-800 flex items-center mb-2">
                      <Star className="w-6 h-6 mr-3 text-blue-500" />
                      Software Development Engineer
                    </h3>
                    <p className="text-xl text-gray-600 font-semibold">Finalyca Technologies Pvt. Ltd</p>
                    <p className="text-gray-600">Mumbai, India</p>
                  </div>
                  <div className="flex items-center text-gray-500 mt-2 lg:mt-0 bg-gray-100 px-4 py-2 rounded border border-gray-300">
                    <Calendar className="w-4 h-4 mr-2" />
                    June 2022 - June 2023
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  {[
                    { icon: "🏗️", text: "Architected Next.js website with Ant Design UI Library" },
                    { icon: "🚀", text: "Migrated portal from .NET to React.js, achieving 33% efficiency boost" },
                    { icon: "📊", text: "Implemented 34+ Highcharts features with 99% cross-browser support" }
                  ].map((achievement, index) => (
                    <div key={index} className="flex items-start group/item">
                      <span className="text-2xl mr-3 group-hover/item:scale-125 transition-transform">{achievement.icon}</span>
                      <span className="text-gray-700">{achievement.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Shaalastic */}
            <div className="bg-gray-100 rounded-lg border-2 border-gray-300 shadow-xl hover:shadow-2xl transition-all duration-300">
              <div className="bg-gray-200 border-b border-gray-300 px-4 py-2 flex items-center">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                  <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                </div>
                <div className="flex-1 text-center text-gray-600 text-sm">Shaalastic</div>
              </div>
              <div className="p-8 bg-white">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-800 flex items-center mb-2">
                      <Code className="w-6 h-6 mr-3 text-blue-500" />
                      Software Engineer Intern
                    </h3>
                    <p className="text-xl text-gray-600 font-semibold">Shaalastic</p>
                    <p className="text-gray-600">Mumbai, India</p>
                  </div>
                  <div className="flex items-center text-gray-500 mt-2 lg:mt-0 bg-gray-100 px-4 py-2 rounded border border-gray-300">
                    <Calendar className="w-4 h-4 mr-2" />
                    May 2020 - July 2020
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  {[
                    { icon: "🌐", text: "Built instructional website using Laravel and PHP with authentication" },
                    { icon: "🗄️", text: "Engineered backend with Laravel MVC and RESTful APIs with MySQL" }
                  ].map((achievement, index) => (
                    <div key={index} className="flex items-start group/item">
                      <span className="text-2xl mr-3 group-hover/item:scale-125 transition-transform">{achievement.icon}</span>
                      <span className="text-gray-700">{achievement.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-16 relative">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center text-white mb-12 drop-shadow-lg">
            Featured Projects 🚀
          </h2>
          <div className="grid lg:grid-cols-2 gap-8">
            
            {/* Health Check API */}
            <div className="bg-gray-100 rounded-lg border-2 border-gray-300 shadow-xl hover:shadow-2xl transition-all duration-300">
              <div className="bg-gray-200 border-b border-gray-300 px-4 py-2 flex items-center">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                  <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                </div>
                <div className="flex-1 text-center text-gray-600 text-sm">Health Check API</div>
              </div>
              <div className="p-8 bg-white">
                <div className="flex items-center mb-6">
                  <div className="p-3 bg-blue-100 rounded mr-4 border border-blue-200">
                    <Cloud className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800">Health Check API ☁️</h3>
                </div>
                <p className="text-gray-700 mb-6 leading-relaxed">
                  Cloud-native REST API built with Node.js, Express, and MySQL on AWS EC2 with complete CI/CD automation and zero-touch deployments.
                </p>
                <div className="flex flex-wrap gap-3 mb-6">
                  {[
                    { tech: 'AWS', color: 'bg-blue-100 text-blue-700 border-blue-200' },
                    { tech: 'Node.js', color: 'bg-green-100 text-green-700 border-green-200' },
                    { tech: 'MySQL', color: 'bg-orange-100 text-orange-700 border-orange-200' },
                    { tech: 'Terraform', color: 'bg-purple-100 text-purple-700 border-purple-200' },
                    { tech: 'GitHub Actions', color: 'bg-gray-100 text-gray-700 border-gray-200' }
                  ].map((item, index) => (
                    <span key={item.tech} 
                          className={`px-4 py-2 rounded text-sm font-medium border ${item.color}`}>
                      {item.tech}
                    </span>
                  ))}
                </div>
                <div className="space-y-3">
                  {[
                    "Automated infrastructure with Terraform",
                    "Custom AMIs with Packer for zero-touch deployment", 
                    "CloudWatch monitoring and StatsD metrics"
                  ].map((feature, index) => (
                    <div key={index} className="flex items-center text-gray-700">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                      {feature}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Boston Town */}
            <div className="bg-gray-100 rounded-lg border-2 border-gray-300 shadow-xl hover:shadow-2xl transition-all duration-300">
              <div className="bg-gray-200 border-b border-gray-300 px-4 py-2 flex items-center">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                  <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                </div>
                <div className="flex-1 text-center text-gray-600 text-sm">Boston Town</div>
              </div>
              <div className="p-8 bg-white">
                <div className="flex items-center mb-6">
                  <div className="p-3 bg-green-100 rounded mr-4 border border-green-200">
                    <Globe className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800">Boston Town 🏘️</h3>
                </div>
                <p className="text-gray-700 mb-6 leading-relaxed">
                  Comprehensive property listing application for 319K+ Boston properties with interactive heat maps and seamless user-agent connections.
                </p>
                <div className="flex flex-wrap gap-3 mb-6">
                  {[
                    { tech: 'React', color: 'bg-blue-100 text-blue-700 border-blue-200' },
                    { tech: 'MongoDB', color: 'bg-green-100 text-green-700 border-green-200' },
                    { tech: 'Express.js', color: 'bg-yellow-100 text-yellow-700 border-yellow-200' },
                    { tech: 'Node.js', color: 'bg-green-100 text-green-700 border-green-200' },
                    { tech: 'Mapbox', color: 'bg-purple-100 text-purple-700 border-purple-200' }
                  ].map((item, index) => (
                    <span key={item.tech} 
                          className={`px-4 py-2 rounded text-sm font-medium border ${item.color}`}>
                      {item.tech}
                    </span>
                  ))}
                </div>
                <div className="space-y-3">
                  {[
                    "319K+ property listings with MERN stack",
                    "Interactive heat map for 741 rental incidents",
                    "Optimized UX with Ant Design components"
                  ].map((feature, index) => (
                    <div key={index} className="flex items-center text-gray-700">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                      {feature}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-16 relative">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center text-white mb-12 drop-shadow-lg">
            Technical Skills 🛠️
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { 
                icon: Code, 
                title: "Programming", 
                skills: ['Python', 'Java', 'JavaScript', 'C++', 'Swift'],
                color: 'blue'
              },
              { 
                icon: Globe, 
                title: "Web Development", 
                skills: ['React', 'Next.js', 'Node.js', 'TypeScript', 'REST APIs'],
                color: 'green'
              },
              { 
                icon: Cloud, 
                title: "Cloud & DevOps", 
                skills: ['AWS', 'Docker', 'Terraform', 'Jenkins', 'GitHub Actions'],
                color: 'purple'
              },
              { 
                icon: Database, 
                title: "Databases", 
                skills: ['MongoDB', 'PostgreSQL', 'MySQL', 'Redis', 'MS SQL Server'],
                color: 'orange'
              }
            ].map((category, index) => (
              <div key={index} className="bg-gray-100 rounded-lg border-2 border-gray-300 shadow-xl hover:shadow-2xl transition-all duration-300">
                <div className="bg-gray-200 border-b border-gray-300 px-4 py-2 flex items-center">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  </div>
                  <div className="flex-1 text-center text-gray-600 text-xs">{category.title}.app</div>
                </div>
                <div className="p-6 bg-white text-center">
                  <div className={`inline-flex p-4 bg-${category.color}-100 rounded mb-4 border border-${category.color}-200`}>
                    <category.icon className={`w-8 h-8 text-${category.color}-600`} />
                  </div>
                  <h3 className="text-lg font-bold text-gray-800 mb-4">{category.title}</h3>
                  <div className="space-y-2">
                    {category.skills.map((skill, skillIndex) => {
                      // Define skill logos/icons
                      const getSkillIcon = (skillName) => {
                        const icons = {
                          'Python': '🐍',
                          'Java': '☕',
                          'JavaScript': '🟨',
                          'C++': '⚙️',
                          'Swift': '🏎️',
                          'React': '⚛️',
                          'Next.js': '🔼',
                          'Node.js': '🟢',
                          'TypeScript': '🔷',
                          'REST APIs': '🔗',
                          'AWS': '☁️',
                          'Docker': '🐳',
                          'Terraform': '🏗️',
                          'Jenkins': '🔨',
                          'GitHub Actions': '🚀',
                          'MongoDB': '🍃',
                          'PostgreSQL': '🐘',
                          'MySQL': '🗄️',
                          'Redis': '🔴',
                          'MS SQL Server': '🏢'
                        };
                        return icons[skillName] || '💻';
                      };

                      return (
                        <div key={skill} 
                             className="flex items-center justify-center px-3 py-2 bg-gray-50 rounded border border-gray-200 text-sm text-gray-700 hover:bg-gray-100 transition-colors cursor-default gap-2">
                          <span className="text-base">{getSkillIcon(skill)}</span>
                          <span>{skill}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 relative">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="bg-gray-100 rounded-lg border-2 border-gray-300 shadow-2xl">
            <div className="bg-gray-200 border-b border-gray-300 px-4 py-3 flex items-center">
              <div className="flex space-x-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              </div>
              <div className="flex-1 text-center text-gray-600 text-sm font-medium">
                Contact - Nirmit Shah
              </div>
            </div>
            <div className="p-12 bg-white">
              <h2 className="text-4xl font-bold mb-8 text-gray-800">
                Let's Connect! 🤝
              </h2>
              <p className="text-xl mb-12 text-gray-600 leading-relaxed">
                I'm always interested in new opportunities and collaborations. Let's build something amazing together!
              </p>
              
              <div className="grid md:grid-cols-3 gap-8 mb-12">
                {[
                  { 
                    icon: Mail, 
                    title: "Email", 
                    value: "shah.nirm@northeastern.edu", 
                    href: "mailto:shah.nirm@northeastern.edu",
                    color: "blue"
                  },
                  { 
                    icon: Phone, 
                    title: "Phone", 
                    value: "(857) 398-8283", 
                    href: "tel:+18573988283",
                    color: "green"
                  },
                  { 
                    icon: Linkedin, 
                    title: "LinkedIn", 
                    value: "shah-nirmit", 
                    href: "https://linkedin.com/in/shah-nirmit/",
                    color: "purple"
                  }
                ].map((contact, index) => (
                  <a key={index} href={contact.href} 
                     className="group bg-gray-50 rounded border-2 border-gray-200 p-6 shadow-lg hover:shadow-xl hover:bg-gray-100 transition-all duration-200">
                    <div className={`inline-flex p-3 bg-${contact.color}-100 rounded mb-4 group-hover:bg-${contact.color}-200 transition-colors border border-${contact.color}-200`}>
                      <contact.icon className={`w-6 h-6 text-${contact.color}-600`} />
                    </div>
                    <h3 className="font-bold mb-2 text-gray-800">{contact.title}</h3>
                    <p className="text-gray-600 text-sm">{contact.value}</p>
                  </a>
                ))}
              </div>
              
              <a href="mailto:shah.nirm@northeastern.edu" 
                 className="group inline-flex items-center px-10 py-4 bg-blue-500 hover:bg-blue-600 text-white rounded border-2 border-blue-600 font-bold shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-1">
                <Mail className="w-5 h-5 mr-3 group-hover:rotate-12 transition-transform" />
                Send Me a Message
                <ArrowRight className="w-5 h-5 ml-3 group-hover:translate-x-2 transition-transform" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 relative">
        <div className="bg-gray-200 border-t-2 border-gray-300">
          <div className="max-w-6xl mx-auto px-6 text-center py-4">
            <p className="text-gray-600">
              © 2025 Nirmit Shah. Crafted with React, love, and lots of ☕
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Portfolio;
