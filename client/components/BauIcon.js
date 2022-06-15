import * as React from 'react';

const BauIcon = ({patternNum, rotate, colorNum, nickname, score, message, isTrans}) => {
    // nickname : string, score : string ('4/13'), message : string
    const rotation = ['', ' r1', ' r2', ' r3'];
    const colors = [' red', ' blue', ' black', ' yellow'];
    let color = '';
    if (colorNum<4) color = colors[colorNum];
    if (!nickname) nickname = 'NICKNAME';
    if (!score) score = '4/13';
    if (!message && colorNum ==1) message = 'Hello, this is me from id215';
    switch (patternNum){
        case 0:
            return (
                <div className={'bauhausBlock' + (message?' msgVisible':' msgInvisible') + (isTrans?' transparent':'')}>
                    <div className={'bauhaus bauQuarter' + rotation[rotate] + color}>
                    </div>
                    <div className='msgBlock'>
                        <div>
                            <div className='msgNick'>{nickname}</div>
                            <div className='msgScore'>{score}</div>
                        </div>
                        <div className='msgMsg'>{message}</div>
                    </div>
                </div>
            );
        case 1:
            return (
                <div className={'bauhausBlock ' + (message?'msgVisible':'msgInvisible')}>
                    <div className={'bauhaus circle' + rotation[rotate] + color}></div>
                    <div className='msgBlock'>
                        <div>
                            <div className='msgNick'>{nickname}</div>
                            <div className='msgScore'>{score}</div>
                        </div>
                        <div className='msgMsg'>{message}</div>
                    </div>
                </div>
            );
        case 2:
            return (
                <div className={'bauhausBlock ' + (message?'msgVisible':'msgInvisible')}>
                    <div className={'bauhaus triangle' + rotation[rotate] + color}></div>
                    <div className='msgBlock'>
                        <div>
                            <div className='msgNick'>{nickname}</div>
                            <div className='msgScore'>{score}</div>
                        </div>
                        <div className='msgMsg'>{message}</div>
                    </div>
                </div>
            );
        case 3:
            return (
                <div className={'bauhausBlock ' + (message?'msgVisible':'msgInvisible')}>
                    <div className={'bauhaus' + rotation[rotate]}>
                        <div className={'bauHalf' + color}></div>
                        <div className={'bauHalf' + color}></div>
                    </div>
                    <div className='msgBlock'>
                        <div>
                            <div className='msgNick'>{nickname}</div>
                            <div className='msgScore'>{score}</div>
                        </div>
                        <div className='msgMsg'>{message}</div>
                    </div>
                </div>
            );
        case 4:
            return (
                <div className={'bauhausBlock ' + (message?'msgVisible':'msgInvisible')}>
                    <div className={'hourglass bauhaus' + rotation[rotate] + color}></div>
                    <div className='msgBlock'>
                        <div>
                            <div className='msgNick'>{nickname}</div>
                            <div className='msgScore'>{score}</div>
                        </div>
                        <div className='msgMsg'>{message}</div>
                    </div>
                </div>
            );
    }

    return;
}

export default BauIcon