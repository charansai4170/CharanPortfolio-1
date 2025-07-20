import { useEffect, useState } from "react";
import { Download, Mail, Phone, MapPin, Linkedin, Github, Award, GraduationCap, Send } from "lucide-react";
import Navigation from "@/components/Navigation";

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

  useEffect(() => {
    setIsVisible(true);
  }, []);

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
      <section id="home" className="min-h-screen flex items-center relative overflow-hidden bg-white">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className={`${isVisible ? "fade-in-up" : "opacity-0"}`}>
              <h1 className="text-4xl md:text-6xl font-bold text-text mb-6 leading-tight">
                Charan Thota
              </h1>
              <h2 className="text-2xl md:text-3xl gradient-text font-semibold mb-6">
                Software & Machine Learning Engineer
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-8 max-w-lg">
                Results-driven engineer with 2.5+ years building scalable, AI-driven platforms and cloud-native applications. 
                Expertise in Python, AWS, LLMs, and DevOps tools with focus on intelligent systems for healthcare and enterprise domains.
              </p>
              <div className="flex flex-wrap gap-4 mb-8">
                <Button className="bg-primary-custom hover:bg-primary-custom/90 text-white">
                  <Download className="h-4 w-4 mr-2" />
                  Download Resume
                </Button>
                <Button variant="outline" className="border-primary-custom text-primary-custom hover:bg-primary-custom hover:text-white">
                  <Mail className="h-4 w-4 mr-2" />
                  Get In Touch
                </Button>
              </div>
              <div className="flex space-x-6">
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
            <div className="hidden lg:block floating-animation">
              <div className="w-full max-w-md mx-auto relative">
                {/* Background glow effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary-custom to-accent-custom rounded-2xl shadow-2xl blur-xl opacity-20 animate-pulse"></div>
                
                {/* Main card with 3D effects */}
                <div className="relative aspect-square bg-gradient-to-br from-primary-custom to-accent-custom rounded-2xl shadow-2xl p-8 flex items-center justify-center tech-card-3d glass-card overflow-hidden">
                  {/* Animated background particles */}
                  <div className="absolute inset-0">
                    {[...Array(12)].map((_, i) => (
                      <div
                        key={i}
                        className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
                        style={{
                          top: `${Math.random() * 100}%`,
                          left: `${Math.random() * 100}%`,
                          animationDelay: `${i * 0.3}s`,
                          animationDuration: `${2 + Math.random() * 2}s`
                        }}
                      />
                    ))}
                  </div>
                  
                  {/* Content */}
                  <div className="text-white text-center relative z-10">
                    <div className="text-6xl mb-4 animate-morph">👨‍💻</div>
                    <div className="text-xl font-semibold mb-2">AI/ML Engineer</div>
                    <div className="text-sm opacity-90 mb-4">Building Intelligent Systems</div>
                    
                    {/* 3D Code symbols floating around */}
                    <div className="flex justify-center space-x-4 text-xs opacity-60">
                      <span className="animate-bounce" style={{ animationDelay: '0s' }}>{'<>'}</span>
                      <span className="animate-bounce" style={{ animationDelay: '0.2s' }}>{'{ }'}</span>
                      <span className="animate-bounce" style={{ animationDelay: '0.4s' }}>{'[ ]'}</span>
                    </div>
                  </div>
                  
                  {/* Border animation */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-white/20 via-transparent to-white/20 animate-spin opacity-30" style={{ animationDuration: '8s' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-gray-50">
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
              
              <div className="grid grid-cols-2 gap-6 pt-6">
                <div className="text-center p-4 bg-neutral-custom rounded-xl">
                  <div className="text-2xl font-bold text-primary-custom">2.5+</div>
                  <div className="text-sm text-gray-600">Years Experience</div>
                </div>
                <div className="text-center p-4 bg-neutral-custom rounded-xl">
                  <div className="text-2xl font-bold text-primary-custom">10M+</div>
                  <div className="text-sm text-gray-600">Records Analyzed</div>
                </div>
                <div className="text-center p-4 bg-neutral-custom rounded-xl">
                  <div className="text-2xl font-bold text-primary-custom">$5M</div>
                  <div className="text-sm text-gray-600">Cost Reduction</div>
                </div>
                <div className="text-center p-4 bg-neutral-custom rounded-xl">
                  <div className="text-2xl font-bold text-primary-custom">90%+</div>
                  <div className="text-sm text-gray-600">ML Accuracy</div>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=600&fit=crop&crop=face" 
                  alt="Charan Thota"
                  className="w-full h-auto object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary-custom/20 to-transparent"></div>
              </div>
              <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-gradient-to-r from-primary-custom to-accent-custom rounded-full flex items-center justify-center shadow-xl animate-pulse">
                <span className="text-white text-2xl">🚀</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <TimelineExperience />

      {/* Skills Section */}
      <section id="skills" className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-text mb-4">Technical Expertise</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Comprehensive skill set spanning full-stack development, machine learning, and cloud technologies
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Programming Languages */}
            <Card className="tech-card-3d glass-card bg-neutral-custom border border-gray-100 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary-custom/5 to-accent-custom/5"></div>
              <CardContent className="p-6 relative z-10">
                <div className="flex items-center mb-6">
                  <div className="bg-gradient-to-r from-primary-custom to-primary-custom/80 p-3 rounded-xl mr-3 animate-morph">
                    <div className="text-white text-xl">💻</div>
                  </div>
                  <h3 className="text-xl font-bold text-text">Programming</h3>
                </div>
                <div className="space-y-4">
                  {skills.programming.map((skill, index) => (
                    <SkillBar
                      key={skill.name}
                      skill={skill.name}
                      percentage={skill.level}
                      color="bg-gradient-to-r from-primary-custom to-primary-custom/80"
                      delay={index * 200}
                    />
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Cloud & DevOps */}
            <Card className="tech-card-3d glass-card bg-neutral-custom border border-gray-100 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-accent-custom/5 to-primary-custom/5"></div>
              <CardContent className="p-6 relative z-10">
                <div className="flex items-center mb-6">
                  <div className="bg-gradient-to-r from-accent-custom to-accent-custom/80 p-3 rounded-xl mr-3 animate-morph" style={{ animationDelay: '1s' }}>
                    <div className="text-white text-xl">☁️</div>
                  </div>
                  <h3 className="text-xl font-bold text-text">Cloud & DevOps</h3>
                </div>
                <div className="space-y-4">
                  {skills.cloud.map((skill, index) => (
                    <SkillBar
                      key={skill.name}
                      skill={skill.name}
                      percentage={skill.level}
                      color="bg-gradient-to-r from-accent-custom to-accent-custom/80"
                      delay={index * 200}
                    />
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Machine Learning */}
            <Card className="tech-card-3d glass-card bg-neutral-custom border border-gray-100 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-600/5 to-primary-custom/5"></div>
              <CardContent className="p-6 relative z-10">
                <div className="flex items-center mb-6">
                  <div className="bg-gradient-to-r from-purple-600 to-purple-500 p-3 rounded-xl mr-3 animate-morph" style={{ animationDelay: '2s' }}>
                    <div className="text-white text-xl">🧠</div>
                  </div>
                  <h3 className="text-xl font-bold text-text">Machine Learning</h3>
                </div>
                <div className="space-y-4">
                  {skills.ml.map((skill, index) => (
                    <SkillBar
                      key={skill.name}
                      skill={skill.name}
                      percentage={skill.level}
                      color="bg-gradient-to-r from-purple-600 to-purple-500"
                      delay={index * 200}
                    />
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Additional Skills Cards */}
            <Card className="tech-card-3d glass-card bg-neutral-custom border border-gray-100 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-green-600/5 to-emerald-500/5"></div>
              <CardContent className="p-6 relative z-10">
                <div className="flex items-center mb-4">
                  <div className="bg-gradient-to-r from-green-600 to-emerald-500 p-3 rounded-xl mr-3 animate-morph" style={{ animationDelay: '3s' }}>
                    <div className="text-white text-xl">🗄️</div>
                  </div>
                  <h3 className="text-xl font-bold text-text">Databases</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {["MySQL", "PostgreSQL", "MongoDB", "Redis", "DynamoDB"].map((db) => (
                    <Badge key={db} variant="secondary" className="bg-green-100 text-green-800 hover:bg-green-200 transition-all duration-300 hover:scale-105">
                      {db}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="tech-card-3d glass-card bg-neutral-custom border border-gray-100 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-orange-600/5 to-amber-500/5"></div>
              <CardContent className="p-6 relative z-10">
                <div className="flex items-center mb-4">
                  <div className="bg-gradient-to-r from-orange-600 to-amber-500 p-3 rounded-xl mr-3 animate-morph" style={{ animationDelay: '4s' }}>
                    <div className="text-white text-xl">🌐</div>
                  </div>
                  <h3 className="text-xl font-bold text-text">Web Technologies</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {["React", "Node.js", "Express", "REST APIs", "GraphQL"].map((tech) => (
                    <Badge key={tech} variant="secondary" className="bg-orange-100 text-orange-800 hover:bg-orange-200 transition-all duration-300 hover:scale-105">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="tech-card-3d glass-card bg-neutral-custom border border-gray-100 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-gray-600/5 to-slate-500/5"></div>
              <CardContent className="p-6 relative z-10">
                <div className="flex items-center mb-4">
                  <div className="bg-gradient-to-r from-gray-600 to-slate-500 p-3 rounded-xl mr-3 animate-morph" style={{ animationDelay: '5s' }}>
                    <div className="text-white text-xl">🛠️</div>
                  </div>
                  <h3 className="text-xl font-bold text-text">Tools & Frameworks</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {["Git", "Terraform", "Streamlit", "Power BI", "Tableau"].map((tool) => (
                    <Badge key={tool} variant="secondary" className="bg-gray-100 text-gray-800 hover:bg-gray-200 transition-all duration-300 hover:scale-105">
                      {tool}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 bg-gray-50">
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

      {/* Education & Certifications */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-text mb-4">Education & Certifications</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Academic foundation and professional certifications in analytics, cloud technologies, and project management
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Education */}
            <Card className="bg-neutral-custom border border-gray-100">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-text mb-6 flex items-center">
                  <GraduationCap className="text-primary-custom mr-3" />
                  Education
                </h3>
                <div className="space-y-6">
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
              </CardContent>
            </Card>

            {/* Certifications */}
            <Card className="bg-neutral-custom border border-gray-100">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-text mb-6 flex items-center">
                  <Award className="text-accent-custom mr-3" />
                  Certifications
                </h3>
                <div className="space-y-4">
                  {certifications.map((cert, index) => (
                    <div key={index} className="flex items-center p-3 bg-white rounded-lg border border-gray-100">
                      <div className="bg-blue-600 p-2 rounded mr-3">
                        <div className="text-white text-sm">MS</div>
                      </div>
                      <div>
                        <p className="font-medium text-text">{cert}</p>
                        <p className="text-sm text-gray-500">Microsoft</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gray-900 text-white relative">
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
