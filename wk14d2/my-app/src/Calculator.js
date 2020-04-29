import React from "react";

class Calculator extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            result: 0,
            num1: "",
            num2: "",
        };
    }

    handleFirstNum = e => {
        let targetVal = e.target.value;
        if (isNaN(targetVal)) {
            this.setState({ num1: "NaN" });
        } else {
            this.setState({ num1: parseInt(targetVal, 10) });
        }
    };

    handleSecondNum = e => {
        let targetVal = e.target.value;
        if (isNaN(targetVal)) {
            this.setState({ num2: "NaN" });
        } else {
            this.setState({ num2: parseInt(targetVal, 10) });
        }
    };

    subtract = () => {
        if (this.state.num1 !== "NaN" && this.state.num2 !== "NaN") {
            this.setState({ result: (this.state.num1 - this.state.num2) })
        }
    };

    multiply = () => {
        if (this.state.num1 !== "NaN" && this.state.num2 !== "NaN") {
            this.setState({ result: (this.state.num1 * this.state.num2) })
        }
    };

    divide = () => {
        if (this.state.num1 !== "NaN" && this.state.num2 !== "NaN") {
            this.setState({ result: (this.state.num1 / this.state.num2) })
        }
    };

    add = () => {
        if (this.state.num1 !== "NaN" && this.state.num2 !== "NaN") {
            this.setState({ result: (this.state.num1 + this.state.num2) })
        }
    };

    clearInput = () => {
        this.setState({ result: 0, num1: "", num2: "" });
    };

    render() {
        const { result, num1, num2 } = this.state
        return (
            <>
                <div>
                    <h1>Result: {result}</h1>
                    <input onChange={this.handleFirstNum} placeholder="First number" value={num1} />
                    <input onChange={this.handleSecondNum} placeholder="Second number" value={num2} />
                    <button onClick={this.clearInput}>Clear</button>
                </div>
                <div>
                    <button onClick={this.add}>+</button>
                    <button onClick={this.subtract}>-</button>
                    <button onClick={this.multiply}>*</button>
                    <button onClick={this.divide}>/</button>
                </div>
            </>
        );
    }
}

export default Calculator;
