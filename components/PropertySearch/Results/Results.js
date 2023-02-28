import { PropertyCard } from "./PropertyCard";

export const Results = ({ properties }) => {
  return (
    <div className="max-w-5xl mx-auto grid grid-cols-3 gap-5 mb-10">
      {properties.map((property) => (
        <PropertyCard
          key={property.databaseId}
          bedrooms={property.propertyFeatures.bedrooms}
          bathrooms={property.propertyFeatures.bathrooms}
          destination={property.uri}
          title={property.title}
          price={property.propertyFeatures.price}
          petFriendly={property.propertyFeatures.petFriendly}
          hasParking={property.propertyFeatures.hasParking}
          image={property.featuredImage?.node?.sourceUrl}
        />
      ))}
    </div>
  );
};
