# How to run Cron Module

Follow the steps:

- Configure the environment variables with either one of the following methods:
  - Create .env file from [/cron/.env.sample](/cron/.env.sample)
  - Create environment variables in the serverless function of your cloud provider.
- Create an API client from your Commercetools project with scope:
  - manage_orders
  - manage_payments
  - view_customers
  - manage_types
- Update the 'commercetools config' variables with API client information.
- Update 'logger' section in the .env file with suitable values.
