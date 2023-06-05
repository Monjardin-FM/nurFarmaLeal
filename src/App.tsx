import React, { useState } from "react";
import "./App.css";
import { SearchBar } from "./SearchBar";
import { QuemarNUR } from "./QuemarNUR";
import { CongelarNUR } from "./CongelarNUR";
import Swal from "sweetalert2";
export type QuemarNURValues = {
  Folio: string;
  CodeEAN: string;
  Units: string;
  Precio: string;
};
function App() {
  const [nur, setNur] = useState<string>("");
  const [result, setResult] = useState<any>();
  const [quemarNURFormValues, setQuemarNURFormValues] =
    useState<QuemarNURValues>({
      Folio: "",
      CodeEAN: "",
      Units: "",
      Precio: "",
    });
  const onValidate = () => {
    fetch(`https://miaapi-dev.farmaleal.com.mx/api/Daport/ValidaNur/${nur}`, {
      method: "POST",
      redirect: "follow",
    })
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        setResult(result);
        Swal.fire({
          title: "Exito",
          icon: "success",
          text: `${result}`,
        });
      })
      .catch((error) => window.alert(error));
  };

  const onQuemarNur = () => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    const raw = JSON.stringify({
      Folio: quemarNURFormValues.Folio,
      Authorization: "",
      CodeEAN: quemarNURFormValues.CodeEAN,
      Units: quemarNURFormValues.Units,
      Ticket: "1",
      Sucursal: "1",
      Precio: quemarNURFormValues.Precio,
    });
    fetch("https://miaapi-dev.farmaleal.com.mx/api/Daport/QuemarNur", {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    })
      .then((response) => response.json())
      .then((result) => {
        Swal.fire({
          title: "Exito",
          icon: "success",
          text: `NUR Quemado con éxito ${result}`,
        });
      })
      .catch((error) =>
        Swal.fire({
          title: "Error",
          icon: "error",
          text: `NUR Quemado sin éxito ${error}`,
        })
      );
  };
  const congelarNUR = () => {
    fetch(`https://miaapi-dev.farmaleal.com.mx/api/Daport/CongelarNur/${nur}`, {
      method: "POST",
      redirect: "follow",
    })
      .then((response) => response.json())
      .then((result) =>
        Swal.fire({
          title: "Exito",
          icon: "success",
          text: `NUR Congelado con éxito ${result}`,
        })
      )
      .catch((error) => window.alert(error));
  };

  return (
    <div className="App w-screen h-screen code flex flex-col items-center justify-center gap-4">
      <div className="flex flex-row w-10/12 items-start gap-4">
        <SearchBar setNur={setNur} nur={nur} onValidate={onValidate} />
        {/* {result && (
          <div className="border border-white rounded-lg border-opacity-20 p-5">
            <ul className="text-white text-sm flex flex-col items-start justify-center">
              <li>
                <span>EAN: </span>
                {result.data.medicamento.ean}
              </li>
              <li>
                <span>Cantidad: </span>
                {result.data.medicamento.cantidad}
              </li>
              <li>
                <span>Fecha de Consulta: </span>
                {result.data.medicamento.fechaConsulta}
              </li>
              <li>
                <span>Indicaciones: </span>
                {result.data.medicamento.indicaciones}
              </li>
              <li>
                <span>Medicamento: </span>
                {result.data.medicamento.medicamento}
              </li>
              <li>
                <span>NUR: </span>
                {result.data.medicamento.nur}
              </li>
            </ul>
          </div>
        )} */}
      </div>
      <div className="flex flex-row w-10/12 items-start gap-4">
        <QuemarNUR
          formValues={quemarNURFormValues}
          onChangeValues={setQuemarNURFormValues}
          quemarNUR={onQuemarNur}
        />
        <CongelarNUR nur={nur} setNur={setNur} onCongelar={congelarNUR} />
      </div>
    </div>
  );
}

export default App;
