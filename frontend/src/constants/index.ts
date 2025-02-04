import { ILoginFormInput } from "@/interfaces";

export const LOGIN_FORM_INPUTS: ILoginFormInput[] = [
  {
    label: "البريد الإلكتروني",
    name: "email",
    type: "text",
  },
  {
    label: "كلمة المرور",
    name: "password",
    type: "password",
  },
];
