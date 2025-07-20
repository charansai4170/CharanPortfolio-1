import { useEffect, useState } from "react";
import { Download, Mail, Phone, MapPin, Linkedin, Github, Award, GraduationCap, Send } from "lucide-react";
import Navigation from "@/components/Navigation";
import ProfessionalBackground from "@/components/ProfessionalBackground";

import SkillBar from "@/components/SkillBar";
import TimelineExperience from "@/components/TimelineExperience";
import ProjectCard from "@/components/ProjectCard";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";

const Home = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentText, setCurrentText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  
  const prefixes = ["Software", "Machine Learning", "DevOps", "Cloud", "Data"];

  useEffect(() => {
    setIsVisible(true);
    const specialCase = "Data Scientist";

    let timeout;

    const typeEffect = () => {
      // Determine if we're showing the special case (Data Scientist)
      const isSpecialCase = currentIndex >= prefixes.length;
      const targetPrefix = isSpecialCase ? specialCase : prefixes[currentIndex];
      
      if (isPaused) {
        timeout = setTimeout(() => {
          setIsPaused(false);
          setIsDeleting(true);
        }, 300); // Much faster pause
        return;
      }

      if (!isDeleting) {
        // Typing only the prefix part
        if (currentText.length < targetPrefix.length) {
          setCurrentText(targetPrefix.substring(0, currentText.length + 1));
          timeout = setTimeout(typeEffect, 25); // Ultra fast typing
        } else {
          // Finished typing, pause
          setIsPaused(true);
          timeout = setTimeout(typeEffect, 10);
        }
      } else {
        // Deleting only the prefix part (keeping "Engineer" constant)
        if (currentText.length > 0) {
          setCurrentText(targetPrefix.substring(0, currentText.length - 1));
          timeout = setTimeout(typeEffect, 15); // Ultra fast deleting
        } else {
          // Finished deleting, move to next word
          setIsDeleting(false);
          if (isSpecialCase) {
            // After "Data Scientist", restart from beginning
            setCurrentIndex(0);
          } else {
            // Move to next prefix, or to special case after "Data"
            setCurrentIndex((prev) => prev + 1);
          }
          timeout = setTimeout(typeEffect, 100); // Ultra fast pause between words
        }
      }
    };

    // Start animation after component mounts
    timeout = setTimeout(typeEffect, 200);

    return () => clearTimeout(timeout);
  }, [currentText, currentIndex, isDeleting, isPaused]);

  const skills = {
    programming: [
      { name: "Python", level: 95 },
      { name: "JavaScript/TypeScript", level: 85 },
      { name: "Java/C++", level: 80 },
    ],
    cloud: [
      { name: "AWS", level: 90 },
      { name: "Docker/Kubernetes", level: 85 },
      { name: "Jenkins/CI/CD", level: 80 },
    ],
    ml: [
      { name: "LLMs/RAG", level: 90 },
      { name: "TensorFlow/PyTorch", level: 85 },
      { name: "Vector Databases", level: 80 },
    ],
  };

  // Logo Components as inline SVGs
  const PythonLogo = () => (
    <svg viewBox="0 0 24 24" className="w-full h-full">
      <path fill="#3776ab" d="M14.25.18l.9.2.73.26.59.3.45.32.34.34.25.34.16.33.1.3.04.26.02.2-.01.13V8.5l-.05.63-.13.55-.21.46-.26.38-.3.31-.33.25-.35.19-.35.14-.33.1-.3.07-.26.04-.21.02H8.77l-.69.05-.59.14-.5.22-.41.27-.33.32-.27.35-.2.36-.15.37-.1.35-.07.32-.04.27-.02.21v3.06H3.17l-.21-.03-.28-.07-.32-.12-.35-.18-.36-.26-.36-.36-.35-.46-.32-.59-.28-.73-.21-.88-.14-1.05-.05-1.23.06-1.22.16-1.04.24-.87.32-.71.36-.57.4-.44.42-.33.42-.24.4-.16.36-.1.32-.05.24-.01h.16l.06.01h8.16v-.83H6.18l-.01-2.75-.02-.37.05-.34.11-.31.17-.28.25-.26.31-.23.38-.2.44-.18.51-.15.58-.12.64-.1.71-.06.77-.04.84-.02 1.27.05zm-6.3 1.98l-.23.33-.08.41.08.41.23.34.33.22.41.09.41-.09.33-.22.23-.34.08-.41-.08-.41-.23-.33-.33-.22-.41-.09-.41.09zm13.09 3.95l.28.06.32.12.35.18.36.27.36.35.35.47.32.59.28.73.21.88.14 1.04.05 1.23-.06 1.23-.16 1.04-.24.86-.32.71-.36.57-.4.45-.42.33-.42.24-.4.16-.36.09-.32.05-.24.02-.16-.01h-8.22v.82h5.84l.01 2.76.02.36-.05.34-.11.31-.17.29-.25.25-.31.24-.38.2-.44.17-.51.15-.58.13-.64.09-.71.07-.77.04-.84.01-1.27-.04-1.07-.14-.9-.2-.73-.25-.59-.3-.45-.33-.34-.34-.25-.34-.16-.33-.1-.3-.04-.25-.02-.2.01-.13v-5.34l.05-.64.13-.54.21-.46.26-.38.3-.32.33-.24.35-.2.35-.14.33-.1.3-.06.26-.04.21-.02.13-.01h5.84l.69-.05.59-.14.5-.21.41-.28.33-.32.27-.35.2-.36.15-.36.1-.35.07-.32.04-.28.02-.21V6.07h2.09l.14.01zm-6.47 14.25l-.23.33-.08.41.08.41.23.33.33.23.41.08.41-.08.33-.23.23-.33.08-.41-.08-.41-.23-.33-.33-.23-.41-.08-.41.08z"/>
    </svg>
  );

  const JavaScriptLogo = () => (
    <svg viewBox="0 0 24 24" className="w-full h-full">
      <path fill="#f7df1e" d="M0 0h24v24H0V0zm22.034 18.276c-.175-1.095-.888-2.015-3.003-2.873-.736-.345-1.554-.585-1.797-1.14-.091-.33-.105-.51-.046-.705.15-.646.915-.84 1.515-.66.39.12.75.42.976.9 1.034-.676 1.034-.676 1.755-1.125-.27-.42-.404-.601-.586-.78-.63-.705-1.469-1.065-2.834-1.034l-.705.089c-.676.165-1.32.525-1.71 1.005-1.14 1.291-.811 3.541.569 4.471 1.365 1.02 3.361 1.244 3.616 2.205.24 1.17-.87 1.545-1.966 1.41-.811-.18-1.26-.586-1.755-1.336l-1.83 1.051c.21.48.45.689.81 1.109 1.74 1.756 6.09 1.666 6.871-1.004.029-.09.24-.705.074-1.65l.046.067zm-8.983-7.245h-2.248c0 1.938-.009 3.864-.009 5.805 0 1.232.063 2.363-.138 2.711-.33.689-1.18.601-1.566.48-.396-.196-.597-.466-.83-.855-.063-.105-.11-.196-.127-.196l-1.825 1.125c.305.63.75 1.172 1.324 1.517.855.51 2.004.675 3.207.405.783-.226 1.458-.691 1.811-1.411.51-.93.402-2.07.397-3.346.012-2.054 0-4.109 0-6.179l.004-.056z"/>
    </svg>
  );

  const TypeScriptLogo = () => (
    <svg viewBox="0 0 24 24" className="w-full h-full">
      <path fill="#3178c6" d="M1.125 0C.502 0 0 .502 0 1.125v21.75C0 23.498.502 24 1.125 24h21.75c.623 0 1.125-.502 1.125-1.125V1.125C24 .502 23.498 0 22.875 0zm17.363 9.75c.612 0 1.154.037 1.627.111a6.38 6.38 0 0 1 1.306.34v2.458a3.95 3.95 0 0 0-.643-.361 5.093 5.093 0 0 0-.717-.26 5.453 5.453 0 0 0-1.426-.2c-.3 0-.573.028-.819.086a2.1 2.1 0 0 0-.623.242c-.17.104-.3.229-.393.374a.888.888 0 0 0-.14.49c0 .196.053.373.156.529.104.156.252.304.443.444s.423.276.696.41c.273.135.582.274.926.416.47.197.892.407 1.266.628.374.222.695.473.963.753.268.279.472.598.614.957.142.359.213.776.213 1.253 0 .657-.125 1.218-.373 1.682a3.676 3.676 0 0 1-.982 1.187 4.492 4.492 0 0 1-1.416.696c-.565.155-1.14.233-1.724.233a8.24 8.24 0 0 1-1.652-.165 7.14 7.14 0 0 1-1.579-.461v-2.153c.532.328 1.097.583 1.693.766a5.39 5.39 0 0 0 1.79.275c.322 0 .615-.038.878-.116.264-.077.491-.196.681-.358.19-.162.337-.364.438-.606.1-.242.152-.522.152-.84 0-.294-.1-.553-.3-.776a2.677 2.677 0 0 0-.774-.618 7.03 7.03 0 0 0-1.085-.477 19.087 19.087 0 0 1-1.353-.578 10.24 10.24 0 0 1-1.172-.618 3.266 3.266 0 0 1-.858-.83c-.241-.32-.361-.696-.361-1.13 0-.669.148-1.22.445-1.654a3.033 3.033 0 0 1 1.162-1.022 5.097 5.097 0 0 1 1.578-.537 9.031 9.031 0 0 1 1.68-.15zm-5.204 0c.705 0 1.26.157 1.671.47.411.313.617.732.617 1.257 0 .394-.087.742-.26 1.044a2.53 2.53 0 0 1-.678.773 3.466 3.466 0 0 1-.955.49 3.831 3.831 0 0 1-1.104.16H9.847v2.854h2.628c.365 0 .718-.038 1.058-.115a2.55 2.55 0 0 0 .889-.358c.26-.166.467-.389.62-.668.152-.279.228-.634.228-1.066 0-.432-.076-.787-.228-1.066a1.543 1.543 0 0 0-.62-.668 2.55 2.55 0 0 0-.889-.358 5.662 5.662 0 0 0-1.058-.115H9.847V9.75h2.628zm-7.51 5.016h2.628v7.234H5.774z"/>
    </svg>
  );



  const projects = [
    {
      title: "AI-Powered USCIS Chatbot",
      description: "RAG-based Python web application providing intelligent responses to USCIS Manual queries using LangChain and vector databases.",
      technologies: ["Python", "LangChain", "Streamlit", "FAISS", "Llama 3.1"],
      category: "AI/ML",
      highlights: [
        "Embedded USCIS manual into vector database for semantic search",
        "Integrated Llama 3.1 (8B model) for lightweight local inference",
        "Advanced design module for custom-trained model deployment",
      ],
    },
    {
      title: "EHR Query Assistant",
      description: "Intelligent RAG-based system for querying electronic health records using natural language processing and Bedrock embeddings.",
      technologies: ["AWS Bedrock", "FAISS", "Streamlit", "Claude", "OpenSearch"],
      category: "AI/ML",
      highlights: [
        "Reduced query time from 20 minutes to under 10 seconds",
        "90%+ accuracy in clinical decision support",
        "Document chunking and embedding pipelines for contextual responses",
      ],
    },
    {
      title: "Home Healthcare Platform",
      description: "Agile-developed web application supporting home healthcare services with comprehensive project management and documentation.",
      technologies: ["React", "Node.js", "JIRA", "Confluence", "Agile"],
      category: "Web",
      highlights: [
        "Led Agile development with iterative sprints and daily stand-ups",
        "Comprehensive project documentation and stakeholder feedback integration",
        "Prioritized product backlog with user stories and project scope definition",
      ],
    },
  ];

  const certifications = [
    "Microsoft Azure Data Engineer Associate",
    "Microsoft Power BI Data Analyst Associate",
    "Microsoft Azure Data Fundamentals",
    "Microsoft Azure Fundamentals",
  ];

  return (
    <div className="min-h-screen">
      <Navigation />

          {/* Hero Section */}
      <ProfessionalBackground variant="light" pattern="all" className="min-h-screen flex items-center pt-20 md:pt-0">
        <section id="home" className="w-full">
          <div className="container mx-auto px-4 md:px-6">
          <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
            <div className={`${isVisible ? "fade-in-up" : "opacity-0"} text-center lg:text-left`}>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-text mb-4 md:mb-6 leading-tight">
                Charan Thota
              </h1>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold mb-4 md:mb-6 h-10 md:h-12 flex items-center justify-center lg:justify-start">
                <span className="gradient-text-animated">{currentText}</span>
                {currentIndex < 5 && (
                  <>
                    <span className="gradient-text-animated"> </span>
                    <span className="cursor-blink">|</span>
                    <span className="gradient-text-animated">Engineer</span>
                  </>
                )}
                {currentIndex >= 5 && <span className="cursor-blink ml-1">|</span>}
              </h2>
              <p className="text-gray-600 text-base md:text-lg leading-relaxed mb-6 md:mb-8 max-w-lg mx-auto lg:mx-0">
                Results-driven engineer with 2.5+ years building scalable, AI-driven platforms and cloud-native applications. 
                Expertise in Python, AWS, LLMs, and DevOps tools with focus on intelligent systems for healthcare and enterprise domains.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-6 md:mb-8 items-center lg:items-start">
                <Button className="bg-primary-custom hover:bg-primary-custom/90 text-white w-full sm:w-auto">
                  <Download className="h-4 w-4 mr-2" />
                  Download Resume
                </Button>
                <Button variant="outline" className="border-primary-custom text-primary-custom hover:bg-primary-custom hover:text-white w-full sm:w-auto">
                  <Mail className="h-4 w-4 mr-2" />
                  Get In Touch
                </Button>
              </div>
              <div className="flex space-x-6 justify-center lg:justify-start">
                <Button variant="ghost" size="icon" className="text-gray-400 hover:text-primary-custom">
                  <Linkedin className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon" className="text-gray-400 hover:text-primary-custom">
                  <Github className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon" className="text-gray-400 hover:text-primary-custom">
                  <Mail className="h-5 w-5" />
                </Button>
              </div>
            </div>
            
            <div className="relative flex justify-center items-center h-96">
              {/* 3D Floating Elements Container */}
              <div className="relative w-80 h-80">
                {/* Central Core */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-gradient-to-r from-primary-custom to-accent-custom rounded-xl shadow-2xl animate-pulse">
                  <div className="flex items-center justify-center h-full text-white text-2xl font-bold">AI</div>
                </div>

                {/* Floating Tech Icons */}
                <div className="absolute top-8 left-12 w-12 h-12 bg-blue-500 rounded-lg shadow-lg flex items-center justify-center text-white animate-bounce" style={{ animationDelay: '0s', animationDuration: '3s' }}>
                  <span className="text-lg">⚙️</span>
                </div>
                
                <div className="absolute top-16 right-8 w-14 h-14 bg-green-500 rounded-full shadow-lg flex items-center justify-center text-white animate-bounce" style={{ animationDelay: '0.5s', animationDuration: '2.5s' }}>
                  <span className="text-lg">🚀</span>
                </div>
                
                <div className="absolute bottom-20 left-8 w-10 h-10 bg-purple-500 rounded-lg shadow-lg flex items-center justify-center text-white animate-bounce" style={{ animationDelay: '1s', animationDuration: '2.8s' }}>
                  <span className="text-sm">💻</span>
                </div>
                
                <div className="absolute bottom-12 right-16 w-16 h-16 bg-orange-500 rounded-xl shadow-lg flex items-center justify-center text-white animate-bounce" style={{ animationDelay: '1.5s', animationDuration: '3.2s' }}>
                  <span className="text-lg">🧠</span>
                </div>

                <div className="absolute top-1/3 right-4 w-8 h-8 bg-red-500 rounded-full shadow-lg flex items-center justify-center text-white animate-bounce" style={{ animationDelay: '2s', animationDuration: '2.2s' }}>
                  <span className="text-xs">☁️</span>
                </div>

                <div className="absolute bottom-1/3 left-4 w-12 h-12 bg-teal-500 rounded-lg shadow-lg flex items-center justify-center text-white animate-bounce" style={{ animationDelay: '2.5s', animationDuration: '2.7s' }}>
                  <span className="text-sm">📊</span>
                </div>

                {/* Orbital Rings */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 border-2 border-primary-custom/20 rounded-full animate-spin" style={{ animationDuration: '20s' }}></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 border border-accent-custom/10 rounded-full animate-spin" style={{ animationDuration: '30s', animationDirection: 'reverse' }}></div>

                {/* Floating Particles */}
                {[...Array(8)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-2 h-2 bg-primary-custom rounded-full opacity-60 animate-pulse"
                    style={{
                      top: `${20 + Math.sin(i * 0.8) * 30}%`,
                      left: `${20 + Math.cos(i * 0.8) * 30}%`,
                      animationDelay: `${i * 0.3}s`,
                      animationDuration: `${2 + (i % 3)}s`
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
          </div>
        </section>
      </ProfessionalBackground>

      {/* About Section */}
      <ProfessionalBackground variant="light" pattern="grid" className="py-20 bg-gray-50">
        <section id="about" className="w-full">
          <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-text mb-4">About <span className="gradient-text">Me</span></h2>
            <div className="w-20 h-1 bg-gradient-to-r from-primary-custom to-accent-custom mx-auto rounded-full"></div>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            <div className="space-y-6">
              <p className="text-gray-600 text-lg leading-relaxed">
                Results-driven Software and Machine Learning Engineer with <span className="text-primary-custom font-semibold">2.5+ years of experience</span> building scalable, AI-driven platforms and cloud-native applications. I specialize in designing intelligent systems that transform complex business challenges into innovative solutions.
              </p>
              
              <p className="text-gray-600 text-lg leading-relaxed">
                My expertise spans <span className="text-primary-custom font-semibold">Python, SQL, AWS, LLMs, and DevOps tools</span>, with a strong focus on developing end-to-end solutions involving OCR, vector databases, predictive modeling, and RAG-based chatbots.
              </p>
              
              <p className="text-gray-600 text-lg leading-relaxed">
                I've successfully worked across the stack—backend APIs, automation workflows, and frontend interfaces—delivering measurable impact including <span className="text-primary-custom font-semibold">$5M cost reductions</span> and <span className="text-primary-custom font-semibold">15% operational efficiency improvements</span>.
              </p>
              
              {/* Education Section */}
              <div className="mt-8">
                <h3 className="text-xl font-bold text-text mb-4 flex items-center">
                  <GraduationCap className="text-primary-custom mr-3" />
                  Education
                </h3>
                <div className="space-y-4">
                  <div className="border-l-4 border-primary-custom pl-4">
                    <h4 className="font-bold text-text">Master's in Analytics</h4>
                    <p className="text-primary-custom font-medium">Northeastern University</p>
                    <p className="text-gray-500">Boston, MA • July 2023</p>
                  </div>
                  <div className="border-l-4 border-accent-custom pl-4">
                    <h4 className="font-bold text-text">Graduate Certificate in Agile Project Management</h4>
                    <p className="text-accent-custom font-medium">Northeastern University</p>
                    <p className="text-gray-500">Boston, MA • March 2024</p>
                  </div>
                  <div className="border-l-4 border-gray-400 pl-4">
                    <h4 className="font-bold text-text">Bachelor of Engineering - Electronics & Communication</h4>
                    <p className="text-gray-600 font-medium">Sathyabama Institute of Science & Technology</p>
                    <p className="text-gray-500">Chennai, India</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="relative mt-8 lg:mt-0">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl max-w-md mx-auto lg:max-w-none">
                <img 
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=600&fit=crop&crop=face" 
                  alt="Charan Thota"
                  className="w-full h-auto object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary-custom/20 to-transparent"></div>
              </div>
              <div className="absolute -bottom-4 -right-4 lg:-bottom-6 lg:-right-6 w-16 h-16 lg:w-24 lg:h-24 bg-gradient-to-r from-primary-custom to-accent-custom rounded-full flex items-center justify-center shadow-xl animate-pulse">
                <span className="text-white text-xl lg:text-2xl">🚀</span>
              </div>
            </div>
          </div>
          </div>
        </section>
      </ProfessionalBackground>

      {/* Experience Section */}
      <TimelineExperience />

      {/* Skills Section */}
      <ProfessionalBackground variant="light" pattern="dots" className="py-16 md:py-20 bg-gray-50">
        <section id="skills" className="w-full">
          <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-text mb-4">Technical Expertise</h2>
            <p className="text-gray-600 text-base md:text-lg max-w-2xl mx-auto px-4">
              Comprehensive skill set spanning full-stack development, machine learning, and cloud technologies
            </p>
          </div>

          {/* Side-by-Side Table View */}
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              
              {/* Programming Languages Column */}
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-4">
                  <h3 className="text-xl font-bold text-white text-center">Programming Languages</h3>
                </div>
                <div className="p-4 space-y-3">
                  {[
                    { name: "Python", logo: PythonLogo },
                    { name: "JavaScript", logo: JavaScriptLogo }, 
                    { name: "TypeScript", logo: TypeScriptLogo },
                    { name: "Java", logo: () => (<div className="w-full h-full bg-orange-600 rounded-lg flex items-center justify-center text-white text-lg font-bold">J</div>) },
                    { name: "C++", logo: () => (<div className="w-full h-full bg-blue-700 rounded-lg flex items-center justify-center text-white text-sm font-bold">C++</div>) },
                    { name: "SQL", logo: () => (<div className="w-full h-full bg-green-600 rounded-lg flex items-center justify-center text-white text-sm font-bold">SQL</div>) }
                  ].map((tool, index) => (
                    <div
                      key={tool.name}
                      className="group flex items-center p-4 bg-gray-50 hover:bg-white rounded-xl border border-gray-100 hover:border-blue-200 hover:shadow-md transition-all duration-300 transform hover:-translate-y-1"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <div className="flex-shrink-0 w-10 h-10 mr-4 flex items-center justify-center">
                        <tool.logo />
                      </div>
                      <div className="flex-grow">
                        <h4 className="text-lg font-semibold text-gray-800 group-hover:text-blue-600 transition-colors duration-300">
                          {tool.name}
                        </h4>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Cloud & DevOps Column */}
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                <div className="bg-gradient-to-r from-orange-500 to-red-500 px-6 py-4">
                  <h3 className="text-xl font-bold text-white text-center">Cloud & DevOps</h3>
                </div>
                <div className="p-4 space-y-3">
                  {[
                    { name: "AWS", logo: () => (<div className="w-full h-full bg-orange-500 rounded-lg flex items-center justify-center text-white text-sm font-bold">AWS</div>) },
                    { name: "Docker", logo: () => (<div className="w-full h-full bg-blue-500 rounded-lg flex items-center justify-center text-white text-lg">🐳</div>) },
                    { name: "Kubernetes", logo: () => (<div className="w-full h-full bg-blue-600 rounded-lg flex items-center justify-center text-white text-sm font-bold">K8s</div>) },
                    { name: "Jenkins", logo: () => (<div className="w-full h-full bg-blue-800 rounded-lg flex items-center justify-center text-white text-sm font-bold">J</div>) },
                    { name: "Terraform", logo: () => (<div className="w-full h-full bg-purple-600 rounded-lg flex items-center justify-center text-white text-sm font-bold">TF</div>) },
                    { name: "Git", logo: () => (<div className="w-full h-full bg-red-600 rounded-lg flex items-center justify-center text-white text-sm font-bold">Git</div>) }
                  ].map((tool, index) => (
                    <div
                      key={tool.name}
                      className="group flex items-center p-4 bg-gray-50 hover:bg-white rounded-xl border border-gray-100 hover:border-orange-200 hover:shadow-md transition-all duration-300 transform hover:-translate-y-1"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <div className="flex-shrink-0 w-10 h-10 mr-4 flex items-center justify-center">
                        <tool.logo />
                      </div>
                      <div className="flex-grow">
                        <h4 className="text-lg font-semibold text-gray-800 group-hover:text-orange-600 transition-colors duration-300">
                          {tool.name}
                        </h4>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Machine Learning & AI Column */}
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                <div className="bg-gradient-to-r from-green-500 to-teal-500 px-6 py-4">
                  <h3 className="text-xl font-bold text-white text-center">Machine Learning & AI</h3>
                </div>
                <div className="p-4 space-y-3">
                  {[
                    { name: "TensorFlow", logo: () => (<div className="w-full h-full bg-orange-500 rounded-lg flex items-center justify-center text-white text-sm font-bold">TF</div>) },
                    { name: "PyTorch", logo: () => (<div className="w-full h-full bg-red-600 rounded-lg flex items-center justify-center text-white text-lg">🔥</div>) },
                    { name: "Scikit-learn", logo: () => (<div className="w-full h-full bg-blue-600 rounded-lg flex items-center justify-center text-white text-xs font-bold">SK</div>) },
                    { name: "Pandas", logo: () => (<div className="w-full h-full bg-blue-800 rounded-lg flex items-center justify-center text-white text-lg">🐼</div>) },
                    { name: "OpenAI", logo: () => (<div className="w-full h-full bg-green-600 rounded-lg flex items-center justify-center text-white text-sm font-bold">AI</div>) },
                    { name: "Hugging Face", logo: () => (<div className="w-full h-full bg-yellow-500 rounded-lg flex items-center justify-center text-white text-lg">🤗</div>) }
                  ].map((tool, index) => (
                    <div
                      key={tool.name}
                      className="group flex items-center p-4 bg-gray-50 hover:bg-white rounded-xl border border-gray-100 hover:border-green-200 hover:shadow-md transition-all duration-300 transform hover:-translate-y-1"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <div className="flex-shrink-0 w-10 h-10 mr-4 flex items-center justify-center">
                        <tool.logo />
                      </div>
                      <div className="flex-grow">
                        <h4 className="text-lg font-semibold text-gray-800 group-hover:text-green-600 transition-colors duration-300">
                          {tool.name}
                        </h4>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Additional Tools Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mt-6 md:mt-8">
              
              {/* Databases Column */}
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                <div className="bg-gradient-to-r from-purple-600 to-pink-600 px-6 py-4">
                  <h3 className="text-xl font-bold text-white text-center">Databases & Storage</h3>
                </div>
                <div className="p-4 space-y-3">
                  {[
                    { name: "PostgreSQL", logo: () => (<div className="w-full h-full bg-blue-800 rounded-lg flex items-center justify-center text-white text-lg">🐘</div>) },
                    { name: "MongoDB", logo: () => (<div className="w-full h-full bg-green-700 rounded-lg flex items-center justify-center text-white text-lg">🍃</div>) },
                    { name: "Redis", logo: () => (<div className="w-full h-full bg-red-600 rounded-lg flex items-center justify-center text-white text-sm font-bold">Redis</div>) },
                    { name: "DynamoDB", logo: () => (<div className="w-full h-full bg-orange-600 rounded-lg flex items-center justify-center text-white text-xs font-bold">DB</div>) }
                  ].map((tool, index) => (
                    <div
                      key={tool.name}
                      className="group flex items-center p-4 bg-gray-50 hover:bg-white rounded-xl border border-gray-100 hover:border-purple-200 hover:shadow-md transition-all duration-300 transform hover:-translate-y-1"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <div className="flex-shrink-0 w-10 h-10 mr-4 flex items-center justify-center">
                        <tool.logo />
                      </div>
                      <div className="flex-grow">
                        <h4 className="text-lg font-semibold text-gray-800 group-hover:text-purple-600 transition-colors duration-300">
                          {tool.name}
                        </h4>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Web Technologies Column */}
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                <div className="bg-gradient-to-r from-cyan-600 to-blue-600 px-6 py-4">
                  <h3 className="text-xl font-bold text-white text-center">Web Technologies</h3>
                </div>
                <div className="p-4 space-y-3">
                  {[
                    { name: "React", logo: () => (<div className="w-full h-full bg-blue-500 rounded-lg flex items-center justify-center text-white text-lg">⚛️</div>) },
                    { name: "Node.js", logo: () => (<div className="w-full h-full bg-green-600 rounded-lg flex items-center justify-center text-white text-lg">💚</div>) },
                    { name: "Express", logo: () => (<div className="w-full h-full bg-gray-700 rounded-lg flex items-center justify-center text-white text-xs font-bold">EXP</div>) },
                    { name: "REST API", logo: () => (<div className="w-full h-full bg-blue-700 rounded-lg flex items-center justify-center text-white text-xs font-bold">API</div>) }
                  ].map((tool, index) => (
                    <div
                      key={tool.name}
                      className="group flex items-center p-4 bg-gray-50 hover:bg-white rounded-xl border border-gray-100 hover:border-cyan-200 hover:shadow-md transition-all duration-300 transform hover:-translate-y-1"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <div className="flex-shrink-0 w-10 h-10 mr-4 flex items-center justify-center">
                        <tool.logo />
                      </div>
                      <div className="flex-grow">
                        <h4 className="text-lg font-semibold text-gray-800 group-hover:text-cyan-600 transition-colors duration-300">
                          {tool.name}
                        </h4>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Business Intelligence Column */}
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                <div className="bg-gradient-to-r from-amber-600 to-orange-600 px-6 py-4">
                  <h3 className="text-xl font-bold text-white text-center">Business Intelligence</h3>
                </div>
                <div className="p-4 space-y-3">
                  {[
                    { name: "Power BI", logo: () => (<div className="w-full h-full bg-yellow-500 rounded-lg flex items-center justify-center text-white text-xs font-bold">PBI</div>) },
                    { name: "Tableau", logo: () => (<div className="w-full h-full bg-blue-600 rounded-lg flex items-center justify-center text-white text-xs font-bold">TAB</div>) },
                    { name: "Excel", logo: () => (<div className="w-full h-full bg-green-600 rounded-lg flex items-center justify-center text-white text-xs font-bold">XLS</div>) },
                    { name: "Streamlit", logo: () => (<div className="w-full h-full bg-red-500 rounded-lg flex items-center justify-center text-white text-xs font-bold">ST</div>) }
                  ].map((tool, index) => (
                    <div
                      key={tool.name}
                      className="group flex items-center p-4 bg-gray-50 hover:bg-white rounded-xl border border-gray-100 hover:border-amber-200 hover:shadow-md transition-all duration-300 transform hover:-translate-y-1"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <div className="flex-shrink-0 w-10 h-10 mr-4 flex items-center justify-center">
                        <tool.logo />
                      </div>
                      <div className="flex-grow">
                        <h4 className="text-lg font-semibold text-gray-800 group-hover:text-amber-600 transition-colors duration-300">
                          {tool.name}
                        </h4>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Certifications at the end of Skills Section */}
          <div className="mt-16">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-text mb-4">Professional Certifications</h3>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
              {certifications.map((cert, index) => (
                <div key={index} className="flex items-center p-4 bg-white rounded-lg border border-gray-100 shadow-sm">
                  <div className="bg-blue-600 p-2 rounded mr-3 flex-shrink-0">
                    <div className="text-white text-sm font-bold">MS</div>
                  </div>
                  <div>
                    <p className="font-medium text-text text-sm">{cert}</p>
                    <p className="text-xs text-gray-500">Microsoft</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          </div>
        </section>
      </ProfessionalBackground>

      {/* Projects Section */}
      <ProfessionalBackground variant="light" pattern="geometric" className="py-20 bg-white">
        <section id="projects" className="w-full">
          <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-text mb-4">Featured Projects</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Innovative solutions showcasing expertise in AI, machine learning, and full-stack development
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {projects.map((project, index) => (
              <ProjectCard
                key={index}
                {...project}
                delay={index * 200}
              />
            ))}
          </div>
          </div>
        </section>
      </ProfessionalBackground>

      {/* Contact Section */}
      <ProfessionalBackground variant="dark" pattern="all" className="py-20 bg-gray-900 text-white">
        <section id="contact" className="w-full">
          <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Let's Build Something Amazing</h2>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              Ready to collaborate on innovative projects? Let's discuss how we can create impactful solutions together.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
            {/* Contact Info */}
            <div className="space-y-8">
              <div className="flex items-center">
                <div className="bg-primary-custom p-3 rounded-lg mr-4">
                  <Mail className="text-white h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">Email</h3>
                  <p className="text-gray-300">thotac3030@gmail.com</p>
                </div>
              </div>
              <div className="flex items-center">
                <div className="bg-accent-custom p-3 rounded-lg mr-4">
                  <Phone className="text-white h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">Phone</h3>
                  <p className="text-gray-300">+1 (857) 437-9652</p>
                </div>
              </div>
              <div className="flex items-center">
                <div className="bg-green-600 p-3 rounded-lg mr-4">
                  <MapPin className="text-white h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">Location</h3>
                  <p className="text-gray-300">Boston, MA, USA</p>
                </div>
              </div>
              
              <div className="pt-6">
                <h3 className="font-bold text-lg mb-4">Connect with me</h3>
                <div className="flex space-x-4">
                  <Button className="bg-primary-custom hover:bg-primary-custom/90" size="icon">
                    <Linkedin className="h-5 w-5" />
                  </Button>
                  <Button className="bg-gray-700 hover:bg-gray-600" size="icon">
                    <Github className="h-5 w-5" />
                  </Button>
                  <Button className="bg-accent-custom hover:bg-accent-custom/90" size="icon">
                    <Mail className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="p-8">
                <form className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">Name</label>
                    <Input 
                      className="bg-white/10 border-white/20 text-white placeholder-gray-400 focus:border-primary-custom"
                      placeholder="Your Name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Email</label>
                    <Input 
                      type="email"
                      className="bg-white/10 border-white/20 text-white placeholder-gray-400 focus:border-primary-custom"
                      placeholder="your.email@example.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Message</label>
                    <Textarea 
                      rows={5}
                      className="bg-white/10 border-white/20 text-white placeholder-gray-400 focus:border-primary-custom resize-none"
                      placeholder="Tell me about your project..."
                    />
                  </div>
                  <Button className="w-full bg-primary-custom hover:bg-primary-custom/90 text-white">
                    <Send className="h-4 w-4 mr-2" />
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
          </div>
        </section>
      </ProfessionalBackground>

      {/* Footer */}
      <footer className="bg-text text-white py-8">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p className="text-gray-400">&copy; 2024 Charan Thota. All rights reserved.</p>
            </div>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
