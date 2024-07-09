import React, { useEffect, useState } from "react";
import socketIoClient from "socket.io-client";

import {
    Container,
    Conteudo,
    Header,
    Form,
    Campo,
    Label,
    Input,
    Select,
    BtnAcessar,
    HeaderChat,
    ImgUsuario,
    NomeUsuario,
    ChatBox,
    ConteudoChat,
    MsgEnviada,
    DetMsgEnviada,
    TextomsgEnviada,
    MsgResebida,
    DetMsgResebida,
    TextomsgResebida,
    EnviaMsg,
    CampoMsg,
    BtmEnviaMsg,
} from "./styles/styles";

let socket;

function App() {
    const ENDPOINT = "http://localhost:8080/";

    const [logado, SetLogado] = useState(false);
    const [nome, SetNome] = useState("");
    const [sala, SetSala] = useState("");

    const [mensagem, SetMensagem] = useState("");
    const [listaMensagem, SetListaMensagem] = useState([]);

    useEffect(() => {
        socket = socketIoClient(ENDPOINT);
    }, []);

    useEffect(() => {
        socket.on("receber_mensagem", (dados) => {
            SetListaMensagem([...listaMensagem, dados]);
        });
    });

    const conectaSala = () => {
        console.log("Acessou a sala " + sala + " com usuario " + nome);
        SetLogado(true);
        socket.emit("sala_conectar", sala);
    };

    const enviarMensagem = async () => {
        console.log("mensagem: " + mensagem);
        const conteudoMensagem = {
            sala: sala,
            conteudo: {
                nome: nome,
                mensagem: mensagem,
            },
        };
        console.log(conteudoMensagem);
        await socket.emit("enviar_mensagem", conteudoMensagem);
        SetListaMensagem([...listaMensagem, conteudoMensagem.conteudo]);
        SetMensagem("");
    };

    return (
        <Container>
            {!logado ? (
                <Conteudo>
                    <Header>Meu chat...</Header>
                    <Form>
                        <Campo>
                            <Label>nome: </Label>
                            <Input
                                type="text"
                                placehold="nome"
                                name="nome"
                                value={nome}
                                onChange={(text) => {
                                    SetNome(text.target.value);
                                }}
                            />
                        </Campo>
                        <Campo>
                            <Label>Sala: </Label>

                            <Select
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
                            </Select>
                        </Campo>
                        <BtnAcessar onClick={conectaSala}>Entrar</BtnAcessar>
                    </Form>
                </Conteudo>
            ) : (
                <ConteudoChat>
                    <HeaderChat>
                        <ImgUsuario src="logo192.png" alt={nome} />
                        <NomeUsuario>{nome}</NomeUsuario>
                    </HeaderChat>
                    <ChatBox>
                        {listaMensagem.map((msg, key) => {
                            return (
                                <div key={key}>
                                    {nome === msg.nome ? (
                                        <MsgEnviada>
                                            <DetMsgEnviada>
                                                <TextomsgEnviada>
                                                    {msg.nome} : {msg.mensagem}
                                                </TextomsgEnviada>
                                            </DetMsgEnviada>
                                        </MsgEnviada>
                                    ) : (
                                        <MsgResebida>
                                            <DetMsgResebida>
                                                <TextomsgResebida>
                                                    {msg.nome} : {msg.mensagem}
                                                </TextomsgResebida>
                                            </DetMsgResebida>
                                        </MsgResebida>
                                    )}
                                </div>
                            );
                        })}
                    </ChatBox>
                    <EnviaMsg>
                        <CampoMsg
                            type="text"
                            name="mensagem"
                            placeholder="mensagem..."
                            value={mensagem}
                            onChange={(text) => {
                                SetMensagem(text.target.value);
                            }}
                        />
                        <BtmEnviaMsg onClick={enviarMensagem}>
                            Enviar
                        </BtmEnviaMsg>
                    </EnviaMsg>
                </ConteudoChat>
            )}
        </Container>
    );
}

export default App;
