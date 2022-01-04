import React, { useState } from 'react'
import { Button } from 'react-native';

import Container from '../styles'

import { ButtonHome, ButtonText, GameLabel, LabelGrid, PageText } from './styles'

const Game = ({navigation}) => {

    const [userLost, setUserLost] = useState(false);

    const hasUserLost = () => setUserLost(userLost => !userLost);

    return (
        <Container>
            { userLost && 
                <ButtonHome onPress={() => navigation.navigate('Home')}>
                    <ButtonText>Voltar para a Home!</ButtonText>
                </ButtonHome>
            }

            <PageText>
                GeniusApp!  
            </PageText>

            <LabelGrid>

                <GameLabel 
                    color="red"
                />
                
                <GameLabel 
                    color="green"
                />
                
                <GameLabel 
                    color="yellow"
                />
                
                <GameLabel 
                    color="blue"
                />

            </LabelGrid>

        </Container>
    )
}

export default Game;