import React, { Component } from 'react'
import { StyleSheet, View } from 'react-native'
import Rain from "./rain"

interface PropTypes {
    startOnLoad?
    count,
    timeout,
    untilStopped
    colors?
    bsize?
    duration?
}
interface StateTypes {
    rains: any[]
    onComplete: any
}

class MakeItRain extends Component<PropTypes, StateTypes> {
    rainIndex: number
    shouldStop: boolean
    static defaultProps: { count: number; timeout: number; untilStopped: boolean }
    constructor(props) {
        super(props)
        this.state = {
            rains: [],
            onComplete: null,
        }
        this.rainIndex = 0
        this.shouldStop = false
    }

    componentDidMount() {
        if (this.props.startOnLoad) {
            this.startRain()
        }
    }

    componentWillUnmount() {
        this.stopRain()
    }

    startRain(onComplete?) {
        const { rains } = this.state
        const { count, timeout, untilStopped } = this.props
        this.shouldStop = false
        if (untilStopped || this.rainIndex < count) {
            setTimeout(() => {
                if (this.shouldStop) {
                    return
                } else {
                    rains.push({ key: this.rainIndex })
                    this.rainIndex++
                    onComplete && this.setState({ onComplete })
                    this.setState({ rains })
                    this.startRain()
                }
            }, timeout)
        }
    }

    removeRain(key) {
        const { rains, onComplete } = this.state
        const { count } = this.props
        const index = rains.findIndex(rain => { return rain.key === key })
        rains.splice(index, 1)
        this.setState({ rains })
        if (key === count - 1) {
            this.rainIndex = 0
        }
        if (rains.length === 0 && onComplete && typeof onComplete === 'function') {
            onComplete()
        }
    }

    stopRain() {
        this.shouldStop = true
        this.rainIndex = 0
        const { onComplete } = this.state
        if (onComplete && typeof onComplete === 'function') {
            onComplete()
        }
        this.setState({ rains: [], onComplete: null })
    }

    render() {
        const { rains } = this.state
        const { ...otherProps } = this.props
        return <View style={styles.container}>
            {rains.map(rain => {
                return (
                    <Rain
                        key={rain.key}
                        index={rain.key}
                        onAnimationComplete={this.removeRain.bind(this, rain.key)}
                        colors={this.props.colors}
                        {...otherProps}
                    />)
            })}
        </View>
    }
}

MakeItRain.defaultProps = {
    count: 100,
    timeout: 30,
    untilStopped: false,
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
    },
})

export default MakeItRain