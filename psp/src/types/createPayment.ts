export interface CreatePaymentRequest {
  order: {
    customer: {
      merchantCustomerId: string;
    };
    amountOfMoney: {
      amount: number;
      currencyCode: string;
    };
  };
}

export interface Error {
  errorCode: number;
  category: string;
  code: number;
  httpStatusCode: number;
  id: string;
  message: string;
  propertyName: string;
  retriable: true;
}

export interface CreatePaymentResponse {
  id: string;
  actionType: string;
  redirectURL: string;
}

export interface CreatedPaymentServiceResponse {
  body: {
    errorId: string;
    errors: Error[];
    creationOutput: {
      externalReference: string;
      isNewToken: boolean;
      token: string;
      tokenizationSucceeded: boolean;
    };
    merchantAction: {
      actionType: string;
      redirectData: {
        RETURNMAC: string;
        redirectURL: string;
      };
      showFormData: {
        paymentProduct5407: {
          pairingToken: string;
          qrCode: string;
        };
        paymentProduct5404: {
          qrCodeUrl: string;
          appSwitchLink: string;
        };
      };
    };
    payment: {
      hostedCheckoutSpecificOutput: {
        hostedCheckoutId: number;
        variant: string;
      };
      paymentOutput: {
        amountOfMoney: {
          amount: number;
          currencyCode: string;
        };
        merchantParameters: string;
        references: {
          merchantReference: string;
          merchantParameters: string;
        };
        amountPaid: number;
        acquiredAmount: {
          amount: number;
          currencyCode: string;
        };
        customer: {
          device: {
            ipAddressCountryCode: string;
          };
        };
        cardPaymentMethodSpecificOutput: {
          paymentProductId: number;
          authorisationCode: string;
          card: {
            cardNumber: string;
            expiryDate: number;
            bin: string;
            countryCode: string;
          };
          fraudResults: {
            fraudServiceResult: string;
            avsResult: string;
            cvvResult: string;
          };
          initialSchemeTransactionId: string;
          schemeReferenceData: string;
          paymentAccountReference: string;
          threeDSecureResults: {
            version: string;
            flow: string;
            cavv: string;
            eci: string;
            schemeEci: number;
            authenticationStatus: string;
            acsTransactionId: string;
            dsTransactionId: string;
            xid: string;
            challengeIndicator: string;
            liability: string;
            appliedExemption: string;
            exemptionEngineFlow: string;
          };
          token: string;
          paymentOption: string;
          externalTokenLinked: {
            GTSComputedToken: string;
            ComputedToken: string;
            GeneratedToken: string;
          };
          authenticatedAmount: number;
          currencyConversion: {
            acceptedByUser: boolean;
            proposal: {
              baseAmount: {
                amount: number;
                currencyCode: string;
              };
              targetAmount: {
                amount: number;
                currencyCode: string;
              };
              rate: {
                exchangeRate: number;
                invertedExchangeRate: number;
                markUpRate: number;
                quotationDateTime: string;
                source: string;
              };
              disclaimerReceipt: string;
              disclaimerDisplay: string;
            };
          };
          paymentProduct3208SpecificOutput: {
            buyerCompliantBankMessage: string;
          };
          paymentProduct3209SpecificOutput: {
            buyerCompliantBankMessage: string;
          };
          acquirerInformation: {
            name: string;
          };
        };
        paymentMethod: string;
      };
      status: string;
      statusOutput: {
        errors: Error[];
        isCancellable: boolean;
        statusCategory: string;
        statusCode: number;
        statusCodeChangeDateTime: string;
        isAuthorized: boolean;
        isRefundable: boolean;
      };
      id: number;
    };
  };
}
