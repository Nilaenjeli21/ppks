import { Component } from 'react';
import parse from 'html-react-parser';

let captcha_value = '';
let captcha_number: number;
let backgroundColor_value = '';
let fontColor_value = '';
let charMap_value = '';
const LoadCanvasTemplateNoReload_HTML = "<div><canvas id=\"canv\"></canvas><div><a id=\"reload_href\"  style=\"cursor: pointer; color: blue\"></a></div></div>";

export const loadCaptchaEnginge = (numberOfCharacters: number, backgroundColor = 'white', fontColor = 'black', charMap = '') => {
    backgroundColor_value = backgroundColor;
    fontColor_value = fontColor;
    charMap_value = charMap;
    captcha_number = numberOfCharacters;
    let retVal = '';
    let charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    
    if (charMap === 'upper') {
        charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    } else if (charMap === 'lower') {
        charset = 'abcdefghijklmnopqrstuvwxyz0123456789';
    } else if (charMap === 'numbers') {
        charset = '0123456789';
    } else if (charMap === 'special_char') {
        charset = '~`!@#$%^&*()_+-=[]{}|:\'<>,.?/';
    }

    for (let i = 0, n = charset.length; i < numberOfCharacters; ++i) {
        retVal += charset.charAt(Math.floor(Math.random() * n));
    }

    captcha_value = retVal;

    const canvas = document.getElementById('canv') as HTMLCanvasElement;
    const ctx = canvas?.getContext('2d');
    if (ctx) {
        ctx.canvas.width = numberOfCharacters * 25;
        ctx.canvas.height = 30;

        ctx.fillStyle = backgroundColor;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.textBaseline = 'middle';
        ctx.font = 'italic 20px Arial';
        ctx.fillStyle = fontColor;

        for (let i = 0; i < numberOfCharacters; i++) {
            const height_num = 20 * (i + 1);
            ctx.fillText(retVal[i], height_num, Math.round(Math.random() * (15 - 12) + 12));
        }
    }

    const reloadHref = document.getElementById('reload_href');
    if (reloadHref) {
        reloadHref.onclick = function () {
            loadCaptchaEnginge(captcha_number, backgroundColor, fontColor, charMap);
        };
    }
};

export const validateCaptcha = (userValue: string, reload = true) => {
    if (userValue !== captcha_value) {
        if (reload) {
            loadCaptchaEnginge(captcha_number, backgroundColor_value, fontColor_value, charMap_value);
        }
        return false;
    } else {
        return true;
    }
};

interface LoadCanvasTemplateProps {
    reloadText?: string;
    reloadColor?: string;
}

export class LoadCanvasTemplate extends Component<LoadCanvasTemplateProps> {
    render() {
        const { reloadText = 'Reload Captcha', reloadColor = 'blue' } = this.props;
        const templateHTML = `<div><canvas id="canv"></canvas><div><a id="reload_href" style="cursor: pointer; color: ${reloadColor}">${reloadText}</a></div></div>`;
        return parse(templateHTML);
    }
}

export class LoadCanvasTemplateNoReload extends Component {
    render() {
        return parse(LoadCanvasTemplateNoReload_HTML);
    }
}
