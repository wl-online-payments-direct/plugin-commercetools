# How to run Cron Module

Follow the steps:

- Create an API client from your Commercetools project with scope:
  - manage_orders
  - manage_payments
  - view_customers
  - manage_types
- Configure the environment variables in the server where you will be deploying the application. Use [/cron/.env-sample](/cron/.env-sample) for reference.
- Deploy the Cron applicatin, using the Docker file [Dockerfile.cron](/Dockerfile.cron)
