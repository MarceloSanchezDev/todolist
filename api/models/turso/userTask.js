import bcrypt from "bcrypt";
import crypto from "node:crypto";
import { createClient } from '@libsql/client';

const db = createClient({
    url: 'libsql://task-marcelosanchezdev.aws-us-east-1.turso.io',
    authToken: process.env.DBTOKEN,
});

await db.execute(`
    CREATE TABLE IF NOT EXISTS USER (
      id_user varchar(36) primary key,
      nombre varchar(255),
      apellido varchar(255),
      username TEXT unique,
      password varchar(255),
      email varchar(255)
    );
  `);
  
  await db.execute(`
    CREATE TABLE IF NOT EXISTS user_task (
      id_task varchar(36) primary key,
      fecha DATE,
      user_username varchar(255),
      nombre_task varchar(255),
      hora time,
      foreign key(user_username) references user(username)
    );
  `);
  
  await db.execute(`
    CREATE TABLE IF NOT EXISTS user_task_completed (
      id_task_completed varchar(36) primary key,
      fecha DATE,
      user_username varchar(255),
      nombre_task_completed varchar(255),
      hora time,
      hora_completada time,
      fecha_completada DATE,
      foreign key(user_username) references user(username)
    );
  `);
export class TaskModel {
    static async getAllTasks(username){
        try{
            const {rows} = await db.execute('SELECT * FROM user_task WHERE user_username = ?', [username]);
            return rows
        }catch (error) {
          console.error("Error al obtener las tareas:", error);
          throw new Error("No se pudo obtener las tareas");
        } 
    }
    static async getAllTasksCompleted(username){
        try{
            const {rows} = await db.execute('SELECT * FROM user_task_completed WHERE user_username = ?', [username]);
            return rows
        }catch (error) {
          console.error("Error al obtener las tareas:", error);
            return error
        }
    }
    static async createTask(username, task) {
      try {
        const fecha = new Date().toISOString().split('T')[0];
        const hora = new Date().toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
          hour12: false
        });
        const id = crypto.randomUUID();
        const { name } = task;
    
        await db.execute(
          'INSERT INTO user_task (id_task, fecha, user_username, nombre_task, hora) VALUES (?, ?, ?, ?, ?)',
          [id, fecha, username, name, hora]
        );
    
        const { rows } = await db.execute(
          'SELECT * FROM user_task WHERE user_username = ?',
          [username]
        );
    
        return rows;
      } catch (error) {
        console.error("Error al crear la tarea:", error);
        throw new Error("No se pudo crear la tarea");
      }
    }
    static async deleteTask(id_task){
        try{
            await db.execute('DELETE FROM user_task WHERE id_task = ?', [id_task]);
            return true
        }catch (error) {
            console.error("Error al eliminar la tarea:", error);
            return error
        }
    }
    static async completeTask(id_task){
        try{
          const fechaCompletada = new Date().toISOString().split('T')[0];
          const horaCompletada = new Date().toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: false
          });
            const {rows} = await db.execute('SELECT * FROM user_task WHERE id_task = ?', [id_task]);
            const {fecha, user_username, nombre_task, hora} = rows[0]
            const id = crypto.randomUUID()
            await db.execute('INSERT INTO user_task_completed (id_task_completed, fecha, user_username, nombre_task_completed, hora, hora_completada,fecha_completada) VALUES (?, ?, ?, ?, ?,?,?)', [id, fecha, user_username, nombre_task, hora,horaCompletada, fechaCompletada]);
            await db.execute('DELETE FROM user_task WHERE id_task = ?', [id_task]);
            return true
        }catch (error) {
            console.error("Error al completar la tarea:", error);
            return error
        }
    }
}

export class UserModel {
    static async registerUser (user) {
        // extraigo del input los siguientes datos
        const SALT_ROUNDS = 10
        const {
          username,
          password,
          name,
          lastname,
          email
        } = user
    
        // hasheo la contraseña
        const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS)
    
        // creo un nuevo id
        const uuidResult = crypto.randomUUID()
    
        try {
          // inserto en la base de datos el nuevo usuario
          await db.execute(
            'INSERT INTO user (id_user, username, password, nombre, apellido, email) values(?,?,?,?,?,?)', [uuidResult, username, hashedPassword, name, lastname, email])
        } catch (e) {
          // si hay algun error lo envio al controlador
          console.log(e)
        }
        // devuelvo el usuario al controlador si fue un exito
        const { rows } = await db.execute(
          'SELECT *, id_user as id FROM user WHERE id_user = ?', [uuidResult]
        )
        return rows[0]
      }
    static async login (user) {
        // extraigo del input los siguientes datos
        const {
          username,
          password
        } = user
        try {
          // busco al usuario en a base de datos
          const { rows } = await db.execute('SELECT *, id_user as id FROM user WHERE username = ?', [username])
          if (rows.length === 0) { throw new Error('User not found') }
          const validatedUser = rows[0]
          // comparo  la contraseña con la hasheada
          const passwordMach = await bcrypt.compare(password, validatedUser.password)
          if (!(rows && passwordMach)) { throw new Error('credentials invalid') }
          // retorno el usuario
          return validatedUser
        } catch (e) {
          // si hay algun error lo envio al controlador
          console.log(e)
        }
      }
}