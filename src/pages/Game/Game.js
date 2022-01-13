import React, { useState, useEffect } from 'react';

import Container from '../styles';

import { ButtonHome, ButtonText, GameLabel, LabelGrid, PageText } from './styles'

const Game = ({navigation}) => {

    const [arrayPlayerSequence, setArrayPlayerSequence] = useState([]);

    const [arrayGameSequence, setArrayGameSequence] = useState([]);

    useEffect(() => nextGameColor(), []);

    const [colorBool, setColorBool] = useState({
        blueColor: false,
        redColor: false,
        yellowColor: false,
        greenColor: false,
    });

    const [userLost, setUserLost] = useState(false);

    const handleLightColor = (newColor, {blueColor = false, redColor = false, yellowColor = false, greenColor = false}) => {

        setArrayGameSequence(oldArray => [...oldArray, newColor]);

        setColorBool(color => ({
            ...color, blueColor, yellowColor, redColor, greenColor,
        }))
        setTimeout(() => {
            setColorBool(color => ({
                ...color, blueColor: false, yellowColor: false, redColor: false, greenColor: false,
            }))
        }, 2000)
    }

    const hasUserLost = () => setUserLost(userLost => !userLost);

    function getRandomInt() {
        return Math.floor(Math.random() * (5 - 1)) + 1;
    }

    const nextGameColor = function () {
        const nextColor = getRandomInt();
        console.log(nextColor);

        switch(nextColor) {
            case 1: 
                handleLightColor('blue', {blueColor: true});
                break;
            case 2:
                handleLightColor('red', {redColor: true});
                break;
            case 3:
                handleLightColor('yellow', {yellowColor: true});
                break;
            default:
                handleLightColor('green', {greenColor: true});
                break;
        }
    };

    function handleGamePress(color) {
        const newSequence = [...arrayPlayerSequence, color];
        setArrayPlayerSequence(newSequence);
        console.log(newSequence);
        console.log(arrayGameSequence);

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
                    color={colorBool.blueColor ? "#0000FF" : "#000066"}
                    onPress={() => handleGamePress('blue')}
                />
                
                <GameLabel 
                    color={colorBool.redColor ? "#FF0000" : "#660000"}
                    onPress={() => handleGamePress('red')}
                />
                
                <GameLabel 
                    color={colorBool.yellowColor ? "#FFFF00" : "#666600"}
                    onPress={() => handleGamePress('yellow')}
                />
                
                <GameLabel 
                    color={colorBool.greenColor ? "#00ff00" : "#006600"}
                    onPress={() => handleGamePress('green')}
                />

            </LabelGrid>
            }
        </Container>
    )
}

export default Game;