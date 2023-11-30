import Spacings from '@commercetools-uikit/spacings';
import Link from '@commercetools-uikit/link';
import { PageContentWide } from '@commercetools-frontend/application-components';
import SelectInput from '@commercetools-uikit/select-input';
import Label from '@commercetools-uikit/label';
import React, { useState } from 'react';
import TextInput from '@commercetools-uikit/text-input';
import PrimaryButton from '@commercetools-uikit/primary-button';
import './my-account.css';

const MyAccount = (props) => {
    const [selectedOption, setSelectedOption] = useState('test');
    const handleChange = (event) => {
        const selectedValue = event.target.value;
        setSelectedOption(selectedValue);
        // Additional logic or actions based on the selected value can be added here
    };
    return (
        <PageContentWide columns="1/1">
            <div id='left-div'>
                <h1>Welcome!</h1>
                <h3>Experience a seamless and efficient checkout process in just a matter of minutes.</h3>
            </div>
            <div id='right-div'>
                <div>
                    <Link isExternal={true} to={'https://signup.direct.preprod.worldline-solutions.com/'}>
                        Sign Up
                    </Link>
                    <Link isExternal={true} to={'https://docs.direct.worldline-solutions.com/en/about/contact/index'}>
                        Contact Us
                    </Link>
                </div>
                <h1>Connect to Worldline</h1>
                <div>
                    <Label isRequiredIndicatorVisible={true} isBold={true}>
                        Checkout types
                    </Label>
                    <SelectInput
                        name="form-field-name"
                        value={selectedOption}
                        onChange={handleChange}
                        options={[
                            { value: 'test', label: 'Test Mode' },
                            { value: 'live', label: 'Live Mode' },
                        ]}
                    />

                    <Label isRequiredIndicatorVisible={true} isBold={true}>
                        Test PSPID
                    </Label>
                    <TextInput value="TryzensIndiaPvtLtd" onChange={(event) => alert(event.target.value)} />
                    <Label isRequiredIndicatorVisible={true} isBold={true}>
                        Test API Key
                    </Label>
                    <TextInput value="0E916***************" onChange={(event) => alert(event.target.value)} />
                    <Label isRequiredIndicatorVisible={true} isBold={true}>
                        Test API Secret
                    </Label>
                    <TextInput value="CAB82***************" onChange={(event) => alert(event.target.value)} />
                    <Label isRequiredIndicatorVisible={true} isBold={true}>
                        Test Webhook Key
                    </Label>
                    <TextInput value="73474***************" onChange={(event) => alert(event.target.value)} />
                    <Label isRequiredIndicatorVisible={true} isBold={true}>
                        Test Webhook Secret
                    </Label>
                    <TextInput value="7816A***************" onChange={(event) => alert(event.target.value)} />
                    <Label isRequiredIndicatorVisible={true} isBold={true}>
                        Webhook URL
                    </Label>
                    <TextInput value="https://worldline.247commerce.co.uk/webhookPaymentCreate" />
                    <p>To avoid copy/paste issues, use the `copy` icon to copy the URL</p>
                    <Label isRequiredIndicatorVisible={true} isBold={true}>
                        Redirection Payment Page URL - Test
                    </Label>
                    <TextInput value="https://payment.preprod.direct.worldline-solutions.com" />
                    <PrimaryButton
                        label="Save/Update"
                        onClick={() => alert('Button clicked')}
                        isDisabled={false}
                    />
                </div>
            </div>
        </PageContentWide>
    );
};
MyAccount.displayName = 'MyAccount';

export default MyAccount;
