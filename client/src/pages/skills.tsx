import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Code, Cloud, Database, Brain } from "lucide-react";
import Navigation from "@/components/Navigation";
import SkillBar from "@/components/SkillBar";

export default function Skills() {
  const skillCategories = [
    {
      title: "Programming Languages",
      icon: Code,
      color: "text-blue-600",
      skills: [
        { name: "Python", level: 95 },
        { name: "JavaScript/TypeScript", level: 85 },
        { name: "Java", level: 80 },
        { name: "C++", level: 75 }
      ]
    },
    {
      title: "Cloud & DevOps",
      icon: Cloud,
      color: "text-green-600",
      skills: [
        { name: "AWS", level: 90 },
        { name: "Docker/Kubernetes", level: 85 },
        { name: "Jenkins/CI-CD", level: 80 },
        { name: "Terraform", level: 75 }
      ]
    },
    {
      title: "Machine Learning",
      icon: Brain,
      color: "text-purple-600",
      skills: [
        { name: "LLMs/RAG", level: 90 },
        { name: "TensorFlow/PyTorch", level: 85 },
        { name: "Vector Databases", level: 80 },
        { name: "MLOps", level: 75 }
      ]
    },
    {
      title: "Databases & Data",
      icon: Database,
      color: "text-orange-600",
      skills: [
        { name: "PostgreSQL", level: 90 },
        { name: "MongoDB", level: 80 },
        { name: "Redis", level: 75 },
        { name: "Elasticsearch", level: 70 }
      ]
    }
  ];

  const certifications = [
    "Microsoft Azure Data Engineer Associate",
    "Microsoft Power BI Data Analyst Associate", 
    "Microsoft Azure Data Fundamentals",
    "Microsoft Azure Fundamentals"
  ];

  return (
    <div className="min-h-screen">
      <Navigation />
      
      <div className="pt-24 pb-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">Skills</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Technical expertise spanning full-stack development, machine learning, and cloud technologies
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto mb-16">
            {skillCategories.map((category, index) => {
              const IconComponent = category.icon;
              return (
                <Card key={index} className="bg-white/90 backdrop-blur-sm border-0 shadow-lg">
                  <CardContent className="p-8">
                    <div className="flex items-center mb-6">
                      <div className={`${category.color} p-3 bg-gray-100 rounded-xl mr-4`}>
                        <IconComponent className="h-8 w-8" />
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900">{category.title}</h3>
                    </div>
                    <div className="space-y-4">
                      {category.skills.map((skill, skillIndex) => (
                        <SkillBar
                          key={skill.name}
                          skill={skill.name}
                          percentage={skill.level}
                          color="bg-gradient-to-r from-blue-500 to-purple-600"
                          delay={skillIndex * 200}
                        />
                      ))}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <div className="max-w-4xl mx-auto">
            <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Certifications</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {certifications.map((cert, index) => (
                    <div key={index} className="flex items-center p-4 bg-gray-50 rounded-lg">
                      <div className="w-3 h-3 bg-blue-600 rounded-full mr-3 flex-shrink-0"></div>
                      <span className="text-gray-700 font-medium">{cert}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}