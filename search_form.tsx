import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, ArrowLeftRight } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

interface SearchFormProps {
  onSearch: (data: {
    from: string;
    to: string;
    date: Date;
    passengers: number;
  }) => void;
}

export const SearchForm = ({ onSearch }: SearchFormProps) => {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [date, setDate] = useState<Date>();
  const [passengers, setPassengers] = useState(1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (from && to && date) {
      onSearch({ from, to, date, passengers });
    }
  };

  const swapLocations = () => {
    const temp = from;
    setFrom(to);
    setTo(temp);
  };

  return (
    <div className="bg-card rounded-xl p-6 shadow-elegant border">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 relative">
          <div className="space-y-2">
            <Label htmlFor="from">From</Label>
            <Input
              id="from"
              placeholder="Departure city"
              value={from}
              onChange={(e) => setFrom(e.target.value)}
              className="text-lg"
            />
          </div>
          
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={swapLocations}
            className="absolute left-1/2 top-8 transform -translate-x-1/2 z-10 bg-background border shadow-sm hover:shadow-md transition-all duration-300 md:relative md:left-auto md:top-auto md:transform-none md:w-12 md:h-12 md:self-end"
          >
            <ArrowLeftRight className="h-4 w-4" />
          </Button>
          
          <div className="space-y-2">
            <Label htmlFor="to">To</Label>
            <Input
              id="to"
              placeholder="Destination city"
              value={to}
              onChange={(e) => setTo(e.target.value)}
              className="text-lg"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Travel Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal text-lg",
                    !date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP") : <span>Select date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  disabled={(date) => date < new Date()}
                  initialFocus
                  className="pointer-events-auto"
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="space-y-2">
            <Label htmlFor="passengers">Passengers</Label>
            <Input
              id="passengers"
              type="number"
              min="1"
              max="9"
              value={passengers}
              onChange={(e) => setPassengers(parseInt(e.target.value) || 1)}
              className="text-lg"
            />
          </div>
        </div>

        <Button
          type="submit"
          size="lg"
          className="w-full bg-gradient-primary hover:shadow-glow transition-all duration-300 text-lg font-semibold"
        >
          Search Buses
        </Button>
      </form>
    </div>
  );
};
