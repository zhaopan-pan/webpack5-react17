declare const module: { hot: any }

declare module '*.css' {
    const content: any
    export default content
}
