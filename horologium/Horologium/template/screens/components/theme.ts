
export interface Theme {
    backgroundColor?: string,
    fontColor?: string,
    ampmFormat?: boolean,
    showSeconds?: boolean
}

const DefaultThemer : Theme = {
    fontColor: '#1DB954',
    backgroundColor: '#040404',
    ampmFormat: false,
    showSeconds: true
}

export default DefaultThemer