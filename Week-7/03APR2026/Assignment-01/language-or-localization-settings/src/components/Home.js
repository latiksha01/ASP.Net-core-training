import React, { useContext } from "react";
import { LanguageContext } from "../context/LanguageContext";
import "./Home.css";

function Home() {
  const { language } = useContext(LanguageContext);

  const content = {
    en: {
      title: "Welcome",
      description: "This is a multi-language application.",
      extra: "You can switch languages using the dropdown above."
    },
    hi: {
      title: "स्वागत है",
      description: "यह एक बहुभाषी एप्लिकेशन है।",
      extra: "आप ऊपर दिए गए ड्रॉपडाउन से भाषा बदल सकते हैं।"
    },
    es: {
      title: "Bienvenido",
      description: "Esta es una aplicación multilingüe.",
      extra: "Puedes cambiar el idioma usando el menú desplegable."
    },
    fr: {
      title: "Bienvenue",
      description: "Ceci est une application multilingue.",
      extra: "Vous pouvez changer la langue à l'aide du menu déroulant."
    }
  };

  return (
    <div className="home">
      <div className="card">
        <h1>{content[language].title}</h1>
        <p>{content[language].description}</p>
        <p className="extra">{content[language].extra}</p>
      </div>
    </div>
  );
}

export default Home;