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
    <section id="skills" className="py-20 bg-[#0f0c29]/50">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-white">
            Technical <span className="text-purple-400">Skills</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-purple-500 to-indigo-500 mx-auto mb-12"></div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skillCategories.map((category, index) => {
              const Icon = category.icon;
              
              return (
                <Card key={index} className="p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 bg-[#1a1a2e]/80 border border-purple-500/20">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500/20 to-indigo-500/20 rounded-lg flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-purple-400" />
                  </div>
                  <h3 className="text-xl font-semibold mb-4 text-white">{category.title}</h3>
                  <div className="space-y-2">
                    {category.skills.map((skill, idx) => (
                      <div key={idx} className="text-sm bg-purple-500/10 border border-purple-500/20 px-3 py-2 rounded-lg text-slate-300">
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