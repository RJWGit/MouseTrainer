import React, { createRef } from 'react';
import Results from './Results';

class Classic extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            width: this.props.getGameState.width,
            height: this.props.getGameState.height,
            radius: this.props.getGameState.radius,
            radiusChange: this.props.getGameState.radiusChange,
            difficulty: this.props.getGameState.difficulty,
            addCircleTimer: this.props.getGameState.addCircleTimer, //In milliseconds
            mode: this.props.getGameState.mode,
            seconds: this.props.getGameState.seconds,
            maxRadius: this.props.getGameState.maxRadius,
            minRadius: this.props.getGameState.minRadius,
            list: [],
            drawClickList: [],
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
        this.intervalDeleteCircle;
        this.displayTotalTargets;
        this.displayTargetsHit;
        this.circleDeleteTimer = 300;
        this.intervalDeleteClick;
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
        console.log(this.state.addCircleTimer);
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

            setTimeout(() => this.addCircle(), this.state.addCircleTimer);
        }
    }

    //Create and add clicks to drawclicklist
    addClick(e) {
        if (this.state.isRunning) {
            const newList = [...this.state.drawClickList];
            let circle = {
                x: e.nativeEvent.offsetX,
                y: e.nativeEvent.offsetY,
                r: 5,
                deleteTimer: this.circleDeleteTimer,
            };

            newList.push(circle);
            this.setState(state => ({
                drawClickList: newList,
            }));
        }
    }

    //delete circles from list on a timer
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

    //delete clicks from drawclicklist on a timer
    deleteClicks() {
        const newList = [...this.state.drawClickList];
        for (let i of newList) {
            i.deleteTimer -= 100;

            if (i.deleteTimer <= 0) {
                newList.splice(newList.indexOf(i), 1);
            }
        }

        this.setState({
            drawClickList: newList,
        });
    }

    drawCircles = () => {
        const canvas = this.canvas.current;
        const ctx = canvas.getContext('2d');
        for (let i of this.state.list) {
            // console.log(i);

            if (i.isClicked == true) {
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

    drawClicks = () => {
        const canvas = this.canvas.current;
        const ctx = canvas.getContext('2d');
        for (let i of this.state.drawClickList) {
            // console.log(i);

            ctx.beginPath();
            ctx.arc(i.x, i.y, i.r, 0, Math.PI * 2, true); // Outer circle
            ctx.fillStyle = 'grey';
            ctx.fill();
            ctx.strokeStyle = 'grey';
            ctx.stroke();
        }
    };

    //Init timers to start game
    componentDidMount() {
        this.intervalTick = setInterval(() => this.tick(), 1000);
        this.intervalDeleteCircle = setInterval(() => this.deleteCircleByClick(), 100);
        this.intervalDeleteClick = setInterval(() => this.deleteClicks(), 100);
        setTimeout(() => this.addCircle(), 100); //Delay added for initial call of function so totalTargets counts correctly
        this.initGameLoop(this.gameLoop);
    }

    //Update canvas
    componentDidUpdate() {
        if (this.state.isRunning) {
            this.clearCanvas();
            this.drawCircles();
            this.drawClicks();
        }
    }

    //Clear interval timers to prevent running after leaving game mode
    componentWillUnmount() {
        clearInterval(this.intervalDeleteCircle);
        clearInterval(this.intervalTick);
        clearInterval(this.intervalDeleteClick);

        this.state.isRunning = false;
    }

    initGameLoop = callback => {
        this.setState(callback);
    };

    updateCircleRadius = () => {
        const newList = [...this.state.list];

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

    clearCanvas = () => {
        const canvas = this.canvas.current;
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, this.state.width, this.state.height);
    };

    //Check if click hits circle then updates state
    isIntersect = e => {
        const newList = [...this.state.list];
        for (let i of newList) {
            //Check mouse position intersects circle and make sure circle hasn't been clicked(or else can click circle several times while it's in death animation)
            if (Math.sqrt((e.nativeEvent.offsetX - i.x) ** 2 + (e.nativeEvent.offsetY - i.y) ** 2) < i.r && i.isClicked == false) {
                i.isClicked = true;
                this.setState(state => ({
                    list: newList,
                    targetsHit: this.state.targetsHit + 1,
                    targetStreak: this.state.targetStreak + 1,
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

        this.updateCircleRadius(); //Based on FPS

        this.myFrames++;

        if (this.state.seconds <= 0) {
            this.handleIsRunning();
        }
        requestAnimationFrame(this.gameLoop); //set at 60 FPS
    };

    //Toggle switch for game running
    handleIsRunning = () => {
        this.setState({
            isRunning: !this.state.isRunning,
        });
    };

    restartGameState = () => {
        this.myFrames = 0;
        this.circleID = 0;
        this.circleDeleteTimer = 300;
        this.setState(
            {
                width: this.props.getGameState.width,
                height: this.props.getGameState.height,
                radius: this.props.getGameState.radius,
                radiusChange: this.props.getGameState.radiusChange,
                difficulty: this.props.getGameState.difficulty,
                addCircleTimer: this.props.getGameState.addCircleTimer, //In milliseconds
                mode: this.props.getGameState.mode,
                seconds: this.props.getGameState.seconds,
                maxRadius: this.props.getGameState.maxRadius,
                minRadius: this.props.getGameState.minRadius,
                list: [],
                drawClickList: [],
                fps: 0,
                targetsHit: 0,
                totalTargets: 0, //Currently must be > 0 to avoid deviding by 0 in render function
                isRunning: true,
            },
            () => this.addCircle()
        );

        requestAnimationFrame(this.gameLoop); //set at 60 FPS
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
                            <div className="col d-flex justify-content-center">
                                <b>Targets/s: {(1000 / this.state.addCircleTimer).toFixed(2)}</b>
                            </div>
                        </div>
                        <div onContextMenu={e => e.preventDefault()} className="row justify-content-center">
                            <canvas
                                onMouseDown={e => {
                                    this.isIntersect(e);
                                    this.addClick(e);
                                }}
                                ref={this.canvas}
                                width={this.state.width}
                                height={this.state.height}
                            />
                        </div>
                    </div>
                );
            }
        }
    }
}

export default Classic;
