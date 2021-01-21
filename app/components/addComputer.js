import React from 'react'
import { Col, Row, Grid } from "react-native-easy-grid"
import {Button, Overlay, Text, Input} from 'react-native-elements'
import {View} from 'react-native'

export default class addComputer extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            computerName: '',
            open: false,
            classes: {
                modal:{
                    width: 350,
                    padding: 15
                },
            }
        }

        this.handleOverlay = this.handleOverlay.bind(this)
    }

    async handleOverlay(){
        await this.setState({open: !this.state.open})
    }

    async handleInputName(value){
        await this.setState({computerName: value})
    }

    addComputer = () =>{
        this.props.add(this.state.computerName)
        this.setState({open: false})
    }
    
    render(){
        return(
            <Col size={50}>
                <Button title='Add' onPress={this.handleOverlay}/>

                <Overlay  isVisible={this.state.open} onBackdropPress={this.handleOverlay}>
                    <View style={this.state.classes.modal}>
                        <Input  placeholder="Nom de l'ordinateur" value={this.state.computerName} onChangeText={value => this.setState({ computerName: value })}/>
                        <Button  title='Ajouter' onPress={this.addComputer}/>
                    </View>
                </Overlay>
            </Col>
        )
    }
}