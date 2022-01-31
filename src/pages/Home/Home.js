import React, { Component } from 'react'

import Container from '../styles';

import { DevelopText, IconImage, ButtonStart, ButtonText, GameText } from './styles'

const Home = ({navigation}) => {
    return (
        <Container>
            <IconImage
                source={require('../../assets/logo.png')}
            />
            <GameText>
                Genius Game!
            </GameText>

            <ButtonStart
                onPress={() => {
                    navigation.navigate('Game');
                }}
            >
                <ButtonText>Jogar agora!</ButtonText>
            </ButtonStart>
            
            <DevelopText>
                Desenvolvido por Vitor Rocha Cambuí
            </DevelopText>
        </Container>
    )
}

export default Home;