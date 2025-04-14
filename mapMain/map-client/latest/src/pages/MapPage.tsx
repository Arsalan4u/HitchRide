import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import { ArrowLeft } from "lucide-react";

const MapPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const searchParams = new URLSearchParams(location.search);
    const pickup = searchParams.get("pickup");
    const dropoff = searchParams.get("dropoff");
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!pickup || !dropoff) {
            navigate("/");
            return;
        }
    }, [pickup, dropoff, navigate]);

    const handleBack = () => {
        navigate(-1);
    };

    if (!pickup || !dropoff) {
        return null;
    }

    return (
        <div className="min-h-screen bg-white">
            <div className="relative w-full h-[calc(100vh-64px)] mt-16">
                <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-4 left-4 z-10 bg-white shadow-md"
                    onClick={handleBack}
                    aria-label="Go back"
                >
                    <ArrowLeft className="h-4 w-4" />
                </Button>

                {isLoading && (
                    <div className="absolute inset-0 flex items-center justify-center bg-white">
                        <div className="text-center">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
                            <p className="mt-2 text-sm text-gray-600">Loading map...</p>
                        </div>
                    </div>
                )}

                {error && (
                    <div className="absolute inset-0 flex items-center justify-center bg-white">
                        <div className="text-center">
                            <p className="text-red-600">{error}</p>
                            <p className="text-sm text-gray-600 mt-2">
                                Please ensure the map server is running on port 3000
                            </p>
                        </div>
                    </div>
                )}

                <iframe
                    src={`http://localhost:3000?pickup=${encodeURIComponent(pickup)}&dropoff=${encodeURIComponent(dropoff)}`}
                    className="w-full h-full border-0"
                    title="Map View"
                    allowFullScreen
                    loading="eager"
                    onLoad={() => setIsLoading(false)}
                    onError={() => setError("Failed to load map")}
                />
            </div>
        </div>
    );
};

export default MapPage;
