import * as React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Home from './app/pages/Home.js'

const Stack = createStackNavigator();

export default class App extends React.Component{
  constructor(){
    super()
    this.state = {
      data: null
    }
  }

  componentDidMount(){
    this.init()
    this.getUser()
  }
  
  async init(){
    try {
      await sequelize.sync({
        force: true
      });

      await User.create({
        name: "Mike",
        email: "user@gmail.com"
      }).then(console.log);
    } catch (error) {
      console.log(error);
    }
  }

  async getUser(){
    try{
      const users = await User.findAll({
        attributes: ["email"], 
        where: {} 
      }).map(u => u.get("email"))  

      const userIds = JSON.stringify(users) 

      console.log(userIds);
    }catch(error){
      console.log(error);
    }
  }


  render(){
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName='Acceuil'>
          <Stack.Screen name="Acceuil" component={Home}/>
        </Stack.Navigator> 
      </NavigationContainer>
    )
  }

}