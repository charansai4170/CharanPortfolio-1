import { Calendar, MapPin, ExternalLink } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface ExperienceCardProps {
  title: string;
  company: string;
  location: string;
  duration: string;
  responsibilities: string[];
  isCurrentRole?: boolean;
  delay?: number;
}

const ExperienceCard = ({
  title,
  company,
  location,
  duration,
  responsibilities,
  isCurrentRole = false,
  delay = 0,
}: ExperienceCardProps) => {
  return (
    <Card 
      className={`card-hover border-l-4 ${
        isCurrentRole ? "border-l-primary" : "border-l-accent"
      } mb-8 fade-in-up`}
      style={{ animationDelay: `${delay}ms` }}
    >
      <CardContent className="p-8">
        <div className="flex flex-col md:flex-row md:items-start justify-between mb-4">
          <div className="flex-1">
            <h3 className="text-xl font-bold text-text mb-1">{title}</h3>
            <p className={`font-semibold ${isCurrentRole ? "text-primary-custom" : "text-accent-custom"} mb-2`}>
              {company}
            </p>
            <div className="flex items-center text-gray-500 text-sm mb-2">
              <MapPin className="h-4 w-4 mr-1" />
              {location}
            </div>
          </div>
          <div className="flex items-center text-gray-500 font-medium">
            <Calendar className="h-4 w-4 mr-2" />
            {duration}
          </div>
        </div>

        <div className="space-y-3">
          {responsibilities.map((responsibility, index) => (
            <div key={index} className="flex items-start">
              <div className={`w-2 h-2 rounded-full ${
                isCurrentRole ? "bg-primary" : "bg-accent"
              } mt-2 mr-3 flex-shrink-0`} />
              <p className="text-gray-600 leading-relaxed">{responsibility}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ExperienceCard;
