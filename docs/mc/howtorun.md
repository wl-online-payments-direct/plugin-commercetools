# How to run Custom Merchant App module

Follow these steps to run the Custom Merchant Center App:

- Register a Custom Application in Merchant Center. More details on the same could be found at [https://docs.commercetools.com/merchant-center/managing-custom-applications](https://docs.commercetools.com/merchant-center/managing-custom-applications)
  - You can give an 'Application name' and 'Application description' of your choice.
  - The 'Application URL' should point to the merchant center app server where you will be deploying the docker image [Dockerfile.mc](/Dockerfile.mc).
  - The 'Application entry point URI path' is a subpath of the application that you can provide and need to be updated in the [.env](/mc/.env) file of the application as mentioned below. e.g. 'wordline'
  - The OAuth scopes that need to be selected are: 'view_key_value_documents', 'view_orders', 'view_customers', 'view_stores', 'view_project_settings', 'manage_key_value_documents', 'manage_customers', 'manage_orders'.
  - For the Main Menu, provide a 'Default link label'. e.g. 'Worldline'.
  - Add these sub-menu by clicking 'Add sub-menu link':
    - Link to: 'myaccount', Default link label: 'My Account'
    - Link to: '/', Default link label: 'Payment Methods'
    - Link to: 'orders', Default link label: 'Orders'
- Update the following environment variables in [.env](/mc/.env). 
    - CTP_MC_APPLICATION_ID : The applicationId (This is generated when you register custom App) 
    - CTP_MC_APPLICATION_URL: url should point to your merchant center app server.
    - CTP_MC_APPLICATION_ENTRY_POINT: 'Application entry point URI path' same as configured above.
    - CTP_MC_APPLICATION_API_HOST: URL of the Web/Extension Application deployed using [Dockerfile.web](/Dockerfile.web)
- Deploy the merchant center custom app, using the Docker file [Dockerfile.mc](/Dockerfile.mc)
