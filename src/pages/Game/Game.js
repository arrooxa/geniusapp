import React, { useState, useEffect } from 'react';

import Container from '../styles';

import { ButtonHome, ButtonText, GameLabel, LabelGrid, PageText } from './styles'

const Game = ({navigation}) => {

    // Bool para caso o player perca

    const [userLost, setUserLost] = useState(false);
    const hasUserLost = () => setUserLost(userLost => !userLost);

    // State para a mudança da cor na sequência

    const [color, setColor] = useState({
        'blue': {index: 1, active: false},
        'red': {index: 2, active: false},
        'yellow': {index: 3, active: false},
        'green': {index: 4, active: false},
    })

    // Array para guardar os clicks do jogador

    const [arrayPlayerSequence, setArrayPlayerSequence] = useState([]);

    // Array para guardar a sequência do jogo

    const [arrayGameSequence, setArrayGameSequence] = useState([]);
    
    // Função para inicar o jogo/rodar a próxima sequência

    const nextGameColor = function () {
        const nextColor = Math.floor(Math.random() * (5 - 1)) + 1;
        // console.log(nextColor);

        setArrayGameSequence(oldArray => [...oldArray, 2]);
    };

    useEffect(() => nextGameColor(), []);


    // Função para lidar com a coloração sequencial dos quadrados

    const changeColor =  function() {
        const newState = {...color};
        let contAct = 0;
        let contDesac = 1;
        arrayGameSequence.forEach((i, index) => {
            const timeoutActiveHandle = setTimeout(() => {
                ActiveColor(i, newState);
            }, 2000 * contAct);

            if(arrayGameSequence[index-1] === i){
                clearTimeout(timeoutDesactiveHandle);
            }

            const timeoutDesactiveHandle = setTimeout(() => {
                DesactiveColor(i, newState);
                clearTimeout(timeoutActiveHandle);
            }, 2000 * contDesac);
            contAct++
            contDesac++
            
        })
    }

    const ActiveColor = (i, newState) => {
        const clr = Object.keys(color).filter((item) => color[item].index === i)
        newState[clr].active = true
        setColor({...newState})
    }

    const DesactiveColor = (i, newState) => {
        const clr = Object.keys(color).filter((item) => color[item].index === i)
        newState[clr].active = false
        setColor({...newState})
    }

    useEffect(() => {
        changeColor();
        }, [arrayGameSequence]);

    // Função para lidar com o click do Player

    function handleGamePress(color) {
        const newSequence = [...arrayPlayerSequence, color];
        setArrayPlayerSequence(newSequence);

        if(JSON.stringify(newSequence) === JSON.stringify(arrayGameSequence)) {
            nextGameColor();
        }else{
            hasUserLost();
        }
    }

    return (
        <Container>
            
            <PageText>
                GeniusApp!
            </PageText>

            { userLost && 
                <Container>
                    <PageText>
                        Você perdeu!
                    </PageText>
                    <ButtonHome onPressIn={() => navigation.navigate('Home')}>
                        <ButtonText>Clique aqui para voltar para a Home!</ButtonText>
                    </ButtonHome>
                </Container>
            }
            
            { !userLost && 
                <LabelGrid>

                <GameLabel 
                    color={color.blue.active ? "#0000FF" : "#000066"}
                    onPress={() => handleGamePress(1)}
                />
                
                <GameLabel 
                    color={color.red.active ? "#FF0000" : "#660000"}
                    onPress={() => handleGamePress(2)}
                />
                
                <GameLabel 
                    color={color.yellow.active ? "#FFFF00" : "#666600"}
                    onPress={() => handleGamePress(3)}
                />
                
                <GameLabel 
                    color={color.green.active ? "#00ff00" : "#006600"}
                    onPress={() => handleGamePress(4)}
                />

            </LabelGrid>
            }
        </Container>
    )
}

export default Game;