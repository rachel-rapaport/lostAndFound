import LossFormData from "./lossFormType";
export default interface PublicTransportationProps  {
    formData: LossFormData;
    setFormData: React.Dispatch<React.SetStateAction<LossFormData>>;
  };