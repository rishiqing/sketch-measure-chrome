let project_data;
window.addEventListener('message', function (event) {
	if (event.data && event.data.type === 'SKETCH_MEASURE_PROJECT') {
		project_data = event.data.project;
		// 开始统计project_data
		const artboards = project_data.artboards;
		const color_maps = {};
		const layer_type_maps = {};
		artboards.forEach(function (artboard, artIndex) {
			const layers = artboard.layers;
			layers.forEach(function (layer, layerIndex) {
				layer_type_maps[layer.type] = true;
				if (layer.type === 'shape') {
					if (layer.fills && layer.fills.length) {
						layer.fills.forEach(function (fill) {
							if (fill.fillType === 'color') {
								const r = fill.color.r;
								const g = fill.color.g;
								const b = fill.color.b;
								const a = fill.color.a;
								// const color_key = [r, g, b, a].join(',');
								const color_key = fill.color['color-hex'];
								if (!color_maps[color_key]) color_maps[color_key] = [];
								color_maps[color_key].push({
									artIndex: artIndex,
									artName: artboard.name,
									layerIndex: layerIndex
								});
							}
						});
					}
				}
			});
		});
		// console.log('color_maps', color_maps);
		// console.log('layer_type_maps', layer_type_maps);
		// 接下来统计试用频率
		const color_freq_maps = {};
		const color_keys = Object.keys(color_maps);
		color_keys.forEach(function (key) {
			const freq = color_maps[key].length;
			if (!color_freq_maps[freq]) color_freq_maps[freq] = [];
			color_freq_maps[freq].push(key);
		});
		// console.log('color_freq_maps', color_freq_maps);
	}	
});