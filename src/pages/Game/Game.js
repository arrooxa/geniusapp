import React, { useState, useEffect } from 'react';

import Container from '../styles';

import { ButtonHome, ButtonText, GameLabel, LabelGrid, PageText } from './styles'

const Game = ({navigation}) => {

    const [userLost, setUserLost] = useState(false);

    const hasUserLost = () => setUserLost(userLost => !userLost);

    const [redColor, setRedColor] = useState(false);
    const [blueColor, setBlueColor] = useState(false);
    const [yellowColor, setYellowColor] = useState(false);
    const [greenColor, setGreenColor] = useState(false);

    const [arrayPlayerSequence, setArrayPlayerSequence] = useState([]);

    const [arrayGameSequence, setArrayGameSequence] = useState([]);

    useEffect(() => {
        arrayGameSequence.forEach((item) => {
            switch(item){
                case 'blue':
                    setBlueColor(color => !color);
                    setTimeout(() => {
                        setBlueColor(color => !color);
                    }, 2000)
                    break;
                case 'red':
                    setRedColor(color => !color);
                    setTimeout(() => {
                        setRedColor(color => !color);
                    }, 2000)
                    break;
                case 'yellow':
                    setYellowColor(color => !color);
                    setTimeout(() => {
                        setYellowColor(color => !color);
                    }, 2000)
                    break;
                default: 
                    setGreenColor(color => !color);
                    setTimeout(() => {
                        setGreenColor(color => !color);
                    }, 2000)
                    break;
            }
        })
    }, [arrayGameSequence])

    const nextGameColor = function () {
        const nextColor = Math.floor(Math.random() * (5 - 1)) + 1;
        console.log(nextColor);

        switch(nextColor) {
            case 1: 
                setArrayGameSequence(oldArray => [...oldArray, 'blue']);
                break;
            case 2:
                setArrayGameSequence(oldArray => [...oldArray, 'red']);
                break;
            case 3:
                setArrayGameSequence(oldArray => [...oldArray, 'yellow']);
                break;
            default:
                setArrayGameSequence(oldArray => [...oldArray, 'green']);
                break;
        }
    };

    useEffect(() => nextGameColor(), []);

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
                    color={blueColor ? "#0000FF" : "#000066"}
                    onPress={() => handleGamePress('blue')}
                />
                
                <GameLabel 
                    color={redColor ? "#FF0000" : "#660000"}
                    onPress={() => handleGamePress('red')}
                />
                
                <GameLabel 
                    color={yellowColor ? "#FFFF00" : "#666600"}
                    onPress={() => handleGamePress('yellow')}
                />
                
                <GameLabel 
                    color={greenColor ? "#00ff00" : "#006600"}
                    onPress={() => handleGamePress('green')}
                />

            </LabelGrid>
            }
        </Container>
    )
}

export default Game;