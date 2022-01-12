import React, { useState } from 'react';

import Container from '../styles';

import { ButtonHome, ButtonText, GameLabel, LabelGrid, PageText } from './styles'

const Game = ({navigation}) => {
    const correctGameSequence = [];

    const playerGameSequence = [];

    const [userLost, setUserLost] = useState(false);

    const [blueColor, setLightBlue] = useState(false);
    const [redColor, setLightRed] = useState(false);
    const [yellowColor, setLightYellow] = useState(false);
    const [greenColor, setLightGreen] = useState(false);

    const hasUserLost = () => setUserLost(userLost => !userLost);


    function getRandomInt() {
        return Math.floor(Math.random() * (5 - 1)) + 1;
    }

    const nextGameColor = function () {
        const nextColor = getRandomInt();

        if(nextColor === 1) {
            correctGameSequence.push('blue');
            setLightBlue(blueColor => !blueColor); // Estudar React Hooks
        }else if(nextColor === 2){
            correctGameSequence.push('red');
            setLightRed(redColor => !redColor); // Estudar React Hooks
        }else if(nextColor === 3){
            correctGameSequence.push('yellow');
            setLightYellow(yellowColor => !yellowColor); // Estudar React Hooks
        }else{
            correctGameSequence.push('green');
            setLightGreen(greenColor => !greenColor); // Estudar React Hooks
        }
    };

    function handleGamePress(color) {
        playerGameSequence.push(color);
        console.log(correctGameSequence);
        console.log(playerGameSequence);
        
        if(JSON.stringify(playerGameSequence) === JSON.stringify(correctGameSequence)) {
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
                    color={blueColor ? "#0000FF" : "#000066"}
                    onPressIn={() => handleGamePress('blue')}
                />
                
                <GameLabel 
                    color={redColor ? "#FF0000" : "#660000"}
                    onPressIn={() => handleGamePress('red')}
                />
                
                <GameLabel 
                    color={yellowColor ? "#ffff00" : "#666600"}
                    onPressIn={() => handleGamePress('yellow')}
                />
                
                <GameLabel 
                    color={greenColor ? "#00ff00" : "#006600"}
                    onPressIn={() => handleGamePress('green')}
                />

            </LabelGrid>
            }
        </Container>
    )
}

export default Game;