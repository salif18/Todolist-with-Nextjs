"use client";
import TodoList from "@/components/List";
import { useState, useEffect } from "react";

const getTaches = () => {
  const data = localStorage.getItem("taches");
  if (data) {
    return JSON.parse(data);
  } else {
    return [];
  }
};

export default function Home() {
  const [text, setText] = useState("");
  const [taches, setTaches] = useState(getTaches);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const handleTime = (e) => {
    setTime(e.target.value);
  };

  const handleDate = (e) => {
    setDate(e.target.value);
  };

  const handleChange = (e) => {
    setText(e.target.value);
  };

  // Correction du stockage dans localStorage après la mise à jour des tâches
  const addTaches = () => {
    const newTache = {
      id: taches.length + 1,
      checkbox: false,
      contenu: text,
      time: time,
      date: date,
    };
    const updatedTaches = [...taches, newTache];
    setTaches(updatedTaches);
    localStorage.setItem("taches", JSON.stringify(updatedTaches));
    setText("");
  };

  //supprimer une tache et mis  a jour du localstorage
  const handleDelete = (id) => {
    const updateTaches = taches.filter((item) => item.id !== id);
    setTaches(updateTaches);
    localStorage.clear();
    localStorage.setItem("taches", JSON.stringify(updateTaches));
  };

  //changer le status comme tache accomplie et mis a jour du localstorage
  const handleChangeChecked = (id) => {
    const newTaches = taches.map((item) =>
      item.id === id ? { ...item, checkbox: !item.checkbox } : item
    );
    setTaches(newTaches);
    localStorage.clear();
    localStorage.setItem("taches", JSON.stringify(newTaches));
  };

  //date d'alerte
  const d = new Date();
  const day = d.getDate();
  const month = d.getMonth() + 1;
  const year = d.getFullYear();

  const dates = () => {
    if (month > 9 && day > 9) {
      return `${year}-${month}-${day}`;
    } else if (month > 9 && day < 10) {
      return `${year}-${month}-0${day}`;
    } else if (month < 10 && day < 10) {
      return `${year}-0${month}-0${year}`;
    } else if (month < 10 && day > 9) {
      return `${year}-0${month}-${day}`;
    }
  };
  const currentDate = dates();

  //heure d'alarme
  const hour = d.getHours();
  const minute = d.getMinutes();

  const getheure = () => {
    if (hour > 9 && minute > 9) {
      return `${hour}:${minute}`;
    } else if (hour > 9 && minute < 10) {
      return `${hour}:0${minute}`;
    } else if (hour < 10 && minute < 10) {
      return `0${hour}:0${minute}`;
    } else if (hour < 10 && minute > 9) {
      return `0${hour}:${minute}`;
    }
  };

  const times = getheure();

  // filtrage pour alarmer
  const alarm = () => {
    const executeTaches = taches.filter(
      (item) =>
        item.date === currentDate &&
        item.time === times &&
        item.checkbox === false
    );
    const tache = executeTaches[0];
    if (tache) {
      const { time } = tache;
      console.log(time);
      if (executeTaches.length > 0 && time === times) {
        alert("Alarme ! Des tâches sont planifiées pour aujourd'hui.");
      } else {
        console.log("Aucune tâche planifiée pour aujourd'hui.");
      }
    }
  };

  useEffect(() => {
    alarm();
  }, []);

  return (
    <>
      <header className="header">
        <h1 className="title">AGENDAPP TODOLIST </h1>
      </header>
      <main className="home">
        <section className="section1">
          <h1 className="titre">Ajouter une tache</h1>

          <input
            className="input"
            placeholder="Entrer une tache"
            value={text}
            onChange={handleChange}
          />
          <h1 className="titre">Date</h1>
          <input type="date" value={date} onChange={handleDate} />
          <h1 className="titre">heures</h1>
          <input type="time" value={time} onChange={handleTime} />
          {text && (
            <button className="btn" onClick={addTaches}>
              Ajouter
            </button>
          )}
        </section>
        <article className="article">
          <h1>Mes taches</h1>
          {taches.length > 0 ? (
            taches.map((item) => (
              <TodoList
                item={item}
                key={item.id}
                handleDelete={handleDelete}
                handleChangeChecked={handleChangeChecked}
              />
            ))
          ) : (
            <p className="infos-empty">Aucune tâche planifiée</p>
          )}
        </article>
      </main>
    </>
  );
}
