# How to run Extension Module

Follow the steps:

- Create an API client from your Commercetools project with the following scopes:
  - manage_orders
  - manage_payments
  - view_customers
  - manage_types

- Configure environment variables in the cloud environment where you are deploying the docker. Use [.env-sample](/web/.env-sample) as reference.
- Deploy your application by using the docker file [Dockerfile.web](Dockerfile.web)
