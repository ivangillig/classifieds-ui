import React from 'react';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';

const ListingList = ({ listing }) => {
  return (
    <div className="w-full p-4">
      <Card
        title={listing.title}
        subTitle={listing.location?.name}
        className="shadow-lg border border-gray-200 rounded-lg overflow-hidden"
      >
        <div className="flex flex-col md:flex-row">
          <div className="w-full md:w-1/3">
            {listing.photos && listing.photos.length > 0 ? (
              <img
                src={listing.photos[0]}
                alt={listing.title}
                className="w-full h-48 md:h-full object-cover"
              />
            ) : (
              <div className="w-full h-48 md:h-full bg-gray-200" />
            )}
          </div>
          <div className="w-full md:w-2/3 p-4">
            <p className="text-lg font-semibold mb-2">Price: {listing.price}</p>
            <p className="text-sm text-gray-600 mb-4">Contact: {listing.phone}</p>
            <Button
              label="View Details"
              icon="pi pi-info-circle"
              className="p-button-outlined"
              onClick={() => console.log("View Details clicked")}
            />
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ListingList;
