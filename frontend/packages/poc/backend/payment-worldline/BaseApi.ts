import { Context } from '@frontastic/extension-types';
import { BaseApi } from '../commerce-commercetools/apis/BaseApi';

class WorldLineApi extends BaseApi {
    apiHostname: string;
    storeId: string;
    constructor(frontasticContext: Context, locale: string | null, currency: string | null) {
        super(frontasticContext, locale, currency);
        this.apiHostname = frontasticContext.projectConfiguration?.['EXTENSION_API_HOSTNAME']
        this.storeId = frontasticContext.projectConfiguration?.['EXTENSION_STORE_ID']
    }
}

export default WorldLineApi;
