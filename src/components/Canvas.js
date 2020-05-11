import React, { createRef } from 'react';

//TODO:
//Setup timer in component did mount

class Canvas extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            width: this.props.width,
            height: this.props.height,
            radius: this.props.radius,
            radiusChange: this.props.radiusChange,
            difficulty: this.props.difficulty,
            seconds: 50,
            list: [],
            fps: 0,
        };
        this.isRunning = true;
        this.canvas = createRef();
        this.init = true;
        this.myFrames = 0;
        //this.gameLoop = this.gameLoop.bind(this);
    }

    //CREATE DIFFERENT TIME FUNCTIONS, POSSIBLE SET INTERVAL TO ADD NEW CIRCLES TO LIST EVERY .X SECONDS DEPENDING ON DIFFICULTY
    tick() {
        if (this.isRunning) {
            console.log(this.myFrames);
            console.log(this.state.fps);
            this.setState(state => ({
                seconds: state.seconds - 1,
                fps: this.myFrames,
            }));
            this.myFrames = 0;
        }
    }

    addCircle() {
        if (this.isRunning) {
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
            }));
        }
    }

    componentDidMount() {
        this.interval = setInterval(() => this.tick(), 1000);
        setInterval(() => this.addCircle(), 1000);
        this.createCircleList(this.gameLoop);
    }

    componentDidUpdate() {
        if (this.isRunning) {
            this.clearCanvas();
            this.drawCircles();
        }
    }
    componentWillUnmount() {
        //clearInterval(this.interval);
        this.isRunning = false;
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

        //console.log("1");
    };

    updateCircleList = () => {
        const newList = [...this.state.list];

        for (let i of newList) {
            if (i.r > 50 || i.r < 1) {
                i.polarity = i.polarity * -1;
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

    //TODO: CHANGE SO ONLY 1 CIRCLE IS DELETED
    isIntersect = e => {
        const newList = [...this.state.list];

        for (let i of newList) {
            if (Math.sqrt((e.nativeEvent.offsetX - i.x) ** 2 + (e.nativeEvent.offsetY - i.y) ** 2) < i.r) {
                //this.clearCanvas();
                //this.createCircleList();
                //this.drawCircles();
                //const index = newList.indexOf(i);
                newList.splice(newList.indexOf(i), 1);
                //console.log(index);
            }
        }
        this.setState({
            list: newList,
        });
    };

    gameLoop = () => {
        if (!this.isRunning) return;

        this.updateCircleList();
        this.myFrames++;
        if (this.state.seconds == 0) {
            this.isRunning = false;
        }
        requestAnimationFrame(this.gameLoop);
    };

    render() {
        return (
            <div className="container canvas-board">
                <div className="row">
                    <div className="col d-flex justify-content-center">
                        <b>Seconds: {this.state.seconds}</b>
                    </div>
                    <div className="col d-flex justify-content-center">
                        <b>FPS: {this.state.fps}</b>
                    </div>
                </div>
                <div className="row justify-content-center">
                    <canvas onClick={this.isIntersect} id="canvas" ref={this.canvas} width={this.state.width} height={this.state.height} />
                </div>
            </div>
        );
    }
}

export default Canvas;
