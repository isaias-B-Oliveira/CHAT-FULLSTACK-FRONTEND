import React, { useEffect, useState } from "react";
import socketIoClient from "socket.io-client";

let socket;

function App() {
    const ENDPOINT = "http://localhost:8080/";

    const [logado, SetLogado] = useState(false);
    const [nome, SetNome] = useState("");
    const [sala, SetSala] = useState("");

    const [mensagem, SetMensagem] = useState("");

    useEffect(() => {
        socket = socketIoClient(ENDPOINT);
    }, []);

    const conectaSala = () => {
        console.log("Acessou a sala " + sala + " com usuario " + nome);
        SetLogado(true);
        socket.emit("sala_conectar", sala);
    };

    const enviarMensagem = async () => {
        console.log("mensagem: " + mensagem);
    };

    return (
        <div>
            <h1>Chat</h1>
            {!logado ? (
                <>
                    <label>nome: </label>
                    <input
                        type="text"
                        placehold="nome"
                        name="nome"
                        value={nome}
                        onChange={(text) => {
                            SetNome(text.target.value);
                        }}
                    />
                    <br></br>
                    <br></br>
                    <label>Sala: </label>
                    {/* <input
                        type="text"
                        placehold="Sala"
                        name="sala"
                        value={sala}
                        onChange={(text) => {
                            SetSala(text.target.value);
                        }}
                    />
                    <br></br>
                    <br></br> */}
                    <select
                        name="sala"
                        value={sala}
                        onChange={(text) => {
                            SetSala(text.target.value);
                        }}
                    >
                        <option value="">selecione</option>
                        <option value="1">Node.js</option>
                        <option value="2">React</option>
                        <option value="3">PHP</option>
                        <option value="4">HTML</option>
                    </select>
                    <br></br>
                    <button onClick={conectaSala}>Entrar</button>
                </>
            ) : (
                <>
                    <input
                        type="text"
                        placeholder="mensagem..."
                        onChange={(text) => {
                            SetMensagem(text.target.value);
                        }}
                    />
                    <button onClick={enviarMensagem}>Enviar</button>
                </>
            )}
        </div>
    );
}

export default App;
