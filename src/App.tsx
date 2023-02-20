import { faRightToBracket } from "@fortawesome/free-solid-svg-icons";
import { generateKey } from "crypto";
import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import "./App.css";

type ColorSchemeType = {
  "--bg-color": string;
  "--approve-color": string;
  "--approve-color-hover": string;
  "--alert-color": string;
  "--alert-color-hover": string;
  "--secondary-color": string;
  "--gray": string;
  "--light-gray": string;
  "--middle-gray": string;
};

const darkTheme: ColorSchemeType = {
  // TODO make dark scheme
  "--bg-color": "white",
  "--approve-color": "forestgreen",
  "--approve-color-hover": "lightgreen",
  "--alert-color": "coral",
  "--alert-color-hover": "lightpink",
  "--secondary-color": "rgb(0, 128, 255)",
  "--gray": "gray",
  "--light-gray": "lightgray",
  "--middle-gray": "#676767",
};

const lightTheme: ColorSchemeType = {
  "--bg-color": "white",
  "--approve-color": "forestgreen",
  "--approve-color-hover": "lightgreen",
  "--alert-color": "coral",
  "--alert-color-hover": "lightpink",
  "--secondary-color": "rgb(0, 128, 255)",
  "--gray": "gray",
  "--light-gray": "lightgray",
  "--middle-gray": "#676767",
};

function activateScheme(theme: "DARK" | "LIGHT") {
  const rootElement = document.getElementById("root");
  if (rootElement === null)
    throw "Could not find root Element to set color scheme!";
  if (theme === "DARK") {
    for (const k in darkTheme) {
      rootElement.style.setProperty(k, darkTheme[k as keyof ColorSchemeType]);
    }
  } else {
    for (const k in lightTheme) {
      rootElement.style.setProperty(k, lightTheme[k as keyof ColorSchemeType]);
    }
  }
}

function useSetColorScheme() {
  const [theme, setTheme] = useState<"DARK" | "LIGHT">(
    window.matchMedia("(prefers-color-scheme: dark").matches ? "DARK" : "LIGHT"
  );

  useEffect(() => {
    window
      .matchMedia("(prefers-color-scheme: dark")
      .addEventListener("change", (e) => e.matches && setTheme("DARK"));
    window
      .matchMedia("(prefers-color-scheme: light")
      .addEventListener("change", (e) => e.matches && setTheme("LIGHT"));
  });

  useEffect(() => activateScheme(theme), [theme]);
}

function App() {
  useSetColorScheme();

  return (
    <div className="App">
      <Outlet />
    </div>
  );
}

export default App;
