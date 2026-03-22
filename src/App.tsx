import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Heart, Leaf, Moon, Sun, ArrowRight, Instagram, Mail, Calendar } from 'lucide-react';

// --- Components ---

const Navbar = ({ activePage, setActivePage }: { activePage: string, setActivePage: (p: string) => void }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', id: 'home' },
    { name: 'About', id: 'about' },
    { name: 'Services', id: 'services' },
    { name: 'Guidance', id: 'guidance' },
    { name: 'Contact', id: 'contact' },
  ];

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${scrolled ? 'bg-sanctuary-beige/80 backdrop-blur-lg py-4 shadow-sm' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <button 
          onClick={() => setActivePage('home')}
          className="text-2xl font-serif tracking-widest uppercase text-sanctuary-ink hover:opacity-70 transition-opacity"
        >
          Aethera
        </button>

        {/* Desktop Nav */}
        <div className="hidden md:flex space-x-10">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => setActivePage(link.id)}
              className={`text-sm tracking-[0.2em] uppercase transition-all duration-300 relative group ${activePage === link.id ? 'text-sanctuary-ink' : 'text-sanctuary-stone hover:text-sanctuary-ink'}`}
            >
              {link.name}
              <span className={`absolute -bottom-1 left-0 w-full h-[1px] bg-sanctuary-ink transition-transform duration-300 origin-left ${activePage === link.id ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`} />
            </button>
          ))}
        </div>

        <button 
          onClick={() => setActivePage('booking')}
          className="hidden md:flex items-center space-x-2 px-6 py-2 border border-sanctuary-ink rounded-full text-xs tracking-widest uppercase hover:bg-sanctuary-ink hover:text-white transition-all duration-300"
        >
          <Calendar size={14} />
          <span>Book Session</span>
        </button>

        {/* Mobile Toggle */}
        <button className="md:hidden text-sanctuary-ink" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full bg-sanctuary-beige border-b border-sanctuary-sand p-6 md:hidden flex flex-col space-y-6"
          >
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => { setActivePage(link.id); setIsOpen(false); }}
                className="text-lg font-serif tracking-widest uppercase text-left"
              >
                {link.name}
              </button>
            ))}
            <button 
              onClick={() => { setActivePage('booking'); setIsOpen(false); }}
              className="w-full py-4 bg-sanctuary-ink text-white rounded-xl tracking-widest uppercase text-sm"
            >
              Book Session
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Footer = () => (
  <footer className="bg-sanctuary-sand/30 py-20 px-6 border-t border-sanctuary-sand">
    <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
      <div className="space-y-6">
        <h3 className="text-2xl font-serif tracking-widest uppercase">Aethera</h3>
        <p className="text-sanctuary-stone text-sm leading-relaxed max-w-xs">
          A digital sanctuary for the soul. Dedicated to guiding you back to your inner peace through mindfulness and spiritual awareness.
        </p>
      </div>
      <div>
        <h4 className="text-xs tracking-[0.2em] uppercase mb-6 font-medium">Explore</h4>
        <ul className="space-y-4 text-sm text-sanctuary-stone">
          <li><button className="hover:text-sanctuary-ink transition-colors">Philosophy</button></li>
          <li><button className="hover:text-sanctuary-ink transition-colors">Therapy</button></li>
          <li><button className="hover:text-sanctuary-ink transition-colors">Resources</button></li>
          <li><button className="hover:text-sanctuary-ink transition-colors">Journal</button></li>
        </ul>
      </div>
      <div>
        <h4 className="text-xs tracking-[0.2em] uppercase mb-6 font-medium">Connect</h4>
        <ul className="space-y-4 text-sm text-sanctuary-stone">
          <li className="flex items-center space-x-2"><Instagram size={14} /> <span>@aethera_peace</span></li>
          <li className="flex items-center space-x-2"><Mail size={14} /> <span>hello@aethera.com</span></li>
        </ul>
      </div>
      <div>
        <h4 className="text-xs tracking-[0.2em] uppercase mb-6 font-medium">Newsletter</h4>
        <p className="text-xs text-sanctuary-stone mb-4">Receive monthly reflections and healing practices.</p>
        <div className="flex border-b border-sanctuary-ink py-2">
          <input type="email" placeholder="Your email" className="bg-transparent text-sm w-full outline-none" />
          <button className="text-sanctuary-ink hover:translate-x-1 transition-transform"><ArrowRight size={18} /></button>
        </div>
      </div>
    </div>
    <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-sanctuary-sand/50 flex flex-col md:row justify-between items-center space-y-4 md:space-y-0">
      <p className="text-[10px] tracking-widest uppercase text-sanctuary-stone">© 2026 Aethera Sanctuary. All rights reserved.</p>
      <div className="flex space-x-8 text-[10px] tracking-widest uppercase text-sanctuary-stone">
        <button className="hover:text-sanctuary-ink transition-colors">Privacy</button>
        <button className="hover:text-sanctuary-ink transition-colors">Terms</button>
      </div>
    </div>
  </footer>
);

