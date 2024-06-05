import React, { useEffect, useState } from "react";
import socketIoClient from "socket.io-client";

let socket;

function App() {
    const ENDPOINT = " http://localhost:8080/";

    const [logado, SetLogado] = useState(false);
    const [nome, SetNome] = useState("");
    const [sala, SetSala] = useState("");

    useEffect(() => {
        socket = socketIoClient(ENDPOINT);
    }, []);

    const conectaSala = () => {
        console.log("Acessou a sala " + sala + " com usuario " + nome);
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
                    /> */}
                    <br></br>
                    <br></br>
                    <select
                        name="sala"
                        value={sala}
                        onChange={(text) => SetSala(text.target.value)}
                    >
                        <option value="">selecione</option>
                        <option value="1">Node.js</option>
                        <option value="2">React</option>
                        <option value="3">PHP</option>
                        <option value="4">HTML</option>
                    </select>

                    <button onClick={conectaSala}>Entrar</button>
                </>
            ) : (
                "logado"
            )}
        </div>
    );
}

export default App;
