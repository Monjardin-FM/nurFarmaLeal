type verifyResponseProps = {
  response: any;
};

export const verifyResponse = async ({ response }: verifyResponseProps) => {
  if (!response || response.ok)
    throw new Error("An error occured during the call to the web service");
  const body = await response.json();
  const SUCCESS_CODE = 200;
  const isSuccess = body.statusCode === SUCCESS_CODE && body.isSuccess;
  return {
    body,
  };
};
