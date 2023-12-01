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
      country
      locale
    }
  }

}
`;
export default query;
