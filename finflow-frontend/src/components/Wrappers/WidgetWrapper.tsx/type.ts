import { ROUTES } from "../../../common/routes";

export interface WidgetWrapperProps {
  children: React.ReactNode;
  title?: string;
  redirectURL?: typeof ROUTES[keyof typeof ROUTES]; // Allow only URLS defined
}
