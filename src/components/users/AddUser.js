import React, { useState } from "react";

import classes from "./AddUser.module.css";
import Card from "../UI/Card";
import Button from "../UI/Button";
import ErrorModel from "../UI/ErrorModel";

const AddUser = props => {

    const [enteredUserName,setEnteredUserName] = useState('');
    const [enteredAge,setEnteredAge] = useState('');
    const [error, setError] = useState();

    const addUserHandler = (event) =>{
        event.preventDefault();
        if(enteredUserName.trim().length === 0 || enteredAge.trim().length === 0){
            setError({
                title:'Invalid input',
                message: 'Please enter a valid name and age (non-empty values).'
            });
            return;
        } 
        if(+enteredAge < 1){
            setError({
                title:'Invalid age',
                message: 'Please enter a valid age (> 0).'
            });
            return;
        }
        props.onAddUser(enteredUserName,enteredAge);
        setEnteredAge('');
        setEnteredUserName('');
    }

    const usernameChangeHandler = (event) => {
        setEnteredUserName(event.target.value);
    }

    const ageChangeHandler = (event) => {
        setEnteredAge(event.target.value);
    }

    const errorHandler = () => {
        setError(null);
    }

    return(
        <div>
            {error && <ErrorModel title={error.title} message={error.message} onConfirm={errorHandler}></ErrorModel>}
        
            <Card className={classes.input}>
                <form onSubmit={addUserHandler}>
                    <label htmlFor="username" >User Name</label>
                    <input type='text' value={enteredUserName} id='username' onChange={usernameChangeHandler}/> 
                    <label htmlFor="age">Age (Years)</label>
                    <input type='numbers' value={enteredAge} id='age' onChange={ageChangeHandler}/> 
                    <Button type="submit">Add User</Button>
                </form>
            </Card>
        </div>
    );
};

export default AddUser;