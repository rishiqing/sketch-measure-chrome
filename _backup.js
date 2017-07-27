/*
* @Author: apple
* @Date:   2017-07-26 23:46:11
* @Last Modified by:   qin yang
* @Last Modified time: 2017-07-27 13:11:59
*/
const TYPE_COLOR_RGBA = { // 字体颜色的RGBA映射
	'heavy-black': [61, 61, 61, 1],
	'heavy-white': [255, 255, 255, 1],
	'normal-black': [102, 102, 102, 1],
	'normal-white': [255, 255, 255, 0.7],
	'light-black': [140, 140, 140, 1],
	'light-white': [255, 255, 255, 0.45],
	'disable': [177, 177, 177, 1],
	'link': [27, 164, 255, 1]
};
const TYPE_COLOR_RGBA_LIST = [];
Object.keys(TYPE_COLOR_RGBA).forEach(function (key) {
  TYPE_COLOR_RGBA_LIST.push({
    name: key,
    rgb: TYPE_COLOR_RGBA[key].slice(0, 3).join(','),
    a: TYPE_COLOR_RGBA[key][3]
  });
});

const TYPE_SIZE = { // 字号映射
  menu: 16,
  title: 14,
  body: 13,
  caption: 12,
  display3: 36,
  display2: 28,
  display1: 20
};
const TYPE_SIZE_LIST = [];
Object.keys(TYPE_SIZE).forEach(function (key) {
  TYPE_SIZE_LIST.push({
    name: key,
    size: TYPE_SIZE[key]
  });
});

const s = document.createElement('script');
s.innerHTML = `
  (function () {
    const TYPE_COLOR_RGBA_LIST = ${JSON.stringify(TYPE_COLOR_RGBA_LIST)};
    const TYPE_SIZE_LIST = ${JSON.stringify(TYPE_SIZE_LIST)};
    Object.defineProperties(window, {
      SKETCH_MEASURE_PROJECT: {
        set: function (value) {
          this._SKETCH_MEASURE_PROJECT = value;
          window.postMessage({type: 'SKETCH_MEASURE_PROJECT', project: value}, '*');
        },
        get: function () {
          return this._SKETCH_MEASURE_PROJECT;
        }
      },
      SKETCH_MEASURE_INDEX: {
        set: function (value) {
          this._SKETCH_MEASURE_INDEX = value;
          window.postMessage({type: 'SKETCH_MEASURE_INDEX', index: value}, '*');
        },
        get function () {
          return this._SKETCH_MEASURE_INDEX;
        }
      }
    });
    Object.defineProperty(window, 'SMApp', {
      set: function (value) {
        const _renderInspector = value.prototype.renderInspector;
        value.prototype.renderInspector = function (html) {
          const layer = this.current.layers[this.selectedIndex];
          console.log('layer',layer);
          if (layer.type === 'text') { // 如果类型是字体
            const color = layer.color;
            const rgb = [color.r, color.g, color.b].join(',');
            const rgbMatchList = TYPE_COLOR_RGBA_LIST.filter(item => item.rgb === rgb);
            const rgbaMatchList = rgbMatchList.filter(item => item.a === color.a);
            
            const fontSize = layer.fontSize;
            const sizeMathList = TYPE_SIZE_LIST.filter(item => item.size === fontSize);

            let mixin = '';
            let nonMatch = ''; // 未匹配提示
            if (rgbaMatchList.length && sizeMathList.length) {
              mixin = \`
                <div class="item">
                  <label data-label="mixin">
                    <textarea rows="2" readonly="readonly">@include GTC(\${sizeMathList[0].name}, \${rgbaMatchList[0].name});</textarea>
                  </label>
                </div>
              \`;
            } else {
              const nonMatchList = [];
              if (!rgbaMatchList.length && rgbMatchList.length) {
                nonMatchList.push('颜色的透明值匹配失败, 可能值是\${rgbMatchList[0].name}');
              } else if (!rgbaMatchList.length && !rgbMatchList.length) {
                nonMatchList.push('颜色匹配失败');
              }
              if (!sizeMathList.length) {
                nonMatchList.push('字号匹配失败');
              }
              nonMatchList.push('请务必『联系产品』进行确认');
              nonMatch = \`
                <div class="item">
                  <label data-label="匹配失败提醒">
                    <textarea rows="3" readonly="readonly">\${nonMatchList.join('，')}</textarea>
                  </label>
                </div>
              \`;
            }
            html.splice(2, 0, this.propertyType('字体代码', [mixin, nonMatch].join('')));
          }
          return _renderInspector.apply(this, arguments);
        };
        this._SMApp = value;
      },
      get: function () {
        const _this = this;
        return function (project) {
          _this.SKETCH_MEASURE_PROJECT = project;
          const smapp = this._SMApp(project);
          const __selectedIndex = smapp.selectedIndex;
          const __artboardIndex = smapp.artboardIndex;
          Object.defineProperties(smapp, {
            selectedIndex: {
              set: function (v) {
                this.__selectedIndex = v;
                window.SKETCH_MEASURE_INDEX = {
                  selectedIndex: v,
                  artboardIndex: this.artboardIndex
                };
              },
              get: function () {
                return this.__selectedIndex;
              }
            },
            artboardIndex: {
              set: function (v) {
                this.__artboardIndex = v;
                window.SKETCH_MEASURE_INDEX = {
                  selectedIndex: this.selectedIndex,
                  artboardIndex: v
                };
              },
              get: function () {
                return this.__artboardIndex;
              }
            }
          });
          smapp.selectedIndex = __selectedIndex;
          smapp.artboardIndex = __artboardIndex;
          return smapp;
        };
      }
    });
  })();
`;
document.documentElement.appendChild(s);
let project_data = null;
window.addEventListener('message', function (event) {
	if (event.data && event.data.type === 'SKETCH_MEASURE_PROJECT') {
		project_data = event.data.project;
	}
	// 点击的index值发生改变
	if (event.data && event.data.type === 'SKETCH_MEASURE_INDEX' && project_data) {
		const selectedIndex = event.data.index.selectedIndex;
		const artboardIndex = event.data.index.artboardIndex;
		if (selectedIndex !== undefined && artboardIndex !== undefined) {
			const artboard = project_data.artboards[artboardIndex];
			const layer = artboard.layers[selectedIndex]; // layer.type === 'text' 的时候，才是字体，才需要解析字体的数据

			const inspector = document.querySelector('#inspector');

			if (layer) { // 如果layer存在

			}
			console.log('layer', layer);
			console.log('inspector', inspector);
		} else {
			console.log('need to clear');
		}
	}
});