import React, { Component } from 'react';
import '../App.css';
import { scaleLinear } from 'd3-scale';
import { max } from 'd3-array';
import { select } from 'd3-selection';
import { transition} from 'd3-transition';
import { easeLinear } from 'd3-ease';
import { Button, ButtonToolbar, Container, Col, Row } from 'react-bootstrap';

class BarChart extends Component {
   constructor(props){
      super(props)
      this.createBarChart = this.createBarChart.bind(this);
      this.state = {
         currentIndex: 1,
         previousIndex: 0,
         currentData: this.props.historyData[1],
         previousData: this.props.historyData[0],
         isFlip: false,
         isStart: false,
         isStop: false,
         time: 500,
      }
   }
   changeChartData() {
      if (!this.state.isStart) {
         this.setState({
            isStart: true,
         })
      } else {
         const historyData = this.props.historyData.slice();
         const currentIndex = this.state.currentIndex;
         const previousIndex = this.state.previousIndex;
         if (currentIndex >= historyData.length - 1) {
             return;
         }
         this.setState({
             currentIndex: currentIndex + 1,
             previousIndex: previousIndex + 1,
             currentData: this.props.historyData[currentIndex + 1].slice(),
             previousData: this.props.historyData[previousIndex + 1].slice(),
             isFlip: !this.state.isFlip,
         })
      }
   }
   handleClick() {
      this.interval = setInterval(
         () => {
            this.changeChartData();
            if(this.state.currentIndex >= this.props.historyData.length-1 || this.state.isStop) {
               this.setState({
                  isStop: false,
               })
               clearInterval(this.interval)
            }
         }, this.state.time)

  }
   componentWillUnmount() {
      clearInterval(this.interval);
   } 
  handleReset() {
     this.setState({
      currentIndex: 1,
      previousIndex: 0,
      currentData: this.props.historyData[1],
      previousData: this.props.historyData[0],
      isFlip: false,
      isStart: false
     });
  }

   componentDidMount() {
      this.createBarChart()
   }
   componentDidUpdate() {
      this.createBarChart()
   }
   handleStop() {
      this.setState({
         isStop: true,
      })
   }

   createBarChart() {
      //const data = this.props.historyData[this.state.currentIndex]

      const lightGrey = '#E8E8E8';
      const currentData = this.state.currentData.slice();
      const previousData = this.state.previousData.slice();
      const diff = currentData.map((item, index) => {
         return item.position - previousData[index].position;
      })
      const node = this.node
      const xMultiply = 1.1;
      const xMax = max(previousData.map((d) => d.position))
      const yMax = max(previousData.map((d) => d.value))
      const yMultiply = 1.1;
      const xScale = scaleLinear()
         .domain([0, xMax*yMultiply])
         .range([0, this.props.size[0]])
      const yScale = scaleLinear()
         .domain([0, yMax*yMultiply])
         .range([0, this.props.size[1]])

      select(node)
         .selectAll('rect')
         .data(previousData)
         .enter()
         .append('rect')
      
      select(node)
         .selectAll('rect')
         .data(previousData)
         .exit()
         .remove()

      const xOffset = 1;
      const xSpace = Math.floor(this.props.size[0]/currentData.length);
      const width = Math.floor(xSpace*0.8)
      const t = transition()
                  .duration(this.state.time*0.5)
                  .ease(easeLinear)
      if (!this.state.isStart) {
         select(node)
         .selectAll('rect')
         .data(previousData)
         .style('fill', lightGrey)
         .attr('x', (d, i) => xScale(d.position) + xOffset)
         .attr('y', (d) => this.props.size[1] - yScale(d.value))
         .attr('height', d => yScale(d.value))
         .attr('width', width)
         .data(currentData)
      } else {
         select(node)
            .selectAll('rect')
            .data(previousData)
            .style('fill', lightGrey)
            .attr('x', (d, i) => xScale(d.position) + xOffset)
            .attr('y', (d) => this.props.size[1] - yScale(d.value))
            .attr('height', d => yScale(d.value))
            .attr('width', width)
            .data(currentData)
            .style('fill', (d, index) => {
                  if (diff[index] != 0) {
                     return 'blue'
                  }
                  return lightGrey//light grey
               })
         .transition(t)
            .attr('x', (d, i) => xScale(d.position) + xOffset)
            .attr('y', (d) => this.props.size[1] - yScale(d.value))
            .attr('height', d => yScale(d.value))
            .attr('width', width)
      }

   }
render() {
   return (
      <Row>
         <Col xs={{ span: 6, offset: 3 }}>
      <div className="center">
         <h1 >BubbleSort Visualizer</h1>
         <svg 
         ref={node => this.node = node}
         width={this.props.size[0]} height={this.props.size[1]}
         style={{border : "1px solid black"}}
         >
         </svg>
         <div>
            <ButtonToolbar>
               <Button variant="primary" onClick={() => this.handleClick()}>
                  Start
               </Button>
               <Button variant="warning" onClick={() => this.handleReset()}>
                  Reset
               </Button>
               <Button variant="danger" onClick={() => this.handleStop()}>
                  Stop
               </Button>
            </ButtonToolbar>
         </div>
      </div>
      </Col>
      </Row>

   )

}
}


 
export default BarChart