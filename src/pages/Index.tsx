import { useState } from "react";
import {
  Heart,
  Calendar,
  MapPin,
  Clock,
  Mail,
  Phone,
  Church,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import heroImage from "@/assets/wedding-hero.jpg";
import mobileHeroImage from "@/assets/portrait.png";
import { useIsMobile } from "@/hooks/use-mobile";

const Index = () => {
  const [rsvpSubmitted, setRsvpSubmitted] = useState(false);
  const isMobile = useIsMobile();

  const handleRsvpClick = () => {
    setRsvpSubmitted(true);
    setTimeout(() => setRsvpSubmitted(false), 3000);
  };

  return (
    <div className="min-h-screen bg-wedding-background">
      {/* Hero Section */}
      <section
        className="relative h-screen flex items-center justify-center bg-cover bg-center"
        style={{
          backgroundImage: `url(${isMobile ? mobileHeroImage : heroImage})`,
        }}
      >
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative z-10 text-center text-white animate-fade-in">
          <div className="mb-8">
            <Heart className="w-16 h-16 mx-auto mb-6 text-wedding-secondary animate-romantic-pulse" />
            <h1 className="font-serif text-6xl md:text-8xl font-bold mb-4">
              Reyna & Pedro
            </h1>
            <div className="w-24 h-0.5 bg-wedding-secondary mx-auto mb-6"></div>
            <p className="text-xl md:text-2xl font-light tracking-wide">
              Nuestra Boda
            </p>
          </div>
          <Badge
            variant="secondary"
            className="px-6 py-3 text-lg font-medium bg-white/10 backdrop-blur-sm border-white/20"
          >
            Abril 26, 2026
          </Badge>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-6 py-16">
        {/* Save the Date */}
        <section className="text-center mb-20 animate-fade-in-up">
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-wedding-text mb-6"></h2>
          <p className="text-xl text-wedding-text-light max-w-2xl mx-auto leading-relaxed">
            "Todo lo hizo hermoso en su tiempo" Eclesiastes 3:11
          </p>
        </section>

        {/* Wedding Details */}
        <section className="grid md:grid-cols-2 gap-8 mb-20">
          <Card className="shadow-soft hover:shadow-romantic transition-all duration-300 animate-scale-in">
            <CardContent className="p-8">
              <div className="flex items-center mb-6">
                <Church className="w-8 h-8 text-wedding-primary mr-4" />
                <h3 className="font-serif text-2xl font-semibold text-wedding-text">
                  Iglesia
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
                      Union Church
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

          <Card className="shadow-soft hover:shadow-romantic transition-all duration-300 animate-scale-in">
            <CardContent className="p-8">
              <div className="flex items-center mb-6">
                <Heart className="w-8 h-8 text-wedding-primary mr-4" />
                <h3 className="font-serif text-2xl font-semibold text-wedding-text">
                  Recepción
                </h3>
              </div>
              <div className="space-y-3 text-wedding-text-light">
                <div className="flex items-center">
                  <Clock className="w-5 h-5 mr-3" />
                  <span>8:00 PM</span>
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
        </section>

        {/* Timeline */}
        <section className="mb-20 animate-fade-in-up">
          <h2 className="font-serif text-4xl font-bold text-wedding-text text-center mb-12">
            Wedding Day Timeline
          </h2>
          <div className="space-y-6">
            {[
              { time: "3:30 PM", event: "Recibimiento" },
              {
                time: "4:00 PM",
                event: "Ceremonia de casamiento en la iglesia",
              },
              { time: "4:45 PM", event: "Fotografias en Palacio de Gobierno" },
              { time: "7:00 PM", event: "Boda Civil" },
              { time: "8:00 PM", event: "Recepción" },
            ].map((item, index) => (
              <div
                key={index}
                className="flex items-center p-4 bg-card rounded-lg shadow-soft"
              >
                <Badge
                  variant="outline"
                  className="min-w-fit mr-4 border-wedding-primary text-wedding-primary"
                >
                  {item.time}
                </Badge>
                <span className="text-wedding-text">{item.event}</span>
              </div>
            ))}
          </div>
        </section>

        {/* RSVP Section */}
        <section className="text-center mb-20 animate-fade-in-up">
          <Card className="max-w-2xl mx-auto shadow-romantic bg-gradient-romantic">
            <CardContent className="p-12">
              <Heart className="w-12 h-12 mx-auto mb-6 text-white" />
              <h2 className="font-serif text-3xl font-bold text-white mb-6">
                Confirma tu asistencia
              </h2>
              <p className="text-white/90 mb-8 text-lg">
                Queremos celebrar nuestra boda contigo. Porfavor confirma tu
                asistencia haciendo clic en el botón de abajo.
              </p>
              <Button
                onClick={handleRsvpClick}
                size="lg"
                className="bg-white text-wedding-primary hover:bg-white/90 font-semibold px-8 py-3 text-lg"
              >
                {rsvpSubmitted ? "Thank you!" : "Confirma tu asistencia aquí"}
              </Button>
              <p className="text-white/80 mt-4 text-sm">
                Porfavor response tu asistencia antes del 1 Marzo del 2026.
              </p>
            </CardContent>
          </Card>
        </section>
      </div>


      {/* Footer */}
      <footer className="bg-wedding-text text-white py-12 text-center">
        <Heart className="w-8 h-8 mx-auto mb-4 text-wedding-secondary" />
        <p className="text-lg font-light">With love, Reyna & Pedro</p>
      </footer>
    </div>
  );
};

export default Index;
