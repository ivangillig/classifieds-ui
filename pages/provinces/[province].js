import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { fetchListingsByProvinceRequest } from "../../actions/listingActions";
import LoadingOverlay from "../../components/common/LoadingOverlay";
import ListingCard from "../../components/ListingCard";

const ProvincePage = () => {

  const dispatch = useDispatch();
  const router = useRouter();
  const { province } = router.query; // Get province name from url

  const { listings, isLoading } = useSelector((state) => ({
    listings: state.listing?.listings || [],
    isLoading: state.listing?.isLoading,
  }));

  useEffect(() => {
    if (province) {
      dispatch(fetchListingsByProvinceRequest(province));
    }
  }, [dispatch, province]);

  if (isLoading) {
    return <LoadingOverlay />;
  }

  return (
    <div className="grid">
      {listings.map((listing) => (
        <div key={listing.id} className="col-12 md:col-4">
          <ListingCard listing={listing} />
        </div>
      ))}
    </div>
  );
};

export default ProvincePage;
