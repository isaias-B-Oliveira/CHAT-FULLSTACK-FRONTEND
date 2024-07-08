import styled from "styled-components";

export const Container = styled.section`
    background: #fff;
    width: 450px;
    max-width: 450px;
    border-radius: 16px;
    box-shadow: 0 0 128px 0 rgba(0, 0, 0, 0.1),
        0 32px 64px -48px rgba(0, 0, 0, 0.5);
`;

export const Conteudo = styled.section`
    padding: 25px 30px;
`;

export const Header = styled.header`
    font-size: 25px;
    font-weight: 500;
    padding-bottom: 10px;
    border-bottom: 1px solid #e6e6e6;
    color: #6fbced;
`;

export const Form = styled.form`
    margin: 20px 0;
`;

export const Campo = styled.div`
    display: flex;
    margin-bottom: 10px;
    flex-direction: column;
    position: relative;
`;

export const Label = styled.label`
    margin-bottom: 4px;
    margin-top: 10px;
`;

export const Input = styled.input`
    height: 40px;
    width: 390px;
    font-size: 16px;
    padding: 0 10px;
    border-radius: 5px;
    border: 1px solid #ccc;
`;

export const Select = styled.select`
    height: 40px;
    width: 390px;
    font-size: 16px;
    padding: 0 10px;
    border-radius: 5px;
    border: 1px solid #ccc;
`;

export const BtnAcessar = styled.button`
    background: #6fbced;
    border: none;
    color: #fff;
    font-size: 17px;
    border-radius: 5px;
    cursor: pointer;
    padding: 10px;
    margin-top: 13px;
`;

export const ConteudoChat = styled.section`
    padding: 25px 0px;
`;

export const HeaderChat = styled.header`
    width: 450px;
    display: flex;
    align-items: center;
    padding: 18px 30px;
    color: #6fbced;
`;

export const ImgUsuario = styled.img`
    height: 45px;
    width: 45px;
    margin: 0 15px;
`;

export const NomeUsuario = styled.div`
    font-size: 17px;
    font-weight: 500;
`;

export const ChatBox = styled.div`
    position: relative;
    min-height: 500px;
    max-height: 500px;
    overflow-y: auto;
    padding: 10px 10px 20px 10px;
    background: #f7f7f7;
    box-shadow: inset 0 32px 32px -32px rgba(0 0 0 / 5%),
        inset 0 -32px 32px -32px rgba(0 0 0 / 5%);
`;

export const MsgEnviada = styled.div`
    margin: 15px 14px 15px 0px;
    display: flex;
`;

export const DetMsgEnviada = styled.div`
    margin-left: auto;
    max-width: calc(100% - 130px);
`;

export const TextomsgEnviada = styled.p`
    background: #6fbced;
    color: #fff;
    border-radius: 18px 18px 0 18px;
    word-wrap: break-word;
    padding: 8px 16px;
    box-shadow: 0 0 0 32px rgba(0 0 0 / 8%),
        0rem 16px 16px -16px rgba(0 0 0 / 10%);
`;

export const MsgResebida = styled.div`
    margin: 15px 0;
    display: flex;
    align-items: flex-end;
`;

export const DetMsgResebida = styled.div`
    margin-right: auto;
    margin-left: 10px;
    max-width: calc(100% - 130px);
`;

export const TextomsgResebida = styled.p`
    background: #58b666;
    color: #fff;
    border-radius: 18px 18px 18px 0;
    word-wrap: break-word;
    padding: 8px 16px;
    box-shadow: 0 0 0 32px rgba(0 0 0 / 8%),
        0rem 16px 16px -16px rgba(0 0 0 / 10%);
`;

export const EnviaMsg = styled.div`
    padding: 18px 0;
    display: flex;
    justify-content: space-between;
`;
