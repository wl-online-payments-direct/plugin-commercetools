// @ts-ignore
import fetch from 'node-fetch';
import { Context } from '@frontastic/extension-types';
import WorldLineApi from '../BaseApi';

class PaymentApi extends WorldLineApi {
  constructor(frontasticContext: Context, locale: string | null, currency: string | null) {
    super(frontasticContext, locale, currency);
  }
  async paymentMethods(cartId: string) {
    const { token } = this.token;
    try {
      const paymentMethodsResponse = await fetch(
        `${this.apiHostname}/payment/methods?storeId=${this.storeId}&cartId=${cartId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      const response = await paymentMethodsResponse.json();
      return response;
    } catch (error) {
      console.log(error);
    }
  }
  async hostedCheckout(cartId: string, payload: object) {
    const { token } = this.token;
    const hostedCheckoutResponse = await fetch(`${this.apiHostname}/initiate/hostedcheckout`, {
      method: 'post',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ ...payload, cartId: cartId, storeId: this.storeId }),
    });
    const response = await hostedCheckoutResponse.json();
    return response;
  }
  async webhookStatus(cartId: string, paymentId: string) {
    const { token } = this.token;
    const webhookStatusResponse = await fetch(
      `${this.apiHostname}/webhook/status?paymentId=${paymentId}&cartId=${cartId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    const response = await webhookStatusResponse.json();
    return response;
  }
  async paymentStatus(cartId: string, paymentId: string) {
    const { token } = this.token;
    const paymentStatusResponse = await fetch(
      `${this.apiHostname}/payment/status?id=${paymentId}&storeId=${this.storeId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    const response = await paymentStatusResponse.json();
    return response;
  }
  async hostedTokenization(cartId: string, cardToken: string, device: object) {
    const { token } = this.token;
    const hostedTokenizationResponse = await fetch(`${this.apiHostname}/initiate/hostedtokenization`, {
      method: 'post',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        storeId: this.storeId,
        askConsumerConsent: true,
        cartId: cartId,
        device: device,
        ...(cardToken && cardToken.length > 0 && { tokens: cardToken }),
      }),
    });
    const response = await hostedTokenizationResponse.json();
    return response;
  }
  async validateCart(cartId: string) {
    const { token } = this.token;
    const validateCartResponse = await fetch(`${this.apiHostname}/cart/validate`, {
      method: 'post',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        cartId: cartId,
      }),
    });
    const response = await validateCartResponse.json();
    return response;
  }
  async createPayment(cartId: string, bodyData: object, device: object) {
    const { token } = this.token;
    const createPaymentResponse = await fetch(`${this.apiHostname}/payment`, {
      method: 'post',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ ...bodyData, device: device, cartId: cartId, storeId: this.storeId }),
    });
    const response = await createPaymentResponse.json();
    return response;
  }

  async deleteSavedCard(bodyData: object) {
    const { token } = this.token;
    const deleteSavedCardResponse = await fetch(`${this.apiHostname}/token/remove`, {
      method: 'post',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ ...bodyData, storeId: this.storeId }),
    });
    const response = await deleteSavedCardResponse.json();
    return response;
  }

  async savedCards(customerEmail: string) {
    const { token } = this.token;
    const savedCardsResponse = await fetch(
      `${this.apiHostname}/cards?storeId=${this.storeId}&customerEmail=${customerEmail}`,
      {
        method: 'get',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    const response = await savedCardsResponse.json();
    return response;
  }
}

export default PaymentApi;
