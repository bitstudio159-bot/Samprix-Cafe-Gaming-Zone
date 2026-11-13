import React, { useState } from 'react';
import { BLOG_POSTS } from '../data/sampleData';
import { BlogPost } from '../types';
import { Clock, ArrowRight, User, X } from 'lucide-react';

interface BlogSectionProps {
  isDark: boolean;
}

export const BlogSection: React.FC<BlogSectionProps> = ({ isDark }) => {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  return (
    <section id="blog" className="py-12 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <div className="text-xs font-bold uppercase tracking-wider text-cyan-400">
            Insights & Guides
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-display tracking-tight text-white">
            Samprix Journal & Esports Guides
          </h2>
          <p className="text-sm text-slate-400">
            Articles on gaming stamina, artisanal coffee brewing, kitchen secrets, and Kathmandu esports culture.
          </p>
        </div>

        {/* 3-Column Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {BLOG_POSTS.map((post) => (
            <article
              key={post.id}
              onClick={() => setSelectedPost(post)}
              className={`group rounded-3xl overflow-hidden border transition-all duration-300 flex flex-col justify-between cursor-pointer ${
                isDark ? 'bg-slate-900/80 border-slate-800 hover:border-slate-700' : 'bg-white border-slate-200 hover:border-slate-300'
              } shadow-xl hover:-translate-y-1`}
            >
              <div className="relative h-48 overflow-hidden bg-slate-950">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-3 left-3 bg-slate-950/80 backdrop-blur-md text-[10px] uppercase font-bold text-amber-400 px-2.5 py-1 rounded-md border border-slate-700/50">
                  {post.category}
                </div>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex items-center gap-2 text-[11px] text-slate-500 mb-2">
                    <span>{post.date}</span>
                    <span>·</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-cyan-400" />
                      {post.readTime}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold font-display text-white group-hover:text-amber-400 transition-colors leading-snug">
                    {post.title}
                  </h3>

                  <p className="text-xs text-slate-400 mt-2 line-clamp-3 leading-relaxed">
                    {post.excerpt}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-800 flex items-center justify-between text-xs font-semibold text-amber-400">
                  <span>Read Full Article</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Read Article Full Modal */}
        {selectedPost && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fade-in">
            <div className={`w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-3xl border p-6 sm:p-8 shadow-2xl relative ${
              isDark ? 'bg-slate-900 border-slate-700 text-white' : 'bg-white border-slate-200 text-slate-900'
            }`}>
              
              <button
                onClick={() => setSelectedPost(null)}
                className="absolute top-5 right-5 p-1 text-slate-400 hover:text-white rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="space-y-4">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-500">
                  {selectedPost.category} · {selectedPost.readTime}
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold font-display text-white">
                  {selectedPost.title}
                </h3>
                <div className="text-xs text-slate-400">
                  Published {selectedPost.date} by <strong>{selectedPost.author}</strong>
                </div>

                <div className="rounded-2xl overflow-hidden my-4 border border-slate-800">
                  <img
                    src={selectedPost.image}
                    alt={selectedPost.title}
                    className="w-full h-64 object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>

                <div className="space-y-3 text-sm text-slate-300 leading-relaxed">
                  {selectedPost.content.map((paragraph, idx) => (
                    <p key={idx}>{paragraph}</p>
                  ))}
                </div>
              </div>

            </div>
          </div>
        )}

      </div>
    </section>
  );
};
