import { ExternalLink, Github, Code, Zap } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface ProjectCardProps {
  title: string;
  description: string;
  technologies: string[];
  category: string;
  highlights: string[];
  delay?: number;
}

const ProjectCard = ({
  title,
  description,
  technologies,
  category,
  highlights,
  delay = 0,
}: ProjectCardProps) => {
  const getCategoryIcon = () => {
    switch (category.toLowerCase()) {
      case "ai/ml":
        return <Zap className="h-5 w-5" />;
      case "web":
        return <Code className="h-5 w-5" />;
      default:
        return <Code className="h-5 w-5" />;
    }
  };

  const getCategoryColor = () => {
    switch (category.toLowerCase()) {
      case "ai/ml":
        return "text-purple-600";
      case "web":
        return "text-green-600";
      default:
        return "text-blue-600";
    }
  };

  return (
    <Card 
      className="tech-card-3d glass-card h-full fade-in-up relative overflow-hidden border border-gray-100"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-primary-custom/3 to-accent-custom/3"></div>
      <CardContent className="p-6 h-full flex flex-col relative z-10">
        <div className={`flex items-center mb-3 ${getCategoryColor()}`}>
          {getCategoryIcon()}
          <h3 className="text-xl font-bold text-text ml-2">{title}</h3>
        </div>

        <p className="text-gray-600 mb-4 leading-relaxed flex-grow">{description}</p>

        {highlights.length > 0 && (
          <div className="mb-4">
            <h4 className="font-semibold text-text mb-2">Key Highlights:</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              {highlights.map((highlight, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-primary-custom mr-2">•</span>
                  {highlight}
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="flex flex-wrap gap-2 mb-4">
          {technologies.map((tech, index) => (
            <Badge
              key={index}
              variant="secondary"
              className="bg-primary/10 text-primary-custom hover:bg-primary/20"
            >
              {tech}
            </Badge>
          ))}
        </div>

        <div className="flex gap-3 mt-auto">
          <Button
            className="flex-1 bg-primary-custom hover:bg-primary-custom/90 text-white"
            size="sm"
          >
            <ExternalLink className="h-4 w-4 mr-2" />
            Demo
          </Button>
          <Button
            variant="outline"
            className="flex-1 border-primary-custom text-primary-custom hover:bg-primary-custom hover:text-white"
            size="sm"
          >
            <Github className="h-4 w-4 mr-2" />
            Code
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProjectCard;
