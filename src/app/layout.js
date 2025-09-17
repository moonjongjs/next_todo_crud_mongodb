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
    icon: [
      { url: "/img/icon_moon.ico", sizes: "any" },      // ico는 sizes any
      { url: "/img/icon_moon.png", sizes: "192x192" }, // PNG 192px
    ],
    shortcut: { url: "/img/icon_moon.png", sizes: "192x192" },
    apple: { url: "/img/icon_moon.png", sizes: "192x192" },
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