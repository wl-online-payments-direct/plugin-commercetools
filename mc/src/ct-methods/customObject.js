import { fetcher } from "../services/custom-api-request";
import { CTP_PROJECT_KEY } from "../../configuration";


export const createCustomObject = async (draft) => {
    try {
        const customObject = await fetcher(`/${CTP_PROJECT_KEY}/custom-objects`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(draft),
        });
        console.log('Custom object created:', customObject);
        return customObject;
    } catch (error) {
        console.error('Error creating custom object:', error.message);
    }
};

export const getCustomObject = async (container, key) => {
    try {
        const customObject = await fetcher(`/${CTP_PROJECT_KEY}/custom-objects/${container}/${key}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        console.log('Custom object :', customObject);
        return customObject;
    } catch (error) {
        console.error('Error custom object:', error.message);
    }
};