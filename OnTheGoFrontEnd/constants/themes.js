import { Dimensions } from "react-native"
const{width,height} = Dimensions.get('window')
export const COLORS={
    white:"#fff",
    background: "#fff",
    black:'#171717',
    themeblue:'#0E86D4',
    themegreen:'#9DCC5F',
    red:'rgba(240, 185, 185, 0.8)',
    babyblue:'#68BBE3',
    blue:'#055C9D',
    royalblue:'#278ED5',
    navyblue:'#1F4591',
    darkgreen:'#335120',
    lint:'#BACC81',
    neongreen:'#5CD85A',
    green:'#59981A',
    yellowgreen:'#ECF87F',
    limegreen:'#81B622',
    light:'lightgray'
}

export const SIZES={
    padding:10,
    width,
    height,
    base:8,
    double:16

}
const theme ={COLORS,SIZES}
export default theme;