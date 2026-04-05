import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Send, Users, Zap, Lock, MessageCircle } from 'lucide-react';

function Welcome() {
  const navigate = useNavigate();
  const containerRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [messages, setMessages] = useState([
    { id: 1, text: 'Hey team, new feature launch! 🚀', user: 'Sarah', avatar: '👩‍💼', time: 'now' },
    { id: 2, text: 'That looks amazing!', user: 'John', avatar: '👨‍💻', time: '2s' }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [activeTab, setActiveTab] = useState('messages');

  // Mouse glow effect
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Animated demo message
  const handleDemoSend = () => {
    if (!inputValue.trim()) return;
    
    const newMessage = {
      id: messages.length + 1,
      text: inputValue,
      user: 'You',
      avatar: '👤',
      time: 'now'
    };
    
    setMessages([...messages, newMessage]);
    setInputValue('');

    // Auto reply after 1 second
    setTimeout(() => {
      const replies = [
        'That\'s amazing! Love the real-time updates! ⚡',
        'Works perfectly! Socket.io is incredible 🔥',
        'This is exactly what we needed! 🎉'
      ];
      const randomReply = replies[Math.floor(Math.random() * replies.length)];
      setMessages(prev => [...prev, {
        id: prev.length + 1,
        text: randomReply,
        user: Math.random() > 0.5 ? 'Alice' : 'Mike',
        avatar: Math.random() > 0.5 ? '👩‍🔬' : '👨‍🎨',
        time: 'now'
      }]);
    }, 800);
  };

  return (
    <div 
      className="min-h-screen bg-black text-white overflow-x-hidden"
      ref={containerRef}
    >
      {/* Mouse glow cursor */}
      <div
        className="fixed w-96 h-96 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-3xl pointer-events-none"
        style={{
          left: mousePosition.x - 192,
          top: mousePosition.y - 192,
          transition: 'all 0.1s ease-out'
        }}
      />

      {/* Animated background grid */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.1)_1px,transparent_1px)] bg-[size:50px_50px] opacity-20 animate-pulse" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
      </div>

      {/* Navigation */}
      <nav className="relative z-50 fixed top-0 left-0 right-0 px-8 py-5 flex items-center justify-between backdrop-blur-md bg-black/40 border-b border-blue-500/20">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-400 via-purple-400 to-pink-400 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/50">
            <MessageCircle className="w-6 h-6 text-black" />
          </div>
          <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent font-black">
            SlackChatPro
          </span>
        </div>

        <div className="flex gap-3">
          <button
            onClick={() => navigate('/auth/signin')}
            className="px-6 py-2.5 rounded-lg text-sm font-semibold border border-blue-500/40 hover:border-blue-400/80 hover:bg-blue-500/10 transition-all duration-300"
          >
            Sign In
          </button>
          <button
            onClick={() => navigate('/auth/signup')}
            className="px-6 py-2.5 rounded-lg text-sm font-semibold bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 shadow-lg shadow-blue-500/50 hover:shadow-blue-500/70 transition-all duration-300"
          >
            Start Free
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 min-h-screen flex items-center justify-center pt-20 px-8">
        <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Copy */}
          <div className="space-y-8 animate-fade-in">
            <div className="space-y-4">
              <div className="inline-block px-4 py-2 bg-blue-500/20 border border-blue-500/40 rounded-full text-sm font-semibold text-blue-300">
                ⚡ Powered by Socket.io & Gemini AI
              </div>

              <h1 className="text-6xl lg:text-7xl font-black leading-tight">
                <span className="block text-white">Talk. Collaborate.</span>
                <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Innovate.
                </span>
              </h1>

              <p className="text-xl text-gray-400 leading-relaxed max-w-lg">
                Experience the future of team communication. Real-time messaging, AI-powered insights, and seamless collaboration in one beautiful platform.
              </p>
            </div>

            {/* Features list */}
            <div className="space-y-4">
              {[
                { icon: '⚡', title: '100ms Latency', desc: 'Messages arrive instantly' },
                { icon: '🤖', title: 'AI Assistant', desc: 'Gemini-powered suggestions' },
                { icon: '🔒', title: 'Enterprise Security', desc: 'OAuth2 & JWT encrypted' }
              ].map((feature, i) => (
                <div key={i} className="flex items-start gap-4 group">
                  <div className="text-3xl mt-1">{feature.icon}</div>
                  <div>
                    <h3 className="font-bold text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-pink-400 group-hover:bg-clip-text transition-all">
                      {feature.title}
                    </h3>
                    <p className="text-gray-500">{feature.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-8">
              <button
                onClick={() => navigate('/auth/signup')}
                className="group px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl font-bold text-lg hover:shadow-2xl hover:shadow-blue-500/50 transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-3 text-white"
              >
                Get Started Now
                <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                onClick={() => navigate('/auth/signin')}
                className="px-8 py-4 border-2 border-blue-500/50 rounded-xl font-bold text-lg hover:bg-blue-500/10 transition-all duration-300"
              >
                Sign In
              </button>
            </div>

            {/* Social proof */}
            <div className="pt-8 border-t border-blue-500/20">
              <p className="text-sm text-gray-500 mb-4">Trusted by developers worldwide</p>
              <div className="flex gap-4">
                {['Node.js', 'React', 'MongoDB', 'OAuth2'].map((tech, i) => (
                  <span key={i} className="px-4 py-2 bg-blue-500/10 border border-blue-500/30 rounded-lg text-sm text-gray-400">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right side - Interactive Demo */}
          <div className="relative animate-fade-in-delay">
            {/* Chat Window */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-3xl blur-2xl" />
            
            <div className="relative bg-gradient-to-br from-slate-900/80 to-slate-800/80 backdrop-blur-xl border border-blue-500/30 rounded-2xl overflow-hidden shadow-2xl shadow-blue-500/20">
              {/* Header */}
              <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 border-b border-blue-500/20 px-6 py-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center text-sm font-bold">
                    💬
                  </div>
                  <div>
                    <h3 className="font-bold">Engineering</h3>
                    <p className="text-xs text-gray-400">3 members online</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button className="w-8 h-8 rounded-lg bg-blue-500/20 hover:bg-blue-500/40 flex items-center justify-center transition-all">
                    🔔
                  </button>
                  <button className="w-8 h-8 rounded-lg bg-blue-500/20 hover:bg-blue-500/40 flex items-center justify-center transition-all">
                    ⚙️
                  </button>
                </div>
              </div>

              {/* Messages */}
              <div className="h-80 overflow-y-auto px-6 py-4 space-y-4 scrollbar-hide">
                {messages.map((msg, idx) => (
                  <div key={msg.id} className="flex gap-3 animate-message" style={{ animationDelay: `${idx * 0.1}s` }}>
                    <div className="text-2xl">{msg.avatar}</div>
                    <div className="flex-1">
                      <div className="flex items-baseline gap-2">
                        <span className="font-semibold text-sm">{msg.user}</span>
                        <span className="text-xs text-gray-500">{msg.time}</span>
                      </div>
                      <p className="text-gray-200 text-sm mt-1 bg-blue-500/20 rounded-lg px-3 py-2 inline-block max-w-xs">
                        {msg.text}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Input */}
              <div className="border-t border-blue-500/20 px-6 py-4 bg-slate-900/50">
                <div className="flex gap-3">
                  <input
                    type="text"
                    placeholder="Type a message..."
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleDemoSend()}
                    className="flex-1 bg-slate-800/50 border border-blue-500/20 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/50 transition-all"
                  />
                  <button
                    onClick={handleDemoSend}
                    className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center hover:shadow-lg hover:shadow-blue-500/50 transition-all transform hover:scale-110"
                  >
                    <Send className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Floating badges */}
            <div className="absolute -top-4 -right-4 px-4 py-2 bg-green-500/20 border border-green-500/40 rounded-full text-sm font-semibold text-green-300 animate-pulse">
              ✨ Live Demo
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative z-10 py-24 px-8 bg-gradient-to-b from-transparent via-blue-500/5 to-transparent">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-black mb-4">
              Why choose <span className="bg-gradient-to-r from-blue-400 to-pink-400 bg-clip-text text-transparent">SlackChatPro</span>?
            </h2>
            <p className="text-gray-400 text-lg">Built for teams that demand excellence</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Real-Time Magic',
                description: 'Socket.io powers instant message delivery. See responses instantly as teammates type.',
                icon: '⚡',
                color: 'from-blue-500'
              },
              {
                title: 'AI Powered',
                description: 'Gemini AI integration provides smart suggestions, summaries, and intelligent analysis.',
                icon: '🤖',
                color: 'from-purple-500'
              },
              {
                title: 'Bank-Level Security',
                description: 'OAuth2 authentication, JWT tokens, encrypted communications. Your data is safe.',
                icon: '🔒',
                color: 'from-pink-500'
              }
            ].map((feature, i) => (
              <div
                key={i}
                className="group p-8 rounded-2xl border border-blue-500/20 hover:border-blue-500/60 bg-gradient-to-br from-slate-900/50 to-slate-800/50 hover:from-blue-500/10 hover:to-purple-500/10 transition-all duration-300 cursor-pointer"
              >
                <div className={`text-5xl mb-4 group-hover:scale-110 transition-transform`}>{feature.icon}</div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-gray-400 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 py-24 px-8">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-5xl font-black mb-6">
            Ready to revolutionize your team's communication?
          </h2>
          <p className="text-gray-400 text-lg mb-10">
            Join hundreds of teams already collaborating smarter.
          </p>
          <button
            onClick={() => navigate('/auth/signup')}
            className="px-10 py-5 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-xl font-bold text-lg hover:shadow-2xl hover:shadow-blue-500/50 transition-all duration-300 transform hover:scale-110 inline-flex items-center gap-3"
          >
            Start Your Free Trial
            <ArrowRight className="w-6 h-6" />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-blue-500/20 px-8 py-12 bg-black/50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div>
              <h3 className="font-bold mb-4">SlackChatPro</h3>
              <p className="text-gray-500 text-sm">Next-generation team communication</p>
            </div>
            {[
              { title: 'Product', links: ['Features', 'Pricing', 'Security'] },
              { title: 'Company', links: ['About', 'Blog', 'Careers'] },
              { title: 'Support', links: ['Help Center', 'API Docs', 'Status'] }
            ].map((col, i) => (
              <div key={i}>
                <h4 className="font-semibold mb-4">{col.title}</h4>
                <ul className="space-y-2 text-gray-500 text-sm">
                  {col.links.map((link, j) => (
                    <li key={j} className="hover:text-blue-400 cursor-pointer transition-colors">{link}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="border-t border-blue-500/10 pt-8 flex items-center justify-between text-gray-500 text-sm">
            <p>© 2025 SlackChatPro. All rights reserved.</p>
            <div className="flex gap-6">
              <span className="hover:text-blue-400 cursor-pointer transition-colors">Twitter</span>
              <span className="hover:text-blue-400 cursor-pointer transition-colors">GitHub</span>
              <span className="hover:text-blue-400 cursor-pointer transition-colors">LinkedIn</span>
            </div>
          </div>
        </div>
      </footer>

      {/* CSS Animations */}
      <style>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes message {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 1s ease-out;
        }

        .animate-fade-in-delay {
          animation: fade-in 1s ease-out 0.3s both;
        }

        .animate-message {
          animation: message 0.5s ease-out;
        }

        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }

        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }

        ::selection {
          background-color: rgba(59, 130, 246, 0.3);
        }

        html {
          scroll-behavior: smooth;
        }
      `}</style>
    </div>
  );
}

export default Welcome;
