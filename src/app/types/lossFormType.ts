import Color from "./color";

export default interface LossFormData {
  category: string;
  subCategory: string;
  color: Color | null;
  city: string,
  line:string,
}
