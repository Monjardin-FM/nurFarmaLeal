import React from "react";

export type CongelarNURProps = {
  nur: string;
  onCongelar: () => void;
  setNur: (nur: string) => void;
};

export const CongelarNUR = ({ nur, onCongelar, setNur }: CongelarNURProps) => {
  return (
    <div className="border border-white border-opacity-20 w-1/2 p-4 rounded-lg  gap-4 flex flex-col items-center justify-center">
      <input
        type="text"
        className="w-full h-10 rounded-lg text-center text-lg font-semibold"
        value={nur}
        name="Folio"
        onChange={(e) => setNur(e.target.value)}
      />
      <button
        onClick={onCongelar}
        className="bg-teal-800 py-4 px-7 text-white rounded-lg text-sm hover:bg-teal-600 transition duration-300"
      >
        Congelar NUR
      </button>
    </div>
  );
};
