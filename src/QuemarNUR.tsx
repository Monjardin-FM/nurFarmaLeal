import React, { ChangeEvent } from "react";
import { QuemarNURValues } from "./App";

type QuemarNURProps = {
  formValues: QuemarNURValues;
  onChangeValues: React.Dispatch<React.SetStateAction<QuemarNURValues>>;
  quemarNUR: () => void;
};

export const QuemarNUR = ({
  formValues,
  onChangeValues,
  quemarNUR,
}: QuemarNURProps) => {
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    onChangeValues((prevFormValues) => ({
      ...prevFormValues,
      [name]: value,
    }));
  };
  return (
    <div className="w-1/2 border border-white border-opacity-20 rounded-lg flex flex-col items-center justify-center gap-5 p-4">
      <span className="text-white font-semibold text-xl">Quemar NUR</span>
      <div className="w-full flex flex-row items-center justify-start">
        <span className="w-1/4  text-white">Folio</span>
        <input
          type="text"
          className="w-full h-10 rounded-lg text-center text-lg font-semibold"
          value={formValues.Folio}
          name="Folio"
          onChange={handleChange}
        />
      </div>
      <div className="w-full flex flex-row items-center justify-start">
        <span className="w-1/4  text-white">EAN</span>
        <input
          type="text"
          className="w-full h-10 rounded-lg text-center text-lg font-semibold"
          value={formValues.CodeEAN}
          name="CodeEAN"
          onChange={handleChange}
        />
      </div>
      <div className="w-full flex flex-row items-center justify-start">
        <span className="w-1/4  text-white">Cantidad</span>
        <input
          type="text"
          className="w-full h-10 rounded-lg text-center text-lg font-semibold"
          value={formValues.Units}
          name="Units"
          onChange={handleChange}
        />
      </div>
      <div className="w-full flex flex-row items-center justify-start">
        <span className="w-1/4  text-white">Precio</span>
        <input
          type="text"
          className="w-full h-10 rounded-lg text-center text-lg font-semibold"
          value={formValues.Precio}
          name="Precio"
          onChange={handleChange}
        />
      </div>
      <div className="self-end">
        <button
          onClick={quemarNUR}
          className="bg-teal-800 py-4 px-7 text-white rounded-lg text-sm hover:bg-teal-600 transition duration-300"
        >
          Quemar NUR
        </button>
      </div>
    </div>
  );
};
