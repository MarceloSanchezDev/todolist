import Button from "../Buttom/Buttom.jsx";
import Auth from "../Auth/Auth.jsx";
import { useNavigate } from "react-router";
import { useAuthContext } from "../../context/AuthContext.jsx";
import { useEffect } from "react";

export default function Home() {
  const navigate = useNavigate();

  const { user } = useAuthContext();

  useEffect(() => {
    if (user) {
      navigate("/app");
    }
  }, [user, navigate]);

  return (
    <div className="container-fluid d-flex flex-column justify-content-center align-items-center min-vh-100 bg-dark text-light">
      <div className="container d-flex flex-column justify-content-center align-items-center p-4 row">
        <div className="col-12 mb-3 d-flex flex-column justify-content-center align-items-center">
          <h1 className="text-center">✅ TO-DO APP!</h1>
          <Button
            bootstrapClass={"btn btn-success"}
            onClick={() => navigate("/app")}
          >
            Probar la App
          </Button>
        </div>
        <div className="col-12 mb-3 d-flex flex-row justify-content-center align-items-center">
          <div className="d-flex flex-column justify-content-center align-items-center border rounded bg-secondary text-light p-3">
            <p>
              TO-DO APP es una aplicación simple y funcional desarrollada con
              React que permite a los usuarios gestionar sus tareas diarias de
              manera eficiente. La aplicación está dividida en dos secciones
              principales: tareas pendientes y tareas completadas. Su objetivo
              es ayudar al usuario a organizarse mejor, registrar actividades
              por hacer y marcar como completadas aquellas que ya han sido
              realizadas.
            </p>

            <ul>
              <li>
                ✅ Agregar tareas: el usuario puede escribir una nueva tarea y
                agregarla a la lista de pendientes.
              </li>
              <li>
                📋 Visualizar tareas activas: todas las tareas pendientes se
                muestran en una lista clara y ordenada.
              </li>
              <li>
                🟢 Marcar tareas como completadas: con un solo clic, el usuario
                puede mover una tarea desde la lista de pendientes a la lista de
                tareas completadas.
              </li>
              <li>
                ❌ Eliminar tareas: las tareas pendientes pueden eliminarse si
                ya no son necesarias.
              </li>
              <li>
                🎯 Interfaz simple y responsive: pensada para ser fácil de usar
                y compatible con distintos tamaños de pantalla.
              </li>
            </ul>
          </div>
        </div>
        <div className="text-center col-12 mb-3">
          <p>
            Inicia Sesion o Registrate para guardar tus tareas en curso y tus
            tareas completadas
          </p>
          <Auth></Auth>
        </div>
      </div>
    </div>
  );
}
