# Commercetools-Worldline Integration

- [Supported features](#supported-features)
- [Overview](#overview)
- [Merchant Center Custom App](#merchant-center-custom-app)
- [Extension Module](#extension-module)
- [Cron Module](#cron-module)
- [Store front](#store-front)

## Supported features

The following features are supported by the Integration:

- Added as a Custom Application through Merchant Center.
- Custom orders list
- App configuration
- Handle Webhooks
- Capture a Payment
- Refund a Payment
- Void a Payment

## Overview

![Worldline Integration Overview](/docs/images/worldline.jpg "Worldline Integration")

## Merchant Center Custom App

The mc-custom-app module is Commercetool's Custom App. It is a react application generated using the Commercetools framework Frontastic and has to be hosted in Commercetools server. Once The url of the Custom App is registered in the Merchant Center and Menu to access the page will show up in the left navigation.

![Worldline Merchant Center Custom App](/docs/images/MC-Custom-App.png "Worldline Custom App")

- Refer to [Integration Guide](/docs/mc/integrationguide.md) on how to integrate your shop with this module.
- Refer to [How to run](/docs/mc/howtorun.md) the Custom App module.

## Extension Module

This module contains the frontend integrations with Worldline. It provides APIs to interact with the Store front. It also has API to handle webhook calls from Worldline.

- Refer to [Integration Guide](/docs/extension/integrationguide.md) on how to integrate your shop with this module.
- Refer to [How to run](/docs/extension/howtorun.md) the Extension module.

## Cron Module

This module contains the back office operations with Worldline. This module provide background operations to handle Review payment app, Capture operation based on App configuration.

- Refer to [Integration Guide](/docs/cron/integrationguide.md) on how to integrate your shop with this module.
- Refer to [How to run](/docs/cron/howtorun.md) the Extension module.

## Store front

Each merchant will have their own implementation of Storefront in their choice of technology. We have used the storefront framework provided by Commercetools, the [Frontastic](https://github.com/FrontasticGmbH) for the integration. 

Commercetools Frontastic is a front-end platform designed to work with the commercetools commerce platform. It provides a flexible and scalable framework for building modern, high-performance web and mobile storefronts