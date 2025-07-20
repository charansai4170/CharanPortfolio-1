import { Card, CardContent } from "@/components/ui/card";
import { User, Award, Code } from "lucide-react";
import Navigation from "@/components/Navigation";

export default function About() {
  return (
    <div className="min-h-screen">
      <Navigation />
      <div className="pt-24 pb-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">About Me</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Learn more about my background, experience, and passion for technology
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardContent className="p-8 text-center">
                <User className="h-12 w-12 text-primary-custom mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">Background</h3>
                <p className="text-gray-600">Software & ML Engineer with 2.5+ years experience</p>
              </CardContent>
            </Card>

            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardContent className="p-8 text-center">
                <Award className="h-12 w-12 text-primary-custom mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">Expertise</h3>
                <p className="text-gray-600">AI-driven platforms and cloud-native applications</p>
              </CardContent>
            </Card>

            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardContent className="p-8 text-center">
                <Code className="h-12 w-12 text-primary-custom mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">Technologies</h3>
                <p className="text-gray-600">Python, AWS, LLMs, DevOps tools</p>
              </CardContent>
            </Card>
          </div>

          <div className="max-w-4xl mx-auto">
            <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-xl">
              <CardContent className="p-12">
                <h2 className="text-3xl font-bold mb-6 text-center">My Journey</h2>
                <div className="prose prose-lg max-w-none">
                  <p className="text-gray-700 mb-6 leading-relaxed">
                    As a Software and Machine Learning Engineer with over 2.5 years of experience, 
                    I specialize in building scalable, AI-driven platforms and cloud-native applications. 
                    My expertise spans across Python, AWS, Large Language Models (LLMs), and DevOps tools, 
                    with a particular focus on developing intelligent systems for healthcare and enterprise domains.
                  </p>
                  
                  <p className="text-gray-700 mb-6 leading-relaxed">
                    Throughout my career, I've been passionate about leveraging cutting-edge technologies 
                    to solve complex real-world problems. From developing machine learning models that 
                    improve healthcare outcomes to building robust cloud infrastructure that scales 
                    with business needs, I'm constantly pushing the boundaries of what's possible 
                    with modern technology.
                  </p>

                  <p className="text-gray-700 leading-relaxed">
                    When I'm not coding, you can find me exploring the latest developments in AI research, 
                    contributing to open-source projects, or mentoring aspiring developers. I believe 
                    in the power of collaboration and continuous learning to drive innovation and 
                    create meaningful impact in the tech industry.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}