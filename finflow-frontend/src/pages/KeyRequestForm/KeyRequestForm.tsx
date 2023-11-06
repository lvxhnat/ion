import * as React from 'react';
import { apiKeyFields } from './fields';
import KeyRequestField from './KeyRequestField';
import { ContainerWrapper } from '../../components/Wrappers/ContainerWrapper';

export default function KeyRequestForm() {
    return (
        <ContainerWrapper>
            {Object.keys(apiKeyFields).map((categoryName: string) => {
                return (
                    <KeyRequestField
                        key={categoryName}
                        fieldItems={apiKeyFields[categoryName as keyof typeof apiKeyFields]}
                        fieldName={categoryName}
                    />
                );
            })}
        </ContainerWrapper>
    );
}