// --- Pages ---

const HomePage = ({ onNavigate }: { onNavigate: (p: string) => void }) => (
  <div className="pt-20">
    {/* Hero Section */}
    <section className="min-h-[90vh] flex flex-col md:flex-row items-center justify-center text-center md:text-left px-6 relative overflow-hidden max-w-7xl mx-auto">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 2, ease: "easeOut" }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-sanctuary-sage/20 rounded-full blur-[120px] -z-10"
      />
      
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.2 }}
        className="max-w-2xl z-10"
      >
        <span className="text-xs tracking-[0.4em] uppercase text-sanctuary-stone mb-6 block">Welcome to your sanctuary</span>
        <h1 className="text-6xl md:text-8xl font-serif font-light leading-tight mb-8">
          Find your way back <br />
          <span className="italic">to inner stillness.</span>
        </h1>
        <p className="text-lg md:text-xl text-sanctuary-stone font-light max-w-xl mb-12 leading-relaxed">
          A minimalist approach to holistic healing, combining modern therapy with ancient spiritual wisdom.
        </p>
        <div className="flex flex-col md:flex-row items-center md:justify-start space-y-4 md:space-y-0 md:space-x-8">
          <button 
            onClick={() => onNavigate('services')}
            className="px-10 py-4 bg-sanctuary-ink text-white rounded-full text-sm tracking-widest uppercase hover:bg-sanctuary-ink/90 transition-all"
          >
            Explore Services
          </button>
          <button 
            onClick={() => onNavigate('about')}
            className="text-sm tracking-widest uppercase border-b border-sanctuary-ink pb-1 hover:opacity-60 transition-opacity"
          >
            Our Philosophy
          </button>
        </div>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1.5, delay: 0.5 }}
        className="hidden lg:block w-1/3 ml-20"
      >
        <img 
          src="https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?auto=format&fit=crop&q=80&w=800" 
          alt="Minimalist lamp" 
          className="rounded-[100px] grayscale hover:grayscale-0 transition-all duration-1000 shadow-2xl"
          referrerPolicy="no-referrer"
        />
      </motion.div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center space-y-2"
      >
        <span className="text-[10px] tracking-[0.3em] uppercase text-sanctuary-stone">Scroll to explore</span>
        <div className="w-[1px] h-12 bg-sanctuary-sand" />
      </motion.div>
    </section>

    {/* Philosophy Section */}
    <section className="py-32 px-6 bg-white">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
        <div className="relative">
          <img 
            src="https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&q=80&w=800" 
            alt="Calm nature" 
            className="rounded-2xl shadow-2xl grayscale-[20%] hover:grayscale-0 transition-all duration-700"
            referrerPolicy="no-referrer"
          />
          <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-sanctuary-beige rounded-full flex items-center justify-center border border-sanctuary-sand p-8 text-center">
            <p className="text-[10px] tracking-widest uppercase leading-relaxed italic">"Peace is not the absence of chaos, but the presence of calm within it."</p>
          </div>
        </div>
        <div className="space-y-8">
          <span className="text-xs tracking-[0.3em] uppercase text-sanctuary-stone">The Aethera Way</span>
          <h2 className="text-4xl md:text-5xl font-serif font-light leading-tight">
            Healing is a journey of <br />
            <span className="italic text-sanctuary-stone">unbecoming.</span>
          </h2>
          <p className="text-sanctuary-stone leading-relaxed">
            We believe that therapeutic growth isn't about adding more to yourself, but stripping away the layers of noise, expectation, and trauma that hide your true essence. Our space is designed to be the quiet background for your deep reflection.
          </p>
          <div className="grid grid-cols-2 gap-8 pt-6">
            <div className="space-y-2">
              <h4 className="font-serif text-xl italic">Mindfulness</h4>
              <p className="text-xs text-sanctuary-stone leading-relaxed">Grounding techniques for daily presence.</p>
            </div>
            <div className="space-y-2">
              <h4 className="font-serif text-xl italic">Spirituality</h4>
              <p className="text-xs text-sanctuary-stone leading-relaxed">Connecting with the universal flow.</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* Space Section */}
    <section className="py-32 px-6 bg-sanctuary-blue/10">
      <div className="max-w-7xl mx-auto flex flex-col items-center space-y-16">
        <div className="text-center space-y-4">
          <span className="text-xs tracking-[0.3em] uppercase text-sanctuary-stone">The Environment</span>
          <h2 className="text-4xl md:text-5xl font-serif font-light italic">A Space to Breathe</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
          <div className="aspect-[3/4] overflow-hidden rounded-[60px]">
            <img src="https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&q=80&w=600" alt="Minimalist room" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000" referrerPolicy="no-referrer" />
          </div>
          <div className="aspect-[3/4] overflow-hidden rounded-[60px] md:translate-y-12">
            <img src="https://images.unsplash.com/photo-1490730141103-6cac27aaab94?auto=format&fit=crop&q=80&w=600" alt="Sunset calm" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000" referrerPolicy="no-referrer" />
          </div>
          <div className="aspect-[3/4] overflow-hidden rounded-[60px]">
            <img src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=600" alt="Ocean waves" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000" referrerPolicy="no-referrer" />
          </div>
        </div>
      </div>
    </section>

    {/* Featured Services */}
    <section className="py-32 px-6 bg-sanctuary-beige">
      <div className="max-w-7xl mx-auto text-center mb-20">
        <span className="text-xs tracking-[0.3em] uppercase text-sanctuary-stone mb-4 block">Our Offerings</span>
        <h2 className="text-4xl md:text-5xl font-serif font-light italic">Pathways to Peace</h2>
      </div>
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          { title: 'Holistic Therapy', icon: <Heart size={24} />, desc: 'Deep emotional processing in a safe, held space.' },
          { title: 'Spiritual Mentorship', icon: <Moon size={24} />, desc: 'Guidance on your unique soul path and awakening.' },
          { title: 'Mindful Living', icon: <Leaf size={24} />, desc: 'Practical tools for integration and daily balance.' }
        ].map((service, i) => (
          <motion.div 
            key={i}
            whileHover={{ y: -10 }}
            className="p-10 bg-white border border-sanctuary-sand rounded-3xl space-y-6 text-center group transition-all duration-500 hover:shadow-xl"
          >
            <div className="w-16 h-16 bg-sanctuary-beige rounded-full flex items-center justify-center mx-auto text-sanctuary-ink group-hover:bg-sanctuary-ink group-hover:text-white transition-colors duration-500">
              {service.icon}
            </div>
            <h3 className="text-2xl font-serif italic">{service.title}</h3>
            <p className="text-sm text-sanctuary-stone leading-relaxed">{service.desc}</p>
            <button className="text-[10px] tracking-widest uppercase font-medium border-b border-transparent hover:border-sanctuary-ink transition-all">Learn More</button>
          </motion.div>
        ))}
      </div>
    </section>
  </div>
);

