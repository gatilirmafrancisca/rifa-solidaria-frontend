import { createBrowserRouter } from "react-router-dom";
import { RootLayout } from "@/app/RootLayout";
import { NotFoundPage } from "@/pages/NotFoundPage";
import { ChooseNumberPage } from "@/pages/ChooseNumberPage";

/**
 * Definição central de rotas (React Router v7, modo data router).
 *
 * Convenção: cada página mora em src/pages e só compõe componentes de
 * src/features/* ou src/components/*. Lógica de negócio não deve viver
 * dentro dos componentes de página — eles orquestram, não implementam.
 *
 * Ao crescer, migrar os imports abaixo para React.lazy()/route.lazy
 * para code-splitting por rota.
 */
export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        // Placeholder simples até existir uma landing institucional própria.
        element: <ChooseNumberPage />,
      },
      {
        path: "acao-solidaria/escolher-numero",
        element: <ChooseNumberPage />,
      },
      {
        path: "*",
        element: <NotFoundPage />,
      },
    ],
  },
]);
