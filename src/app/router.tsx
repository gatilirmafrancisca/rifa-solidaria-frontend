import { createBrowserRouter } from "react-router-dom";
import { RootLayout } from "@/app/RootLayout";
import { NotFoundPage } from "@/pages/NotFoundPage";
import { ChooseNumberPage, chooseNumberLoader } from "@/pages/ChooseNumberPage";
import { PagarPage } from "@/pages/PagarPage";
import { PagamentoPendentePage } from "@/pages/PagamentoPendentePage";
import { PagamentoRecusadoPage } from "@/pages/PagamentoRecusadoPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <PagarPage />,
      },
      {
        path: "rifa/pagar",
        element: <PagarPage />,
      },
      {
        path: "pagamento-aprovado",
        element: <ChooseNumberPage />,
        loader: chooseNumberLoader,
      },
      {
        path: "pagamento-pendente",
        element: <PagamentoPendentePage />,
      },
      {
        path: "pagamento-recusado",
        element: <PagamentoRecusadoPage />,
      },
      {
        path: "*",
        element: <NotFoundPage />,
      },
    ],
  },
]);