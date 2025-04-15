import { useNavigate } from "react-router";

export default function Home() {
  const navigate = useNavigate();
  return (
    <div className="container d-flex flex-column justify-content-center align-items-center vh-100">
      <h1 className="text-center">Home</h1>
      <p className="text-center">✅ TO-DO APP!</p>
      <p>
        TO-DO APP es una aplicación simple y funcional desarrollada con React
        que permite a los usuarios gestionar sus tareas diarias de manera
        eficiente. La aplicación está dividida en dos secciones principales:
        tareas pendientes y tareas completadas. Su objetivo es ayudar al usuario
        a organizarse mejor, registrar actividades por hacer y marcar como
        completadas aquellas que ya han sido realizadas.
      </p>
      <ul>
        <li>
          ✅ Agregar tareas: el usuario puede escribir una nueva tarea y
          agregarla a la lista de pendientes.
        </li>
        <li>
          📋 Visualizar tareas activas: todas las tareas pendientes se muestran
          en una lista clara y ordenada.
        </li>
        <li>
          🟢 Marcar tareas como completadas: con un solo clic, el usuario puede
          mover una tarea desde la lista de pendientes a la lista de tareas
          completadas.
        </li>
        <li>
          ❌ Eliminar tareas: las tareas pendientes pueden eliminarse si ya no
          son necesarias.
        </li>
        <li>
          🎯 Interfaz simple y responsive: pensada para ser fácil de usar y
          compatible con distintos tamaños de pantalla.
        </li>
      </ul>
      <div className="text-center">
        <button className="btn btn-primary" onClick={() => navigate("/login")}>
          Login
        </button>
        <button
          className="btn btn-secondary"
          onClick={() => navigate("/register")}
        >
          Register
        </button>
      </div>
    </div>
  );
}
