import React, { useState, useEffect } from 'react';
import { Star, GitFork, Eye, Github as GithubIcon, ExternalLink, Code2, TrendingUp, RefreshCw } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import Navigation from '../components/Navigation';
import SectionHeader from '../components/SectionHeader';
import ScrollReveal from '../components/ScrollReveal';
import { content } from '../components/content';

export default function GitHub() {
  const pageContent = content.githubPage;
  const GITHUB_USERNAME = pageContent.username;
  const [userData, setUserData] = useState(null);
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchGitHubData = async () => {
    setLoading(true);
    try {
      const [userRes, reposRes] = await Promise.all([
        fetch(`https://api.github.com/users/${GITHUB_USERNAME}`),
        fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=stars&order=desc&per_page=12`)
      ]);

      const user = await userRes.json();
      const reposData = await reposRes.json();

      setUserData(user);
      setRepos(reposData.filter(repo => !repo.fork));
      setLoading(false);
    } catch (error) {
      console.error('Error fetching GitHub data:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGitHubData();
  }, []);

  return (
    <>
      <Navigation />
      <div className="min-h-screen pt-20" style={{ backgroundColor: 'var(--bg-primary)', color: 'var(--text-primary)' }}>
        {/* Header Section */}
        <section className="py-20 relative overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            <motion.div 
              className="absolute top-20 right-20 w-96 h-96 rounded-full blur-3xl"
              style={{ backgroundColor: 'var(--glow-1)' }}
              animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
              transition={{ duration: 8, repeat: Infinity }}
            />
            <motion.div 
              className="absolute bottom-20 left-20 w-96 h-96 rounded-full blur-3xl"
              style={{ backgroundColor: 'var(--glow-2)' }}
              animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
              transition={{ duration: 8, repeat: Infinity, delay: 1 }}
            />
          </div>

          <div className="container mx-auto px-6 relative z-10">
            <div className="max-w-5xl mx-auto">
              <ScrollReveal>
                <div className="text-center mb-12">
                  <h1 className="text-5xl md:text-6xl font-bold mb-4" style={{
                    background: `linear-gradient(to right, var(--accent-primary), var(--accent-secondary))`,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}>
                    {pageContent.title}
                  </h1>
                  <p className="text-lg md:text-xl" style={{ color: 'var(--text-secondary)' }}>
                    {pageContent.subtitle}
                  </p>
                </div>
              </ScrollReveal>

              {loading ? (
                <div className="flex justify-center items-center h-40">
                  <div className="animate-spin w-8 h-8 border-4 border-accent-primary border-t-transparent rounded-full" style={{ borderColor: 'var(--accent-primary)' }}></div>
                </div>
              ) : userData && (
                <ScrollReveal delay={0.2}>
                  <Card className="p-8 md:p-12" style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)', borderWidth: '1px', borderStyle: 'solid' }}>
                    <div className="flex flex-col md:flex-row gap-8 items-start">
                      <motion.img
                        src={userData.avatar_url}
                        alt={userData.name}
                        className="w-32 h-32 rounded-full shadow-lg border-4"
                        style={{ borderColor: 'var(--accent-primary)' }}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6 }}
                      />
                      
                      <div className="flex-1">
                        <h2 className="text-3xl font-bold mb-2">{userData.name || userData.login}</h2>
                        <p className="text-lg mb-4" style={{ color: 'var(--accent-light)' }}>@{userData.login}</p>
                        
                        {userData.bio && (
                          <p className="mb-6 leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                            {userData.bio}
                          </p>
                        )}

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                          <motion.div whileHover={{ scale: 1.05 }}>
                            <div className="p-3 rounded-lg" style={{ backgroundColor: 'var(--bg-primary)' }}>
                              <p className="text-2xl font-bold" style={{ color: 'var(--accent-primary)' }}>{userData.public_repos}</p>
                              <p className="text-xs" style={{ color: 'var(--text-tertiary)' }}>{pageContent.stats.repositories}</p>
                            </div>
                          </motion.div>
                          <motion.div whileHover={{ scale: 1.05 }}>
                            <div className="p-3 rounded-lg" style={{ backgroundColor: 'var(--bg-primary)' }}>
                              <p className="text-2xl font-bold" style={{ color: 'var(--accent-primary)' }}>{userData.followers}</p>
                              <p className="text-xs" style={{ color: 'var(--text-tertiary)' }}>{pageContent.stats.followers}</p>
                            </div>
                          </motion.div>
                          <motion.div whileHover={{ scale: 1.05 }}>
                            <div className="p-3 rounded-lg" style={{ backgroundColor: 'var(--bg-primary)' }}>
                              <p className="text-2xl font-bold" style={{ color: 'var(--accent-primary)' }}>{userData.following}</p>
                              <p className="text-xs" style={{ color: 'var(--text-tertiary)' }}>{pageContent.stats.following}</p>
                            </div>
                          </motion.div>
                          <motion.div whileHover={{ scale: 1.05 }}>
                            <div className="p-3 rounded-lg" style={{ backgroundColor: 'var(--bg-primary)' }}>
                              <p className="text-2xl font-bold" style={{ color: 'var(--accent-primary)' }}>{userData.public_gists}</p>
                              <p className="text-xs" style={{ color: 'var(--text-tertiary)' }}>{pageContent.stats.gists}</p>
                            </div>
                          </motion.div>
                        </div>

                        <a href={userData.html_url} target="_blank" rel="noopener noreferrer">
                          <Button className="text-white" style={{ background: `linear-gradient(to right, var(--accent-primary), var(--accent-secondary))` }}>
                            <GithubIcon className="w-4 h-4 mr-2" />
                            {pageContent.visitProfile}
                            <ExternalLink className="w-4 h-4 ml-2" />
                          </Button>
                        </a>
                      </div>
                    </div>
                  </Card>
                </ScrollReveal>
              )}
            </div>
          </div>
        </section>

        {/* Repositories Section */}
        <section className="py-20" style={{ backgroundColor: 'var(--bg-tertiary)' }}>
          <div className="container mx-auto px-6">
            <div className="max-w-6xl mx-auto">
              <ScrollReveal>
                <div className="flex items-center justify-between mb-12">
                  <div className="flex items-center gap-3">
                    <Code2 className="w-8 h-8" style={{ color: 'var(--accent-primary)' }} />
                    <h2 className="text-4xl font-bold">{pageContent.topRepositories}</h2>
                  </div>
                  <motion.button
                    onClick={fetchGitHubData}
                    disabled={loading}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg transition-all disabled:opacity-50"
                    style={{ 
                      backgroundColor: 'color-mix(in srgb, var(--accent-primary) 20%, transparent)',
                      color: 'var(--accent-light)',
                      border: '1px solid var(--border-color)'
                    }}
                  >
                    <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                    <span className="text-sm font-medium">{pageContent.refresh}</span>
                  </motion.button>
                </div>
              </ScrollReveal>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {repos.map((repo, idx) => (
                  <ScrollReveal key={repo.id} delay={0.1 * idx}>
                    <motion.a
                      href={repo.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ y: -5 }}
                      className="block h-full"
                    >
                      <Card className="p-6 h-full hover:shadow-xl transition-shadow cursor-pointer" style={{ backgroundColor: 'var(--bg-primary)', borderColor: 'var(--border-color)', borderWidth: '1px', borderStyle: 'solid' }}>
                        <div className="flex items-start justify-between mb-3">
                          <h3 className="text-xl font-bold flex-1 pr-2">{repo.name}</h3>
                          {repo.stargazers_count > 0 && (
                            <motion.div
                              className="flex items-center gap-1 px-2 py-1 rounded-full"
                              style={{ backgroundColor: 'color-mix(in srgb, var(--accent-primary) 20%, transparent)' }}
                              whileHover={{ scale: 1.1 }}
                            >
                              <Star className="w-4 h-4" style={{ color: 'var(--accent-primary)' }} fill="currentColor" />
                              <span className="text-sm font-semibold">{repo.stargazers_count}</span>
                            </motion.div>
                          )}
                        </div>

                        {repo.description && (
                          <p className="mb-4 line-clamp-2 text-sm" style={{ color: 'var(--text-secondary)' }}>
                            {repo.description}
                          </p>
                        )}

                        {repo.topics && repo.topics.length > 0 && (
                          <div className="flex flex-wrap gap-2 mb-4">
                            {repo.topics.slice(0, 3).map(topic => (
                              <span
                                key={topic}
                                className="text-xs px-2 py-1 rounded-full"
                                style={{ backgroundColor: 'color-mix(in srgb, var(--accent-secondary) 20%, transparent)', color: 'var(--accent-light)' }}
                              >
                                {topic}
                              </span>
                            ))}
                          </div>
                        )}

                        <div className="flex items-center gap-4 text-sm" style={{ color: 'var(--text-tertiary)' }}>
                          {repo.language && (
                            <div className="flex items-center gap-1">
                              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: 'var(--accent-primary)' }}></div>
                              {repo.language}
                            </div>
                          )}
                          {repo.forks_count > 0 && (
                            <div className="flex items-center gap-1">
                              <GitFork className="w-4 h-4" />
                              {repo.forks_count}
                            </div>
                          )}
                          {repo.watchers_count > 0 && (
                            <div className="flex items-center gap-1">
                              <Eye className="w-4 h-4" />
                              {repo.watchers_count}
                            </div>
                          )}
                        </div>
                      </Card>
                    </motion.a>
                  </ScrollReveal>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}