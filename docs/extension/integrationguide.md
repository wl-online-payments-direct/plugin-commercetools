# Extension Module Integration Guide

The Extension module interacts with the Store front and Worldline for integration. The flows with API endpoints are depicted in below diagrams.

## Overall Architecture

![Overall Architecture](/docs/extension//images/OverallArchitecture.jpg "Overall Architecture")

## Configuration

![Configuration](/docs/extension//images/Configuration.jpg "Configuration")

## Hosted Checkout Flow
![Hosted Checkout](/docs/extension//images/HostedCheckout.jpg "Hosted Checkout")

## Hosted Tokenization Flow

![Hosted Tokenization](/docs/extension//images/HostedTokenization.jpg "Hosted Tokenization")

## Backoffice Flow

![Backoffice](/docs/extension//images/BackOffice.jpg "Backoffice")

## Me endpoints

The integrations depicted here are using endpoints that need a CT admin token. For each of these API endpoints, there is equivalent 'me' endpoints which starts with '/me/...'. These endpoints can be used if the Headless storefront uses customer token is used.