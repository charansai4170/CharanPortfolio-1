import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github } from "lucide-react";
export default function Projects() {
  const projects = [
    {
      title: "AI Healthcare Platform",
      description: "Machine learning platform for healthcare data analysis and predictive modeling",
      technologies: ["Python", "TensorFlow", "AWS", "React"],
      category: "Machine Learning",
      status: "Production"
    },
    {
      title: "Cloud Infrastructure Automation",
      description: "DevOps automation tools for scalable cloud deployment and monitoring",
      technologies: ["AWS", "Terraform", "Docker", "Kubernetes"],
      category: "DevOps",
      status: "Active Development"
    },
    {
      title: "LLM Integration Platform",
      description: "Enterprise platform for integrating Large Language Models into business workflows",
      technologies: ["Python", "OpenAI API", "FastAPI", "PostgreSQL"],
      category: "AI/ML",
      status: "Beta"
    }
  ];

  return (
      <div className="min-h-screen py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-bold text-text mb-6">Projects</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Explore my latest work in AI, machine learning, and cloud technologies
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <Card key={index} className="bg-white border shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardContent className="p-8">
                  <div className="mb-4">
                    <Badge variant="secondary" className="mb-2">
                      {project.category}
                    </Badge>
                    <Badge 
                      variant={project.status === "Production" ? "default" : "outline"}
                      className="ml-2"
                    >
                      {project.status}
                    </Badge>
                  </div>
                  
                  <h3 className="text-xl font-bold mb-3">{project.title}</h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">{project.description}</p>
                  
                  <div className="mb-6">
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech, techIndex) => (
                        <Badge key={techIndex} variant="outline" className="text-xs">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Button size="sm" className="flex-1">
                      <Github className="h-4 w-4 mr-2" />
                      Code
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Demo
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-16 text-center">
            <Card className="bg-white border shadow-xl max-w-2xl mx-auto">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold mb-4">Want to see more?</h2>
                <p className="text-gray-600 mb-6">
                  Check out my GitHub profile for more projects and contributions to the open-source community.
                </p>
                <Button className="bg-primary-custom hover:bg-primary-custom/90">
                  <Github className="h-4 w-4 mr-2" />
                  View GitHub Profile
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
  );
}