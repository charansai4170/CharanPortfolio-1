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
  Linkedin,
  Download
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import SkillBar from "@/components/SkillBar";
import TimelineExperience from "@/components/TimelineExperience";
import ProjectCard from "@/components/ProjectCard";

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

  const renderSkillsContent = () => (
    <div className="space-y-8">
      {/* Programming Skills */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl p-6"
      >
        <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
          <Code2 className="h-5 w-5 text-blue-400" />
          Programming Languages
        </h3>
        <div className="space-y-4">
          {skills.programming.map((skill, index) => (
            <SkillBar key={skill.name} skill={skill.name} level={skill.level} delay={index * 0.2} />
          ))}
        </div>
      </motion.div>

      {/* Cloud & DevOps */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl p-6"
      >
        <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
          <Award className="h-5 w-5 text-purple-400" />
          Cloud & DevOps
        </h3>
        <div className="space-y-4">
          {skills.cloud.map((skill, index) => (
            <SkillBar key={skill.name} skill={skill.name} level={skill.level} delay={index * 0.2} />
          ))}
        </div>
      </motion.div>

      {/* AI & Machine Learning */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl p-6"
      >
        <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
          <GraduationCap className="h-5 w-5 text-green-400" />
          AI & Machine Learning
        </h3>
        <div className="space-y-4">
          {skills.ml.map((skill, index) => (
            <SkillBar key={skill.name} skill={skill.name} level={skill.level} delay={index * 0.2} />
          ))}
        </div>
      </motion.div>
    </div>
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

  const renderProjectsContent = () => (
    <div className="grid grid-cols-1 gap-6">
      {projects.map((project, index) => (
        <motion.div
          key={project.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <ProjectCard {...project} index={index} />
        </motion.div>
      ))}
    </div>
  );

  const renderExperienceContent = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/5 backdrop-blur-xl border border-white/20 rounded-xl p-6"
    >
      <TimelineExperience />
    </motion.div>
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
        <CardContent className="space-y-6">
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
              <Download className="h-4 w-4 mr-2" />
              Download Resume
            </Button>
          </div>
          
          {/* Microsoft Certifications */}
          <div className="mt-6">
            <h4 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <Award className="h-5 w-5 text-yellow-400" />
              Certifications
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {[
                "Microsoft Azure Data Engineer Associate",
                "Microsoft Power BI Data Analyst Associate", 
                "Microsoft Azure Data Fundamentals",
                "Microsoft Azure Fundamentals"
              ].map((cert, index) => (
                <div key={index} className="flex items-center gap-3 p-3 bg-white/5 border border-white/10 rounded-lg">
                  <GraduationCap className="h-4 w-4 text-blue-400 flex-shrink-0" />
                  <span className="text-gray-300 text-sm">{cert}</span>
                </div>
              ))}
            </div>
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