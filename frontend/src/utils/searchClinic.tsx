import { IClinic } from "@/interfaces";

const searchClinic = (clinics: IClinic[], name: string) => {
  return clinics.filter((clinic) => clinic.name.includes(name.trim()));
};

export default searchClinic;
