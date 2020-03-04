
import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Image,
  Text
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

import rakBankImg from './assets/rakbank.png';
import { STATUS } from './constants'
import * as pageActions from './store/actions/activationActions';
import { getActivationPending, isActivated } from './store/selectors/selectors';

class App extends Component {

  constructor(props) {
    super(props);
    Icon.loadFont();
  }

  requestForActivation() {
    let { actions } = this.props;
    actions.getPageList();
  }

  getProperties(icon) {
    switch (icon) {
      case STATUS.WAITING:
        return { 'icon': 'spinner', 'color': '#4433E1' };
      case STATUS.ACTIVATED:
        return { 'icon': 'check-circle', 'color': '#6CD078' };
      default:
        return { 'icon': 'arrow-circle-up', 'color': '#4433E1' };
    }
  }

  renderButton(title) {
    return <Button
      icon={
        <Icon
          name={this.getProperties(title).icon}
          size={16}
          color="white"
        />
      }
      buttonStyle={{
        borderRadius: 50,
        width: 90,
        height: 35,
        display: "flex",
        justifyContent: "center",
        backgroundColor: this.getProperties(title).color
      }}
      title={title}
      titleStyle={{
        fontSize: 12,
        paddingLeft: 4
      }}
      onPress={() => this.requestForActivation()}
    />
  }

  render() {
    const { pending, activated } = this.props;

    return (
      <View styles={styles.container}>
        <View style={styles.imgStyle}>
          <Image source={rakBankImg} style={styles.imgDimension} />
          <View style={styles.buttonContainer}>
          {!pending && !activated && this.renderButton(STATUS.ACTIVATE)}
          {pending && this.renderButton(STATUS.WAITING)}
          {activated && this.renderButton(STATUS.ACTIVATED)}
        </View>
        </View>
       
    
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  
  },
  imgStyle: {
     backgroundColor: 'white', 
     justifyContent: "center",
     alignItems: "center",
     alignSelf: 'center',
     height: "100%",
     position:"relative"
  },
  imgDimension: {
    width: 130, 
    height: 130
  },
  buttonStyle: {
    borderRadius: 50,
    width: 90,
    height: 35,
    display: "flex",
    justifyContent: "center",
  },
  buttonContainer: {
    bottom: 250,
    position:"absolute"
  },
  buttonTextStyle: {
    fontSize: 10
  }
});

const mapStateToProps = state => ({
  pending: getActivationPending(state),
  activated: isActivated(state)
});

const ActionCreators = Object.assign(
  {},
  pageActions,
);
const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(ActionCreators, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(App)