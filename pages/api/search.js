import { gql } from "@apollo/client";
import client from "client";

const handler = async (req, res) => {
  try {
    const filters = JSON.parse(req.body);
    console.log("🚀 ~ file: search.js:7 ~ handler ~ filters", filters);
    let ParkingFilter = ``;
    let petFilter = ``;
    let minFilter = ``;
    let maxFilter = ``;
    if (filters.hasParking) {
      ParkingFilter = `
      {
        key:"has_parking"
        compare:EQUAL_TO
        value:"1"
      },
      `;
    }
    if (filters.petFriendly) {
      petFilter = `
      {
        key:"pet_friendly"
        compare:EQUAL_TO
        value:"1"
      },
      `;
    }
    if (filters.minPrice) {
      minFilter = `
{
  key:"price"
  compare:GREATER_THAN_OR_EQUAL_TO
  value:"${filters.minPrice}"
  type:NUMERIC
},
`;
    }
    if (filters.maxPrice) {
      maxFilter = `
  {
    key:"price"
    compare:LESS_THAN_OR_EQUAL_TO
    value:"${filters.maxPrice}"
    type:NUMERIC
  },
  `;
    }
    const { data } = await client.query({
      query: gql`
        query AllPropertiesQuery {
          properties(where: { 
           offsetPagination: {offset: ${((filters.page || 1) - 1) * 3}, size: 3 
          }	
          metaQuery:{ 
          relation: AND
          metaArray: [
            ${petFilter}
            ${ParkingFilter}
            ${minFilter}
            ${maxFilter}
          ]
        }
        }) {
            pageInfo {
              offsetPagination {
                total
              }
            }
            nodes {
              databaseId
              title
              uri
              featuredImage {
                node {
                  uri
                  sourceUrl
                }
              }
              propertyFeatures {
                bathrooms
                bedrooms
                hasParking
                petFriendly
                price
              }
            }
          }
        }
      `,
    });
    console.log("SEARCH", data);
    return res.status(200).json({
      total: data.properties.pageInfo.offsetPagination.total,
      properties: data.properties.nodes,
    });
  } catch (error) {
    console.log(error);
  }
};
export default handler;
