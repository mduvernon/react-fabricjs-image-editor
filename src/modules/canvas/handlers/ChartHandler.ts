import * as echarts from 'echarts';

import { Handler } from './Handler';

class ChartHandler {

    handler?: Handler;
    instance?: echarts.ECharts;

    constructor(handler: Handler) {
        this.handler = handler;
    }
}

export { ChartHandler };

export default ChartHandler;
