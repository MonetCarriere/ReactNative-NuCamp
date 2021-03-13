import React, { Component } from 'react';
import { Text, View, ScrollView, FlatList} from 'react-native';
import { Card, Icon } from 'react-native-elements';
import {connect} from 'react-redux';
import {baseUrl} from '../shared/baseUrl';


const mapStateToProps = state => {
    return {
        campsites: state.campsites,
        comments: state.comments
    };
};


function RenderCampsite(props) {

    const {campsite} = props;

    if (campsite) {
        return (
            <Card 
                featuredTitle={campsite.name}
                image={{uri: baseUrl + campsite.image}}
            >
                <Text style={{margin: 10}}>
                    {campsite.description}
                </Text>
                <Icon
                    name={props.favorite ? 'heart': 'heart-o'}
                    type='font-awesome'
                    color='#f50'
                    raised   //this will give the icon a shadow effect
                    reverse  //this will reverse the color scheme
                    onPress={() => props.favorite ?
                        console.log('Already set as a favorite') : props.markFavorite()}
                />
            </Card>
        );
    }
    return <View />;
}

//here the RenderComments function gets the comments array as a property of the props object
function RenderComments({comments}) {

    const renderCommentItem = ({item}) => {
        return (
            <View style={{margin: 10}}>
                <Text style={{fontSize: 14}}>{item.text}</Text>
                <Text style={{fontSize: 12}}>{item.rating} Stars</Text>
                <Text style={{fontSize: 12}}>{`-- ${item.author}, ${item.date}`}</Text>
            </View>
        );
    };

    return (
        <Card title='Comments'>
            <FlatList
                data={comments}
                renderItem={renderCommentItem}
                keyExtractor={item => item.id.toString()}
            />
        </Card>
    );
}



class CampsiteInfo extends Component {

    constructor(props) {
        super(props);
        this.state = {
            favorite: false
        };
    }
                             //here we are using setState to toggle the favorite property to true  (for the heart icon)
    markFavorite() {         //now you need to pass both the favorite property and the mark favorite event handler to the render campsite method (see Scrollview)
        this.setState({favorite: true})
    }

    static navigationOptions = {
        title: 'Campsite Information'
    }

    render() {
        const campsiteId = this.props.navigation.getParam('campsiteId');
        const campsite = this.props.campsites.campsites.filter(campsite => campsite.id === campsiteId)[0];
        const comments = this.props.comments.comments.filter(comment => comment.campsiteId === campsiteId);
        return (
            <ScrollView>
                <RenderCampsite campsite={campsite}
                    favorite={this.state.favorite}
                    markFavorite={() => this.markFavorite()}
                />
                <RenderComments comments={comments} />
            </ScrollView>
        );
    }
}

export default connect(mapStateToProps)(CampsiteInfo);