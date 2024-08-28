import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { fetchProvincesRequest } from "../actions/locationsActions";
import LoadingOverlay from "../components/common/LoadingOverlay";
import ProvinceCard from "../components/ProvinceCard";

const HomePage = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const { provinces, isLoading } = useSelector((state) => ({
    provinces: state.location?.provinces,
    isLoading: state.location?.isLoading,
  }));

  useEffect(() => {
    dispatch(fetchProvincesRequest());
  }, [dispatch]);

  const handleProvinceClick = (province) => {
    router.push(`/listings?province=${province}`);
  };

  if (isLoading) {
    return <LoadingOverlay />;
  }

  return (
    <div className="grid">
      {provinces.map((province, index) => (
        <div key={province.name || Math.random()} className="col-12 md:col-4">
          <ProvinceCard
            province={province}
            index={index} // Pasamos el índice aquí
            isLoading={isLoading}
            onClick={() => handleProvinceClick(province.name)}
          />
        </div>
      ))}
    </div>
  );
};

export default HomePage;
