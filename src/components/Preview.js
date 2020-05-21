import React, { createRef } from 'react';
import Results from './Results';
import pointerimg from '../images/mouse.png';

class Preview extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            width: window.innerWidth - 100,
            height: window.innerHeight - 200,
            radius: 1,
            radiusChange: 1,
            addCircleTimer: 1200, //In milliseconds
            seconds: 1000,
            maxRadius: 50,
            minRadius: 1,
            list: [],
            drawClickList: [],
            isRunning: true,
        };
        this.canvas = createRef();
        this.init = true;
        this.myFrames = 0;
        this.circleID = 0;
        this.intervalTick;
        this.intervalDeleteCircle;
        this.circleDeleteTimer = 300;
        this.intervalDeleteClick;
        this.pointer;
        this.pointerX = window.innerWidth / 2;
        this.pointerY = window.innerHeight / 2;
    }

    load() {
        this.pointer = new Image();
        this.pointer.src = pointerimg;
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
    addClick() {
        if (this.state.isRunning) {
            const newList = [...this.state.drawClickList];
            let circle = {
                x: this.pointerX,
                y: this.pointerY,
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
        }
    };

    drawPointer = () => {
        const canvas = this.canvas.current;
        const ctx = canvas.getContext('2d');
        const movement = 5;
        let x = 0,
            y = 0;

        if (this.state.list.length > 0)
            for (let i of this.state.list) {
                if (i.r > 0 && i.isClicked == false) {
                    x = i.x - this.pointerX;
                    y = i.y - this.pointerY;
                    this.pointerX = x > 0 ? this.pointerX + movement : this.pointerX - movement;
                    this.pointerY = y > 0 ? this.pointerY + movement : this.pointerY - movement;

                    ctx.drawImage(this.pointer, this.pointerX, this.pointerY, 15, 21);

                    break;
                } else {
                    ctx.drawImage(this.pointer, this.pointerX, this.pointerY, 15, 21);
                }
            }
        else {
            ctx.drawImage(this.pointer, this.pointerX, this.pointerY, 15, 21);
        }
    };

    drawClicks = () => {
        const canvas = this.canvas.current;
        const ctx = canvas.getContext('2d');
        for (let i of this.state.drawClickList) {
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
        this.load();
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
            this.drawPointer();
            // console.log('asdf');
        }
    }

    //Clear interval timers to prevent running after leaving game mode
    componentWillUnmount() {
        clearInterval(this.intervalDeleteCircle);
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
            if (Math.sqrt((this.pointerX - i.x) ** 2 + (this.pointerY - i.y) ** 2) < i.r && i.isClicked == false) {
                this.addClick();
                i.isClicked = true;
                this.setState(state => ({
                    list: newList,
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
        console.log('asdf');
        this.updateCircleRadius(); //Based on FPS
        this.isIntersect();

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

    render() {
        {
            return (
                <div className="convas-page-container">
                    <div className="row justify-content-center">
                        <canvas ref={this.canvas} width={this.state.width} height={this.state.height} />
                    </div>
                </div>
            );
        }
    }
}

export default Preview;
