import React from 'react';
import { Phone, MapPin, Mail, Instagram, Send, Facebook } from 'lucide-react';

const Contact: React.FC = () => {
  return (
    <section id="contacts" className="py-24 bg-brand-dark text-white relative overflow-hidden">
      {/* Decor */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-brand-orange/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-900/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/4"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-6">
            Маєте запитання?
          </h2>
          <p className="text-gray-400 mb-8 text-lg max-w-2xl mx-auto">
            Зв'яжіться з нами будь-яким зручним способом. Ми працюємо щодня без вихідних.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">

          <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-8 rounded-2xl flex flex-col items-center text-center hover:bg-white/10 transition-all hover:-translate-y-2 group cursor-default">
            <div className="w-16 h-16 bg-brand-orange/20 rounded-full flex items-center justify-center mb-6 group-hover:bg-brand-orange/30 transition-colors">
              <Phone className="text-brand-orange" size={32} />
            </div>
            <h4 className="font-bold text-xl mb-2">Зателефонувати</h4>
            <p className="text-gray-300 text-lg mb-1">+380 97 734 77 67</p>
            <p className="text-gray-500 text-sm">Щодня з 09:00 до 20:00</p>
          </div>

          <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-8 rounded-2xl flex flex-col items-center text-center hover:bg-white/10 transition-all hover:-translate-y-2 group">
            <div className="w-16 h-16 bg-brand-orange/20 rounded-full flex items-center justify-center mb-6 group-hover:bg-brand-orange/30 transition-colors">
              <MapPin className="text-brand-orange" size={32} />
            </div>
            <h4 className="font-bold text-xl mb-2">Локація</h4>
            <p className="text-gray-300 text-lg mb-1">Івано-Франківськ</p>
            <p className="text-gray-500 text-sm">Працюємо по всій області</p>
          </div>

          <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-8 rounded-2xl flex flex-col items-center text-center hover:bg-white/10 transition-all hover:-translate-y-2 group">
            <div className="w-16 h-16 bg-brand-orange/20 rounded-full flex items-center justify-center mb-6 group-hover:bg-brand-orange/30 transition-colors">
              <Mail className="text-brand-orange" size={32} />
            </div>
            <h4 className="font-bold text-xl mb-2">Написати нам</h4>
            <p className="text-gray-300 text-lg mb-1">info@steli-lux.if.ua</p>
            <p className="text-gray-500 text-sm">Відповідаємо протягом години</p>
          </div>

        </div>

        <div className="mt-16 text-center">
          <p className="text-gray-400 mb-6">Слідкуйте за нами в соцмережах</p>
          <div className="flex justify-center flex-wrap gap-4 md:gap-6">
            <a href="#" className="flex items-center gap-2 px-6 py-3 bg-white/10 rounded-full hover:bg-brand-orange transition-colors">
              <Instagram size={20} />
              <span>Instagram</span>
            </a>
            <a href="https://www.facebook.com/share/1a1yhR8bGs/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-6 py-3 bg-white/10 rounded-full hover:bg-brand-orange transition-colors">
              <Facebook size={20} />
              <span>Facebook</span>
            </a>
            <a href="#" className="flex items-center gap-2 px-6 py-3 bg-white/10 rounded-full hover:bg-brand-orange transition-colors">
              <Send size={20} />
              <span>Telegram</span>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Contact;