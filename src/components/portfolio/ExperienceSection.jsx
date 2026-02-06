import React from 'react';
import { Building2, Calendar, MapPin } from 'lucide-react';
import { Card } from '@/components/ui/card';

export default function ExperienceSection() {
  const experiences = [
    {
      role: "Solutions & Migrations Engineer",
      company: "Professional Cosmetic Surgery",
      industry: "Healthcare",
      location: "London, UK",
      period: "Jan 2016 – Present",
      achievements: [
        "Architected and implemented secure healthcare systems infrastructure",
        "Managed mission-critical database operations and ensured security compliance",
        "Developed custom solutions for patient data management and reporting",
        "Provided technical leadership for infrastructure modernization projects"
      ]
    },
    {
      role: "Cloud Solutions Consultant",
      company: "dlexia.com",
      industry: "Mental Health Industry",
      location: "UK",
      period: "Jan 2024 – June 2024",
      achievements: [
        "Led cloud migration initiatives using AWS, Docker, and Kubernetes",
        "Designed and implemented optimized infrastructure solutions",
        "Developed Python-based automation for deployment processes",
        "Established best practices for cloud resource management and security"
      ]
    },
    {
      role: "Linux / OpenStack DevOps Engineer",
      company: "Cloudlynx AG",
      industry: "Cloud Infrastructure",
      location: "Switzerland",
      period: "Mar 2014 – Jan 2015",
      achievements: [
        "Contributed to detailed design of OpenStack cloud infrastructure",
        "Devised automation methods using Puppet for implementation and configuration",
        "Installed servers and equipment across three data centres",
        "Implemented performance, capacity, and availability monitoring"
      ]
    },
    {
      role: "Linux (Red Hat) Administrator/Engineer",
      company: "Swisscom",
      industry: "Telecommunications",
      location: "Switzerland",
      period: "Oct 2013 – Feb 2014",
      achievements: [
        "Installation, upgrading, and troubleshooting of Vidyo Video Conferencing system",
        "Supported OECD High Level Meeting on E-Government held in Bern",
        "Migrated CDRs from VidyoPortal servers to central MySQL database",
        "Developed specific Nagios plugins for monitoring and backup validation"
      ]
    },
    {
      role: "Build Engineer",
      company: "BSKYB",
      industry: "Broadcasting",
      location: "UK",
      period: "Feb 2012 – Sep 2013",
      achievements: [
        "Managed build and deployment processes for broadcast systems (popcorn/NowTV platforms)",
        "Setup and configured Centreon as monitoring tool",
        "Designed and implemented Trusted API for internal systems",
        "Evaluated and optimized file transfer solutions for security and speed"
      ]
    },
    {
      role: "Country Solution Engineer",
      company: "Vodafone Global",
      industry: "Telecommunications",
      location: "Global",
      period: "Jan 2007 – April 2010",
      achievements: [
        "Led application deployments and large migration/upgrade projects",
        "Performance tuned Proximus offnet payments solution",
        "Wrote Vodafone Now+ integration blueprint and feasibility documentation",
        "Provided on-site technical expertise and training for in-house software tools"
      ]
    }
  ];

  return (
    <section id="experience" className="py-20 bg-slate-50">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">
            Professional <span className="text-[#B8956A]">Experience</span>
          </h2>
          <div className="w-20 h-1 bg-[#B8956A] mx-auto mb-12"></div>

          <div className="space-y-6">
            {experiences.map((exp, index) => (
              <Card key={index} className="p-6 md:p-8 hover:shadow-xl transition-all duration-300 border-l-4 border-l-[#B8956A]">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                  <div className="mb-4 md:mb-0">
                    <h3 className="text-2xl font-bold text-slate-800 mb-2">{exp.role}</h3>
                    <div className="flex items-center gap-2 text-[#B8956A] font-semibold mb-2">
                      <Building2 className="w-4 h-4" />
                      <span>{exp.company}</span>
                      <span className="text-slate-400">•</span>
                      <span className="text-slate-600 font-normal">{exp.industry}</span>
                    </div>
                    <div className="flex flex-wrap gap-4 text-sm text-slate-600">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4 text-[#D4A574]" />
                        <span>{exp.period}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4 text-[#D4A574]" />
                        <span>{exp.location}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <ul className="space-y-2">
                  {exp.achievements.map((achievement, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-slate-700">
                      <span className="text-[#B8956A] mt-1.5">•</span>
                      <span>{achievement}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>

          {/* Early Career Summary */}
          <Card className="mt-8 p-6 md:p-8 bg-[#E8C7A0]/20">
            <h3 className="text-2xl font-bold text-slate-800 mb-4">Early Career Highlights</h3>
            <div className="grid md:grid-cols-2 gap-4 text-slate-700">
              <div>
                <strong className="text-[#B8956A]">O2 (2003–2005):</strong> Managed CriticalPath SMS Gateway on O2's SMS platform using Sun Cluster and SAN/NAS storage.
              </div>
              <div>
                <strong className="text-[#B8956A]">Cap Gemini (2002–2003):</strong> Applications Integrator performing performance tuning on Enterprise systems.
              </div>
              <div>
                <strong className="text-[#9A7A52]">Genie / BTCellnet (2001–2002):</strong> Implemented UK/Europe SMS solutions and managed Openwave WAP Portals.
              </div>
              <div>
                <strong className="text-[#9A7A52]">BTCellnet (1998–2000):</strong> Managed over 300 mission-critical Enterprise Systems using Solaris and Jumpstart.
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}