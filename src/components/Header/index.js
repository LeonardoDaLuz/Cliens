import { HeaderStyles, LogoBlock, SearchBlock, MenuBlock } from "./style";
import { Icon } from "../../globalStyle";
import assets from "../../assets";

export default function Header() {
    return(
        <HeaderStyles>
            
            <LogoBlock><Icon src={assets.cliens_icon} width='120px' height='50px' /></LogoBlock>
            <SearchBlock></SearchBlock>
            <MenuBlock></MenuBlock>
        </HeaderStyles>

    );
}