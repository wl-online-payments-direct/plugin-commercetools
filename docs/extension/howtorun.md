# How to run Extension Module

Follow the steps:

- Create .env file from [/db/.env.sample](/db/.env.sample) inside the db folder.
  - Update the 'DATABASE_URL' in the .env file with Database connection string.

- Create .env file from [/web/.env.sample](/web/.env.sample) inside the web folder.
- Create an API client from your Commercetools project with the following scopes:
  - manage_orders
  - manage_payments
  - view_customers
  - manage_types

- Update the 'commercetools config' section in the .env file with API client information.
- Update APP_CORS_ALLOWED_HOSTS with your store front domain.
- Update 'logger' section in the .env file with suitable values.
- Update 'redis' section in the .env file with suitable values.
- Deploy your application using one of the following methods:
  - Build and Deploy the docker file in the module.
  - Copy the extension and common folder to a VM and build them by running `npm run build` command. Then start the server by running `npm start`
