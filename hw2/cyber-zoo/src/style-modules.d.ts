// SCSS modules
declare module '*.module.scss' {
    const classes: { [key: string]: string };
    export default classes;
}

// на всякий случай, если где-то импортируешь обычный scss без modules
declare module '*.scss';

declare module '*.module.css' {
    const classes: { [key: string]: string };
    export default classes;
}

declare module '*.module.sass' {
    const classes: { [key: string]: string };
    export default classes;
}
