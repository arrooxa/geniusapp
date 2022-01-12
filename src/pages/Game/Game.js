import React, { useState } from 'react';

import Container from '../styles';

import { ButtonHome, ButtonText, GameLabel, LabelGrid, PageText } from './styles'

const Game = ({navigation}) => {
    const correctGameSequence = [];

    const playerGameSequence = [];

    const [userLost, setUserLost] = useState(false);

    const hasUserLost = () => setUserLost(userLost => !userLost);


    function getRandomInt() {
        return Math.floor(Math.random() * (5 - 1)) + 1;
    }

    const nextGameColor = function () {
        const nextColor = getRandomInt();

        if(nextColor === 1) {
            correctGameSequence.push('blue');
        }else if(nextColor === 2){
            correctGameSequence.push('red');
        }else if(nextColor === 3){
            correctGameSequence.push('yellow');
        }else{
            correctGameSequence.push('green');
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
                    color={"#000066"}
                    onPressIn={() => handleGamePress('blue')}
                />
                
                <GameLabel 
                    color="#660000"
                    onPressIn={() => handleGamePress('red')}
                />
                
                <GameLabel 
                    color="#666600"
                    onPressIn={() => handleGamePress('yellow')}
                />
                
                <GameLabel 
                    color="#006600"
                    onPressIn={() => handleGamePress('green')}
                />

            </LabelGrid>
            }
        </Container>
    )
}

export default Game;