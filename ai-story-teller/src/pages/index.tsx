import Head from "next/head";
import style from "@/styles/Home.module.scss";
import Header from "@/components/Molecules/Header/Header";
import WindowBox from "@/components/Organism/WindowBox/WindowBox";
import InputBox from "@/components/Molecules/InputBox/InputBox";
import SelectBox from "@/components/Molecules/SelectBox/SelectBox";
import { useState } from "react";
import { listaGeneri } from "@/constants/common";
import Button from "@/components/Atoms/Button/Button";
//import {GenerateContentCandidate,GoogleGenerativeAI,} from "@google/generative-ai";
import SwitchBox from "@/components/Molecules/SwitchBox/SwitchBox";
import Toast from "@/components/Atoms/Toast/Toast";


export default function Home() {
  const [protagonista, setProtagonista] = useState("");
  const [antagonista, setAntagonista] = useState("");
  const [genere, setGenere] = useState("");
  const [luogo, setLuogo] = useState("");
  const [pegi18, setPegi18] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [response, setResponse] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);

  const [question, setQuestion] = useState("");
  const [questionResponse, setQuestionResponse] = useState("");

  const handleGenerate = async () => {
    setLoading(true);
    setError(false);
    const prompt = `genera un racconto ${genere} per ${pegi18 ? "adulti" : "bambini"}, con il protagonista chiamato ${protagonista}, l'antagonista chiamato ${antagonista}, e ambientato in ${luogo}.`;

    if (
      protagonista.trim().length > 0 &&
      antagonista.trim().length > 0 &&
      genere.trim().length > 0 &&
      luogo.trim().length > 0
    ) {
      try {
        const response = await fetch("/api/generate", {
          headers: { "Content-Type": "application/json" },
          method: "POST",
          body: JSON.stringify({ prompt }),
        });
        const data = await response.json();
        if (!data.ok) {
          throw new Error("errore");
        }
        setResponse(data.message);
      } catch (e) {
        console.error("il nostro errore:", e);
        setError(true);
      }
    }
    setLoading(false);
  };

  const handleVoice = () => {
    // Divido il testo in frasi usando il punto come separatore
    const sentences = response.split('.');
    let index = 0;

    const speakNextSentence = () => {
      if (index < sentences.length) {
        const utterance = new SpeechSynthesisUtterance(sentences[index].trim());
        utterance.lang = "it-IT";
        utterance.pitch = 0.8;

        utterance.onend = () => {
          index++;
          // Passo alla frase successiva
          speakNextSentence();
        };

        speechSynthesis.speak(utterance);
      } else {
        setIsPlaying(false); // Lettura di tutte le frasi completata
      }
    };

    setIsPlaying(true);
    speakNextSentence();
  };

  const handleStopVoice = () => {
    speechSynthesis.cancel();
    setIsPlaying(false);
  };

  const handleAskQuestion = async () => {
    if (question.trim().length > 0) {
      try {
        setLoading(true);
        const responseAI = await fetch("/api/ask-question", {
          headers: { "Content-Type": "application/json" },
          method: "POST",
          body: JSON.stringify({ question, story: response }),
        });
        const data = await responseAI.json();
        if (data.ok) {
          setQuestionResponse(data.answer);
        } else {
          throw new Error(data.message || "Errore nella risposta alla domanda");
        }
      } catch (e) {
        console.error("Errore nella risposta alla domanda:", e);
        setError(true);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <>
      <Head>
        <title>Ai Story Teller</title>
        <meta name="description" content="AI based app to generate stories" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={style.main}>
        <Header title="AI Story Teller" />
        <div className={style.content}>
          {error && (
            <Toast
              setAction={setError}
              title="Errore"
              message="Errore nella creazione del racconto"
            />
          )}

          <WindowBox title="Crea la Tua Storia">
            <div className={style.container}>
              <InputBox
                label="Nome Protagonista:"
                value={protagonista}
                setValue={setProtagonista}
              />
              <InputBox
                label="Nome Antagonista:"
                value={antagonista}
                setValue={setAntagonista}
              />
              <InputBox
                label="Luogo:"
                value={luogo}
                setValue={setLuogo}
              />
              <SelectBox
                label="Genere:"
                list={listaGeneri}
                setAction={setGenere}
              />
              <SwitchBox value={pegi18} label="Per adulti:" setValue={setPegi18} />
              <Button
                label="Genera"
                onClick={handleGenerate}
                disabled={
                  protagonista.trim().length <= 0 ||
                  antagonista.trim().length <= 0 ||
                  genere.trim().length <= 0 ||
                  luogo.trim().length <= 0 ||
                  loading
                }
              />
            </div>
            {loading && (
              <div className={style.loading}>
                <img src="/W1.gif" alt="Loading..." />
              </div>
            )}
            {!loading && response && (
              <div className={style.result}>
                <div className={style.btn}>
                  {isPlaying ? (
                    <Button label="Stop" onClick={handleStopVoice} />
                  ) : (
                    <Button label="Racconta" onClick={handleVoice} />
                  )}
                </div>
                {response}
              </div>
            )}
          </WindowBox>

          {/* Sezione domande */}
          {!loading && response && (
            <div className={style.questionSection}>
              <InputBox
                label="Fai una domanda:"
                value={question}
                setValue={setQuestion}
              />
              <Button
                label="Chiedi"
                onClick={handleAskQuestion}
                disabled={question.trim().length <= 0 || loading}
              />
              {questionResponse && (
                <div className={style.answer}>
                  <p>{questionResponse}</p>
                </div>
              )}
            </div>
          )}
        </div>
      </main>
    </>
  );
}
