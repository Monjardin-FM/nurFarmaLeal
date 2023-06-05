export type NURInformation = {
  Success: boolean;
  Code: string;
  Message: string;
  Medicamento: {
    Cantidad: string;
    EAN: string;
    FechaConsulta: string;
    Folio: string;
    ICD10: string;
    Indicaciones: string;
    Medicamento: string;
    NUR: string;
    PacienteName: string;
    Status: string;
  };
  Receta: string;
};
