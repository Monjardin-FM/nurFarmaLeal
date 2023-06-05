import { useAsyncFn } from "react-use";
import { postValidateNUR } from "../services/postValidateNUR";

export const usePostVaidateNUR = () => {
  const [{ error, loading }, validateNUR] = useAsyncFn(postValidateNUR, [
    postValidateNUR,
  ]);
  return {
    error,
    loading,
    validateNUR,
  };
};
