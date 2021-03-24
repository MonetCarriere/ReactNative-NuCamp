import React, { Component } from 'react';
import { View, Button, StyleSheet } from 'react-native';
import { Input, CheckBox } from 'react-native-elements';   //helps us create the form
import * as SecureStore from 'expo-secure-store';

class Login extends Component {

    constructor(props) {
        super(props);

        this.state = {        //here we use state o hold the username and password which will initalize to empty strings and to hold the state for the 'remember me?' checkbox on the form
            username: '',
            password: '',
            remember: false
        };
    }

    static navigationOptions = {
        title: 'Login'
    }

    handleLogin() {
        console.log(JSON.stringify(this.state));   //here we're logging the state to the console
        if (this.state.remember) {    //here this is the code we use to implement the secure store. This code is checking if the 'remember me' checkbox is checked and if it is, we'll save the username and password to the secure store using the setItemAync method
            SecureStore.setItemAsync(
                'userinfo',           //here 'userInfo is the key
                JSON.stringify({      //here username: & password is the value. *ALL VALUES HAVE TO BE CONVERTED TO A JSON STRING USING JSON.stringify METHOD BEFORE YOU CAN STIRE IT.*
                    username: this.state.username,
                    password: this.state.password
                })
            ).catch(error => console.log('Could not save user info', error));   //all the secure store methods return a promise that will reject if there is an error. You can check for a rejected promise by using the catch method at the end of the option. Any error message will be automatically passed in as a argument
        } else {    //here were handeling the logic for if the 'remember me' checkbox isn't checked. If it's not checked then we're going to delete any user info in the secure store. To do this, we use the deleteItemSsync method to delete any data stored under the key of 'userInfo'
            SecureStore.deleteItemAsync('userinfo').catch(
                error => console.log('Could not delete user info', error)  //this handels if there is an error from the deleteItem Aync promise
            );
        }
    }

    componentDidMount() {     //since the user info gets deleted from the store, if the remember me checkbox is unchecked when the form is submitted, that means that if there is any user info in the store we can deduce that the checkbox was checked the last time the form was submitted.
        SecureStore.getItemAsync('userinfo')  //here we use the getItemAync method to check if there's any data under the key 'userInfo' ...this will return a promise that if it resolves we'll return the value stored under that key. That means we can access that value using the Javascript .then() method
            .then(userdata => {  //here we're using a variable intermediary name called 'userdata' (which contains the JSON.string with the username and password)
                const userinfo = JSON.parse(userdata);  //you have to change this back to a JS object. That's why you use JSON.parse() method and stored that JS object inside the userinfo variable
                if (userinfo) {  //here we're checking to see if the userinfo variable contains a non null/truthy value and if so, we update the LoginComponent state
                    this.setState({username: userinfo.username});
                    this.setState({password: userinfo.password});
                    this.setState({remember: true})
                }
            });
    }

    render() {
        return (
            <View style={styles.container}>  
                <Input
                    placeholder='Username'
                    leftIcon={{type: 'font-awesome', name: 'user-o'}}
                    onChangeText={username => this.setState({username})}   //here with the onChangeText prop, whenever the text value for this user is changed we'll update the username i n the state using set state
                    value={this.state.username}  //this value always reflects the state (which makes it a controlled component)
                    containerStyle={styles.formInput}
                    leftIconContainerStyle={styles.formIcon}
                />
                <Input
                    placeholder='Password'
                    leftIcon={{type: 'font-awesome', name: 'key'}}
                    onChangeText={password => this.setState({password})}
                    value={this.state.password}
                    containerStyle={styles.formInput}
                    leftIconContainerStyle={styles.formIcon}
                />
                <CheckBox
                    title='Remember Me'
                    center
                    checked={this.state.remember}
                    onPress={() => this.setState({remember: !this.state.remember})}  //here we use the OnPress prop to change the state of remember to the opposite of whatever it currently is. So if it's false, it'll change to true and vice versa
                    containerStyle={styles.formCheckbox}
                />
                <View style={styles.formButton}>
                    <Button
                        onPress={() => this.handleLogin()}  //here we call the handleLogin method we created
                        title='Login'
                        color='#5637DD'
                    />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({   //styles requires us to pass an object that defines all the styles we're using
    container: {
        justifyContent: 'center',
        margin: 20
    },
    formIcon: {
        marginRight: 10
    },
    formInput: {
        padding: 10
    },
    formCheckbox: {
        margin: 10,
        backgroundColor: null
    },
    formButton: {
        margin: 40
    }
});

export default Login;