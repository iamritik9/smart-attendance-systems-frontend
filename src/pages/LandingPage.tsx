
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  Calendar, 
  BookOpen, 
  Users, 
  Check, 
  ArrowDown,
  Sparkles,
  Lock,
  Shield,
  CloudCog,
  User,
  Briefcase,
  Hourglass,
  Code
} from 'lucide-react';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white">
      {/* Navigation Bar */}
      <nav className="glass-effect shadow-md fixed w-full z-10">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-primary font-bold text-xl gradient-text">Smart Attendance</span>
          </div>
          
          <div className="hidden md:flex space-x-8 text-gray-600">
            <a href="#home" className="hover:text-primary transition-colors">Home</a>
            <a href="#about" className="hover:text-primary transition-colors">About Us</a>
            <a href="#features" className="hover:text-primary transition-colors">Features</a>
          </div>
          
          <div>
            <Link to="/login">
              <Button className="button-3d">
                Sign In
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="pt-24 pb-12 md:py-32 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight text-gray-900">
                <span className="gradient-text">Smart Attendance System</span> with Facial Recognition
              </h1>
              <p className="text-lg text-gray-600 mb-8">
                Modernize your attendance tracking with our secure, efficient facial recognition system.
                Designed for educational institutions and organizations.
              </p>
              <div className="flex space-x-4">
                <Link to="/login">
                  <Button size="lg" className="button-3d bg-gradient-to-r from-primary to-accent shadow-lg">
                    Get Started
                  </Button>
                </Link>
                <a href="#features">
                  <Button variant="outline" size="lg" className="group button-3d">
                    Learn More
                    <ArrowDown className="ml-2 h-4 w-4 group-hover:translate-y-1 transition-transform" />
                  </Button>
                </a>
              </div>
            </div>
            
            <div className="md:w-1/2">
              <div className="relative">
                <div className="w-full h-72 md:h-96 bg-gradient-to-r from-primary/80 to-accent/80 rounded-lg shadow-3d transform rotate-3 transition-all hover:rotate-0 duration-300">
                  <div className="absolute inset-0 glass-effect m-2 rounded-lg flex items-center justify-center card-3d">
                    <div className="relative w-64 h-64 overflow-hidden rounded-full border-4 border-white shadow-xl">
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20"></div>
                      <div className="relative z-10 w-full h-full flex items-center justify-center">
                        <div className="w-48 h-48 rounded-full bg-white/90 flex items-center justify-center shadow-inner">
                          <User className="h-32 w-32 text-primary/80" strokeWidth={1.5} />
                        </div>
                      </div>
                      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-transparent to-primary/10 rounded-full"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 bg-gradient-to-r from-indigo-50 to-purple-50">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 gradient-text">About Us</h2>
            <p className="text-gray-600 max-w-3xl mx-auto mb-8">
              We're passionate about combining technology and education to create smarter, more efficient systems.
              Our facial recognition attendance system is designed to streamline administrative tasks while providing accurate, real-time data.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="glass-effect p-6 rounded-lg shadow-3d">
              <h3 className="text-xl font-bold mb-3 text-primary">Our Project</h3>
              <p className="text-gray-600 mb-4">
                Smart Attendance System revolutionizes traditional attendance tracking by leveraging cutting-edge facial recognition technology. 
                Our system eliminates the need for manual roll calls, paper registers, or ID card scanning.
              </p>
              <p className="text-gray-600">
                Developed with privacy and security in mind, our platform ensures data protection while providing seamless attendance tracking
                for schools, colleges, and corporate environments. The system integrates with existing academic management tools to provide
                comprehensive analytics and reporting.
              </p>
            </div>
            
            <div className="glass-effect p-6 rounded-lg shadow-3d">
              <h3 className="text-xl font-bold mb-3 text-primary">Our Vision</h3>
              <p className="text-gray-600">
                We envision a future where educational institutions can focus more on teaching and student development
                rather than administrative tasks. By automating attendance tracking, we aim to save valuable time for educators
                while providing accurate attendance data that can help identify patterns and improve overall academic performance.
              </p>
            </div>
          </div>
          
          {/* Team Members Section */}
          <div className="mt-16">
            <h3 className="text-2xl font-bold text-center mb-8 gradient-text">Our Team</h3>
            <div className="grid md:grid-cols-3 gap-8">
              {/* Team Member 1 */}
              <div className="glass-effect p-6 rounded-lg shadow-3d hover:-translate-y-2 transition-transform duration-300">
                <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-br from-primary/80 to-accent/80 flex items-center justify-center">
                  <User className="text-white h-12 w-12" />
                </div>
                <h4 className="text-lg font-bold text-center mb-2">John Smith</h4>
                <p className="text-gray-500 text-center text-sm mb-2">Project Lead & Full Stack Developer</p>
                <div className="flex items-center justify-center mb-3">
                  <Briefcase className="h-4 w-4 text-primary mr-1" />
                  <span className="text-sm text-gray-600">5 years experience</span>
                </div>
                <p className="text-gray-600 text-center text-sm">
                  John leads the development of our facial recognition algorithms and system architecture.
                </p>
              </div>
              
              {/* Team Member 2 */}
              <div className="glass-effect p-6 rounded-lg shadow-3d hover:-translate-y-2 transition-transform duration-300">
                <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-br from-primary/80 to-accent/80 flex items-center justify-center">
                  <User className="text-white h-12 w-12" />
                </div>
                <h4 className="text-lg font-bold text-center mb-2">Sarah Johnson</h4>
                <p className="text-gray-500 text-center text-sm mb-2">UI/UX Designer</p>
                <div className="flex items-center justify-center mb-3">
                  <Code className="h-4 w-4 text-primary mr-1" />
                  <span className="text-sm text-gray-600">Frontend specialist</span>
                </div>
                <p className="text-gray-600 text-center text-sm">
                  Sarah creates the intuitive user interfaces that make our system easy to use for administrators and students.
                </p>
              </div>
              
              {/* Team Member 3 */}
              <div className="glass-effect p-6 rounded-lg shadow-3d hover:-translate-y-2 transition-transform duration-300">
                <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-br from-primary/80 to-accent/80 flex items-center justify-center">
                  <User className="text-white h-12 w-12" />
                </div>
                <h4 className="text-lg font-bold text-center mb-2">Michael Chen</h4>
                <p className="text-gray-500 text-center text-sm mb-2">AI & Machine Learning Engineer</p>
                <div className="flex items-center justify-center mb-3">
                  <Hourglass className="h-4 w-4 text-primary mr-1" />
                  <span className="text-sm text-gray-600">AI specialist</span>
                </div>
                <p className="text-gray-600 text-center text-sm">
                  Michael specializes in optimization of our facial recognition algorithms for speed and accuracy.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 gradient-text">Key Features</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our system is packed with powerful features to make attendance management simple and effective.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="glass-effect p-6 rounded-lg shadow-3d">
              <div className="text-primary mb-4">
                <Shield className="h-12 w-12" />
              </div>
              <h3 className="text-xl font-bold mb-3">Facial Recognition</h3>
              <p className="text-gray-600">
                Fast and accurate identification using advanced facial recognition algorithms.
              </p>
            </div>
            
            <div className="glass-effect p-6 rounded-lg shadow-3d">
              <div className="text-primary mb-4">
                <Calendar className="h-12 w-12" />
              </div>
              <h3 className="text-xl font-bold mb-3">Attendance Analytics</h3>
              <p className="text-gray-600">
                Comprehensive reports and insights to track attendance patterns over time.
              </p>
            </div>
            
            <div className="glass-effect p-6 rounded-lg shadow-3d">
              <div className="text-primary mb-4">
                <CloudCog className="h-12 w-12" />
              </div>
              <h3 className="text-xl font-bold mb-3">Academic Integration</h3>
              <p className="text-gray-600">
                Seamlessly integrates with academic calendars and timetable management.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h3 className="font-bold text-xl gradient-text">Smart Attendance System</h3>
              <p className="text-gray-400">Making attendance management smarter.</p>
            </div>
            
            <div className="flex space-x-4">
              <Link to="/login" className="hover:text-primary transition-colors">Sign In</Link>
              <a href="#features" className="hover:text-primary transition-colors">Features</a>
              <a href="#about" className="hover:text-primary transition-colors">About</a>
            </div>
          </div>
          <div className="mt-8 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} Smart Attendance System. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
