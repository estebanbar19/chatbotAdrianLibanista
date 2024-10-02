import React, { useState } from "react";
import { initChatbot, sendNewMessage } from "./openAiApi.js"

function App() {

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    {
      role: "system",
      content: "Eres un asistente institucional para el Colegio El Libano. Tienes una serie de preguntas y respuestas. Aprendete esta información para que puedas responder: '¿Dónde está ubicada la institución?': 'La IED Líbano sede principal se encuentra ubicada en la carrera 34 #44A- 26, Urb. Libano y la Sede santa cruz se encuentra en la calle 48 #27-04, Barrio Santa Cruz.','¿Cuáles son los requisitos de admisión?': 'Descargar y llenar un formulario de inscripción con los documentos requeridos, llevarlo a la secretaria de la escuela, presentar y pasar un examen y una entrevista de admisión.','¿Hay opciones de becas disponibles?': 'No.','¿Cuáles son los métodos de evaluación en la institución?': 'En la práctica se desarrolla la autoevaluación, la coevaluación y la heteroevaluación. Dentro de esta se tiene en cuenta los componentes: SABER, SABER HACER Y SER.','¿Hay actividades extracurriculares?': 'Sí, múltiples actividades como danza, tambora, recreación y deporte.','¿Cómo se pueden consultar las calificaciones?': 'Mediante la plataforma SIAN365.','¿Qué servicios de apoyo se ofrecen a los estudiantes?': 'Psicoorientación.','¿Cómo puedo contactar a un profesor o administrador?': 'Todos los profesores tienen un horario de atención estipulado.','¿Hay un servicio de biblioteca?': 'Aún no.','¿Cuáles son sus horarios?': 'No hay.','¿Qué instalaciones deportivas están disponibles?': 'Cancha de microfutbol que se adapta a baloncesto y voleibol.','¿Cuál es el proceso de inscripción?': 'a. descargar formulario, b. diligenciar formulario, c. acercarse a la secretaria con todos los documentos requeridos, d. presentar examen de admisión, e. Entrevista.','¿Hay fechas límite para la inscripción?': 'Sí.','¿Cuáles son los próximos eventos o actividades en la institución?': 'Semana cultural, Clausura.','¿Cómo puedo participar en los eventos de la institución?': 'De forma activa con el docente encargado.','¿Hay acceso a recursos tecnológicos, como computadoras o Wi-Fi?': 'Sí, dos salas de informática dotadas con computadores portátiles.','¿Qué actividades se organizan para los estudiantes?': 'Actividades lúdicas como conmemoraciones, izadas de banderas, semana cultural.','¿Cuáles son las reglas y políticas de la institución?': 'Las puedes consultar en el manual de convivencia el cual se encuentra en la plataforma, pronto lo integraremos para brindarlo acá.','¿Qué hacer si tengo un problema con un compañero de clase?': 'Informarlo al tutor.'",
  },
  {
      role: "user",
      content: "Hola!",
  }
  ]);

  const init = async (e) => {

    await initChatbot(messages).then((response) => {
      setMessages([...messages, response]);
    });
  }

  if(messages.length === 2){
    init();
  }

  const sendMessage = async (e) => {
    e.preventDefault();

    if (message.trim()) {
      await sendNewMessage(messages, message).then((response) => {
        setMessages([...messages, {role: "user", content: message}, response]);
      });

      setMessage("");
    }
  };

  return (
    <div>
      <section>
            <div className="messages">
              {messages.map((msg, index) => (
                
                  (index > 1) ? 
                  <div key={index}>
                  <strong>{msg.role}</strong>: {msg.content}
                </div> 
                : <></>
                
              ))}
            </div>

            <form onSubmit={sendMessage}>
              <input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Escribe un mensaje..."
              />
              <button type="submit"><img alt="Enviar" src="https://cdn0.iconfinder.com/data/icons/superglyph-communication/30/message-sending-1024.png"></img></button>
            </form>
      </section>
    </div>
  );
}

export default App;
