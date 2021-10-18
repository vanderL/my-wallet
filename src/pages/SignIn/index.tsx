import { Input } from '../../components/Input';
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

            <Form onSubmit={() => console.log('Form submitted')}>
                <FormTitle> Entrar </FormTitle>

                <Input 
                    type="email" 
                    placeholder="E-mail"
                    required={true}
                />
                <Input
                    placeholder="Senha"
                    type="password" 
                    required={true}
                />

                <button type="submit">Acessar</button>
            </Form>
        </Container>
    )
}