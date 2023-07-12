import { SweetAlertIcon } from "sweetalert2";

export interface ConfirmProps {
  title?: string;
  text?: string;
  icon?: SweetAlertIcon;
}

export enum IIcon {
  error,
  warning,
  question,
  success,
  info,
}
