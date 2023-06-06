import React from "react";

export type SearchBarProps = {
  setNur: (nur: string) => void;
  onValidate: () => void;
  nur: string;
};

export const SearchBar = ({ nur, onValidate, setNur }: SearchBarProps) => {
  return (
    <>
      <div className="w-1/2 border border-white border-opacity-10 flex flex-col items-center gap-5 justify-center h-32 rounded-lg p-5">
        <span className="text-white font-semibold text-xl">Validar NUR</span>
        <div className="flex flex-row items-center justify-center w-full">
          <div className="w-1/4 text-white font-semibold text-xl">
            <span>NUR: </span>
          </div>
          <div className="w-3/4 flex flex-row gap-3 items-center justify-center">
            <input
              className="w-full h-10 rounded-lg text-center text-lg font-semibold"
              value={nur}
              onChange={(e) => setNur(e.target.value)}
            />
            <button
              className="bg-teal-800 py-4 px-7 text-white rounded-lg text-sm hover:bg-teal-600 transition duration-300"
              onClick={onValidate}
            >
              Validar
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
