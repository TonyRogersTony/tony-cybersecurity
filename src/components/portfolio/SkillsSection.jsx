import React from 'react';
import { Cloud, Server, Database, Code, Cog, Activity } from 'lucide-react';
import { Card } from '@/components/ui/card';

export default function SkillsSection() {
  const skillCategories = [
    {
      icon: Cloud,
      title: "Cloud & Infrastructure",
      color: "teal",
      skills: ["AWS Cloud (Certified CLF-C02)", "Docker", "Kubernetes", "Openshift", "Terraform", "VMware ESX/ESXi", "Sun Cluster"]
    },
    {
      icon: Server,
      title: "Operating Systems",
      color: "amber",
      skills: ["Linux (RedHat, Ubuntu, CentOS, Debian)", "Solaris 10 & Administration", "HP-UX", "Windows Server"]
    },
    {
      icon: Database,
      title: "Databases",
      color: "teal",
      skills: ["MySQL", "Oracle (9i, 10g with ASM)", "Sybase", "PostgreSQL", "MongoDB"]
    },
    {
      icon: Code,
      title: "Development & Scripting",
      color: "amber",
      skills: ["Python (DevOps, Data Science)", "Java", "JavaScript", "Perl", "Shell Scripting (Bash)", "API/SDK Integration"]
    },
    {
      icon: Cog,
      title: "DevOps & Automation",
      color: "teal",
      skills: ["CI/CD Pipeline Implementation", "Puppet", "Ansible", "Git", "SVN", "Eclipse"]
    },
    {
      icon: Activity,
      title: "Monitoring & Networking",
      color: "amber",
      skills: ["Nagios", "Centreon", "Check_MK", "Munin", "F5 BigIP Load Balancing", "Jboss", "Websphere MQ", "Tibco"]
    }
  ];

  return (
    <section id="skills" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">
            Technical <span className="text-[#B8956A]">Skills</span>
          </h2>
          <div className="w-20 h-1 bg-[#B8956A] mx-auto mb-12"></div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skillCategories.map((category, index) => {
              const Icon = category.icon;
              
              return (
                <Card key={index} className="p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-l-2 border-l-[#B8956A]">
                  <div className="w-12 h-12 bg-[#E8C7A0]/30 rounded-lg flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-[#B8956A]" />
                  </div>
                  <h3 className="text-xl font-semibold mb-4 text-[#9A7A52]">{category.title}</h3>
                  <div className="space-y-2">
                    {category.skills.map((skill, idx) => (
                      <div key={idx} className="text-sm bg-[#E8C7A0]/20 px-3 py-2 rounded-lg text-slate-700">
                        {skill}
                      </div>
                    ))}
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}