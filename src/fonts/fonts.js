import { createGlobalStyle } from 'styled-components'
import Dongle from './Dongle.woff'


export default createGlobalStyle`
    @font-face {
        font-family: "Dongle";
        src: local("Dongle"),
        url(${Dongle}) format('woff');
        font-weight: 300;
        font-style: normal;
    }
`;