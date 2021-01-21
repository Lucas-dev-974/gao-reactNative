import React from 'react'
import { ScrollView}  from 'react-native'
import {Button} from 'react-native-elements'
import { Col, Row, Grid } from "react-native-easy-grid"

import DatePicker from 'react-native-datepicker'
import AddComputer from '../components/addComputer.js'
import Computer from '../components/computer.js'

import * as SQLite from "expo-sqlite";
import Sequelize from "rn-sequelize";

const Op = Sequelize.Op;
const Model = Sequelize.Model;

const sequelize = new Sequelize({
    dialectModule: SQLite,
    database: "data",
    dialectOptions: {
        version: "1.0",
        description: "Test DB"
        //size: 2 * 1024 * 1024
    }
})

class Computers extends Model{}
class Assignements extends Model{}
class Clients extends Model{}

Clients.init(
    {
        name: Sequelize.STRING,
        lastName: Sequelize.STRING
    }, 
    {
        sequelize,
        modelName: 'Clients'
    }
)

Computers.init(
    {
        name: Sequelize.STRING,
    },
    {
        sequelize,
        modelName: 'Computers'
    }
)

Assignements.init(
    {   
        houre: Sequelize.INTEGER,
        date: Sequelize.DATE,
        computer: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references:{
                model: 'Computers',
                key: 'id'
            }  
        },
        client:  {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: 'Clients',
                key: 'id'
            }
        },
    },
    {
        sequelize,
        modelName: 'Assignements'
    }
)

export default class HOME extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            computers: [],
            date: new Date,
        }

        this.getComputers   = this.getComputers.bind(this)
        this.updateView     = this.updateView.bind(this)
        this.reinitDataBase = this.reinitDataBase.bind(this)
    }

    componentDidMount(){
        this.getComputers()
        // this.assignsAdd(new Date, 8, 1, 1)
        this.assignsGet()
    }

    async assignsAdd(date, houre, computer, client){
        try {
            await Assignements.create({
              houre: houre,
              date: date,
              computer: computer,
              client: client
            })
            .then(
                console.log,
                this.updateView()
            );
        } catch (error) {
            console.log(error);
        }
    }

    async assignsGet(){
        try{
            await this.setState({ computers: [] })
            const assigns = await Assignements.findAll( {
                attributes: ['id', 'houre', 'date', 'client', 'computer'],
                where: {}
            }).then(console.log)
          }catch(error){
            console.log(error);
          }
    }

    async clientAdd(name, lastName){
        try {
            await Clients.create({
              name: name,
              lastName: lastName
            })
            .then(
                console.log,
                this.updateView()
            );
        } catch (error) {
            console.log(error);
        }
    }

    async computerAdd(name){
        try {
            
            await Computers.create({
              name: name,
            })
            .then(
                console.log,
                this.updateView()
            );
        } catch (error) {
            console.log(error);
        }
    }

    async getComputers(){
        try{
            await this.setState({ computers: [] })
            const computers = await Computers.findAll( {
                attributes: ['name', 'id'],
                where: {}
            })
            this.setState({ computers: computers})
          }catch(error){
            console.log(error);
          }
    }

    async updateView(){
        this.setState({ computers: []})
        this.getComputers();
    }

    async reinitDataBase(){
        await sequelize.sync({
            force: true
         });
        this.updateView()
    }

    test(){

    }

    render(){
        return(
            <ScrollView>
                <Grid>
                    <Row>
                        <Col size={50}>
                            <DatePicker
                                style={{width: 200}}
                                date={this.state.date}
                                mode="date"
                                placeholder="select date"
                                format="YYYY-MM-DD"
                                confirmBtnText="Confirm"
                                cancelBtnText="Cancel"
                                customStyles={{
                                dateIcon: {
                                    position: 'absolute',
                                    left: 0,
                                    top: 4,
                                    marginLeft: 0
                                },
                                dateInput: {
                                    marginLeft: 1
                                }
                                // ... You can check the source to find the other keys.
                                }}
                                onDateChange={(date) => {this.setState({date: date})}}
                            />                        
                        </Col>
                        <AddComputer add={this.computerAdd}  updateView={this.updateView}></AddComputer>
                    </Row>
                    <Row>
                        <Button title='Réinitialiser la bdd' onPress={this.reinitDataBase}/>
                    </Row>
                    { this.state.computers.map((computer, index) => (
                        <Row>
                            <Col size={100}>
                                <Computer computer={computer} />
                            </Col>
                        </Row>
                    ))}
                </Grid>
            </ScrollView>
        )
    }
} 