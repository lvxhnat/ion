import * as React from "react";
import { apiKeyFields } from "./fields";
import { NavigatorWrapper } from "../../components/Navigator";
import KeyRequestField from "./KeyRequestField";

export default function KeyRequestForm() {
  return (
    <NavigatorWrapper>
      {Object.keys(apiKeyFields).map((categoryName: string) => {
        return (
          <KeyRequestField
            key={categoryName}
            fieldItems={apiKeyFields[categoryName as keyof typeof apiKeyFields]}
            fieldName={categoryName}
          />
        );
      })}
    </NavigatorWrapper>
  );
}