const AboutPage = () => (
  <div className="pt-32 pb-20 px-6">
    <div className="max-w-4xl mx-auto space-y-20">
      <section className="text-center space-y-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-48 h-48 mx-auto rounded-full overflow-hidden border-4 border-white shadow-xl"
        >
          <img 
            src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=400" 
            alt="Therapist" 
            className="w-full h-full object-cover grayscale"
            referrerPolicy="no-referrer"
          />
        </motion.div>
        <div className="space-y-4">
          <h1 className="text-5xl font-serif italic">Meet Elena Vance</h1>
          <p className="text-xs tracking-[0.3em] uppercase text-sanctuary-stone">Founder & Lead Guide</p>
        </div>
        <p className="text-xl font-serif italic text-sanctuary-stone leading-relaxed">
          "I believe that every soul has an inherent blueprint for healing. My role is simply to help you clear the path so you can remember who you truly are."
        </p>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-16">
        <div className="space-y-6">
          <h3 className="text-xs tracking-[0.2em] uppercase font-semibold">My Journey</h3>
          <p className="text-sm text-sanctuary-stone leading-relaxed">
            With over 15 years of experience in clinical psychology and deep immersion in Eastern spiritual practices, I've developed a unique synthesis that addresses both the psychological and spiritual dimensions of the human experience.
          </p>
          <p className="text-sm text-sanctuary-stone leading-relaxed">
            My path began in traditional clinical settings, but I soon realized that true healing requires more than just talk therapy—it requires a reconnection with the sacred.
          </p>
        </div>
        <div className="space-y-6">
          <h3 className="text-xs tracking-[0.2em] uppercase font-semibold">Credentials</h3>
          <ul className="space-y-4 text-sm text-sanctuary-stone">
            <li className="flex items-start space-x-3">
              <span className="w-1.5 h-1.5 bg-sanctuary-ink rounded-full mt-1.5 shrink-0" />
              <span>Ph.D. in Clinical Psychology, Stanford University</span>
            </li>
            <li className="flex items-start space-x-3">
              <span className="w-1.5 h-1.5 bg-sanctuary-ink rounded-full mt-1.5 shrink-0" />
              <span>Certified Mindfulness Meditation Teacher (MMTCP)</span>
            </li>
            <li className="flex items-start space-x-3">
              <span className="w-1.5 h-1.5 bg-sanctuary-ink rounded-full mt-1.5 shrink-0" />
              <span>Advanced Training in Somatic Experiencing</span>
            </li>
            <li className="flex items-start space-x-3">
              <span className="w-1.5 h-1.5 bg-sanctuary-ink rounded-full mt-1.5 shrink-0" />
              <span>10+ Years of Vipassana Practice</span>
            </li>
          </ul>
        </div>
      </section>

      {/* Sanctuary Gallery */}
      <section className="space-y-12">
        <div className="text-center space-y-4">
          <span className="text-xs tracking-[0.3em] uppercase text-sanctuary-stone">The Sanctuary</span>
          <h2 className="text-4xl font-serif italic">Our Physical Space</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&q=80&w=400',
            'https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&q=80&w=400',
            'https://images.unsplash.com/photo-1529693662653-9d480530a697?auto=format&fit=crop&q=80&w=400',
            'https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&q=80&w=400'
          ].map((url, i) => (
            <div key={i} className="aspect-square rounded-2xl overflow-hidden">
              <img src={url} alt={`Sanctuary ${i}`} className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" referrerPolicy="no-referrer" />
            </div>
          ))}
        </div>
      </section>
    </div>
  </div>
);

