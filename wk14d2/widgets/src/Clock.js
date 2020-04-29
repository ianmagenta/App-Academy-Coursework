import React from "react";

class Clock extends React.Component {
    constructor() {
        super();

        this.state = {
            time: new Date()
        };
    }

    componentDidMount() {
        this.interval = setInterval(this.tick, 1000);
    }

    componentWillUnmount() {
        clearInterval();
    }

    tick = () => {
        this.setState({ time: new Date() });
    }

    render() {
        const { time } = this.state
        return (
            <div className="clock">
                <h1 className="clock__title">Clock</h1>
                <div className="clock__hrs">Hours: {time.getHours()}</div>
                <div className="clock__min">Minutes: {time.getMinutes()}</div>
                <div className="clock__sec">Seconds: {time.getSeconds()}</div>
                <div className="clock__day">Date: {time.toDateString()}</div>
            </div>
        );
    }
}


export default Clock;
