import { useState } from "react";

const steps = [
  { question: "Kan de gebruiker typen?", options: ["Ja", "Nee"] },
  { question: "Welke bedieningsvorm is gewenst voor de cliënt?", options: ["Touch", "Oogbesturing", "Switch", "Anders"] },
  { question: "Welke communicatiestijl is gewenst?", options: ["Top-down", "Bottom-up"] },
  { question: "Moet de software automatisch kunnen vervoegen?", options: ["Ja", "Nee", "Onbelangrijk"] },
  { question: "Welke symbolensets zijn vereist?", options: ["SymbolStix", "PCS", "Widgit", "Geen voorkeur"] },
  { question: "Moet de software werken met foto's?", options: ["Ja", "Nee"] },
  { question: "Welke hardware is gewenst?", options: ["iPad", "Windows-tablet", "Aangepaste spraakcomputer", "Onbekend"] },
];

const softwareAanbevelingen = [
  {
    naam: "TD Snap",
    voorwaarden: {
      typen: "Nee",
      bedieningsvorm: ["Touch", "Oogbesturing"],
      stijl: "Top-down",
      vervoegen: "Ja",
      symbolenset: ["SymbolStix", "PCS"],
      fotos: "Ja",
      hardware: ["iPad", "Windows-tablet", "Aangepaste spraakcomputer"],
    },
  },
  {
    naam: "Proloquo4Text",
    voorwaarden: {
      typen: "Ja",
      bedieningsvorm: ["Touch", "Oogbesturing"],
      stijl: "Top-down",
      vervoegen: "Nee",
      symbolenset: ["Geen voorkeur"],
      fotos: "Nee",
      hardware: ["iPad"],
    },
  },
  {
    naam: "MindExpress",
    voorwaarden: {
      typen: "Nee",
      bedieningsvorm: ["Oogbesturing", "Switch"],
      stijl: "Top-down",
      vervoegen: "Ja",
      symbolenset: ["PCS", "Widgit"],
      fotos: "Ja",
      hardware: ["Windows-tablet", "Aangepaste spraakcomputer"],
    },
  },
];

function filterAanbevelingen(answers: string[]) {
  const [typen, bedieningsvorm, stijl, vervoegen, symbolenset, fotos, hardware] = answers;
  return softwareAanbevelingen.filter((app) => {
    const v = app.voorwaarden;
    return (
      v.typen === typen &&
      v.bedieningsvorm.includes(bedieningsvorm) &&
      v.stijl === stijl &&
      (v.vervoegen === vervoegen || v.vervoegen === "Onbelangrijk") &&
      (v.symbolenset.includes(symbolenset) || v.symbolenset.includes("Geen voorkeur")) &&
      v.fotos === fotos &&
      v.hardware.includes(hardware)
    );
  });
}

export default function OCSoftwareBeslisboom() {
  const [answers, setAnswers] = useState<string[]>([]);
  const currentStep = answers.length;

  const handleAnswer = (answer: string) => setAnswers([...answers, answer]);
  const reset = () => setAnswers([]);

  if (currentStep >= steps.length) {
    const aanbevelingen = filterAanbevelingen(answers);
    return (
      <div style={{ padding: "2rem", maxWidth: "600px", margin: "auto", textAlign: "center" }}>
        <h2>Aanbevolen software:</h2>
        {aanbevelingen.length > 0 ? (
          <ul>
            {aanbevelingen.map((a) => <li key={a.naam}>✅ {a.naam}</li>)}
          </ul>
        ) : (
          <p>Geen directe match gevonden op basis van je antwoorden.</p>
        )}
        <button onClick={reset}>Opnieuw beginnen</button>
      </div>
    );
  }

  const step = steps[currentStep];
  return (
    <div style={{ padding: "2rem", maxWidth: "600px", margin: "auto", textAlign: "center" }}>
      <h2>{step.question}</h2>
      <div style={{ display: "flex", flexDirection: "column", gap: "1rem", marginTop: "1rem" }}>
        {step.options.map((option) => (
          <button key={option} onClick={() => handleAnswer(option)}>{option}</button>
        ))}
      </div>
    </div>
  );
}