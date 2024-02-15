const query = `
  query($cartId: String!) {
      cart(id: $cartId) {
        id
        version
        customerId
        customerEmail
        customer {
          id
          version
          salutation
          firstName
          middleName
          lastName
          dateOfBirth
          email
        }
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
        shippingAddress{
          title
          firstName
          lastName
          apartment
          building
          streetName
          streetNumber
          additionalStreetInfo
          country
          city
          state
          postalCode
        }
        lineItems {
          id
          productId
          totalPrice {
            currencyCode
            centAmount
          }
          taxedPrice {
            totalTax {
              currencyCode
              centAmount
            }
            totalGross{
              currencyCode
              centAmount
            }
          }
          taxRate {
            amount
            includedInPrice
          }
          supplyChannel {
            id
          }
          inventoryMode
          quantity
          discountedPricePerQuantity {
            quantity
            discountedPrice {
              value {
                currencyCode
                centAmount
              }
            }
          }
          price {
            value {
              currencyCode
              centAmount
            }
            discounted {
              value {
                centAmount
              }
            }
          }
          productType {
            name
            description
          }
          variant {
            id
            sku
            images {
              url
            }
          }
        }
        country
        locale
        inventoryMode
        cartState
      }
  }
`;
export default query;
