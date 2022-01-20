import React, { useState, useEffect } from 'react';

import Container from '../styles';

import { ButtonHome, ButtonText, GameLabel, LabelGrid, PageText } from './styles'

const Game = ({navigation}) => {

    const [userLost, setUserLost] = useState(false);

    const hasUserLost = () => setUserLost(userLost => !userLost);

    const [color, setColor] = useState({
        'blue': {index: 1, active: false},
        'red': {index: 2, active: false},
        'yellow': {index: 3, active: false},
        'green': {index: 4, active: false},
    })

    const [arrayPlayerSequence, setArrayPlayerSequence] = useState([]);

    const arrayGameSequence = [];
    
    const nextGameColor = function () {
        const nextColor = Math.floor(Math.random() * (5 - 1)) + 1;
        console.log(nextColor);

        arrayGameSequence.push(nextColor);
    };

    useEffect(() => nextGameColor(), []);
    
    function setIntervalX(callback, delay, repetitions) {
        var x = 0;
        var intervalID = setInterval(function () {
    
           callback();
    
           if (++x === repetitions) {
               clearInterval(intervalID);
           }
        }, delay);
    }

    const changeColor =  function() {
        const newState = {...color};

        for(let i of arrayGameSequence){
            setIntervalX(() => {
                const clr = Object.keys(color).filter((item) => color[item].index === i);
                newState[clr].active = !color[clr].active;
                setColor({...newState})
            }, 2000, 2)
        }
    }

    useEffect(() => {
        changeColor();
        console.log(arrayGameSequence);
    }, [arrayGameSequence]);

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