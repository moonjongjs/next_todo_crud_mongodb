import React from "react";
import WrapComponent from "@/component/WrapComponent.jsx";
import ProviderRedux from "./ProviderRedux";
import ProviderQuery from "./ProviderQuery";
import "./css/style.css";

export const metadata = {
  viewport: "width=device-width, initial-scale=1.0",
  title: "TO DO LIST",
  description: "TO DO LIST NextJS 제작",
  keywords: ["TO DO LIST", "TO DO", "할일"],
  icons: {
    icon: "/img/icon_moon.ico",
    shortcut: "/img/icon_moon.png",
    apple: "/img/icon_moon.png",
  },
  publisher: "문선종",
  robots: "index, follow",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.13.1/font/bootstrap-icons.min.css"
        />
      </head>
      <body>
        <ProviderRedux>
          <ProviderQuery>
            <WrapComponent>{children}</WrapComponent>
          </ProviderQuery>
        </ProviderRedux>
      </body>
    </html>
  );
}