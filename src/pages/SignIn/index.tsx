import { 
    Container, 
    Form, 
    FormTitle, 
    Logo 
} from "./styles";

import logoImg from '../../assets/logo.svg'

export const SingIn: React.FC = () => {
    return (
        <Container>
            <Logo>
                <img src={logoImg} alt="Minha Carteira" />
                <h2>Minha Carteira</h2>
            </Logo>

            <Form>
                <FormTitle> Entrar </FormTitle>

                <input type="text" />
                <input type="password" />

                <button type="submit">Acessar</button>
            </Form>
        </Container>
    )
}