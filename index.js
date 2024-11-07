import { PropTypes } from 'prop-types';
import React, { Component } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    View
} from 'react-native';
import { isIPhoneX } from 'react-native-isiphonex-device';
import { ViewPropTypes } from 'deprecated-react-native-prop-types';

export default class SafeAreaViewPlus extends Component {
    static propTypes = {
        ...ViewPropTypes,
        topColor: PropTypes.string,
        bottomColor: PropTypes.string,
        enablePlus: PropTypes.bool,
        topInset: PropTypes.bool,
        bottomInset: PropTypes.bool,
    };
    static defaultProps = {
        topColor: 'transparent',
        bottomColor: '#f8f8f8',
        enablePlus: true,
        topInset: true,
        bottomInset: false,
    };

    genSafeAreaViewPlus() {
        const { children, topColor, bottomColor, topInset, bottomInset } = this.props;
        return (
            <View style={[styles.container, this.props.style]}>
                {this.getTopArea(topColor, topInset)}
                {children}
                {this.getBottomArea(bottomColor, bottomInset)}
            </View>
        );
    }

    genSafeAreaView() {
        return (
            <SafeAreaView
                style={[styles.container, this.props.style]}
                {...this.props}>
                {this.props.children}
            </SafeAreaView>
        );
    }

    getTopArea(topColor, topInset) {
        return !isIPhoneX || !topInset ? null : (
            <View style={[styles.topArea, { backgroundColor: topColor }]} />
        );
    }

    getBottomArea(bottomColor, bottomInset) {
        return !isIPhoneX || !bottomInset ? null : (
            <View style={[styles.bottomArea, { backgroundColor: bottomColor }]} />
        );
    }

    render() {
        const { enablePlus } = this.props;
        return enablePlus ? this.genSafeAreaViewPlus() : this.genSafeAreaView();
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    topArea: {
        height: 44,
    },
    bottomArea: {
        height: 34,
    },
});
