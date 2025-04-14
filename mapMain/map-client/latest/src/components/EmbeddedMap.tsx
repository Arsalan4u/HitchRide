import React, { useEffect, useState } from 'react';

interface EmbeddedMapProps {
  pickup: string;
  dropoff: string;
}

const EmbeddedMap: React.FC<EmbeddedMapProps> = ({ pickup, dropoff }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // You might want to add error handling here
    setIsLoading(false);
  }, [pickup, dropoff]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <iframe
      src={`http://localhost:3001?pickup=${encodeURIComponent(pickup)}&dropoff=${encodeURIComponent(dropoff)}`}
      style={{
        width: '100%',
        height: '100%',
        border: 'none',
        borderRadius: '8px'
      }}
      title="Map View"
    />
  );
};

export default EmbeddedMap; 