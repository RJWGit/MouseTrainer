import React, { createRef } from 'react';
import Results from './Results';

class Ranked extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            width: 900,
            height: 700,
            radius: 1,
            radiusChange: 0.7,
            difficulty: 'Ranked',
            addCircleTimer: 500, //In milliseconds
            mode: 'Ranked',
            seconds: 0,
            maxRadius: 50,
            minRadius: 1,
            list: [],
            drawClickList: [],
            fps: 0,
            targetsHit: 0,
            totalTargets: 0, //Currently must be > 0 to avoid deviding by 0 in render function
            isRunning: true,
            decreaseCircleTimer: 0.005,
            lives: 3,
        };
        this.canvas = createRef();
        this.init = true;
        this.myFrames = 0;
        this.circleID = 0;
        this.circleDeleteTimer = 300;

        //Score display
        this.displayTotalTargets;
        this.displayTargetsHit;

        //Interval timers
        this.intervalDeleteClick;
        this.intervalTick;
        this.intervalDeleteCircle;

        //Circle Colors
        this.circleSuccessColor = 'green';
        this.circleDefaultOuterColor = 'teal';
        this.circleDefaultInnerColor = 'black';

        //Clicks Colors
        this.clickDefaultColor = 'grey';
    }

    //Seconds count down timer
    //Update display timers updated every second
    tick() {
        if (this.state.isRunning) {
            this.setState(state => ({
                seconds: state.seconds + 1,
                fps: this.myFrames,
            }));

            this.displayTargetsHit = this.state.targetsHit;
            this.displayTotalTargets = this.state.totalTargets;
            this.myFrames = 0;
        }
    }

    //Create and add circles to state list
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
            if (i.r > 0) {
                if (i.isClicked == true) {
                    ctx.beginPath();
                    ctx.arc(i.x, i.y, i.r, 0, Math.PI * 2, true); // Outer circle
                    ctx.strokeStyle = this.circleSuccessColor;
                    ctx.stroke();
                } else {
                    ctx.beginPath();
                    ctx.arc(i.x, i.y, i.r, 0, Math.PI * 2, true); // Outer circle
                    ctx.fillStyle = this.circleDefaultInnerColor;
                    ctx.strokeStyle = this.circleDefaultOuterColor;
                    ctx.fill();
                    ctx.stroke();
                }
            }
        }
    };

    drawClicks = () => {
        const canvas = this.canvas.current;
        const ctx = canvas.getContext('2d');
        for (let i of this.state.drawClickList) {
            ctx.beginPath();
            ctx.arc(i.x, i.y, i.r, 0, Math.PI * 2, true); // Outer circle
            ctx.fillStyle = this.clickDefaultColor;
            ctx.fill();
            ctx.strokeStyle = this.clickDefaultColor;
            ctx.stroke();
        }
    };

    //Init timers to start game
    componentDidMount() {
        this.intervalTick = setInterval(() => this.tick(), 1000);
        this.intervalDeleteCircle = setInterval(() => this.deleteCircleByClick(), 100);
        this.intervalDeleteClick = setInterval(() => this.deleteClicks(), 100);
        setTimeout(() => this.addCircle(), 100); //Delay added for initial call of function so totalTargets counts correctly

        this.gameLoop();
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

        this.handleIsRunning();
    }

    updateCircleRadius = () => {
        const newList = [...this.state.list];

        for (let i of newList) {
            if (i.isClicked == false) {
                if (i.r > this.state.maxRadius || i.r < this.state.minRadius) {
                    if (i.polarity == -1 && i.r < this.state.minRadius) {
                        newList.splice(newList.indexOf(i), 1); //Delete after 1 'rotation' of small--->big---->small----->delete

                        //Update add circle timer
                        this.setState({
                            lives: this.state.lives - 1,
                        });
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
                    addCircleTimer: this.state.addCircleTimer - this.state.addCircleTimer * this.state.decreaseCircleTimer,
                }));
                break;
            }
        }
        this.setState(state => ({
            list: newList,
        }));
    };

    gameLoop = () => {
        if (this.state.lives <= 0) {
            this.handleIsRunning();
        }
        if (!this.state.isRunning) return;

        this.updateCircleRadius(); //Based on FPS
        this.myFrames++;

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
                width: 800,
                height: 600,
                radius: 1,
                radiusChange: 0.7,
                difficulty: 'Ranked',
                addCircleTimer: 500, //In milliseconds
                mode: 'Ranked',
                seconds: 0,
                maxRadius: 50,
                minRadius: 1,
                list: [],
                drawClickList: [],
                fps: 0,
                targetsHit: 0,
                totalTargets: 0, //Currently must be > 0 to avoid deviding by 0 in render function
                isRunning: true,
                decreaseCircleTimer: 0.005,
                lives: 3,
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
                    <div className="canvas-page-container">
                        <div className="row canvas-bar">
                            <div className="col d-flex justify-content-center">
                                <b>Seconds: {this.state.seconds}</b>
                            </div>
                            <div className="col d-flex justify-content-center">
                                <b>Lives: {this.state.lives}</b>
                            </div>
                            <div className="col d-flex justify-content-center">
                                <b>FPS: {this.state.fps}</b>
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
                                className=" canvas-background "
                            />
                        </div>
                    </div>
                );
            }
        }
    }
}

export default Ranked;
