import React, { createRef } from 'react';
import { Link } from 'react-router-dom';
import Results from './Results';

//TODO:
//1.use react 'onkeydown' function to pick up keyboard inputs, then get current mouse x,y and check for intersect

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
            totalTargets: 0, //Currently must be > 0 to avoid deviding by 0 in render function
            isRunning: true,
        };
        this.canvas = createRef();
        this.init = true;
        this.myFrames = 0;
        this.circleID = 0;
        this.intervalTick;
        this.intervalAddCircle;
        this.intervalDeleteCircle;
        this.displayTotalTargets;
        this.displayTargetsHit;
        this.circleDeleteTimer = 300;
    }

    //Seconds count down timer
    //Update display timers updated every second
    tick() {
        if (this.state.isRunning) {
            this.setState(state => ({
                seconds: state.seconds - 1,
                fps: this.myFrames,
            }));
            this.displayTargetsHit = this.state.targetsHit;
            this.displayTotalTargets = this.state.totalTargets;

            this.myFrames = 0;
        }
    }

    //Create and add circles to state list
    addCircle() {
        if (this.state.isRunning && this.state.seconds > 1) {
            const newList = [...this.state.list];
            let circle = {
                x: Math.floor(Math.random() * (this.state.width - this.state.maxRadius - this.state.maxRadius + 1)) + this.state.maxRadius,
                y: Math.floor(Math.random() * (this.state.height - this.state.maxRadius - this.state.maxRadius + 1)) + this.state.maxRadius,
                r: this.state.radius,
                polarity: 1,
                isClicked: false,
                ID: this.circleID,
                deleteTimer: this.circleDeleteTimer,
            };
            this.circleID += 1;

            newList.push(circle);
            this.setState(state => ({
                list: newList,
                totalTargets: this.state.totalTargets + 1,
            }));
        }
    }

    deleteCircleByTimer(index) {
        const newList = [...this.state.list];
        newList.splice(newList.indexOf(index), 1);

        this.setState({
            list: newList,
        });
    }

    deleteCircleByClick() {
        const newList = [...this.state.list];
        for (let i of newList) {
            if (i.isClicked == true) {
                i.deleteTimer -= 100;

                if (i.deleteTimer <= 0) {
                    newList.splice(newList.indexOf(i), 1);
                }
            }
        }

        this.setState({
            list: newList,
        });
    }

    //FIGURE OUT DELETE FOR EACH GAME MODE AND MAKE SURE TO UNMOUNT
    componentDidMount() {
        this.intervalTick = setInterval(() => this.tick(), 1000);

        //Delete timers
        if (this.state.mode == 'precision') {
            this.intervalDeleteCircle = setInterval(() => this.deleteCircleByTimer(0), this.state.addCircleTimer);
        } else {
            this.intervalDeleteCircle = setInterval(() => this.deleteCircleByClick(), 100);
        }

        this.intervalAddCircle = setInterval(() => this.addCircle(), this.state.addCircleTimer);

        this.initGameLoop(this.gameLoop);
    }

    componentDidUpdate() {
        if (this.state.isRunning) {
            this.clearCanvas();
            this.drawCircles();
        }
    }
    componentWillUnmount() {
        clearInterval(this.intervalAddCircle);
        clearInterval(this.intervalDeleteCircle);
        clearInterval(this.intervalTick);

        this.state.isRunning = false;
    }

    initGameLoop = callback => {
        this.setState(callback);
    };

    updateCircleRadius = () => {
        const newList = [...this.state.list];
        // console.log(this.state);
        for (let i of newList) {
            if (i.isClicked == false) {
                if (i.r > this.state.maxRadius || i.r < this.state.minRadius) {
                    if (i.polarity == -1 && i.r < this.state.minRadius) {
                        newList.splice(newList.indexOf(i), 1); //Delete after 1 'rotation' of small--->big---->small----->delete
                    } else {
                        i.polarity = i.polarity * -1;
                    }
                }
                i.r += this.state.radiusChange * i.polarity;
            }
        }
        this.setState({
            list: newList,
        });
    };

    drawCircles = () => {
        const canvas = this.canvas.current;
        const ctx = canvas.getContext('2d');

        for (let i of this.state.list) {
            if (i.isClicked == true) {
                // console.log(i);
                ctx.beginPath();
                ctx.arc(i.x, i.y, i.r, 0, Math.PI * 2, true); // Outer circle
                // ctx.fillStyle = 'rgba(255, 0, 0, 0.5)';
                // ctx.fill();
                ctx.strokeStyle = 'teal';
                ctx.stroke();
            } else {
                ctx.beginPath();
                ctx.arc(i.x, i.y, i.r, 0, Math.PI * 2, true); // Outer circle
                ctx.fillStyle = 'black';
                ctx.strokeStyle = 'teal';
                ctx.fill();
                ctx.stroke();
            }
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
            //Check mouse position intersects circle and make sure circle hasn't been clicked(or else can click circle several times while it's in death animation)
            if (Math.sqrt((e.nativeEvent.offsetX - i.x) ** 2 + (e.nativeEvent.offsetY - i.y) ** 2) < i.r && i.isClicked == false) {
                i.isClicked = true;
                this.setState(state => ({
                    list: newList,
                    targetsHit: this.state.targetsHit + 1,
                }));
                break;
            }
        }
        this.setState(state => ({
            list: newList,
        }));
    };

    gameLoop = () => {
        if (!this.state.isRunning) return;
        if (this.state.mode == 'classic' || this.state.mode == 'speed') {
            this.updateCircleRadius();
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
            totalTargets: 0, //Currently must be > 0 to avoid deviding by 0 in render function
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
                    <div className="convas-page-container">
                        <div className="row canvas-bar">
                            <div className="col d-flex justify-content-center">
                                <b>Seconds: {this.state.seconds}</b>
                            </div>
                            <div className="col d-flex justify-content-center">
                                <b>FPS: {this.state.fps}</b>
                            </div>
                            <div className="col d-flex justify-content-center">
                                <b>
                                    Accuracy:
                                    {(() => {
                                        if (this.displayTargetsHit > 0 && this.displayTotalTargets > 0) {
                                            return Math.trunc((this.displayTargetsHit / this.displayTotalTargets) * 100) + '%';
                                        } else {
                                            return 'NAN';
                                        }
                                    })()}
                                </b>
                            </div>
                            <div className="col d-flex justify-content-center">
                                <b>
                                    Targets Hit: {this.state.targetsHit}/{this.state.totalTargets}
                                </b>
                            </div>
                        </div>
                        <div className="row justify-content-center">
                            <canvas onClick={this.isIntersect} ref={this.canvas} width={this.state.width} height={this.state.height} />
                        </div>
                    </div>
                );
            }
        }
    }
}

export default Canvas;
