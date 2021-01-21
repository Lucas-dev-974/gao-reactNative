import React from 'react'
import { Card, Divider, ListItem } from 'react-native-elements'
import { Button, Text } from 'react-native'

export default class Computers extends React.Component{
    constructor(props){
        super(props)
        this.state = {
          timeSlot: []
        }
        this.addAssigns = this.addAssigns.bind(this)
    }

    componentDidMount(){
      this.buildHorraire()
    }

    async buildHorraire(){
      let assigns = []
      if(this.props.computer.assigns){
        let assigns = this.props.computer.assigns
      }

      let data = {}
      let timeSlot = []
  
      for(let i = 8; i <= 18; i++){
        if(assigns[i]){
          data = {
            houre: i,
            client: assigns.client
          }
        }else{
          data = {
            houre: i,
            client: ''
          }
        }
        timeSlot.push(data)
      }
  
      this.setState({ timeSlot: timeSlot })
    }

    async addAssigns(){
      console.log(this.props.computer);
    }

    render(){
      return(
        <Card>
            <Card.Title> {this.props.computer.name } </Card.Title>
            <Card.Divider></Card.Divider>
            { this.state.timeSlot.map((data, index) => (
                <ListItem key={index} bottomDivider>
                    <ListItem.Content>
                      <ListItem.Title>{ data.houre } H </ListItem.Title>
                    </ListItem.Content>
                    <Button title='add' onPress={this.addAssigns} />
                </ListItem>
            ))}
        </Card>        
      )

    }
}