const ServicesPage = () => (
  <div className="pt-32 pb-20 px-6">
    <div className="max-w-7xl mx-auto">
      <div className="text-center mb-20 space-y-4">
        <h1 className="text-5xl font-serif italic">Our Offerings</h1>
        <p className="text-sanctuary-stone max-w-xl mx-auto">Tailored sessions designed to support your emotional and spiritual evolution.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {[
          {
            title: 'Individual Therapy',
            price: '$150 / session',
            duration: '50 Minutes',
            desc: 'A deep dive into personal patterns, trauma healing, and emotional regulation using a blend of CBT and Somatic practices.',
            features: ['Safe, confidential space', 'Personalized growth plan', 'Integration exercises'],
            img: 'https://images.unsplash.com/photo-1528715471579-d1bcf0ba5e83?auto=format&fit=crop&q=80&w=600'
          },
          {
            title: 'Spiritual Guidance',
            price: '$120 / session',
            duration: '60 Minutes',
            desc: 'Exploring soul purpose, navigating spiritual awakenings, and deepening your connection to the divine.',
            features: ['Intuitive guidance', 'Meditation instruction', 'Sacred ritual design'],
            img: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=600'
          },
          {
            title: 'Mindfulness Coaching',
            price: '$90 / session',
            duration: '45 Minutes',
            desc: 'Practical tools for stress reduction, focus, and emotional balance in everyday life.',
            features: ['Daily practice setup', 'Breathwork techniques', 'Mindful habit building'],
            img: 'https://images.unsplash.com/photo-1445510861639-5651173bc5d5?auto=format&fit=crop&q=80&w=600'
          },
          {
            title: 'Group Sanctuaries',
            price: '$45 / session',
            duration: '90 Minutes',
            desc: 'Small group circles focused on shared healing, community support, and collective meditation.',
            features: ['Shared wisdom', 'Guided group meditation', 'Community connection'],
            img: 'https://images.unsplash.com/photo-1517210122415-b0c70b2a09bf?auto=format&fit=crop&q=80&w=600'
          }
        ].map((item, i) => (
          <div key={i} className="bg-white border border-sanctuary-sand rounded-[40px] overflow-hidden flex flex-col md:flex-row hover:shadow-2xl transition-all duration-500 group">
            <div className="md:w-1/3 overflow-hidden">
              <img src={item.img} alt={item.title} className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000" referrerPolicy="no-referrer" />
            </div>
            <div className="p-10 md:w-2/3 flex flex-col justify-between">
              <div className="space-y-6">
                <div className="flex justify-between items-start">
                  <h3 className="text-2xl font-serif italic">{item.title}</h3>
                  <span className="text-[10px] tracking-widest uppercase font-medium bg-sanctuary-beige px-3 py-1 rounded-full">{item.duration}</span>
                </div>
                <p className="text-sanctuary-stone text-xs leading-relaxed">{item.desc}</p>
                <ul className="space-y-2 pt-2">
                  {item.features.map((f, j) => (
                    <li key={j} className="flex items-center space-x-3 text-[10px] text-sanctuary-stone uppercase tracking-widest">
                      <Sun size={10} className="text-sanctuary-ink" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-8 pt-6 border-t border-sanctuary-sand flex justify-between items-center">
                <span className="text-lg font-serif italic">{item.price}</span>
                <button className="px-6 py-2 bg-sanctuary-ink text-white rounded-full text-[10px] tracking-[0.2em] uppercase hover:opacity-90 transition-opacity">Book</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const GuidancePage = () => (
  <div className="pt-32 pb-20 px-6">
    <div className="max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        <div className="md:col-span-1 space-y-8">
          <h1 className="text-5xl font-serif italic leading-tight">Spiritual <br />Resources</h1>
          <div className="aspect-[4/5] rounded-[40px] overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1508672019048-805c876b67e2?auto=format&fit=crop&q=80&w=600" 
              alt="Meditation" 
              className="w-full h-full object-cover grayscale"
              referrerPolicy="no-referrer"
            />
          </div>
          <p className="text-sanctuary-stone leading-relaxed">
            A collection of tools, meditations, and writings to support your practice outside of our sessions.
          </p>
          <div className="p-8 bg-sanctuary-sage/20 rounded-3xl space-y-4">
            <h4 className="text-xs tracking-widest uppercase font-bold">Monthly Theme</h4>
            <p className="text-2xl font-serif italic">"Surrender to the Flow"</p>
            <p className="text-xs text-sanctuary-stone leading-relaxed">This month we explore the art of letting go and trusting the natural rhythm of life.</p>
          </div>
        </div>
        
        <div className="md:col-span-2 space-y-12">
          <div className="space-y-6">
            <h3 className="text-xs tracking-[0.2em] uppercase font-semibold border-b border-sanctuary-sand pb-4">Guided Meditations</h3>
            <div className="space-y-4">
              {[
                { title: 'Morning Grounding', time: '10:00', type: 'Audio' },
                { title: 'Release & Renew', time: '15:00', type: 'Audio' },
                { title: 'Heart Opening', time: '12:00', type: 'Audio' }
              ].map((m, i) => (
                <div key={i} className="flex justify-between items-center p-6 bg-white border border-sanctuary-sand rounded-2xl hover:border-sanctuary-ink transition-colors cursor-pointer group">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-sanctuary-beige rounded-full flex items-center justify-center group-hover:bg-sanctuary-ink group-hover:text-white transition-colors">
                      <Moon size={16} />
                    </div>
                    <div>
                      <h4 className="font-serif text-lg italic">{m.title}</h4>
                      <p className="text-[10px] tracking-widest uppercase text-sanctuary-stone">{m.type} • {m.time}</p>
                    </div>
                  </div>
                  <ArrowRight size={18} className="text-sanctuary-stone group-hover:text-sanctuary-ink group-hover:translate-x-1 transition-all" />
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="text-xs tracking-[0.2em] uppercase font-semibold border-b border-sanctuary-sand pb-4">Recent Journal Entries</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { title: 'The Power of Silence', date: 'March 12', img: 'https://images.unsplash.com/photo-1499209974431-9dac3adaf471?auto=format&fit=crop&q=80&w=400' },
                { title: 'Navigating Shadows', date: 'March 05', img: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=400' }
              ].map((post, i) => (
                <div key={i} className="space-y-4 group cursor-pointer">
                  <div className="aspect-video overflow-hidden rounded-2xl">
                    <img src={post.img} alt={post.title} className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700" referrerPolicy="no-referrer" />
                  </div>
                  <p className="text-[10px] tracking-widest uppercase text-sanctuary-stone">{post.date}</p>
                  <h4 className="text-2xl font-serif italic group-hover:text-sanctuary-stone transition-colors">{post.title}</h4>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const ContactPage = () => (
  <div className="pt-32 pb-20 px-6">
    <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-20">
      <div className="space-y-12">
        <div className="space-y-4">
          <h1 className="text-5xl font-serif italic">Reach Out</h1>
          <p className="text-sanctuary-stone leading-relaxed">
            Whether you have a question about our services or just want to share a reflection, we're here to listen.
          </p>
        </div>
        
        <div className="space-y-8">
          <div className="space-y-2">
            <h4 className="text-xs tracking-widest uppercase font-bold">Our Sanctuary</h4>
            <p className="text-sm text-sanctuary-stone">123 Stillness Way, Suite 400<br />Calm Valley, CA 90210</p>
          </div>
          <div className="space-y-2">
            <h4 className="text-xs tracking-widest uppercase font-bold">Direct Contact</h4>
            <p className="text-sm text-sanctuary-stone">hello@aethera.com<br />+1 (555) 000-0000</p>
          </div>
        </div>
      </div>

      <div className="bg-white p-12 rounded-[40px] border border-sanctuary-sand shadow-sm">
        <form className="space-y-8">
          <div className="grid grid-cols-2 gap-8">
            <div className="space-y-2">
              <label className="text-[10px] tracking-widest uppercase font-bold text-sanctuary-stone">First Name</label>
              <input type="text" className="w-full border-b border-sanctuary-sand py-2 outline-none focus:border-sanctuary-ink transition-colors bg-transparent" />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] tracking-widest uppercase font-bold text-sanctuary-stone">Last Name</label>
              <input type="text" className="w-full border-b border-sanctuary-sand py-2 outline-none focus:border-sanctuary-ink transition-colors bg-transparent" />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-[10px] tracking-widest uppercase font-bold text-sanctuary-stone">Email Address</label>
            <input type="email" className="w-full border-b border-sanctuary-sand py-2 outline-none focus:border-sanctuary-ink transition-colors bg-transparent" />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] tracking-widest uppercase font-bold text-sanctuary-stone">Your Message</label>
            <textarea rows={4} className="w-full border-b border-sanctuary-sand py-2 outline-none focus:border-sanctuary-ink transition-colors bg-transparent resize-none" />
          </div>
          <button className="w-full py-4 bg-sanctuary-ink text-white rounded-full text-xs tracking-[0.2em] uppercase hover:opacity-90 transition-opacity">Send Message</button>
        </form>
      </div>
    </div>
  </div>
);

const BookingPage = () => (
  <div className="pt-32 pb-20 px-6">
    <div className="max-w-4xl mx-auto text-center space-y-12">
      <div className="space-y-4">
        <h1 className="text-5xl font-serif italic">Book a Session</h1>
        <p className="text-sanctuary-stone">Choose a time that works for you to begin your journey.</p>
      </div>
      
      <div className="bg-white p-8 md:p-16 rounded-[40px] border border-sanctuary-sand shadow-sm space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {['Initial Consultation', 'Standard Session', 'Spiritual Guidance'].map((type, i) => (
            <button key={i} className={`py-4 px-6 rounded-2xl text-xs tracking-widest uppercase border transition-all ${i === 0 ? 'bg-sanctuary-ink text-white border-sanctuary-ink' : 'border-sanctuary-sand hover:border-sanctuary-ink'}`}>
              {type}
            </button>
          ))}
        </div>

        <div className="space-y-8">
          <div className="flex justify-between items-center border-b border-sanctuary-sand pb-4">
            <h4 className="text-lg font-serif italic">Select Date</h4>
            <span className="text-xs text-sanctuary-stone uppercase tracking-widest">March 2026</span>
          </div>
          <div className="grid grid-cols-7 gap-2">
            {Array.from({ length: 31 }).map((_, i) => (
              <button key={i} className={`aspect-square flex items-center justify-center rounded-full text-xs transition-all ${i + 1 === 22 ? 'bg-sanctuary-ink text-white' : 'hover:bg-sanctuary-beige'}`}>
                {i + 1}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-8">
          <div className="flex justify-between items-center border-b border-sanctuary-sand pb-4">
            <h4 className="text-lg font-serif italic">Select Time</h4>
            <span className="text-xs text-sanctuary-stone uppercase tracking-widest">PST</span>
          </div>
          <div className="grid grid-cols-3 md:grid-cols-4 gap-4">
            {['09:00 AM', '10:30 AM', '01:00 PM', '02:30 PM', '04:00 PM'].map((time, i) => (
              <button key={i} className="py-3 px-4 border border-sanctuary-sand rounded-xl text-[10px] tracking-widest uppercase hover:border-sanctuary-ink transition-all">
                {time}
              </button>
            ))}
          </div>
        </div>

        <button className="w-full py-5 bg-sanctuary-ink text-white rounded-full text-sm tracking-[0.2em] uppercase hover:opacity-90 transition-opacity">Confirm Appointment</button>
      </div>
    </div>
  </div>
);

// --- Main App ---

export default function App() {
  const [activePage, setActivePage] = useState('home');

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activePage]);

  const renderPage = () => {
    switch (activePage) {
      case 'home': return <HomePage onNavigate={setActivePage} />;
      case 'about': return <AboutPage />;
      case 'services': return <ServicesPage />;
      case 'guidance': return <GuidancePage />;
      case 'contact': return <ContactPage />;
      case 'booking': return <BookingPage />;
      default: return <HomePage onNavigate={setActivePage} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar activePage={activePage} setActivePage={setActivePage} />
      
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          <motion.div
            key={activePage}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
          >
            {renderPage()}
          </motion.div>
        </AnimatePresence>
      </main>

      <Footer />
    </div>
  );
}
