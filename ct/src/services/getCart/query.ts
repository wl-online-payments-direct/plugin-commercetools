const query = `
  query($cartId: String!) {
      cart(id: $cartId) {
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
        lineItems {
          id
          productId
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
      }
  }
`;
export default query;
