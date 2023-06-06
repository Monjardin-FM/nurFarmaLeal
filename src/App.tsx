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

type validateNUR = {
  cantidad: string;
  ean: string;
  fechaConsulta: string;
  indicaciones: string;
  medicamento: string;
  nur: string;
};
function App() {
  const [nur, setNur] = useState<string>("");
  const [resultValidate, setResultValidate] = useState<validateNUR>();
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
        if (result.isSuccess === true) {
          setResultValidate({
            cantidad: result.data.medicamento.cantidad,
            ean: result.data.medicamento.ean,
            fechaConsulta: result.data.medicamento.fechaConsulta,
            indicaciones: result.data.medicamento.indicaciones,
            medicamento: result.data.medicamento.medicamento,
            nur: result.data.medicamento.nur,
          });
          window.alert("NUR validado");
        } else if (result.isSuccess === false) {
          window.alert(`${JSON.stringify(result.error.errors)}`);
          setResultValidate({
            cantidad: "",
            ean: "",
            fechaConsulta: "",
            indicaciones: "",
            medicamento: "",
            nur: "",
          });
        }
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
        if (result.isSuccess === true) {
          Swal.fire({
            title: "Exito",
            icon: "success",
            text: `NUR Quemado con éxito`,
          });
        } else if (result.isSuccess === false) {
          Swal.fire({
            title: "Error",
            icon: "error",
            text: `${JSON.stringify(result.error.errors)}`,
          });
        }
      })
      .catch((error) =>
        Swal.fire({
          title: "Error",
          icon: "error",
          text: `Ocurrió un error${error}`,
        })
      );
  };
  const congelarNUR = () => {
    fetch(`https://miaapi-dev.farmaleal.com.mx/api/Daport/CongelarNur/${nur}`, {
      method: "POST",
      redirect: "follow",
    })
      .then((response) => response.json())
      .then((result) => {
        if (result.isSuccess === true) {
          Swal.fire({
            title: "Exito",
            icon: "success",
            text: `NUR Congelado con éxito ${result}`,
          });
        } else if (result.isSuccess === false) {
          Swal.fire({
            title: "Error",
            icon: "error",
            text: `${JSON.stringify(result.error.errors)}`,
          });
        }
      })
      .catch((error) => window.alert(error));
  };

  return (
    <div className="App w-screen h-screen code flex flex-col items-center justify-center gap-4">
      <div className="flex flex-row w-10/12 items-start gap-4">
        <SearchBar setNur={setNur} nur={nur} onValidate={onValidate} />
        {resultValidate && (
          <div className="border border-white rounded-lg border-opacity-20 p-5">
            <ul className="text-white text-sm flex flex-col items-start justify-center">
              <li>
                <span>NUR: </span>
                {resultValidate.nur}
              </li>
              <li>
                <span>EAN: </span>
                {resultValidate.ean}
              </li>
              <li>
                <span>Cantidad: </span>
                {resultValidate.cantidad}
              </li>
              <li>
                <span>Fecha de Consulta: </span>
                {resultValidate.fechaConsulta}
              </li>
              <li>
                <span>Indicaciones: </span>
                {resultValidate.indicaciones}
              </li>
              <li>
                <span>Medicamento: </span>
                {resultValidate.medicamento}
              </li>
            </ul>
          </div>
        )}
      </div>
      <div className="flex flex-row w-10/12 items-start justify-center  gap-4">
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
