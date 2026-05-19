import "../../../styles/globals.css";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import HeaderLayout from "../../../components/layout/HeaderLayout";
import Sidebar from "../../../components/layout/Sidebar";
import ReactQueryProvider from "@/components/providers/ReactQueryProvider";

export const metadata = {
  title: "Admin - Site Manager",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-50 text-gray-900">
        <ReactQueryProvider>
          <AntdRegistry>
            <div className="flex min-h-screen flex-col">
              {/* <ToastContainer
                position="top-right"
                autoClose={3000}
                newestOnTop
                closeOnClick
                pauseOnHover
                draggable
                theme="colored"
                style={{ zIndex: 9999 }}
              /> */}

              <main className="flex h-screen overflow-hidden">
                <Sidebar />

                <section className="flex flex-1 flex-col overflow-y-auto">
                  <HeaderLayout />
                  <main className="p-4">
                    {children}
                  </main>
                </section>
              </main>
            </div>
          </AntdRegistry>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
