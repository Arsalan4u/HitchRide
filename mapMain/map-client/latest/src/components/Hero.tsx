import React, { useState } from "react";
import { MapPin } from "lucide-react";
import { Button } from "../components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import RideMap from "./RideMap";
import FreeLocationAutocomplete from "../components/FreeLocationAutocomplete";
import { useNavigate } from "react-router-dom";
import { Input } from './ui/input';
import EmbeddedMap from './EmbeddedMap';

const Hero: React.FC = () => {
    const [pickup, setPickup] = useState("");
    const [dropoff, setDropoff] = useState("");
    const [showMap, setShowMap] = useState(false);
    const navigate = useNavigate();

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (pickup && dropoff) {
            setShowMap(true);
        }
    };

    const handleBack = () => {
        setShowMap(false);
    };

    if (showMap) {
        return (
            <div className="relative h-[600px] w-full">
                <Button
                    onClick={handleBack}
                    className="absolute top-4 left-4 z-10 bg-white text-black hover:bg-gray-100"
                >
                    Back to Search
                </Button>
                <EmbeddedMap pickup={pickup} dropoff={dropoff} />
            </div>
        );
    }

    return (
        <div className="relative h-[600px] w-full">
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent" />
            <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-full max-w-2xl p-8 bg-white/90 rounded-lg shadow-lg">
                    <h1 className="text-4xl font-bold text-center mb-8">Find Your Perfect Ride</h1>
                    <form onSubmit={handleSearch} className="space-y-4">
                        <div>
                            <Input
                                type="text"
                                placeholder="Enter pickup location"
                                value={pickup}
                                onChange={(e) => setPickup(e.target.value)}
                                className="w-full"
                            />
                        </div>
                        <div>
                            <Input
                                type="text"
                                placeholder="Enter dropoff location"
                                value={dropoff}
                                onChange={(e) => setDropoff(e.target.value)}
                                className="w-full"
                            />
                        </div>
                        <Button type="submit" className="w-full">
                            Search
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Hero;


