import { getCities } from '@/app/services/api/cityService';
import cityStore from '@/app/store/cityStore';
import City from '@/app/types/props/city';
import { SelectProps } from '@/app/types/selectProps';
import { useQuery } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import Select from 'react-select';

const CitySelect: React.FC<{ onSelect: (selectedCategoryId: string) => void; }> = ({ onSelect }) => {
  const [selectedValue, setSelectedValue] = useState("");
  const citiesFromStore = cityStore((state) => state.cities);
  const setCities = cityStore((state) => state.setCities);

  const { data: cities, isLoading, error } = useQuery({
    queryKey: ["cities"],
    queryFn: getCities,
    enabled: citiesFromStore === null,
  });

  useEffect(() => {
    if (cities && citiesFromStore === null) {
      setCities(cities);
    }
  }, [cities, citiesFromStore, setCities]);

  if (isLoading) return <div>Loading...</div>;
  if (error instanceof Error) return <div>Error: {error.message}</div>;
  if ((citiesFromStore ?? cities)?.length === 0)
    return <div>No cities available</div>;

  const handleChange = (selectedOption: SelectProps) => {
    const selectedCity = selectedOption?.value;
    setSelectedValue(selectedCity);
    onSelect(selectedCity);
  };

  const displayCities = citiesFromStore ?? cities;

  // המרת הערים לפורמט המתאים עבור react-select
  const cityOptions = displayCities.map((city: City) => ({
    value: city.name,
    label: city.name,
  }));

  return (
    <div>
      <Select
        options={cityOptions}
        value={cityOptions.find((city: City) => city.name === selectedValue)}
        onChange={handleChange}
        placeholder="Search for a city..."
        className="react-select-container"
        classNamePrefix="react-select"
      />
    </div>
  );
};

export default CitySelect;
