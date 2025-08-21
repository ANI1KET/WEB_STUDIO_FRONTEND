type CityLocations = {
  city: string;
  locations: string[];
};

export interface ServiceData {
  virtualPrice: number;
  physicalPrice: number;
  supportedLanguages: string[];
  supportedCities: CityLocations[];
}
