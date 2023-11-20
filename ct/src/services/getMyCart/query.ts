const query = `
query {
  me {
    customer {
      id
      version
      firstName
      middleName
      lastName
      email
    }
    activeCart {
      id
      version
      customerId
      anonymousId
      taxCalculationMode
      billingAddress {
        ...addressFields
      }
      totalPrice {
        currencyCode
        centAmount
      }
      taxedPrice{
        totalTax {
          currencyCode
          centAmount
        }
        totalGross{
          currencyCode
          centAmount
        }
      }
      country
      locale
    }
  }

  fragment addressFields on Address {
    id
    firstName
    lastName
    email
    phone
    city
    country
    streetName
    streetNumber
    additionalStreetInfo
    postalCode
    state
    building
    apartment
    region
  }
}
`;
export default query;
