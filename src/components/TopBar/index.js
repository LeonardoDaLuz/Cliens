import assets from "../../assets";
import colorTheme from "../../colorTheme";
import { Header, HeaderLogo } from "./style";

export const Topbar = () => {
    console.log(colorTheme.secondary.hex())
    return (
        <Header>
          
            <HeaderLogo />
            
        </Header>
    );
}