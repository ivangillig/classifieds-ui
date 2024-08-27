import React from 'react';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';

const ListingCard = ({ listing }) => {
  return (
    <div className="p-2 md:w-1/3">
      <Card
        title={listing.title}
        subTitle={listing.location?.name}
        className="shadow-lg border border-gray-200 rounded-lg overflow-hidden"
      >
        {listing.photos && listing.photos.length > 0 ? (
          <img
            src={listing.photos[0]}
            alt={listing.title}
            className="w-full h-48 object-cover"
          />
        ) : (
          <div className="w-full h-48 bg-gray-200" />
        )}
        <p className="text-lg font-semibold mt-2">Price: {listing.price}</p>
        <p className="text-sm text-gray-600">Contact: {listing.phone}</p>
        <Button
          label="View Details"
          icon="pi pi-info-circle"
          className="p-button-outlined mt-2"
          onClick={() => console.log("View Details clicked")}
        />
      </Card>
    </div>
  );
};

export default ListingCard;
