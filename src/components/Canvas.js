import React, { createRef } from 'react';
import { Link } from 'react-router-dom';
import Results from './Results';

//TODO:
//use react 'onkeydown' function to pick up keyboard inputs, then get current mouse x,y and check for intersect
//Fix accuracy and target hits to avoid possible accuracy > 100%. Probably should update only after a clicked circle or circle timed out
class Canvas extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            width: this.props.width,
            height: this.props.height,
            radius: this.props.radius,
            radiusChange: this.props.radiusChange,
            difficulty: this.props.difficulty,
            addCircleTimer: this.props.addCircleTimer, //In milliseconds
            mode: this.props.mode,
            seconds: this.props.seconds,
            maxRadius: this.props.maxRadius,
            minRadius: this.props.minRadius,
            list: [],
            fps: 0,
            targetsHit: 0,
            totalTargets: 1, //Currently must be > 0 to avoid deviding by 0 in render function
            isRunning: true,
        };
        this.canvas = createRef();
        this.init = true;
        this.myFrames = 0;
    }

    tick() {
        if (this.state.isRunning) {
            // console.log(this.myFrames);
            // console.log(this.state.fps);
            this.setState(state => ({
                seconds: state.seconds - 1,
                fps: this.myFrames,
            }));
            this.myFrames = 0;
        }
    }

    addCircle() {
        if (this.state.isRunning) {
            const newList = [...this.state.list];
            let circle = {
                x: Math.floor(Math.random() * (this.state.width - this.state.radius - this.state.radius + 1)) + this.state.radius,
                y: Math.floor(Math.random() * (this.state.height - this.state.radius - this.state.radius + 1)) + this.state.radius,
                r: this.state.radius,
                polarity: 1,
            };

            newList.push(circle);
            this.setState(state => ({
                list: newList,
                totalTargets: this.state.totalTargets + 1,
            }));
        }
    }

    deleteCircle(index) {
        const newList = [...this.state.list];
        newList.splice(newList.indexOf(index), 1);

        this.setState({
            list: newList,
        });
    }

    componentDidMount() {
        this.interval = setInterval(() => this.tick(), 1000);
        if (this.state.mode == 'precision') setInterval(() => this.deleteCircle(0), this.state.addCircleTimer);

        setInterval(() => this.addCircle(), this.state.addCircleTimer);

        this.createCircleList(this.gameLoop);
    }

    componentDidUpdate() {
        if (this.state.isRunning) {
            this.clearCanvas();
            this.drawCircles();
        }
    }
    componentWillUnmount() {
        //clearInterval(this.interval);
        // this.state.isRunning = false;
    }

    createCircleList = callback => {
        const list = [];
        for (let i = 0; i < 1; i++) {
            let circle = {
                x: Math.floor(Math.random() * (this.state.width - this.state.radius - this.state.radius + 1)) + this.state.radius,
                y: Math.floor(Math.random() * (this.state.height - this.state.radius - this.state.radius + 1)) + this.state.radius,
                r: this.state.radius,
                polarity: 1,
            };

            list[i] = circle;
        }
        this.setState({ list }, callback);
    };

    updateCircleList = () => {
        const newList = [...this.state.list];
        // console.log(this.state);
        for (let i of newList) {
            if (i.r > this.state.maxRadius || i.r < this.state.minRadius) {
                if (i.polarity == -1 && i.r < this.state.minRadius) {
                    newList.splice(newList.indexOf(i), 1); //Delete after 1 'rotation' of small--->big---->small----->delete
                } else {
                    i.polarity = i.polarity * -1;
                }
            }
            i.r += this.state.radiusChange * i.polarity;
        }
        this.setState({
            list: newList,
        });
    };

    drawCircles = () => {
        const canvas = this.canvas.current;
        const ctx = canvas.getContext('2d');

        for (let i of this.state.list) {
            ctx.beginPath();
            ctx.arc(i.x, i.y, i.r, 0, Math.PI * 2, true); // Outer circle
            ctx.fill();
            ctx.stroke();
        }
    };

    clearCanvas = () => {
        const canvas = this.canvas.current;
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, this.state.width, this.state.height);
    };

    //TODO: Fix so no 'after-image' when clicked. stop from redrawing after deleting
    isIntersect = e => {
        const newList = [...this.state.list];

        for (let i of newList) {
            if (Math.sqrt((e.nativeEvent.offsetX - i.x) ** 2 + (e.nativeEvent.offsetY - i.y) ** 2) < i.r) {
                newList.splice(newList.indexOf(i), 1);

                this.setState({
                    targetsHit: this.state.targetsHit + 1,
                });
                break;
            }
        }
        this.setState({
            list: newList,
        });
    };

    gameLoop = () => {
        if (!this.state.isRunning) return;
        if (this.state.mode == 'classic' || this.state.mode == 'speed') {
            this.updateCircleList();
        }
        this.myFrames++;

        if (this.state.seconds <= 0) {
            this.handleIsRunning();
        }
        requestAnimationFrame(this.gameLoop);
    };

    handleIsRunning = () => {
        this.setState({
            isRunning: !this.state.isRunning,
        });
    };

    restartGameState = () => {
        this.setState({
            width: this.props.width,
            height: this.props.height,
            radius: this.props.radius,
            radiusChange: this.props.radiusChange,
            difficulty: this.props.difficulty,
            addCircleTimer: this.props.addCircleTimer, //In milliseconds
            mode: this.props.mode,
            seconds: this.props.seconds,
            maxRadius: this.props.maxRadius,
            minRadius: this.props.minRadius,
            list: [],
            fps: 0,
            targetsHit: 0,
            totalTargets: 1, //Currently must be > 0 to avoid deviding by 0 in render function
            isRunning: true,
        });

        requestAnimationFrame(this.gameLoop);
    };

    render() {
        {
            if (!this.state.isRunning)
                return (
                    <Results
                        targetsHit={this.state.targetsHit}
                        totalTargets={this.state.totalTargets}
                        difficulty={this.state.difficulty}
                        mode={this.state.mode}
                        restartGameState={this.restartGameState}
                    ></Results>
                );
            else {
                return (
                    <div className="container canvas-board">
                        <div className="row canvas-bar">
                            <div className="col d-flex justify-content-center">
                                <b>Seconds: {this.state.seconds}</b>
                            </div>
                            <div className="col d-flex justify-content-center">
                                <b>FPS: {this.state.fps}</b>
                            </div>
                            <div className="col d-flex justify-content-center">
                                <b>Accuracy: {Math.trunc((this.state.targetsHit / this.state.totalTargets) * 100)}%</b>
                            </div>
                            <div className="col d-flex justify-content-center">
                                <b>
                                    Targets Hit: {this.state.targetsHit}/{this.state.totalTargets}
                                </b>
                            </div>
                        </div>
                        <div className="row justify-content-center">
                            <canvas onClick={this.isIntersect} id="canvas" ref={this.canvas} width={this.state.width} height={this.state.height} />
                        </div>
                    </div>
                );
            }
        }
    }
}

export default Canvas;
