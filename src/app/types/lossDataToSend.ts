import LossFormData from "./lossFormType";
export default interface LossDataToSend  {
    formData: LossFormData;
    setFormData: React.Dispatch<React.SetStateAction<LossFormData>>;
  };