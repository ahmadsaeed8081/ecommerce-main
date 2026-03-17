import { ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20 pb-8 md:pb-12 bg-[#190737]">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
