import { motion, useInView, useAnimation } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { MapPin, Calendar, Building, Briefcase, GraduationCap } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface ExperienceItem {
  id: string;
  title: string;
  company: string;
  location: string;
  duration: string;
  type: 'full-time' | 'internship' | 'apprenticeship' | 'part-time';
  responsibilities: string[];
  isCurrentRole?: boolean;
}

const TimelineExperience = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  const experiences: ExperienceItem[] = [
    {
      id: 'mettles-cms',
      title: 'Software Developer',
      company: 'Mettles Solution LLC - Associated Client: Centers for Medicare & Medicaid Services (CMS)',
      location: 'Remote',
      duration: 'Oct 2024 - Present',
      type: 'full-time',
      isCurrentRole: true,
      responsibilities: [
        'AI-powered medical document review system with OCR and ML models',
        'Python rule-checking agent for CMS compliance evaluation',
        'Scalable RESTful APIs with Flask, Docker, Kubernetes, and AWS services',
        'AI tool for submission tracking and document review insights',
        'Automated workflows for document processing and classification',
        'Security checks with SonarQube/OWASP (resolved 100-150 issues)',
        'System monitoring with Datadog and CloudWatch',
        'ReactJS frontend for document management workflows'
      ]
    },
    {
      id: 'varenya',
      title: 'Software Engineer',
      company: 'Varenya Inc',
      location: 'Remote',
      duration: 'Jun 2024 – Sept 2024',
      type: 'full-time',
      responsibilities: [
        'Analyzed 10M+ patient records with SQL/Python (15% efficiency improvement)',
        'Built AWS Redshift data pipelines and predictive models (75% accuracy)',
        'ML models for readmission prediction (20% accuracy improvement, 10% reduction)',
        'Automated data extraction from 50+ sources with Power BI dashboards ($5M cost savings)'
      ]
    },
    {
      id: 'free-float',
      title: 'Business Intelligence Analyst',
      company: 'Free Float LLC',
      location: 'Boston, MA, USA',
      duration: 'April 2023 – July 2023',
      type: 'apprenticeship',
      responsibilities: [
        'Predictive model for board performance assessment (88% accuracy)',
        'Research on director performance traits and board effectiveness dynamics'
      ]
    },
    {
      id: 'everyday-chemist',
      title: 'Business Intelligence Analyst',
      company: 'Everyday Chemist Inc',
      location: 'Boston, MA, USA',
      duration: 'Jan 2023 – Mar 2023',
      type: 'apprenticeship',
      responsibilities: [
        'Designed 20+ dashboards (saved 500+ man-hours annually)',
        'Data analysis with SQL/Python (10% conversion rate boost)',
        'ETL pipelines with Azure Data Factory for enhanced accuracy',
        'A/B testing and analytics (10% conversions, 20% sales growth)'
      ]
    },
    {
      id: 'northeastern-events',
      title: 'Event Specialist',
      company: 'Northeastern University',
      location: 'Boston, MA, USA',
      duration: 'Feb 2023 - July 2023',
      type: 'part-time',
      responsibilities: [
        'Streamlined event operations and logistics coordination',
        'Automated tracking systems with Excel scripts',
        'Event feedback analysis for improved planning and engagement'
      ]
    },
    {
      id: 'global-shala',
      title: 'Data Analyst Intern',
      company: 'Global Shala',
      location: 'Remote',
      duration: 'Jun 2021 - July 2021',
      type: 'internship',
      responsibilities: [
        'Automated data extraction/transformation with Python and SQL-Salesforce integration',
        'Sales growth and customer retention analysis for data-driven strategies',
        'Dynamic Power BI dashboards with Python-enhanced insights'
      ]
    },
    {
      id: 'vedamrit',
      title: 'Engineering Intern',
      company: 'Vedamrit Technology Solutions Private Limited',
      location: 'India',
      duration: 'Aug 2019 – Sep 2019',
      type: 'internship',
      responsibilities: [
        'Python automation tools for embedded system development and testing',
        'Microcontroller programming (Arduino, STM32) with C/C++ and peripheral interfaces',
        'Hardware-software integration and real-time debugging optimization'
      ]
    },
    {
      id: 'bsnl',
      title: 'Student Intern',
      company: 'Bharat Sanchar Nigam Limited',
      location: 'India',
      duration: 'Dec 2018',
      type: 'internship',
      responsibilities: [
        'GSM infrastructure experience with BTS, BSC, and MSC architecture',
        'Network monitoring and Python automation for diagnostics/reporting',
        'SIM activation scripts and HLR database provisioning services',
        'Signaling protocols (SS7, MAP) and call/SMS process simulations with Wireshark'
      ]
    }
  ];

  const getTypeConfig = (type: string) => {
    switch (type) {
      case 'full-time':
        return {
          color: '#2563EB',
          bgColor: 'bg-blue-50',
          borderColor: 'border-blue-200',
          icon: <Briefcase className="h-5 w-5" />,
          badge: 'Full-time',
          badgeVariant: 'default' as const
        };
      case 'part-time':
        return {
          color: '#7C3AED',
          bgColor: 'bg-purple-50',
          borderColor: 'border-purple-200',
          icon: <Briefcase className="h-5 w-5" />,
          badge: 'Part-time',
          badgeVariant: 'secondary' as const
        };
      case 'apprenticeship':
        return {
          color: '#0EA5E9',
          bgColor: 'bg-sky-50',
          borderColor: 'border-sky-200',
          icon: <GraduationCap className="h-5 w-5" />,
          badge: 'Apprenticeship',
          badgeVariant: 'secondary' as const
        };
      case 'internship':
        return {
          color: '#10B981',
          bgColor: 'bg-emerald-50',
          borderColor: 'border-emerald-200',
          icon: <GraduationCap className="h-5 w-5" />,
          badge: 'Internship',
          badgeVariant: 'outline' as const
        };
      default:
        return {
          color: '#6B7280',
          bgColor: 'bg-gray-50',
          borderColor: 'border-gray-200',
          icon: <Briefcase className="h-5 w-5" />,
          badge: 'Position',
          badgeVariant: 'default' as const
        };
    }
  };

  const ExperienceCard = ({ experience, typeConfig }: {
    experience: ExperienceItem;
    typeConfig: any;
  }) => {
    return (
      <div
        className={`
          relative p-6 rounded-2xl border-2 shadow-lg hover:shadow-xl transition-all duration-300 bg-white
          ${typeConfig.borderColor}
          ${experience.isCurrentRole ? 'ring-2 ring-blue-400 ring-opacity-50' : ''}
        `}
      >

        {/* Current Role Indicator */}
        {experience.isCurrentRole && (
          <div className="absolute -top-2 -right-2 z-10">
            <div className="bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full">
              Current
            </div>
          </div>
        )}

        {/* Header */}
        <div className="mb-4 relative z-10">
          <div className="flex items-center justify-between mb-2">
            <Badge variant={typeConfig.badgeVariant} className="mb-2">
              {typeConfig.badge}
            </Badge>
            <div className="flex items-center text-sm text-gray-500">
              <Calendar className="h-4 w-4 mr-1" />
              {experience.duration}
            </div>
          </div>
          
          <h3 className="text-xl font-bold text-gray-900 mb-1">
            {experience.title}
          </h3>
          
          <div className="flex items-center text-gray-700 mb-2">
            <Building className="h-4 w-4 mr-2 flex-shrink-0" />
            <span className="font-medium" style={{ color: typeConfig.color }}>{experience.company}</span>
          </div>
          
          <div className="flex items-center text-gray-600">
            <MapPin className="h-4 w-4 mr-2 flex-shrink-0" />
            <span>{experience.location}</span>
          </div>
        </div>

        {/* Responsibilities */}
        <div className="space-y-3 relative z-10">
          {experience.responsibilities.map((responsibility, idx) => (
            <div key={idx} className="flex items-start space-x-3">
              <div 
                className="w-2 h-2 rounded-full mt-2 flex-shrink-0"
                style={{ backgroundColor: typeConfig.color }}
              />
              <p className="text-gray-700 text-sm leading-relaxed">
                {responsibility}
              </p>
            </div>
          ))}
        </div>

        {/* Decorative Corner */}
        <div 
          className="absolute top-0 right-0 w-20 h-20 opacity-10 rounded-bl-full"
          style={{ backgroundColor: typeConfig.color }}
        />


      </div>
    );
  };

  return (
    <section id="experience" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <motion.div
          ref={containerRef}
          initial="hidden"
          animate={controls}
          variants={{
            hidden: { opacity: 0 },
            visible: { 
              opacity: 1,
              transition: { staggerChildren: 0.1 }
            }
          }}
        >
          {/* Section Header */}
          <motion.div 
            className="text-center mb-16"
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
            }}
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Professional Experience
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              A journey through diverse roles in software engineering, data analytics, and machine learning
            </p>
          </motion.div>

          {/* Timeline */}
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-8 md:left-1/2 transform md:-translate-x-px top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 via-sky-400 to-emerald-400"></div>

            {/* Experience Items */}
            <div className="space-y-12">
              {experiences.map((experience, index) => {
                const typeConfig = getTypeConfig(experience.type);
                const isLeft = index % 2 === 0;

                return (
                  <motion.div
                    key={experience.id}
                    className={`relative flex items-center ${
                      isLeft 
                        ? 'md:flex-row-reverse md:text-right' 
                        : 'md:flex-row md:text-left'
                    } flex-col md:flex-row`}
                    variants={{
                      hidden: { 
                        opacity: 0, 
                        x: isLeft ? 50 : -50,
                        scale: 0.9
                      },
                      visible: { 
                        opacity: 1, 
                        x: 0,
                        scale: 1,
                        transition: { 
                          duration: 0.6,
                          type: "spring",
                          damping: 20,
                          stiffness: 100
                        }
                      }
                    }}
                  >
                    {/* Timeline Node */}
                    <div className="absolute left-8 md:left-1/2 transform -translate-x-1/2 z-10">
                      <div 
                        className="w-12 h-12 rounded-full border-4 border-white shadow-lg flex items-center justify-center text-white"
                        style={{ backgroundColor: typeConfig.color }}
                      >
                        {typeConfig.icon}
                      </div>
                    </div>

                    {/* Content Card */}
                    <div className={`
                      w-full md:w-5/12 ml-16 md:ml-0
                      ${isLeft ? 'md:mr-auto md:pr-8' : 'md:ml-auto md:pl-8'}
                    `}>
                      <ExperienceCard 
                        experience={experience} 
                        typeConfig={typeConfig}
                      />
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TimelineExperience;