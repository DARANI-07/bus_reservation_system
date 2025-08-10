import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, MapPin, Users, Wifi, Coffee, Power } from "lucide-react";

interface BusCardProps {
  bus: {
    id: string;
    operator: string;
    departureTime: string;
    arrivalTime: string;
    duration: string;
    price: number;
    seatsAvailable: number;
    busType: string;
    amenities: string[];
  };
  onSelect: (busId: string) => void;
}

export const BusCard = ({ bus, onSelect }: BusCardProps) => {
  const getAmenityIcon = (amenity: string) => {
    switch (amenity.toLowerCase()) {
      case 'wifi':
        return <Wifi className="h-4 w-4" />;
      case 'snacks':
        return <Coffee className="h-4 w-4" />;
      case 'charging':
        return <Power className="h-4 w-4" />;
      default:
        return null;
    }
  };

  return (
    <div className="bg-card rounded-lg border p-6 hover:shadow-elegant transition-all duration-300">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <h3 className="font-bold text-lg">{bus.operator}</h3>
            <Badge variant="secondary">{bus.busType}</Badge>
          </div>
          
          <div className="flex items-center gap-6 text-muted-foreground">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span className="text-sm">{bus.duration}</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              <span className="text-sm">{bus.seatsAvailable} seats left</span>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="text-center">
              <div className="font-bold text-xl">{bus.departureTime}</div>
              <div className="text-sm text-muted-foreground">Departure</div>
            </div>
            <div className="flex-1 flex items-center gap-2 text-muted-foreground">
              <div className="h-px bg-border flex-1"></div>
              <MapPin className="h-4 w-4" />
              <div className="h-px bg-border flex-1"></div>
            </div>
            <div className="text-center">
              <div className="font-bold text-xl">{bus.arrivalTime}</div>
              <div className="text-sm text-muted-foreground">Arrival</div>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            {bus.amenities.map((amenity, index) => (
              <div key={index} className="flex items-center gap-1 text-muted-foreground">
                {getAmenityIcon(amenity)}
                <span className="text-sm capitalize">{amenity}</span>
              </div>
            ))}
          </div>
        </div>
        
        <div className="text-center lg:text-right space-y-3">
          <div>
            <div className="text-3xl font-bold text-primary">${bus.price}</div>
            <div className="text-sm text-muted-foreground">per person</div>
          </div>
          <Button
            onClick={() => onSelect(bus.id)}
            className="w-full lg:w-auto bg-gradient-accent hover:shadow-glow transition-all duration-300"
          >
            Select Seats
          </Button>
        </div>
      </div>
    </div>
  );
};
