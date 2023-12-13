const query = `
query ($orderId: String!) {
  order(id: $orderId) {
    id
    version
    orderNumber
    orderState
    paymentState
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
      discountedPricePerQuantity{
        quantity
        discountedPrice{
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
    returnInfo{ 
      items{ 
        ... on LineItemReturnItem {
          type
          lineItemId
          id
          quantity
          comment
          shipmentState
          paymentState
        }
      } 
    } 
    totalPrice{
      type
      centAmount
      fractionDigits
      currencyCode
    }
    shippingInfo{
      taxRate{
        amount
        includedInPrice
      }
    }
    taxedShippingPrice{
      totalTax{
        centAmount
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
