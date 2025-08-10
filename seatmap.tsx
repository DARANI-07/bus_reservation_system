import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface SeatMapProps {
  busId: string;
  totalSeats: number;
  bookedSeats: number[];
  onSeatSelect: (seatNumbers: number[]) => void;
  maxPassengers: number;
}

export const SeatMap = ({ busId, totalSeats, bookedSeats, onSeatSelect, maxPassengers }: SeatMapProps) => {
  const [selectedSeats, setSelectedSeats] = useState<number[]>([]);

  const handleSeatClick = (seatNumber: number) => {
    if (bookedSeats.includes(seatNumber)) return;

    const newSelectedSeats = selectedSeats.includes(seatNumber)
      ? selectedSeats.filter(seat => seat !== seatNumber)
      : selectedSeats.length < maxPassengers
        ? [...selectedSeats, seatNumber]
        : selectedSeats;

    setSelectedSeats(newSelectedSeats);
    onSeatSelect(newSelectedSeats);
  };

  const getSeatStatus = (seatNumber: number) => {
    if (bookedSeats.includes(seatNumber)) return 'booked';
    if (selectedSeats.includes(seatNumber)) return 'selected';
    return 'available';
  };

  const getSeatStyles = (status: string) => {
    switch (status) {
      case 'booked':
        return 'bg-destructive text-destructive-foreground cursor-not-allowed';
      case 'selected':
        return 'bg-accent text-accent-foreground hover:bg-accent/90';
      case 'available':
        return 'bg-secondary text-secondary-foreground hover:bg-primary hover:text-primary-foreground';
      default:
        return '';
    }
  };

  const seats = Array.from({ length: totalSeats }, (_, i) => i + 1);
  const rows = Math.ceil(totalSeats / 4);

  return (
    <div className="bg-card rounded-lg p-6 space-y-6">
      <div className="text-center">
        <h3 className="text-xl font-bold mb-2">Select Your Seats</h3>
        <p className="text-muted-foreground">
          Selected: {selectedSeats.length} / {maxPassengers} passengers
        </p>
      </div>

      {/* Legend */}
      <div className="flex justify-center gap-6 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-secondary rounded"></div>
          <span>Available</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-accent rounded"></div>
          <span>Selected</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-destructive rounded"></div>
          <span>Booked</span>
        </div>
      </div>

      {/* Bus Layout */}
      <div className="max-w-md mx-auto">
        {/* Driver area */}
        <div className="bg-muted rounded-t-lg p-3 text-center text-sm font-medium mb-4">
          Driver
        </div>

        {/* Seats */}
        <div className="space-y-3">
          {Array.from({ length: rows }, (_, rowIndex) => (
            <div key={rowIndex} className="flex justify-center gap-8">
              {/* Left side seats */}
              <div className="flex gap-2">
                {seats
                  .slice(rowIndex * 4, rowIndex * 4 + 2)
                  .map((seatNumber) => (
                    <Button
                      key={seatNumber}
                      variant="outline"
                      size="sm"
                      onClick={() => handleSeatClick(seatNumber)}
                      disabled={bookedSeats.includes(seatNumber)}
                      className={cn(
                        "w-10 h-10 p-0 transition-all duration-200",
                        getSeatStyles(getSeatStatus(seatNumber))
                      )}
                    >
                      {seatNumber}
                    </Button>
                  ))}
              </div>

              {/* Aisle */}
              <div className="w-8"></div>

              {/* Right side seats */}
              <div className="flex gap-2">
                {seats
                  .slice(rowIndex * 4 + 2, rowIndex * 4 + 4)
                  .map((seatNumber) => (
                    <Button
                      key={seatNumber}
                      variant="outline"
                      size="sm"
                      onClick={() => handleSeatClick(seatNumber)}
                      disabled={bookedSeats.includes(seatNumber)}
                      className={cn(
                        "w-10 h-10 p-0 transition-all duration-200",
                        getSeatStyles(getSeatStatus(seatNumber))
                      )}
                    >
                      {seatNumber}
                    </Button>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedSeats.length > 0 && (
        <div className="text-center p-4 bg-accent/10 rounded-lg">
          <p className="font-medium">
            Selected Seats: {selectedSeats.sort((a, b) => a - b).join(', ')}
          </p>
        </div>
      )}
    </div>
  );
};
