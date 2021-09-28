import logoImg from '../../assets/logo.svg';

import { 
    MdDashboard, 
    MdArrowDownward, 
    MdArrowUpward, 
    MdExitToApp 
} from 'react-icons/md'

import { 
    Container, 
    Header, 
    LogoImg, 
    MenuContainer,
    MenuItemLink,
    Title
} from "./styles"


export const Aside: React.FC = () => {
    return (
        <Container>
            <Header>
                <LogoImg src={logoImg} alt="My Wallet" />
                <Title>My Wallet</Title>
            </Header>

            <MenuContainer>
                <MenuItemLink href="#">
                    <MdDashboard />
                    Dashboard
                </MenuItemLink>

                <MenuItemLink href="#">
                    <MdArrowDownward />
                    Entradas
                </MenuItemLink>

                <MenuItemLink href="#">
                    <MdArrowUpward />
                    Saidas
                </MenuItemLink>

                <MenuItemLink href="#">
                    <MdExitToApp />
                    Sair
                </MenuItemLink>
            </MenuContainer>
        </Container>
    )
}