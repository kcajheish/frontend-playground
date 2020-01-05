import React from "react";
import BarChart from './BarChart';


class BubbleSort extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            history : [{
                data: this.props.data.slice(),
                index: this.props.data.map((item, index) => index),
            }],
        }
        this.prepareDataSet();
    }

    prepareDataSet(){
        const history = this.state.history.slice()
        const current = history[history.length -1];
        let sortArr = current.data.slice();
        let sortIndex = current.index.slice();

        for (let j = sortArr.length-1; j > 0; j--) {
            for (let i = 0; i < j; i++) {
                if (sortArr[i] > sortArr[i+1]) {
                    this.swap(i, sortArr, sortIndex);
                }    
            }
        }
    }

    swap (i, sortArr, sortIndex) {


        let temp = sortArr[i];
        sortArr[i] = sortArr[i+1];
        sortArr[i+1] = temp;

        //move larger item's index to the right
        const largerIndex = sortIndex.indexOf(i);
        const smallerIndex = sortIndex.indexOf(i+1);
        sortIndex[largerIndex] = i + 1;
        //move smaller item's index to the left
        sortIndex[smallerIndex] = i;

        //find position of item i at sortIndex
        //update position by +1
        //console.log('After=====')
        //console.log(sortArr)

        //console.log('============')
        //console.log(largerIndex)
        //console.log('arr ' + sortArr);
        //console.log('index ' + sortIndex);
        //console.log('10 is now at ' + sortIndex[1])
        this.setState({
            history: this.state.history.push({
                data: sortArr.slice(),
                index: sortIndex.slice(),
            })
        })
        //console.log(this.state.history.length-1, this.state.history[this.state.history.length-1])

        return [sortArr, sortIndex];
    }

    render() {
        const history = this.state.history
        let historyData = [];
        for (let j=0; j<this.state.history.length; j++) {
            let data = history[j].data.slice();
            let index = history[j].index.slice();
            let renderData = [];
            for (let i = 0; i < data.length; i++) {
                renderData.push({
                    value: this.props.data[i], 
                    position: index[i],
                })
            }
            historyData.push(renderData)
        }
        


        return (
            <div>
                <BarChart
                    historyData={historyData}
                    size={this.props.size}
                />

            </div>
        )

    }

}

export default BubbleSort;

