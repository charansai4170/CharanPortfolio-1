import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Code2, 
  Briefcase, 
  User, 
  Mail, 
  Award,
  GraduationCap,
  MapPin,
  Calendar,
  ExternalLink,
  Github,
  Linkedin
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface ContentCanvasProps {
  query: string;
  contentType: 'skills' | 'projects' | 'experience' | 'about' | 'contact' | 'general';
}

const DynamicContentCanvas = ({ query, contentType }: ContentCanvasProps) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(false);
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, [query, contentType]);

  const renderSkillsContent = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {/* Programming Skills */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1 }}
      >
        <Card className="bg-white/10 backdrop-blur-xl border-white/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-white">
              <Code2 className="h-5 w-5 text-blue-400" />
              Programming
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { name: "Python", level: 95, color: "bg-green-500" },
              { name: "JavaScript/TypeScript", level: 85, color: "bg-yellow-500" },
              { name: "Java/C++", level: 80, color: "bg-red-500" }
            ].map((skill, index) => (
              <div key={skill.name} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-300">{skill.name}</span>
                  <span className="text-blue-400">{skill.level}%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <motion.div
                    className={`h-2 rounded-full ${skill.color}`}
                    initial={{ width: 0 }}
                    animate={{ width: `${skill.level}%` }}
                    transition={{ delay: 0.2 + index * 0.1, duration: 0.8 }}
                  />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </motion.div>

      {/* Cloud & DevOps */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
      >
        <Card className="bg-white/10 backdrop-blur-xl border-white/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-white">
              <Award className="h-5 w-5 text-purple-400" />
              Cloud & DevOps
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { name: "AWS", level: 90, color: "bg-orange-500" },
              { name: "Docker/Kubernetes", level: 85, color: "bg-blue-500" },
              { name: "Jenkins/CI/CD", level: 80, color: "bg-purple-500" }
            ].map((skill, index) => (
              <div key={skill.name} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-300">{skill.name}</span>
                  <span className="text-purple-400">{skill.level}%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <motion.div
                    className={`h-2 rounded-full ${skill.color}`}
                    initial={{ width: 0 }}
                    animate={{ width: `${skill.level}%` }}
                    transition={{ delay: 0.2 + index * 0.1, duration: 0.8 }}
                  />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </motion.div>

      {/* AI & ML */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3 }}
      >
        <Card className="bg-white/10 backdrop-blur-xl border-white/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-white">
              <GraduationCap className="h-5 w-5 text-green-400" />
              AI & Machine Learning
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { name: "LLMs/RAG", level: 90, color: "bg-green-500" },
              { name: "TensorFlow/PyTorch", level: 85, color: "bg-red-500" },
              { name: "Vector Databases", level: 80, color: "bg-indigo-500" }
            ].map((skill, index) => (
              <div key={skill.name} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-300">{skill.name}</span>
                  <span className="text-green-400">{skill.level}%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <motion.div
                    className={`h-2 rounded-full ${skill.color}`}
                    initial={{ width: 0 }}
                    animate={{ width: `${skill.level}%` }}
                    transition={{ delay: 0.2 + index * 0.1, duration: 0.8 }}
                  />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );

  const renderProjectsContent = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {[
        {
          title: "AI-Powered USCIS Chatbot",
          description: "RAG-based Python web application providing intelligent responses to USCIS Manual queries using LangChain and vector databases.",
          technologies: ["Python", "LangChain", "Streamlit", "FAISS", "Llama 3.1"],
          category: "AI/ML",
          color: "from-blue-500 to-purple-600"
        },
        {
          title: "Healthcare Data Pipeline",
          description: "Scalable ETL pipeline processing 1M+ medical records with 99.5% accuracy and automated compliance validation.",
          technologies: ["AWS", "Python", "Docker", "PostgreSQL"],
          category: "Healthcare",
          color: "from-green-500 to-blue-500"
        },
        {
          title: "Intelligent Document OCR",
          description: "ML-powered document processing system with custom OCR models achieving 95% accuracy on medical forms.",
          technologies: ["TensorFlow", "OpenCV", "FastAPI", "AWS"],
          category: "Computer Vision",
          color: "from-purple-500 to-pink-500"
        },
        {
          title: "Real-time Analytics Dashboard",
          description: "Interactive Power BI dashboard providing real-time insights for healthcare operations with automated reporting.",
          technologies: ["Power BI", "Azure", "SQL Server", "Python"],
          category: "Analytics",
          color: "from-orange-500 to-red-500"
        }
      ].map((project, index) => (
        <motion.div
          key={project.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <Card className="bg-white/10 backdrop-blur-xl border-white/20 hover:border-white/40 transition-all duration-300 group">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-white mb-2">{project.title}</CardTitle>
                  <Badge className={`bg-gradient-to-r ${project.color} text-white`}>
                    {project.category}
                  </Badge>
                </div>
                <Button variant="ghost" size="icon" className="opacity-0 group-hover:opacity-100 transition-opacity">
                  <ExternalLink className="h-4 w-4 text-gray-400" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-gray-300 mb-4">
                {project.description}
              </CardDescription>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <Badge key={tech} variant="outline" className="border-gray-600 text-gray-300">
                    {tech}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );

  const renderExperienceContent = () => (
    <div className="space-y-6">
      {[
        {
          company: "Mettles Solution LLC",
          role: "Data Scientist",
          period: "Jan 2022 - Present",
          location: "Remote",
          achievements: [
            "Built RAG-based AI chatbot reducing query response time by 70%",
            "Developed OCR pipeline processing 10K+ documents daily with 95% accuracy",
            "Optimized AWS infrastructure reducing costs by $50K annually"
          ]
        },
        {
          company: "Centers for Medicare & Medicaid Services",
          role: "Software Engineer (Contract)",
          period: "Mar 2021 - Dec 2021",
          location: "Baltimore, MD",
          achievements: [
            "Implemented healthcare data validation system with 99.5% accuracy",
            "Built real-time dashboard serving 500+ concurrent users",
            "Automated compliance reporting saving 40 hours/week"
          ]
        }
      ].map((exp, index) => (
        <motion.div
          key={exp.company}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.2 }}
        >
          <Card className="bg-white/10 backdrop-blur-xl border-white/20">
            <CardHeader>
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <CardTitle className="text-white">{exp.role}</CardTitle>
                  <CardDescription className="text-blue-400 font-medium">
                    {exp.company}
                  </CardDescription>
                </div>
                <div className="flex flex-col md:items-end gap-1">
                  <div className="flex items-center gap-2 text-gray-400">
                    <Calendar className="h-4 w-4" />
                    <span>{exp.period}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-400">
                    <MapPin className="h-4 w-4" />
                    <span>{exp.location}</span>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {exp.achievements.map((achievement, achieveIndex) => (
                  <motion.li
                    key={achieveIndex}
                    className="flex items-start gap-3 text-gray-300"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.2 + achieveIndex * 0.1 }}
                  >
                    <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0" />
                    {achievement}
                  </motion.li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );

  const renderAboutContent = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <Card className="bg-white/10 backdrop-blur-xl border-white/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-white">
            <User className="h-5 w-5 text-blue-400" />
            About Charan Thota
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-gray-300 leading-relaxed">
            Results-driven Software and Machine Learning Engineer with 2.5+ years of experience building 
            scalable, AI-driven platforms and cloud-native applications. Specializing in healthcare technology 
            solutions that deliver measurable business impact.
          </p>
          <p className="text-gray-300 leading-relaxed">
            Expert in Python, AWS cloud architecture, and modern AI/ML frameworks including LLMs, RAG systems, 
            and vector databases. Passionate about creating intelligent systems that solve real-world problems 
            in healthcare and enterprise domains.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            {[
              { label: "Experience", value: "2.5+ Years" },
              { label: "Projects", value: "15+" },
              { label: "Technologies", value: "20+" },
              { label: "Certifications", value: "AWS" }
            ].map((stat) => (
              <div key={stat.label} className="text-center p-3 bg-white/5 rounded-lg">
                <div className="text-2xl font-bold text-blue-400">{stat.value}</div>
                <div className="text-sm text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );

  const renderContactContent = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <Card className="bg-white/10 backdrop-blur-xl border-white/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-white">
            <Mail className="h-5 w-5 text-blue-400" />
            Get In Touch
          </CardTitle>
          <CardDescription className="text-gray-300">
            Ready to discuss opportunities or collaborate on innovative projects
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white justify-start">
              <Mail className="h-4 w-4 mr-2" />
              charan.thota@email.com
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white justify-start">
              <Linkedin className="h-4 w-4 mr-2" />
              LinkedIn Profile
            </Button>
            <Button className="bg-gray-800 hover:bg-gray-900 text-white justify-start">
              <Github className="h-4 w-4 mr-2" />
              GitHub Profile
            </Button>
            <Button className="bg-green-600 hover:bg-green-700 text-white justify-start">
              <MapPin className="h-4 w-4 mr-2" />
              Available Remotely
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );

  const renderContent = () => {
    switch (contentType) {
      case 'skills':
        return renderSkillsContent();
      case 'projects':
        return renderProjectsContent();
      case 'experience':
        return renderExperienceContent();
      case 'about':
        return renderAboutContent();
      case 'contact':
        return renderContactContent();
      default:
        return renderAboutContent();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-black pt-20 pb-32">
      <div className="container mx-auto px-4 py-8">
        <AnimatePresence mode="wait">
          {isVisible && (
            <motion.div
              key={`${contentType}-${query}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="mb-8">
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                  {query || "Welcome to my portfolio"}
                </h1>
                <p className="text-gray-400">
                  {contentType === 'skills' && "Here are my technical skills and expertise"}
                  {contentType === 'projects' && "Explore my recent projects and work"}
                  {contentType === 'experience' && "My professional journey and achievements"}
                  {contentType === 'about' && "Get to know more about me"}
                  {contentType === 'contact' && "Let's connect and collaborate"}
                  {contentType === 'general' && "Discover my work, skills, and experience"}
                </p>
              </div>
              {renderContent()}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default DynamicContentCanvas;