import { motion, AnimatePresence } from "motion/react";
import { ArrowRight, Star, ShieldCheck, Clock, Zap, Play } from "lucide-react";
import { useRef, useState } from "react";
// Link removed as it is not used

const services = [
  {
    id: "01",
    title: "General & Family Dentistry",
    description: "Thorough examinations, gentle cleanings, and honest advice. Preventive care that protects your long-term health.",
    image: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=800&q=80",
  },
  {
    id: "02",
    title: "Dental Implants",
    description: "Advanced techniques for natural-looking, long-lasting results that feel secure and stable.",
    image: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=800&q=80",
  },
  {
    id: "03",
    title: "CEREC — Single Visit",
    description: "Custom ceramic restorations designed, crafted, and fitted in a single visit. Fewer appointments, durable results.",
    image: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=800&q=80",
  },
  {
    id: "04",
    title: "Aesthetic Dentistry",
    description: "Veneers, whitening, bonding — designed to enhance your natural smile, not change who you are.",
    image: "https://images.unsplash.com/photo-1609840114035-3c981b782dfe?w=800&q=80",
  },
  {
    id: "05",
    title: "Oral Health Makeovers",
    description: "Comprehensive treatment plans for complex cases. Function, health, and aesthetics — expertly delivered.",
    image: "https://images.unsplash.com/photo-1609840114035-3c981b782dfe?w=800&q=80",
  },
  {
    id: "06",
    title: "Root Canal Treatment",
    description: "Modern techniques make treatment far more comfortable. Save the tooth, eliminate the pain.",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&q=80",
  },
  {
    id: "07",
    title: "ZOOM Teeth Whitening",
    description: "Professional whitening customized to your goals. No sensitivity, just a brighter, more confident smile.",
    image: "https://images.unsplash.com/photo-1606811971618-4486d14f3f99?w=800&q=80",
  },
];

export function ServicesSection() {
  const [activeService, setActiveService] = useState(services[0]);

  return (
    <section id="services" className="py-24 lg:py-32 bg-secondary/30 relative z-20">
      <div className="max-w-[1800px] mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-start">

          {/* Left Column: List */}
          <div className="lg:col-span-5 flex flex-col justify-center h-full">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-12"
            >
              <span className="text-primary font-bold tracking-widest uppercase text-sm xl:text-base 2xl:text-lg mb-4 block">Comprehensive Care</span>
              <h2 className="text-5xl md:text-7xl xl:text-8xl 2xl:text-9xl font-heading font-bold text-foreground leading-none mb-4">
                Services.
              </h2>
              <p className="text-muted-foreground text-lg xl:text-xl 2xl:text-2xl font-light">Evidence-based dental care, delivered with patience and skill.</p>
            </motion.div>

            <div className="flex flex-col">
              {services.map((service) => (
                <div
                  key={service.id}
                  className="group border-b border-black/10 last:border-0"
                  onMouseEnter={() => setActiveService(service)}
                >
                  <div className={`py-8 cursor-pointer transition-all duration-300 flex items-start justify-between ${activeService.id === service.id ? 'pl-4 lg:pl-8 border-l-4 border-l-primary bg-white/40' : 'hover:pl-4 hover:bg-white/20'}`}>
                    <div className="flex-1">
                      <div className="flex items-baseline gap-4 mb-2">
                        <span className={`text-sm xl:text-base 2xl:text-lg font-mono transition-colors duration-300 ${activeService.id === service.id ? 'text-primary' : 'text-muted-foreground/50'}`}>
                          {service.id}
                        </span>
                        <h3 className={`text-2xl md:text-3xl xl:text-4xl 2xl:text-5xl font-heading font-bold transition-colors duration-300 ${activeService.id === service.id ? 'text-foreground' : 'text-muted-foreground group-hover:text-foreground'}`}>
                          {service.title}
                        </h3>
                      </div>
                      <div className={`overflow-hidden transition-all duration-500 ease-in-out ${activeService.id === service.id ? 'max-h-24 opacity-100 mt-2' : 'max-h-0 opacity-0'}`}>
                        <p className="text-muted-foreground text-lg xl:text-xl 2xl:text-2xl leading-relaxed pl-8 md:pl-10">
                          {service.description}
                        </p>
                      </div>
                    </div>

                    <ArrowRight className={`w-5 h-5 transition-all duration-300 mt-2 mr-4 ${activeService.id === service.id ? 'text-primary opacity-100 rotate-0' : 'text-muted-foreground opacity-0 -translate-x-4'}`} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Sticky Media Display */}
          <div className="lg:col-span-7 relative h-[600px] lg:h-[800px] w-full lg:sticky lg:top-32 hidden lg:block rounded-3xl overflow-hidden shadow-2xl">
            <AnimatePresence mode="popLayout">
              <motion.div
                key={activeService.id}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
                className="absolute inset-0 w-full h-full bg-black/5"
              >
                {/* Background Image */}
                <img
                  src={activeService.image}
                  alt={activeService.title}
                  className="absolute inset-0 w-full h-full object-cover"
                />

                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />

                {/* Play Button / Indication */}
                <div className="absolute bottom-12 left-12 flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center">
                    <Play className="w-6 h-6 fill-white text-white ml-1" />
                  </div>
                  <span className="text-white font-heading text-xl xl:text-2xl 2xl:text-3xl tracking-wide">{activeService.title}</span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Mobile Media (Visible only on small screens below list) */}
          <div className="lg:hidden h-[300px] rounded-2xl overflow-hidden relative shadow-lg mt-8">
            <img
              src={activeService.image}
              alt={activeService.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/20" />
            <div className="absolute bottom-6 left-6 text-white font-bold text-xl">
              {activeService.title}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
