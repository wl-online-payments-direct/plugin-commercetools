# Commercetools-Worldline Integration

- [Supported features](#supported-features)
- [Overview](#overview)
- [Merchant Center Custom App (mc)](#merchant-center-custom-app)
- [Extension Module (web)](#extension-module)
- [Cron Module (cron)](#cron-module)
- [Common Modules ](#common-modules)
- [Store front](#store-front)

## Supported features

The following features are supported by the Integration:

- Payment integration with Hosted Tokenization and Hosted Checkout.
- Saved Cards
- Custom Application through Merchant Center.
    - Payment configuration page
    - Orders list page
- Handle Webhooks
- Capture a Payment
- Refund a Payment
- Void a Payment
- Deployment with docker

## Overview

![Worldline Integration Overview](/docs/images/worldline.jpg "Worldline Integration")

## Overall Architecture

![Overall Architecture](/docs/extension//images/OverallArchitecture.jpg "Overall Architecture")

## Merchant Center Custom App

The mc module is Commercetool's Custom App present in [mc](/mc/) folder. It is a react application generated using the Commercetools framework and has to be hosted by the Merchant. Once The url of the Custom App is registered in the Merchant Center and Menu to access the page will show up in the left navigation.

![Worldline Merchant Center Custom App](/docs/images/MC-Custom-App.png "Worldline Custom App")

- Refer to [Integration Guide](/docs/mc/integrationguide.md) on how to integrate your shop with this module.
- Refer to [How to run](/docs/mc/howtorun.md) the Custom App module.

## Extension Module

This module contains the frontend integrations with Worldline is present in [web](/web/) folder. It provides APIs to interact with the Store front. It also has API to handle webhook calls from Worldline.

- Refer to [Integration Guide](/docs/extension/integrationguide.md) on how to integrate your shop with this module.
- Refer to [How to run](/docs/extension/howtorun.md) the Extension module.

## Cron Module

This module contains the scheduled operations with Worldline is present in [cron](/cron/) folder. This module provide background operations to handle Review payment app, automatic Capture operation based on App configuration.

- Refer to [Integration Guide](/docs/cron/integrationguide.md) on how to integrate your shop with this module.
- Refer to [How to run](/docs/cron/howtorun.md) the Extension module.

## Common Modules

Following modules are commonly used by both Extension (web) module and Cron module:
 - [app](/app/) - contains the application logic. Only web (extension) and cron modules has dependency of app module.
 - [util](/util/) - contains common utilities and is dependency in all other modules.
 - [ct](/ct/) - contains integration code with Commercetools and is dependency in only app module.
 - [db](/db/) - contains database access code and is dependency in only app module.
 - [psp](/psp/) - contains integration code with Worldline Payment Service Provider APIs and is dependency in only app module.

## Store front

Each merchant will have their own implementation of Storefront in their choice of technology. We have used the storefront framework provided by Commercetools, [Commercetools Frontend](https://docs.commercetools.com/frontend-getting-started) for the integration.

Commercetools Frontend is a front-end platform designed to work with the commercetools commerce platform. It provides a flexible and scalable framework for building modern, high-performance web and mobile storefronts.

Merchant has to develop their own frontend integration that interact with the Extension (web) module.

The code changes integrating Commercetools Frontend to Extension can be seen [here](/frontend/).