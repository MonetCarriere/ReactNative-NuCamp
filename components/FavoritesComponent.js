import React, { Component } from 'react';
import { FlatList, View, Text } from 'react-native';
import { ListItem } from 'react-native-elements';
import { connect } from 'react-redux';  //in order to access the campsites from the redux store you need to import the connect function from react redux
import { Loading } from './LoadingComponent'; //in order to show data is loading during a slow load you need this
import { baseUrl } from '../shared/baseUrl'; //you need to import this because you'll be getting your images from the server

const mapStateToProps = state => {        //here your getting the campsites and favorites from redux
    return {
        campsites: state.campsites,
        favorites: state.favorites
    };
};

class Favorites extends Component {

    static navigationOptions = {      //sets up the stack navigator
        title: 'My Favorites'
    }

    render() {
        const { navigate } = this.props.navigation;
        const renderFavoriteItem = ({item}) => {
            return (
                <ListItem
                    title={item.name}
                    subtitle={item.description}
                    leftAvatar={{source: {uri: baseUrl + item.image}}}
                    onPress={() => navigate('CampsiteInfo', {campsiteId: item.id})}
                />
            );
        };

        if (this.props.campsites.isLoading) {
            return <Loading />;
        }
        if (this.props.campsites.errMess) {
            return (
                <View>
                    <Text>{this.props.campsites.errMess}</Text>
                </View>
            );
        }
        return (
            <FlatList
                data={this.props.campsites.campsites.filter(
                    campsite => this.props.favorites.includes(campsite.id)
                )}
                renderItem={renderFavoriteItem}
                keyExtractor={item => item.id.toString()}
            />
        );
    }
}

export default connect(mapStateToProps)(Favorites);