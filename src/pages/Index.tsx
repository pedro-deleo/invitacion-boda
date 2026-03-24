import { useState, useRef, useEffect } from "react";
import {
  Heart,
  Flower2,
  Sparkles,
  Gem,
  MapPin,
  Clock,
  Mail,
  Phone,
  Church,
  Camera,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import heroImage from "@/assets/wedding-hero.jpg";
import bg1Mobile from "@/assets/bg-1.png";
import flowerPattern from "@/assets/flower-pattern.svg";
import flowerIcon from "@/assets/flower.svg";
import suitAndTie from "@/assets/suit-and-tie-outfit.png";
import weddingDress from "@/assets/wedding-dress.png";
import { useIsMobile } from "@/hooks/use-mobile";

const Index = () => {
  const [isRsvpModalOpen, setIsRsvpModalOpen] = useState(false);
  const [activeRsvpFormUrl, setActiveRsvpFormUrl] = useState("");
  const [isRsvpLocked, setIsRsvpLocked] = useState(false);
  const [rsvpError, setRsvpError] = useState("");
  const isMobile = useIsMobile();
  const [photoCount, setPhotoCount] = useState(0);

  const rsvpLinks: Record<string, string> = {
    a: "https://docs.google.com/forms/d/e/1FAIpQLSdx9B9TgXQO_gHDpZnmsAJIBFLJ4MvxRy6bcJccpwxnXkmo2w/viewform?embedded=true",
    b: "https://docs.google.com/forms/d/e/1FAIpQLSf5TRGjQp4tN4U8OlSv3ZyzlsxJrHbWxrnvEfVW072wjmOCDQ/viewform?embedded=true",
  };

  // Carousel API for auto-scroll
  const [carouselApi, setCarouselApi] = useState<any>(null);

  useEffect(() => {
    let isActive = true;

    const imageExists = (src: string) =>
      new Promise<boolean>((resolve) => {
        const img = new Image();
        img.onload = () => resolve(true);
        img.onerror = () => resolve(false);
        img.src = src;
      });

    const loadPhotoCount = async () => {
      const maxPhotos = 200;
      let count = 0;

      // Photos are expected to be sequentially named: photo-1, photo-2, etc.
      for (let i = 1; i <= maxPhotos; i++) {
        const exists = await imageExists(`/photos/photo-${i}.jpg`);
        if (!exists) break;
        count = i;
      }

      if (isActive) {
        setPhotoCount(count);
      }
    };

    void loadPhotoCount();

    return () => {
      isActive = false;
    };
  }, []);

  useEffect(() => {
    if (!carouselApi || photoCount <= 1) return;
    const interval = setInterval(() => {
      carouselApi.scrollNext();
    }, 3500); // Change slide every 3.5 seconds
    return () => clearInterval(interval);
  }, [carouselApi, photoCount]);

  useEffect(() => {
    const sections = Array.from(
      document.querySelectorAll<HTMLElement>("[data-reveal]")
    );

    if (!sections.length) return;

    sections.forEach((section, index) => {
      section.style.transitionDelay = `${index * 140}ms`;
    });

    let hasUserInteracted = false;

    const revealSection = (section: Element) => {
      section.classList.add("reveal-visible");
      observer.unobserve(section);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          const section = entry.target as HTMLElement;
          const skipInitial = section.dataset.revealSkipInitial === "true";
          if (skipInitial && !hasUserInteracted) return;

          revealSection(section);
        });
      },
      {
        threshold: 0.08,
        rootMargin: "0px 0px -12% 0px",
      }
    );

    const revealSkippedSectionsIfVisible = () => {
      if (!hasUserInteracted) return;

      sections.forEach((section) => {
        if (section.classList.contains("reveal-visible")) return;
        if (section.dataset.revealSkipInitial !== "true") return;

        const rect = section.getBoundingClientRect();
        const triggerLine = window.innerHeight * 0.88;
        const isInViewport = rect.top <= triggerLine && rect.bottom >= 0;

        if (isInViewport) {
          revealSection(section);
        }
      });
    };

    const onFirstInteraction = () => {
      hasUserInteracted = true;
      revealSkippedSectionsIfVisible();
    };

    window.addEventListener("wheel", onFirstInteraction, { passive: true });
    window.addEventListener("touchstart", onFirstInteraction, { passive: true });
    window.addEventListener("keydown", onFirstInteraction);
    window.addEventListener("scroll", revealSkippedSectionsIfVisible, { passive: true });

    sections.forEach((section) => observer.observe(section));

    return () => {
      window.removeEventListener("wheel", onFirstInteraction);
      window.removeEventListener("touchstart", onFirstInteraction);
      window.removeEventListener("keydown", onFirstInteraction);
      window.removeEventListener("scroll", revealSkippedSectionsIfVisible);
      sections.forEach((section) => {
        section.style.transitionDelay = "";
      });
      observer.disconnect();
    };
  }, []);

  const handleRsvpClick = () => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get("code")?.trim().toLowerCase() ?? "";
    const targetUrl = rsvpLinks[code];

    if (!targetUrl) {
      setRsvpError("No encontramos tu código de invitación. Revisa tu enlace.");
      return;
    }

    setRsvpError("");
    setIsRsvpLocked(true);
    setActiveRsvpFormUrl(targetUrl);
    setIsRsvpModalOpen(true);
  };

  return (
    <div
      className="min-h-screen bg-wedding-background"
      style={{
        backgroundImage: `linear-gradient(hsl(var(--wedding-background) / 0.40), hsl(var(--wedding-background) / 0.40)), url(${flowerPattern})`,
        backgroundRepeat: "no-repeat, repeat",
        backgroundSize: "cover, 320px",
        backgroundBlendMode: "normal, multiply",
      }}
    >
      {/* Intro Section */}
      <section
        className="relative h-screen flex items-start justify-center bg-cover bg-center pt-20 md:pt-28"
        style={{
          backgroundImage: `url(${isMobile ? bg1Mobile : bg1Mobile})`,
        }}
      >
        <div className="absolute top-0 left-1/2 z-10 w-full -translate-x-1/2 pt-6 md:pt-10 text-center text-white">
          <div className="mb-8">
            <p className="font-rouge text-8xl sm:text-8xl md:text-8xl lg:text-9xl xl:text-[9rem] leading-none">Reyna</p>
            <p className="font-rouge text-8xl sm:text-8xl md:text-8xl lg:text-9xl xl:text-[9rem] leading-none">&</p>
            <p className="font-rouge text-8xl sm:text-8xl md:text-8xl lg:text-9xl xl:text-[9rem] leading-none">Pedro</p>
            <div className="w-24 h-0.5 bg-wedding-secondary mx-auto"></div>
            <p className="font-rouge text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-wide">
              Nuestra Boda
            </p>
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 z-10 -translate-x-1/2 md:bottom-14">
          <Badge
            variant="secondary"
            className="px-6 py-3 text-wedding-text text-lg font-medium font-serif bg-wedding-background backdrop-blur-sm border-white/20"
          >
            Abril 26, 2026
          </Badge>
        </div>
      </section>



      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-6 py-16">

        {/* Invitation Section */}
        <section className="reveal-on-scroll text-center pt-14 pb-4 px-6" data-reveal data-reveal-skip-initial="true">
          <p className="font-rouge text-5xl md:text-6xl font-bold text-wedding-text-light leading-tight md:leading-none max-w-3xl mx-auto">
            <span className="block md:inline">Tenemos el honor de invitarlos a ser partícipes</span>{" "}
            <span className="block md:inline">de nuestra unión en matrimonio</span>
          </p>
        </section>

        {/* Bendicion Section */}
        <section className="reveal-on-scroll text-center pt-4 pb-14" data-reveal data-reveal-skip-initial="true">
          <div className="bg-white rounded-2xl shadow-soft px-8 py-10 space-y-3">
            <p className="font-rouge text-3xl md:text-6xl font-bold text-wedding-text-light leading-tight md:leading-none">
              Con la bendición de Dios y de nuestros padres:</p>
            <p className="font-rouge text-2xl md:text-3xl  text-wedding-text-light leading-tight">
              Américo Rafael López De Leija
            </p>
            <p className="font-rouge text-2xl md:text-3xl  text-wedding-text-light leading-tight">
              &
            </p>
            <p className="font-rouge text-2xl md:text-3xl  text-wedding-text-light leading-tight">
              Patricia Elizondo Armendariz
            </p>

            <div className="w-1/2 mx-auto border-t border-gray-500 my-3"></div>

            <p className="font-rouge text-2xl md:text-3xl  text-wedding-text-light leading-tight">
                En memoria de
              </p>
            <p className="font-rouge text-2xl md:text-3xl  text-wedding-text-light leading-tight">
              Pedro Elí de León Frausto
            </p>
            <p className="font-rouge text-2xl md:text-3xl  text-wedding-text-light leading-tight">
              presente en nuestros corazones
            </p>
            <p className="font-rouge text-2xl md:text-3xl  text-wedding-text-light leading-tight">&</p>
            <p className="font-rouge text-2xl md:text-3xl  text-wedding-text-light leading-tight">
              Marcela Cecilia Robledo García
            </p>
          </div>
        </section>

        {/* Wedding Details */}
        <section className="grid md:grid-cols-2 gap-8 mb-20">
          <div className="reveal-on-scroll" data-reveal>
          <Card className="shadow-soft hover:shadow-romantic transition-all duration-300 animate-scale-in">
            <CardContent className="p-8">
              <div className="flex items-center mb-6">
                <Church className="w-8 h-8 text-wedding-primary mr-4" />
                <h3 className="font-serif text-2xl font-semibold text-wedding-text">
                  Ceremonia
                </h3>
              </div>
              <div className="space-y-3 text-wedding-text-light">
                <div className="flex items-center">
                  <Clock className="w-5 h-5 mr-3" />
                  <span>4:00 PM</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="w-5 h-5 mr-3" />
                  <span>
                    <a
                      href="https://www.google.com/maps/search/?api=1&query=Union+Church+Oscar+F.+Castillon+200,+Chepevera,+64060+Monterrey,+N.L."
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-wedding-primary underline hover:text-wedding-secondary"
                    >
                      Iglesia Union Church
                      <br />
                      Oscar F. Castillon 200, Chepevera, 64060
                      <br />
                      Monterrey, N.L.
                    </a>
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
          </div>

          <div className="reveal-on-scroll" data-reveal>
          <Card className="shadow-soft hover:shadow-romantic transition-all duration-300 animate-scale-in">
            <CardContent className="p-8">
              <div className="flex items-center mb-6">
                <Sparkles className="w-8 h-8 text-wedding-primary mr-4" />
                <h3 className="font-serif text-2xl font-semibold text-wedding-text">
                  Recepción
                </h3>
              </div>
              <div className="space-y-3 text-wedding-text-light">
                <div className="flex items-center">
                  <Clock className="w-5 h-5 mr-3" />
                  <span>7:00 PM</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="w-5 h-5 mr-3" />
                  <span>
                    <a
                      href="https://www.google.com/maps/search/?api=1&query=Las+Lomas+Eventos+Av.+Ignacio+Morones+Prieto+No.2808-Pte,+Del+Carmen,+64710+Monterrey,+N.L."
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-wedding-primary underline hover:text-wedding-secondary"
                    >
                      Las Lomas Eventos
                      <br />
                      Av. Ignacio Morones Prieto No.2808-Pte, Del Carmen
                      <br />
                      64710 Monterrey, N.L.
                    </a>
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
          </div>

          <div className="reveal-on-scroll" data-reveal>
          <Card className="shadow-soft hover:shadow-romantic transition-all duration-300 animate-scale-in">
            <CardContent className="p-8 text-center">
              <div className="mb-6">
                <h3 className="font-serif text-2xl font-semibold text-wedding-text text-center">
                  Código de Vestimenta
                </h3>
              </div>
              <div className="space-y-3 text-wedding-text-light">
                <div className="flex items-center gap-6 justify-center">
                  <img src={suitAndTie} alt="Traje formal" className="w-16 h-16 object-contain" />
                  <img src={weddingDress} alt="Vestido de gala" className="w-16 h-16 object-contain" />
                </div>
                <p className="text-lg text-center">Etiqueta Formal</p>
              </div>
            </CardContent>
          </Card>
          </div>
        </section>



        {/* Photo Album Section */}
        <section className="reveal-on-scroll mb-20" data-reveal>
          <div className="text-center mb-12">
            <Camera className="w-8 h-8 mx-auto mb-4 text-wedding-primary" />
            <h2 className="font-serif text-4xl font-bold text-wedding-text mb-4">
              Álbum de Fotos
            </h2>
          </div>
          
          <div className="relative max-w-5xl mx-auto">
            <Carousel
              setApi={setCarouselApi}
              opts={{
                align: "start",
                loop: true,
              }}
              className="w-full"
            >
              <CarouselContent className="-ml-2 md:-ml-4">
                {Array.from({ length: photoCount }, (_, index) => (
                  <CarouselItem 
                    key={index} 
                    className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3"
                  >
                    <Card className="shadow-soft hover:shadow-romantic transition-all duration-300 animate-scale-in group">
                      <CardContent className="p-0">
                        <div className="aspect-[.8] overflow-hidden rounded-lg">
                          <img
                            src={`/photos/photo-${index + 1}.jpg`}
                            alt={`Foto de boda ${index + 1}`}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                      </CardContent>
                    </Card>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="hidden md:flex -left-16" />
              <CarouselNext className="hidden md:flex -right-16" />
            </Carousel>
          </div>
        </section>

        {/* Versiculo */}
        <section className="reveal-on-scroll text-center mb-20" data-reveal>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-wedding-text mb-6"></h2>
          <p className="text-5xl md:text-6xl font-rouge font-bold text-wedding-text-light max-w-2xl mx-auto leading-relaxed">
            "Las muchas aguas no pueden apagar el amor, ni los ríos lo anegarán"
          </p>
          <p className="text-4xl font-rouge font-bold text-wedding-text-light max-w-2xl mx-auto leading-relaxed"> Cantares 8:7</p>
        </section>

        {/* Mesa de regalos Section */}
        <section className="reveal-on-scroll text-center mb-20" data-reveal>
          <Card className="max-w-2xl mx-auto shadow-romantic bg-gradient-romantic animate-scale-in">
            <CardContent className="p-12">
              <Mail className="w-12 h-12 mx-auto mb-6 text-white" />
              <h2 className="font-serif text-3xl font-bold text-white mb-6">
                Sugerencia de Regalo
              </h2>
              <p className="text-white/90 mb-8 text-lg">
                El mejor regalo es contar con tu presencia en este día tan
                especial para nosotros. Si deseas apoyarnos con un obsequio,
                con mucho cariño lo recibiremos en un sobre el día del evento.
              </p>
            </CardContent>
          </Card>
        </section>

        {/* RSVP Section */}
        <section className="reveal-on-scroll text-center mb-20" data-reveal>
          <Card className="max-w-2xl mx-auto shadow-romantic bg-gradient-romantic animate-scale-in">
            <CardContent className="p-12">
              <img src={flowerIcon} alt="flor" className="w-12 h-12 mx-auto mb-6" style={{ filter: "brightness(0) invert(1)" }} />
              <h2 className="font-serif text-3xl font-bold text-white mb-6">
                Confirma tu asistencia
              </h2>
              <p className="text-white/90 mb-8 text-lg">
                Queremos celebrar nuestra boda contigo. Confirma tu
                asistencia haciendo clic en el botón de abajo.
              </p>
              <Button
                onClick={handleRsvpClick}
                size="lg"
                disabled={isRsvpLocked}
                className="bg-white text-wedding-primary hover:bg-white/90 font-semibold px-8 py-3 text-lg"
              >
                {isRsvpLocked ? "Gracias" : "Confirma aquí"}
              </Button>
              {rsvpError ? (
                <p className="text-red-100 mt-4 text-sm font-medium">{rsvpError}</p>
              ) : null}
              <p className="text-white/80 mt-4 text-sm">
                Responde tu asistencia lo antes posible
              </p>
            </CardContent>
          </Card>
        </section>
      </div>

      <Dialog open={isRsvpModalOpen} onOpenChange={setIsRsvpModalOpen}>
        <DialogContent className="w-[95vw] max-w-4xl p-0 overflow-hidden bg-wedding-background">
          <DialogHeader className="p-4 pb-0">
            <DialogTitle>Confirmación de Asistencia</DialogTitle>
          </DialogHeader>
          {activeRsvpFormUrl ? (
            <iframe
              src={activeRsvpFormUrl}
              title="Formulario RSVP"
              className="w-full h-[80vh] border-0"
              loading="lazy"
            >
              Cargando...
            </iframe>
          ) : null}
        </DialogContent>
      </Dialog>


      {/* Footer */}
      <footer className="bg-wedding-text text-white py-12 text-center">
        <Heart className="w-8 h-8 mx-auto mb-4 text-white fill-current" />
        <p className="font-serif text-sm md:text-base font-light">Hecho con amor por  Reyna & Pedro</p>
      </footer>
    </div>
  );
};

export default Index;
