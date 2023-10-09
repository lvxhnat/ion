import * as React from "react";
import {
  Button,
  Grid,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { apiKeyFields } from "./fields";
import { NavigatorWrapper } from "../../components/Navigator";
import { capitalise } from "../../common/helper/general";
import KeyRequestField from "./KeyRequestField";

export default function KeyRequestForm() {
  return (
    <NavigatorWrapper>
      {Object.keys(apiKeyFields).map((category) => {
        return <KeyRequestField />;
      })}
      <Button variant="contained">Done</Button>
    </NavigatorWrapper>
  );
}
