import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Briefcase, Calendar, MapPin } from "lucide-react";
import Navigation from "@/components/Navigation";

export default function Experience() {
  const experiences = [
    {
      title: "Senior ML Engineer",
      company: "TechCorp Inc.",
      location: "San Francisco, CA",
      period: "2022 - Present",
      type: "Full-time",
      description: "Leading machine learning initiatives and building scalable AI-driven platforms.",
      achievements: [
        "Developed RAG-based systems that reduced query time by 95%",
        "Built healthcare data analysis platforms processing 10M+ records",
        "Achieved 90%+ accuracy in predictive models"
      ],
      technologies: ["Python", "AWS", "TensorFlow", "Docker"]
    },
    {
      title: "Software Engineer",
      company: "DataSolutions Ltd.",
      location: "Remote",
      period: "2021 - 2022",
      type: "Full-time",
      description: "Full-stack development with focus on data processing and automation.",
      achievements: [
        "Automated data extraction saving $5M in operational costs",
        "Created 20+ dashboards saving 500+ hours annually",
        "Improved operational efficiency by 15%"
      ],
      technologies: ["React", "Node.js", "PostgreSQL", "Python"]
    }
  ];

  return (
    <div className="min-h-screen">
      <Navigation />
      
      <div className="pt-24 pb-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">Experience</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              My professional journey in software engineering and machine learning
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-8">
            {experiences.map((exp, index) => (
              <Card key={index} className="bg-white/90 backdrop-blur-sm border-0 shadow-lg">
                <CardContent className="p-8">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-6">
                    <div className="mb-4 md:mb-0">
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">{exp.title}</h3>
                      <div className="flex items-center text-lg text-gray-700 mb-2">
                        <Briefcase className="h-5 w-5 mr-2 text-blue-600" />
                        {exp.company}
                      </div>
                      <div className="flex items-center text-gray-600 mb-2">
                        <MapPin className="h-4 w-4 mr-2" />
                        {exp.location}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center text-gray-600 mb-2">
                        <Calendar className="h-4 w-4 mr-2" />
                        {exp.period}
                      </div>
                      <Badge variant="secondary">{exp.type}</Badge>
                    </div>
                  </div>

                  <p className="text-gray-700 mb-6 leading-relaxed">{exp.description}</p>

                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-900 mb-3">Key Achievements:</h4>
                    <ul className="space-y-2">
                      {exp.achievements.map((achievement, achIndex) => (
                        <li key={achIndex} className="flex items-start">
                          <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                          <span className="text-gray-700">{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Technologies:</h4>
                    <div className="flex flex-wrap gap-2">
                      {exp.technologies.map((tech, techIndex) => (
                        <Badge key={techIndex} variant="outline" className="text-sm">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}