import data from "../../data/patients";
import { NonSensitivePatientEntry } from "../types";

const getNonSensitivePatients = (): NonSensitivePatientEntry[] => {
  return data.map(({ id, name, dateOfBirth, gender, occupation }) => {
    return { id, name, dateOfBirth, gender, occupation };
  });
};

export default { getNonSensitivePatients };
