import React, { createRef } from 'react';
import { Link } from 'react-router-dom';
import Results from './Results';

//TODO:
//1.use react 'onkeydown' function to pick up keyboard inputs, then get current mouse x,y and check for intersect
//2.Fix accuracy and target hits to avoid possible accuracy > 100%. Probably should update only after a clicked circle or circle timed out
//3.Figure out delete. Possibly make delete list. Add new tick function to count every 100ms then add new attribute to deleted circles or circles and
// get current tick and add + x amount and when tick reaches said value then delete. Can all be done in new tick function.
//Sudo: Get tick count, add 100ms, check through delete list if it's time to delete, if so delete, else don't, then update state stick. Function
//can be called every 100ms component did mount
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
        this.circleID = 0;
        this.intervalTick;
        this.intervalAddCircle;
        this.intervalDeleteCircle;
    }

    tick() {
        if (this.state.isRunning) {
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
                x: Math.floor(Math.random() * (this.state.width - this.state.maxRadius - this.state.maxRadius + 1)) + this.state.maxRadius,
                y: Math.floor(Math.random() * (this.state.height - this.state.maxRadius - this.state.maxRadius + 1)) + this.state.maxRadius,
                r: this.state.radius,
                polarity: 1,
                isClicked: false,
                ID: this.circleID,
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

    deleteCircle() {
        const newList = [...this.state.list];
        console.log('delete circle');
        for (let i of newList) {
            if (i.isClicked == true) {
                newList.splice(newList.indexOf(i), 1);
            }
        }

        this.setState({
            list: newList,
        });
    }
    //WHY DOESN'T THIS WORK? HAS TO BE CALLED IN UPDATECIRCLE OR ELSE WON'T DELETE
    // deleteCircleByID(id) {
    //     const newList = [...this.state.list];
    //     console.log('inside');

    //     for (let i of newList) {
    //         if (id == i.ID) {
    //             console.log('delete');
    //             console.log('delete');

    //             console.log(newList);
    //             newList.splice(newList.indexOf(i), 1);
    //             console.log(newList);
    //         }
    //     }

    //     this.setState({
    //         list: newList,
    //     });
    // }

    //FIGURE OUT DELETE FOR EACH GAME MODE AND MAKE SURE TO UNMOUNT
    componentDidMount() {
        this.intervalTick = setInterval(() => this.tick(), 1000);
        if (this.state.mode == 'precision') {
            this.intervalDeleteCircle = setInterval(() => this.deleteCircleByTimer(0), this.state.addCircleTimer);
        }

        this.intervalAddCircle = setInterval(() => this.addCircle(), this.state.addCircleTimer);
        setInterval(() => this.deleteCircle(), this.state.addCircleTimer);
        this.createCircleList(this.gameLoop);
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

    createCircleList = callback => {
        const list = [];
        for (let i = 0; i < 1; i++) {
            let circle = {
                x: Math.floor(Math.random() * (this.state.width - this.state.radius - this.state.radius + 1)) + this.state.radius,
                y: Math.floor(Math.random() * (this.state.height - this.state.radius - this.state.radius + 1)) + this.state.radius,
                r: this.state.radius,
                polarity: 1,
                isClicked: false,
            };

            list[i] = circle;
        }
        this.setState(callback);
    };

    updateCircleList = () => {
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
            } else {
                // setInterval(() => newList.splice(newList.indexOf(i), 1), 500);
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
            if (Math.sqrt((e.nativeEvent.offsetX - i.x) ** 2 + (e.nativeEvent.offsetY - i.y) ** 2) < i.r) {
                i.isClicked = true;
                // newList.splice(newList.indexOf(i), 1);
                // console.log(i.ID);

                break;
            }
        }
        this.setState({
            list: newList,
            targetsHit: this.state.targetsHit + 1,
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
                    <div className="convas-page-container">
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
                            <canvas onClick={this.isIntersect} ref={this.canvas} width={this.state.width} height={this.state.height} />
                        </div>
                    </div>
                );
            }
        }
    }
}

export default Canvas;
