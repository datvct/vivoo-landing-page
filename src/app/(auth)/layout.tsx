import ReactQueryProvider from "@/components/providers/ReactQueryProvider";
import "../../styles/globals.css"

export const metadata = {
  title: "Login - Site Manager",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-white">
        <ReactQueryProvider>
          {children}
        </ReactQueryProvider>
      </body>
    </html>
  );
}
