import React, { useState, useEffect } from 'react';

import Container from '../styles';

import { ButtonHome, ButtonText, GameLabel, LabelGrid, PageText } from './styles'

const Game = ({navigation}) => {

    // Bool para caso o player perca

    const [userLost, setUserLost] = useState(false);
    const hasUserLost = () => setUserLost(userLost => !userLost);

    // Bool para desativar o botão enquanto as cores mudam

    const [isChangingColor, setChangingColor] = useState(true);
    const hasColorsChanged = () => setChangingColor(bool => !bool);

    // State para a mudança da cor na sequência

    const [color, setColor] = useState({
        'blue': {
            index: 1, 
            active: false,
            colorDark: '#0000FF',
            colorLight: '#000066'
        },
        'red': {
            index: 2, 
            active: false,
            colorDark: '#FF0000',
            colorLight: '#660000'
        },
        'yellow': {
            index: 3, 
            active: false,
            colorDark: '#FFFF00',
            colorLight: '#666600'
        },
        'green': {
            index: 4,
            active: false,
            colorDark: '#00ff00',
            colorLight: '#006600'
        },
    })

    // Array para guardar os clicks do jogador

    const [arrayPlayerSequence, setArrayPlayerSequence] = useState([]);
    const emptyArrayPlayerSequence = () => setArrayPlayerSequence(oldArray => []);
    const [indexArray, setIndexArray] = useState(0);

    // Array para guardar a sequência do jogo

    const [arrayGameSequence, setArrayGameSequence] = useState([]);
    
    // Função para inicar o jogo/rodar a próxima sequência

    const nextGameColor = function () {
        const nextColor = Math.floor(Math.random() * (5 - 1)) + 1;
        console.log(nextColor);

        hasColorsChanged();

        setArrayGameSequence(oldArray => [...oldArray, nextColor]);
    };

    useEffect(() => nextGameColor(), []);


    // Função para lidar com a coloração sequencial dos quadrados

    const changeColor =  function() {
        const newState = {...color};
        let contAct = 0;
        let contDesac = 1;

        arrayGameSequence.forEach((i, index) => {
            if(arrayGameSequence[index-1] === i){
                contAct ++;
                contDesac++;
            }

            const timeoutActiveHandle = setTimeout(() => {
                activeColor(i, newState);
            }, 2000 * contAct);
    
            const timeoutDesactiveHandle = setTimeout(() => {
                desactiveColor(i, newState);
                clearTimeout(timeoutActiveHandle);

                if(index + 1 === arrayGameSequence.length){
                    hasColorsChanged();
                    emptyArrayPlayerSequence();
                    setIndexArray(index => 0);
                }
            }, 2000 * contDesac);
            contAct++;
            contDesac++;
        })

        
    }

    const activeColor = (i, newState) => {
        const clr = Object.keys(color).filter((item) => color[item].index === i);
        if(newState !== undefined){
            newState[clr].active = true;
            setColor({...newState});
        }else{
            const scopeNewState = {...color};
            scopeNewState[clr].active = true;
            setColor({...scopeNewState});
        }
    }

    const desactiveColor = (i, newState) => {
        const clr = Object.keys(color).filter((item) => color[item].index === i);
        if(newState !== undefined){
            newState[clr].active = false;
            setColor({...newState});
        }else{
            const scopeNewState = {...color};
            scopeNewState[clr].active = false;
            setColor({...scopeNewState});
        }
    }

    useEffect(() => {
        changeColor();
        }, [arrayGameSequence]);

    // Função para lidar com o click do Player

    function handleGamePress(numColor) {
        const newSequence = [...arrayPlayerSequence, numColor];
        setArrayPlayerSequence(newSequence);

        if(newSequence[indexArray] === arrayGameSequence[indexArray]){
            setIndexArray(index => index + 1);
                         
            const timeoutActiveHandle = setTimeout(() => {
                activeColor(numColor);
            }, 0);

            const timeoutDesactiveHandle = setTimeout(() => {
                desactiveColor(numColor);
                clearTimeout(timeoutActiveHandle);
            }, 500);

            if(JSON.stringify(newSequence).length === JSON.stringify(arrayGameSequence).length) {
                setTimeout(() => {
                    nextGameColor();
                }, 1500)
            }
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

                {Object.values(color).map((item) =>
                    <GameLabel 
                        key={item['index']}
                        color={item['active'] ? item['colorDark'] : item['colorLight']}
                        onPress={() => {
                            if(isChangingColor){
                                handleGamePress(item['index']);
                            }
                        }}
                    />
                )}

            </LabelGrid>
            }
        </Container>
    )
}

export default Game;