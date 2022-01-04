import styled from "styled-components/native";

export const PageText = styled.Text`
    color: #fff;
    font-size: 20px;
`

export const LabelGrid = styled.View`
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
`

export const GameLabel = styled.Pressable`
    padding: 75px;
    background-color: ${props => props.color};
    margin: 10px;
`

export const ButtonHome = styled.Pressable`
    border-width: 2px;
    background-color: rgba(0, 0, 0, 0.7);
    padding: 20px;
    border-radius: 10px;
`

export const ButtonText = styled.Text`
    color: red;
    text-transform: uppercase;
    font-weight: 900;
`