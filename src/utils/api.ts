import ky from "ky";

export const api = () => {
  const API_PATH = "https://miaapi-dev.farmaleal.com.mx/api";
  if (!API_PATH) throw new Error("API Credentials could not be found");

  return ky.create({
    prefixUrl: API_PATH,
    hooks: {
      afterResponse: [
        (_request, _options, response) => {
          if (response.status === 401) {
            window.location.reload();
          }
          return response;
        },
      ],
    },
  });
};
