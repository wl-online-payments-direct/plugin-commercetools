const query = `
query ($orderId: String!) {
  order(id: $orderId) {
    id
    version
    createdAt
    orderNumber
    orderState
    paymentState
    customerEmail
    taxedPrice {
      totalGross {
        centAmount
      }
    }
    lineItems{
      id
      productId
      quantity
      totalPrice{
        centAmount
      }
      price{
        value{
          centAmount
        }
        discounted{
          value{
            centAmount
          }
        }
      }
      taxRate {
         includedInPrice
      }
      taxedPrice{
        totalNet{
          centAmount
        }
        totalGross{
          centAmount
        }
      }
    }
    paymentInfo{
      payments {
        id
        version
        lastModifiedAt
        interfaceId
        paymentMethodInfo {
          paymentInterface
        }
        custom {
          customFieldsRaw {
            name
            value
          }
        }
        transactions {
          id
          type
          state
          amount {
            currencyCode
            centAmount
          }
          custom {
            customFieldsRaw {
              name
              value
            }
          }
        }
      }
    }
    taxedPrice{
      taxPortions{
        rate
        amount{
          centAmount
        }
      }
      totalNet{
        currencyCode
        centAmount
      }
      totalGross {
        currencyCode
        centAmount
      }
    }
  }
}
`;
export default query;
