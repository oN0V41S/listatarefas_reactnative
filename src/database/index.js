import * as SQLite from 'expo-sqlite';

const tarefas = SQLite.openDatabaseAsync('tarefas.db');

export default tarefas;