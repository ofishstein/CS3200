'use strict'
import React from 'react'
import Card from 'material-ui/Card';
import CardHeader from 'material-ui/Card/CardHeader';
import CardText from 'material-ui/Card/CardText';
import CardActions from 'material-ui/Card/CardActions'
import FlatButton from 'material-ui/FlatButton'
import _ from 'lodash'
import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
} from 'material-ui/Table';


const MovieComponent = ({id, image, name, releasedate, credits, fromSearch, theaterid, love, order, userid}) => (

    <Card>
        <CardHeader
            title={name}
            subtitle={releasedate}
            avatar={image}

        />
        <CardText >
            {credits?
                <div>
                    <br/>
                    <span>Credits</span>
                    <Table selectable={false}>
                        <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
                            <TableRow>
                                <TableHeaderColumn>Role</TableHeaderColumn>
                                <TableHeaderColumn>First Name</TableHeaderColumn>
                                <TableHeaderColumn>Last Name</TableHeaderColumn>
                            </TableRow>
                        </TableHeader>
                        <TableBody displayRowCheckbox={false} >
                            {
                                _.map(credits[0].credits, (person) => {
                                    return <TableRow>
                                        <TableRowColumn>{person.role}</TableRowColumn>
                                        <TableRowColumn>{person.firstName}</TableRowColumn>
                                        <TableRowColumn>{person.lastName}</TableRowColumn>
                                    </TableRow>

                                })

                            }


                        </TableBody>
                    </Table>
                </div>: null
            }
        </CardText>
        <CardActions>
            {fromSearch? <FlatButton label="Love" onClick={() =>{love(id, userid)}} />: null}
            {fromSearch? <FlatButton label="Order" onClick={()=> {order(id, theaterid, userid)}} /> : null}
        </CardActions>
    </Card>



)




export default MovieComponent
