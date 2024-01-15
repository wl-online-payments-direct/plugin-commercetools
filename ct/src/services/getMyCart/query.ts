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
      billingAddress {
        apartment
        building
        streetName
        streetNumber
        postalCode
        city
        state
        country
        additionalAddressInfo
      }
      country
      locale
    }
  }

}
`;
export default query;
