import React, { useState, useEffect } from 'react';

import Container from '../styles';

import { ButtonHome, ButtonText, GameLabel, LabelGrid, PageText } from './styles'

const Game = ({navigation}) => {
    const [arrayGameSequence, setArrayGameSequence] = useState([]);

    const [arrayPlayerSequence, setArrayPlayerSequence] = useState([]);

    const [userLost, setUserLost] = useState(false);

    const [blueColor, setBlueColor] = useState(false);
    const changeBlueColor = () => setBlueColor(color => !color);
    const [redColor, setRedColor] = useState(false);
    const changeRedColor = () => setRedColor(color => !color);
    const [yellowColor, setYellowColor] = useState(false);
    const changeYellowColor = () => setYellowColor(color => !color);
    const [greenColor, setGreenColor] = useState(false);
    const changeGreenColor = () => setGreenColor(color => !color);


    const hasUserLost = () => setUserLost(userLost => !userLost);

    function getRandomInt() {
        return Math.floor(Math.random() * (5 - 1)) + 1;
    }

    const nextGameColor = function () {
        const nextColor = getRandomInt();
        console.log(nextColor);

        switch(nextColor) {
            case 1: 
                setArrayGameSequence(oldArray => [...oldArray, 1]);
                changeBlueColor();
                break;
            case 2:
                setArrayGameSequence(oldArray => [...oldArray, 2]);
                changeRedColor();
                break;
            case 3:
                setArrayGameSequence(oldArray => [...oldArray, 3]);
                changeYellowColor();
                break;
            default:
                setArrayGameSequence(oldArray => [...oldArray, 4]);
        }

        arrayGameSequence.map((color, index) => {
            
        })
    };

    function handleGamePress(color) {
        playerGameSequence.push(color);
        console.log(arrayGameSequence);
        console.log(playerGameSequence);
        
        if(JSON.stringify(playerGameSequence) === JSON.stringify(arrayGameSequence)) {
            nextGameColor();
        }else{
            hasUserLost();
        }
    }

    nextGameColor();

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
                    color={blueColor ?  "#0000FF" : "#000066"}
                    onPressIn={() => handleGamePress(1)}
                />
                
                <GameLabel 
                    color={redColor ? "#FF0000" : "#660000"}
                    onPressIn={() => handleGamePress(2)}
                />
                
                <GameLabel 
                    color={yellowColor ? "#ffff00" : "#666600"}
                    onPressIn={() => handleGamePress(3)}
                />
                
                <GameLabel 
                    color={greenColor ? "#00ff00" : "#006600"}
                    onPressIn={() => handleGamePress(4)}
                />

            </LabelGrid>
            }
        </Container>
    )
}

export default Game;