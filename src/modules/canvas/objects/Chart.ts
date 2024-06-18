import * as echarts from 'echarts';
import { fabric } from 'fabric';
import { FabricElement, toObject } from '../utils';

export interface ChartObject extends FabricElement {
	setSource: (source: echarts.EChartsOption) => void;
	setChartOption: (chartOption: echarts.EChartsOption) => void;
	chartOption: echarts.EChartsOption;
	instance: echarts.ECharts;
}

const Chart = fabric.util.createClass(fabric.Rect, {
	type: 'chart',
	superType: 'element',
	hasRotatingPoint: false,
	initialize(chartOption: echarts.EChartsOption, options: any) {
		options = options || {};
		this.callSuper('initialize', options);
		this.set({
			chartOption,
			fill: 'rgba(255, 255, 255, 0)',
			stroke: 'rgba(255, 255, 255, 0)',
		});
	},
	setSource(source: echarts.EChartsOption | string) {
		if (typeof source === 'string') {
			this.setChartOptionStr(source);
		} else {
			this.setChartOption(source);
		}
	},
	setChartOptionStr(chartOptionStr: string) {
		this.set({
			chartOptionStr,
		});
	},
	setChartOption(chartOption: echarts.EChartsOption) {
		this.set({
			chartOption,
		});
		this.distroyChart();
		this.createChart(chartOption);
	},
	createChart(chartOption: echarts.EChartsOption) {
		this.instance = echarts.init(this.element);
		if (!chartOption) {
			this.instance.setOption({
				xAxis: {},
				yAxis: {},
				series: [
					{
						type: 'line',
						data: [
							[0, 1],
							[1, 2],
							[2, 3],
							[3, 4],
						],
					},
				],
			});
		} else {
			this.instance.setOption(chartOption);
		}
	},
	distroyChart() {
		if (this.instance) {
			this.instance.dispose();
		}
	},
	toObject(propertiesToInclude: string[]) {
		return toObject(this, propertiesToInclude, {
			chartOption: this.get('chartOption'),
			container: this.get('container'),
			editable: this.get('editable'),
		});
	},
	_render(ctx: CanvasRenderingContext2D) {
		this.callSuper('_render', ctx);
		if (!this.instance) {
			const { id, scaleX, scaleY, width, height, angle, editable, chartOption } = this;
			const zoom = this.canvas.getZoom();
			const left = this.aCoords.tl.x;
			const top = this.aCoords.tl.y;
			const padLeft = (width * scaleX * zoom - width) / 2;
			const padTop = (height * scaleY * zoom - height) / 2;
			this.element = fabric.util.makeElement('div', {
				id: `${id}_container`,
				style: `transform: rotate(${angle}deg) scale(${scaleX * zoom}, ${scaleY * zoom});
                        width: ${width}px;
                        height: ${height}px;
                        left: ${left + padLeft}px;
                        top: ${top + padTop}px;
                        position: absolute;
                        user-select: ${editable ? 'none' : 'auto'};
                        pointer-events: ${editable ? 'none' : 'auto'};`,
			}) as HTMLDivElement;
			this.createChart(chartOption);
			const container = document.getElementById(this.container);
			container.appendChild(this.element);
		}
	},
});

Chart.fromObject = (options: ChartObject, callback: (obj: ChartObject) => any) => {
	return callback(new Chart(options.chartOption, options));
};

(window.fabric as any).Chart = Chart;

export { Chart };

export default Chart;
