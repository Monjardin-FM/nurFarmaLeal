import { api } from "../utils/api";
import { verifyResponse } from "../utils/verifyResponse";

export const postValidateNUR = async (params: any) => {
  const response = await api().post(`Daport/ValidaNur/${params}`);
  const { body } = await verifyResponse({ response });
  return body;
};
