import { Outlet } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

/**
 * Layout raiz da aplicação. Todas as rotas renderizam dentro do
 * <Outlet />, sempre com o mesmo cabeçalho e rodapé institucionais.
 * Se páginas futuras precisarem de um layout diferente (ex: uma área
 * administrativa sem o header público), crie um layout novo em vez de
 * sobrecarregar este.
 */
export function RootLayout() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
