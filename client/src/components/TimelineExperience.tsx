import { motion, useInView, useAnimation } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { MapPin, Calendar, Building, Briefcase, GraduationCap } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface ExperienceItem {
  id: string;
  title: string;
  company: string;
  location: string;
  duration: string;
  type: 'full-time' | 'internship' | 'apprenticeship';
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
        'Developed an AI-powered medical document review system that allowed patients, doctors, and hospitals to submit documents for CMS-compliant analysis using OCR and machine learning models.',
        'Built a Python-based rule-checking agent leveraging ML models to evaluate documents against CMS guidelines, producing detailed compliance reports for end users.',
        'Designed and deployed scalable RESTful APIs using Flask, containerized with Docker, integrated with Jenkins CI/CD pipelines, orchestrated them with Kubernetes for scalable and reliable cloud infrastructure, and connected to AWS services including S3, SQS, SNS, and CloudWatch.',
        'Created an AI tool for Review Contractors to track submissions, visualize document review statuses, and generate insights on document flow and volume.',
        'Automated workflows for document ingestion, virus scanning, and OCR processing; implemented embedding-based logic for intelligent document classification and used AWS CloudWatch for system monitoring.',
        'Conducted rigorous security checks using SonarQube and ZAP/OWASP, resolving approximately 100–150 code smells and bugs to ensure high code quality.',
        'Utilized Datadog and CloudWatch for log aggregation and monitoring, ensuring system reliability and quick issue resolution.',
        'Developed front-end interfaces using ReactJS for streamlined document management and review workflows.'
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
        'Analyzed 10M+ patient records using SQL and Python to extract key metrics like ALOS, cost per patient, and readmission rates, improving operational efficiency by 15%.',
        'Built data pipelines in AWS Redshift and automated workflows with Python, creating predictive models that achieved 75% accuracy in forecasting readmission likelihood and optimized resource allocation.',
        'Developed machine learning models (logistic regression, random forests) with data science teams, improving readmission prediction accuracy by 20% and reducing hospital readmissions by 10%.',
        'Automated data extraction from 50+ diverse sources and developed 5 dynamic Power BI dashboards, enabling data-driven insights that led to a $5M reduction in costs through strategic care management.'
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
        'Developed a predictive model to assess board of directors performance based on individual influence and company metrics, contributing to a deeper understanding of the relationship between past and future performance with an accuracy of 88%.',
        'Conducted comprehensive research on director performance traits and their impact on board effectiveness, providing valuable insights into the dynamics of boardrooms and their influence on company outcomes.'
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
        'Designed and deployed 20+ dashboards, reducing decision-making time and saving 500+ man-hours annually through optimized queries and data modeling.',
        'Analyzed large datasets with SQL, Python, and statistical methods to boost campaign conversion rates by 10%, while building ETL pipelines with Azure Data Factory to enhance data accuracy and reduce redundancy.',
        'Led A/B testing and predictive analytics, driving a 10% increase in conversions, 20% sales growth, and 15% improved pipeline visibility through integrated Salesforce and Azure data updates.'
      ]
    },
    {
      id: 'northeastern-events',
      title: 'Event Specialist',
      company: 'Northeastern University',
      location: 'Boston, MA, USA',
      duration: 'Feb 2023 - July 2023',
      type: 'full-time',
      responsibilities: [
        'Streamlined event operations by organizing schedules, managing registrations, and coordinating logistics across multiple campus departments.',
        'Maintained and updated internal tracking systems using Excel and simple automation scripts to reduce manual work and improve accuracy in attendance and resource planning.',
        'Took initiative to analyze event feedback data, identifying trends and sharing insights with the team to help improve future planning and student engagement.'
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
        'Automated data extraction and transformation using Python, integrating SQL databases with Salesforce to improve reporting accuracy and business decision-making.',
        'Analyzed sales growth, customer retention, and profitability using Python, enabling data-driven strategies and improved outcomes.',
        'Developed dynamic Power BI dashboards with Python-enhanced insights, highlighting sales trends and driving stakeholder engagement.'
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
        'Designed and implemented Python-based automation tools to support embedded system development, including data logging, sensor simulation, and testing workflows.',
        'Gained hands-on experience with microcontrollers (e.g., Arduino, STM32) by writing and debugging C/C++ code, interfacing with peripherals like sensors, actuators, and communication modules (UART, SPI, I2C).',
        'Participated in hardware-software integration tasks, performed real-time debugging, and optimized performance for embedded applications in a cross-functional engineering team.'
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
        'Worked with BSNL\'s GSM (Global System for Mobile Communications) infrastructure, gaining hands-on experience in mobile network operations, including BTS (Base Transceiver Station), BSC (Base Station Controller), and MSC (Mobile Switching Center) architecture.',
        'Assisted in network monitoring and fault management using telecom-grade software tools, analyzing performance logs, and scripting automation tasks in Python to streamline network diagnostics and reporting.',
        'Developed and tested automation scripts for SIM activation workflows and subscriber data processing, enhancing the efficiency of provisioning services through interaction with HLR (Home Location Register) databases.',
        'Collaborated with engineers to understand signaling protocols (SS7, MAP) and implemented simulations of call setup and SMS delivery processes using tools like Wireshark and custom packet inspection scripts.'
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

  return (
    <section id="experience" className="py-20 bg-gradient-to-br from-gray-50 to-white">
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
                      w-full md:w-5/12 ml-20 md:ml-0
                      ${isLeft ? 'md:mr-auto md:pr-12' : 'md:ml-auto md:pl-12'}
                    `}>
                      <div className={`
                        relative p-6 rounded-2xl border-2 shadow-lg hover:shadow-xl transition-all duration-300 bg-white
                        ${typeConfig.borderColor}
                        ${experience.isCurrentRole ? 'ring-2 ring-blue-400 ring-opacity-50' : ''}
                      `}>
                        {/* Current Role Indicator */}
                        {experience.isCurrentRole && (
                          <div className="absolute -top-2 -right-2">
                            <div className="bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                              Current
                            </div>
                          </div>
                        )}

                        {/* Header */}
                        <div className="mb-4">
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
                            <span className="font-medium">{experience.company}</span>
                          </div>
                          
                          <div className="flex items-center text-gray-600">
                            <MapPin className="h-4 w-4 mr-2 flex-shrink-0" />
                            <span>{experience.location}</span>
                          </div>
                        </div>

                        {/* Responsibilities */}
                        <div className="space-y-3">
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