import { Grid } from "./styles"
import {Header} from '../Header';
import {Aside} from '../Aside';
import {Content} from '../Content';

export const Layout: React.FC = ({ children }) => {
    return (
        <Grid>
            <Aside />
            <Header/>
            <Content>
                { children } 
            </Content>
        </Grid>
    )
}