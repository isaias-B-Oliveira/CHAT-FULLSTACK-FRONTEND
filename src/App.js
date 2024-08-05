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

import api from "./config/configApi";

let socket;

function App() {
    const ENDPOINT = "http://localhost:8080/";

    const [logado, SetLogado] = useState(false);
    const [usuarioId, SetUsuarioId] = useState("");
    const [email, SetEmail] = useState("");
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

    const conectaSala = async (e) => {
        e.preventDefault();
        console.log("Acessou a sala " + sala + " com o email " + email);

        const headers = {
            "Content-Type": "application/json",
        };

        await api
            .post("/validar-acesso", { email }, { headers })
            .then((response) => {
                console.log(response.data.mensagem);
                console.log(response.data.dadosUsuario.id);
                console.log(response.data.dadosUsuario.nome);

                SetNome(response.data.dadosUsuario.nome);
                SetUsuarioId(response.data.dadosUsuario.id);
                SetLogado(true);
                socket.emit("sala_conectar", sala);
                listaMensagens();
            })
            .catch((err) => {
                if (err.response) {
                    console.log(err.response.data.mensagem);
                } else {
                    console.log("erro: tente mais tarde");
                }
            });
    };

    const listaMensagens = async () => {
        await api
            .get("/lista-mensagem/" + sala)
            .then((response) => {
                console.log(response);
                console.log(response.data.mensagens);
                SetListaMensagem(response.data.mensagens);
            })
            .catch((err) => {
                if (err.response) {
                    console.log(err.response.data.mensagem);
                } else {
                    console.log("erro: tente mais tarde");
                }
            });
    };

    const enviarMensagem = async (e) => {
        e.preventDefault();
        console.log("mensagem: " + mensagem);
        const conteudoMensagem = {
            sala: sala,
            conteudo: {
                mensagem: mensagem,
                usuario: {
                    id: usuarioId,
                    nome: nome,
                },
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
                    <Form onSubmit={conectaSala}>
                        <Campo>
                            <Label>Email: </Label>
                            <Input
                                type="text"
                                placehold="email"
                                name="email"
                                value={email}
                                onChange={(text) => {
                                    SetEmail(text.target.value);
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
                        <BtnAcessar>Entrar</BtnAcessar>
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
                    <EnviaMsg onSubmit={enviarMensagem}>
                        <CampoMsg
                            type="text"
                            name="mensagem"
                            placeholder="mensagem..."
                            value={mensagem}
                            onChange={(text) => {
                                SetMensagem(text.target.value);
                            }}
                        />
                        <BtmEnviaMsg>Enviar</BtmEnviaMsg>
                    </EnviaMsg>
                </ConteudoChat>
            )}
        </Container>
    );
}

export default App;
