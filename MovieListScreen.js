'use strict';

var React = require('react');
var ReactNative = require('react-native');
var {
    AppRegistry,
    StyleSheet,
    Text,
    ScrollView,
    TouchableOpacity,
		AsyncStorage
} = ReactNative;

require('./LightBox');

var Controllers = require('react-native-controllers');
var {
    Modal,
    ControllerRegistry,
    Constants
} = Controllers;


var MovieListScreen = React.createClass({
	getInitialState: function() {
		return {
			session:false,
		}
	},
	 async _loadInitialState() {
    try {
      var value =  await AsyncStorage.getItem('sessionStatus');
			if(value!==null){
        this.setState({sessionStatus: value});
				console.log('Logged In.');}
				else{
					console.log('Not logged in.');
					AsyncStorage.setItem("numberAccounts", '0');
					Modal.showController('ModalScreenTester', 'slide-up');
				}
    } catch (error) {
			console.log('error occured.');
    }
  },
    componentDidMount: function() {
        Controllers.NavigationControllerIOS("movies_nav").setLeftButtons([{
            title: "Burger",
            onPress: function() {
                Controllers.DrawerControllerIOS("drawer").toggle({side:"left"});
            }
        }]);
        Controllers.NavigationControllerIOS("movies_nav").setRightButtons([{
            title: "MegaBurger",
            onPress: function() {
                Controllers.DrawerControllerIOS("drawer").toggle({side:"right"});
            }
        }]);
				this._loadInitialState();
    },


    onButtonClick: function(val) {
        Controllers.DrawerControllerIOS("drawer").setStyle({
            animationType: val
        });
    },

    onShowLightBoxClick: function(backgroundBlur, backgroundColor = undefined) {
        Modal.showLightBox({
            component: 'LightBox',
            passProps: {
                greeting: 'hello world'
            },
            style: {
                backgroundBlur: backgroundBlur,
                backgroundColor: backgroundColor
            }
        });
    },

    onShowModalVcClick: async function() {
        // defaults: Modal.showController('ModalScreenTester');
        // this example shows animation type and passProps
        Modal.showController('ModalScreenTester', 'slide-up', { greeting: 'hi there!' });
    },

    onShowModalMoreDrawerOptionsVcClick: async function() {
        //Modal.showController('MoreDrawerScreenTester');
        ControllerRegistry.setRootController('MoreDrawerScreenTester', 'slide-down', { greeting: 'how you doin?' });
    },

    onToggleTabBarClick: async function() {
        this.setState({
            tabBarHidden: !this.state.tabBarHidden
        });
        Controllers.TabBarControllerIOS("main").setHidden({hidden: this.state.tabBarHidden, animated: true});
    },

    onReplaceRootAnimatedClick: function() {
        // this example shows animation type and passProps
        ControllerRegistry.setRootController('ModalScreenTester', 'slide-down', { greeting: 'how you doin?' });
    },

    render: function() {
        return (
            <ScrollView style={styles.container} contentInset={{bottom: 50}}>
                <Text style={{fontSize: 20, textAlign: 'center', margin: 10, fontWeight: '500', marginTop: 30}}>
                    Side Menu Example
                </Text>

                <Text style={{fontSize: 16, textAlign: 'center', marginHorizontal: 30, marginBottom: 20}}>
                    There's a right and a left side menu in this example. Control the side menu animation using the options below:
                </Text>

                <TouchableOpacity onPress={ this.onButtonClick.bind(this, Constants.MMDRAWER_DOOR) } >
                    <Text style={styles.button}>Door</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={ this.onButtonClick.bind(this, Constants.MMDRAWER_PARALLAX) }>
                    <Text style={styles.button}>Parallax</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={ this.onButtonClick.bind(this, Constants.MMDRAWER_SLIDE) }>
                    <Text style={styles.button}>Slide</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={ this.onButtonClick.bind(this, Constants.MMDRAWER_SLIDE_AND_SCALE) } >
                    <Text style={styles.button}>Slide & Scale</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={ this.onShowModalMoreDrawerOptionsVcClick }>
                    <Text style={styles.button}>More...</Text>
                </TouchableOpacity>


                <Text style={{fontSize: 20, textAlign: 'center', margin: 10, fontWeight: '500', marginTop: 30}}>
                    Modal Example
                </Text>

                <Text style={{fontSize: 16, textAlign: 'center', marginHorizontal: 30, marginBottom: 20}}>
                    Use the various options below to bring up modal screens:
                </Text>

                <TouchableOpacity onPress={ this.onShowLightBoxClick.bind(this, "dark") }>
                    <Text style={styles.button}>LightBox (dark blur)</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={ this.onShowLightBoxClick.bind(this, "light") }>
                    <Text style={styles.button}>LightBox (light blur)</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={ this.onShowLightBoxClick.bind(this, "light", "rgba(66, 141, 200, 0.2)") }>
                    <Text style={styles.button}>LightBox (light blur + color overlay)</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={ this.onShowLightBoxClick.bind(this, "none") }>
                    <Text style={styles.button}>LightBox (no blur, no color overlay)</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={ this.onShowModalVcClick }>
                    <Text style={styles.button}>Show Modal ViewController</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={ this.onReplaceRootAnimatedClick }>
                    <Text style={styles.button}>Replace root animated</Text>
                </TouchableOpacity>

            </ScrollView>
        );
    },

});

var styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF'
    },
    button: {
        textAlign: 'center',
        fontSize: 18,
        marginBottom: 10,
        marginTop:10,
        color:'blue'
    },
    lineView: {
        height: 1,
        marginTop: 4,
        marginBottom: 4,
        marginLeft: 8,
        marginRight: 8,
        backgroundColor:'gray'
    }
});

AppRegistry.registerComponent('MovieListScreen', () => MovieListScreen);

module.exports = MovieListScreen;