import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
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
function filterAanbevelingen(answers) {
    const [typen, bedieningsvorm, stijl, vervoegen, symbolenset, fotos, hardware] = answers;
    return softwareAanbevelingen.filter((app) => {
        const v = app.voorwaarden;
        return (v.typen === typen &&
            v.bedieningsvorm.includes(bedieningsvorm) &&
            v.stijl === stijl &&
            (v.vervoegen === vervoegen || v.vervoegen === "Onbelangrijk") &&
            (v.symbolenset.includes(symbolenset) || v.symbolenset.includes("Geen voorkeur")) &&
            v.fotos === fotos &&
            v.hardware.includes(hardware));
    });
}
export default function OCSoftwareBeslisboom() {
    const [answers, setAnswers] = useState([]);
    const currentStep = answers.length;
    const handleAnswer = (answer) => setAnswers([...answers, answer]);
    const reset = () => setAnswers([]);
    if (currentStep >= steps.length) {
        const aanbevelingen = filterAanbevelingen(answers);
        return (_jsxs("div", { style: { padding: "2rem", maxWidth: "600px", margin: "auto", textAlign: "center" }, children: [_jsx("h2", { children: "Aanbevolen software:" }), aanbevelingen.length > 0 ? (_jsx("ul", { children: aanbevelingen.map((a) => _jsxs("li", { children: ["\u2705 ", a.naam] }, a.naam)) })) : (_jsx("p", { children: "Geen directe match gevonden op basis van je antwoorden." })), _jsx("button", { onClick: reset, children: "Opnieuw beginnen" })] }));
    }
    const step = steps[currentStep];
    return (_jsxs("div", { style: { padding: "2rem", maxWidth: "600px", margin: "auto", textAlign: "center" }, children: [_jsx("h2", { children: step.question }), _jsx("div", { style: { display: "flex", flexDirection: "column", gap: "1rem", marginTop: "1rem" }, children: step.options.map((option) => (_jsx("button", { onClick: () => handleAnswer(option), children: option }, option))) })] }));
}
