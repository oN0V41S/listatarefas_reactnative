import { reject } from "lodash";
import tarefas from "../database";

export function criarTabela(){
    tarefas.transaction((tx) => {
        tx.executeSql(
            `
            CREATE TABLE IF NOT EXISTS Notas(
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                titulo TEXT,
                categoria TEXT,
                texto TEXT
            );
            `,

            [],
            (_, error) => {
                console.log(error);
            }
        );
    });
}

export async function adicionarNota(nota){
    return new Promise((resolve, reject) => {
        tarefas.transaction((tx) => {
            tx.executeSql(
                `
                INSERT INTO Notas (titulo, categoria, texto) VALUE (?, ?, ?);
                `,
            [
                nota.titulo,
                nota.categoria,
                nota.texto
            ],
            (_, { rowAffected, insertId}) => {
                if(rowAffected > 0) resolve(insertId);
                else reject ("Erro ao adicionar uma nota:" + JSON.stringify)
            },
            (_, error) => reject(error)
            )
        })
    })
}

export function buscarNotas(categoria = "*"){
    return new Promisse((resolve, reject) => {
        tarefas.transaction((tx) => {
            let comando;
            if(categoria = "*"){
                comando = "SELECT * FROM Notas;";
            }
            else{
                comando = `SELECT * FROM Notas WHERE categoria = "${categoria}";`;
            }

            tx.executeSql(comando, [],
                (transaction, resultado) => {
                    resolve(resultado.rows._array);
                },
                (_, error) => reject(error)
            )
        })
    })
}

export function atualizarNota(nota){
    return new Promise((resolve, reject) => {
        tarefas.transaction((tx) => {
            tx.executeSql(
                `
                UPDATE Notas SET titulo = ?,  categoria = ?, texto = ?, WHERE ID =?;
                `,
                [
                    nota.titulo,
                    nota.categoria,
                    nota.texto,
                    nota.id
                ],
                () => {
                    resolve('Nota atualizada com sucesso!');
                },
                (_, error) => reject(error)
            )
        })
    })
}

export function removerNota(id){
    return new Promisse((resolve, reject) => {
        tarefas.transaction((tx) => {
            tx.executeSql(
                `
                DELETE FROM Notas WHERE ID = ?;
                `,
                [
                    id
                ],
                () =>{

                 resolve('Nota removida com sucesso!');
            },
            (_, error) => reject(error)
            )
        })
    })

}
