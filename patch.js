(function () {
	const TYPE_COLOR_RGBA = { // 字体颜色的RGBA映射
    'heavy-black': [61, 61, 61, 1],
    'heavy-white': [255, 255, 255, 1],
    'normal-black': [102, 102, 102, 1],
    'normal-white': [255, 255, 255, 0.7],
    'light-black': [140, 140, 140, 1],
    'light-white': [255, 255, 255, 0.5],
    'white-disable': [255, 255, 255, 0.45],
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

  const TYPE_COLOR_SIMPLE_MISTAKE_MAP = {
    '51,51,51,1': 'heavy-black', // #333333其实都是#3d3d3d
    '74,74,74,1': 'normal-black', // #4A4A4A用#666666
    '0,0,0,1': 'heavy-black', // #000000用#3d3d3d
    '86,152,219,1': 'type-color-link' // #5698DB 用 #1ba4ff
  };

  // 字体颜色的纠错映射关系
  const TYPE_COLOR_MISTAKE_MAP = {};

  Object.keys(TYPE_COLOR_SIMPLE_MISTAKE_MAP).forEach(function (key) {
    TYPE_COLOR_MISTAKE_MAP[key] = TYPE_COLOR_RGBA[TYPE_COLOR_SIMPLE_MISTAKE_MAP[key]];
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

  const THEME_COLOR = {
    skin0: { // 第0套主题，也即默认主题里的总要颜色
      'theme-color-1':             [90, 152, 212, 1, '主体框架左侧的颜色'],
      'theme-color-2':             [95, 162, 226, 1, '收纳箱item, 计划和文集item'],
      'theme-color-3':             [123, 189, 255, 1, 'switch3里选中按钮的颜色, 日程日历选中颜色以及小点颜色'],
      'theme-color-4':             [86, 162, 223, 1, 'switch3背景色'],
      'btn-color-1':               [109, 200, 91, 1, '第一按钮颜色，默认是绿色'],
      'btn-color-2':               [87, 153, 219, 1, '第二按钮颜色，默认是蓝色'],
      'btn-color-2-border':        [120, 186, 255, 1, '第二按钮的边框色'],
      'btn-color-3':               [27, 164, 255, 1, 'Radio组件, checkbox打钩，蓝色icon按钮初始色'],
      'btn-color-white':           [255, 255, 255, 0.96, '按钮的白色字体'],
      'common-color-1':            [248, 248, 248, 1, '第一常用色，如计划设置里 tab 那一行的背景色'],
      'common-color-2':            [102, 102, 102, 1, '第二常用色，如倒三角颜色'],
      'common-color-3':            [177, 177, 177, 1, '第三常用色，主要用于灰色icon按钮的默认色。之所以把这个色设置为常用色，是因为灰色一般不会随主题改变'],
      'common-color-4':            [213, 213, 213, 1, '第四常用色，比如灰色线框按钮，禁止按钮的边框色'],
      'common-color-5':            [224, 224, 224, 1, '第五常用色，比如禁止按钮的背景色'],
      'common-color-6':            [249, 249, 250, 1, '第六常用色，搜索框背景色，主体框架右下主体内容背景色，日程四象限背景色，很多偏灰一点点的背景色'],
      'common-color-7':            [255, 255, 255, 1, '第七常用色，纯白色'],
      'common-color-8':            [244, 244, 244, 1, '第八常用色，用于白色item, hover时的背景色'],
      'common-color-9':            [234, 234, 234, 1, '第九常用色，用于灰色边框'],
      'common-color-10':           [212, 215, 218, 1, '第十常用色，用于滚动条背景色，进度条背景色'],
      'common-color-11':           [254, 192, 41, 1, '第十一常用色，用于星标颜色'],
      'common-color-12':           [254, 161, 41, 1, '第十二常用色，用于星标hover时的颜色'],
      'common-color-danger':       [255, 122, 122, 1, '警告提示色，比如警告按钮背景色'],
      'common-mask':               [0, 0, 0, 0.1, '收纳箱的输入框，和收纳箱item的placeHolder。'],
      'common-modal-mask':         [0, 0, 0, 0.3, '模态框背景色'],
      'common-color-big-icon':     [134,195,255, 1, '某些大图标颜色。比如归档界面的计划、子计划等图标'],
      'common-quad-IE':            [253,138,138, 1, '第一象限色'],
      'common-quad-IU':            [255,209,91, 1, '第二象限色'],
      'common-quad-UE':            [100,162,225, 1, '第三象限色'],
      'common-quad-UU':            [107,200,89, 1, '第四象限色'],
      'common-select-item-border': [220,238,250, 1, '选中item的border色'],
      'common-select-item-bg':     [238,247,255, 1, '选中item的背景色'],
      'common-item-shadow':        [0, 0, 0, 0.15, 'item阴影色 仅用于无border的拖起helper(如公司部门)'],
      'common-color-bg-line' :     [255, 255, 255, 0.2, '有色背景的分割线'] ,
      'common-color-item-hover' :  [255, 255, 255, 0.04, '有色背景item的hover状态 （item本身没有颜色）'] ,
      'common-color-item-active' : [0,0,0,0.04, '有色背景item的active状态 （item本身没有颜色）']
    }
  };
  const THEME_COLOR_LIST = [];
  Object.keys(THEME_COLOR).forEach(function (theme) {
    Object.keys(THEME_COLOR[theme]).forEach(function (color) {
      THEME_COLOR_LIST.push({
        theme: theme,
        rgb: THEME_COLOR[theme][color].slice(0, 3).join(','),
        a: THEME_COLOR[theme][color][3],
        desc: THEME_COLOR[theme][color][4],
        name: color
      });
    });
  });

  const THEME_COLOR_SIMPLE_MISTAKE_MAP = {
    '102,200,80,1'   : 'btn-color-1',
    '85,168,253,1'   : 'btn-color-3',
    '176,176,176,1'  : 'common-color-3',
    '0,0,0,0.04'     : 'common-color-8',
    '107,200,89,1'   : 'btn-color-1',
    '86,152,219,1'   : 'btn-color-2',
    '204,204,204,1'  : 'common-color-4',
    '91,187,255,1'   : 'theme-color-3',
    '240,240,240,1'  : 'common-color-10',
    '239,239,239,1'  : 'common-color-10',
    '211,215,217,1'  : 'common-color-10',
    '0,0,0,0.09'     : 'common-color-4'
  };

  // 主题色的纠错映射关系
  const THEME_COLOR_MISTAKE_MAP = {};

  Object.keys(THEME_COLOR_SIMPLE_MISTAKE_MAP).forEach(function (key) {
    THEME_COLOR_MISTAKE_MAP[key] = THEME_COLOR.skin0[THEME_COLOR_SIMPLE_MISTAKE_MAP[key]].slice(0, 4)
  });

  // bgc是background-color, bc是border-color
  const BUTTON = { // 如果某个按钮和另外一个按钮的配置一样，可以直接把value配置成两一个按钮的key
    'btn-primary': {
      bgc: 'btn-color-1'
    },
    'btn-fill-primary': 'btn-primary',
    'btn-secondary': {
      bc: 'btn-color-2'
    },
    'btn-outline-secondary': 'btn-secondary',
    'btn-fill-secondary': {
      bgc: 'btn-color-2'
    },
    'btn-fill-secondary-border': {
      bgc: 'btn-color-2',
      bc: 'btn-color-2-border'
    },
    'btn-fill-danger': {
      bgc: 'common-color-danger'
    },
    'btn-outline-primary': {
      bc: 'common-color-4'
    },
    'btn-outline-danger': {
      bc: 'common-color-danger'
    }
  };
  const BUTTON_SIZE = {
    'btn-sm': 24,
    'btn-lg': 32,
    'btn-xl': 36,
    'btn-xxl': 40
  };

  const BUTTON_LIST = [];
  Object.keys(BUTTON).forEach(function (button) {
    let v = BUTTON[button];
    if (typeof v === 'string') v = BUTTON[v];
    const data = { name: button };
    const skin0 = THEME_COLOR.skin0;
    if (v.bgc) {
      data.bgc = {
        rgb: skin0[v.bgc].slice(0, 3).join(','),
        a: skin0[v.bgc][3]
      };
    }
    if (v.bc) {
      data.bc = {
        rgb: skin0[v.bc].slice(0, 3).join(','),
        a: skin0[v.bc][3]
      };
    }
    BUTTON_LIST.push(data);
  });

  const BUTTON_SIZE_MAP = {};
  Object.keys(BUTTON_SIZE).forEach(function (name) {
    BUTTON_SIZE_MAP[BUTTON_SIZE[name]] = name;
  });

  // 获取填充的背景色
  const getFillColor = function (layer) {
    let color = null;
    if (layer.fills && layer.fills.length) {
      layer.fills.forEach(function (fill) {
        if (fill.fillType === 'color') {
          const r = fill.color.r;
          const g = fill.color.g;
          const b = fill.color.b;
          const a = fill.color.a;
          color = [r, g, b, a];
        }
      });
    }
    if (color) {
      if (THEME_COLOR_MISTAKE_MAP[color.join(',')]) {
        color = THEME_COLOR_MISTAKE_MAP[color.join(',')];
      }
    }
    return color;
  };

  // 获取边框颜色
  const getBorderColor = function (layer) {
    let color = null;
    if (layer.borders && layer.borders.length) {
      layer.borders.forEach(function (border) {
        if (border.fillType === 'color') {
          const r = border.color.r;
          const g = border.color.g;
          const b = border.color.b;
          const a = border.color.a;
          color = [r, g, b, a];
        }
      });
    }
    if (color) {
      if (THEME_COLOR_MISTAKE_MAP[color.join(',')]) {
        color = THEME_COLOR_MISTAKE_MAP[color.join(',')];
      }
    }
    return color;
  };

  const layerText = function (layer) {
    const _c = layer.color;
    const _rgba = [_c.r, _c.g, _c.b, _c.a].join(',');
    let color;
    if (TYPE_COLOR_MISTAKE_MAP[_rgba]) {
      const _m = TYPE_COLOR_MISTAKE_MAP[_rgba];
      color = { r: _m[0], g: _m[1], b: _m[2], a: _m[3] };
    } else {
      color = _c;
    }
    const rgb = [color.r, color.g, color.b].join(',');
    const rgbMatchList = TYPE_COLOR_RGBA_LIST.filter(item => item.rgb === rgb);
    const rgbaMatchList = rgbMatchList.filter(item => item.a === color.a);
    
    const fontSize = layer.fontSize;
    const sizeMathList = TYPE_SIZE_LIST.filter(item => item.size === fontSize);

    let mixin = '';
    let nonMatch = ''; // 未匹配提示
    if (rgbaMatchList.length && sizeMathList.length) {
      mixin = `
        <div class="item">
          <label data-label="mixin">
            <textarea rows="2" readonly="readonly">@include GTC(${sizeMathList[0].name}, ${rgbaMatchList[0].name});</textarea>
          </label>
        </div>
      `;
    } else {
      const nonMatchList = [];
      if (!rgbaMatchList.length && rgbMatchList.length) {
        nonMatchList.push(`颜色的透明值匹配失败, 可能值是${rgbMatchList[0].name}`);
      } else if (!rgbaMatchList.length && !rgbMatchList.length) {
        nonMatchList.push('颜色匹配失败');
      }
      if (!sizeMathList.length) {
        nonMatchList.push('字号匹配失败');
      }
      nonMatchList.push('请务必『联系产品』进行确认');
      nonMatch = `
        <div class="item">
          <label data-label="匹配失败提醒">
            <textarea rows="3" readonly="readonly">${nonMatchList.join('，')}</textarea>
          </label>
        </div>
      `;
    }
    return [mixin, nonMatch].join('');
  };

  const layerShape = function (layer) {
    const color = getFillColor(layer);
    if (color) { // 找到了颜色对应的值，才显示出来
      const rgb = color.slice(0, 3).join(',');
      const rgbMatchList = THEME_COLOR_LIST.filter(item => item.rgb === rgb);
      const rgbaMatchList = rgbMatchList.filter(item => item.a === color[3]);
      let matchTip = '';
      let nonMatchTip = '';
      if (rgbaMatchList.length) {
        matchTip = `
          <div class="item" data-label="变量名">
            <label >
              <input type="text" value="$${rgbaMatchList[0].name}" readonly="readonly"/>
            </label>
          </div>
          <div class="item">
            <label data-label="颜色主要用途">
              <textarea rows="3" readonly="readonly">${rgbaMatchList[0].desc}</textarea>
            </label>
          </div>
        `;
      }
      return [matchTip, nonMatchTip].join('');
    }
  };

  const layerButton = function (layer) {
    const borderColor = getBorderColor(layer);
    let matchList = BUTTON_LIST.slice();
    let matchBorder = false, matchBg = false;
    if (borderColor) {
      matchBorder = true;
      const rgb = borderColor.slice(0, 3).join(',');
      matchList = matchList.filter(function (item) {
        if (!item.bc) return false;
        if (item.bc.rgb === rgb) return true;
        else return false;
      });
    }
    const bgColor = getFillColor(layer);
    if (bgColor && (bgColor.slice(0, 3).join(',') !== '255,255,255')) {
      matchBg = true;
      const rgb = bgColor.slice(0, 3).join(',');
      matchList = matchList.filter(function (item) {
        if (!item.bgc) return false;
        if (item.bgc.rgb === rgb) return true;
        else return false;
      });
    }
    let matchTip = '', sizeTip = '', nonMatchTip = '';
    if ((matchBorder || matchBg) && matchList.length) {
      matchTip = `
        <div class="item" data-label="className">
          <label >
            <input type="text" value="${matchList[0].name}" readonly="readonly"/>
          </label>
        </div>
      `;
      const height = Math.round(layer.rect.height); // 由于标注原因，可能出现非整数情况，所以进行四舍五入
      sizeTip = `
        <div class="item" data-label="size">
          <label >
            <input type="text" value="${BUTTON_SIZE_MAP[height] || '使用默认尺寸即可'}" readonly="readonly"/>
          </label>
        </div>
      `;
      let sizeDesc = '';
      if (height === 32) {
        sizeDesc = '该按钮的高是32px, 应该是一个btn-block按钮，btn-block按钮默认高度就是32px';
      } else if (height > 32) {
        sizeDesc = '该按钮高于32px, 应该是一个btn-block按钮，请配合上面的size使用';
      } else if (height === 24) {
        sizeDesc = '该按钮的高是24px, 是一个小号按钮，请配合上面的size使用';
      }
      if (sizeDesc) {
        sizeTip += `
          <div class="item">
            <label data-label="尺寸提示">
              <textarea rows="3" readonly="readonly">${sizeDesc}</textarea>
            </label>
          </div>
        `;
      }
    } else {

    }
    return [matchTip, sizeTip, nonMatchTip].join('');
  };

  const layerBorder = function (layer) {
    const borderColor = getBorderColor(layer);
    let matchRgbList, matchAList; // rgb匹配rgb色， a是附加匹配透明度
    if (borderColor) {
      const rgb = borderColor.slice(0, 3).join(',');
      const a = borderColor[3];
      matchRgbList = THEME_COLOR_LIST.filter(item => item.rgb === rgb);
      matchAList = matchRgbList.filter(item => item.a === a);
    }
    let matchTip = '', nonMatchTip = '';
    if (matchAList && matchAList.length) {
      matchTip = `
        <div class="item" data-label="变量名">
          <label >
            <input type="text" value="$${matchAList[0].name}" readonly="readonly"/>
          </label>
        </div>
        <div class="item">
          <label data-label="颜色主要用途">
            <textarea rows="3" readonly="readonly">${matchAList[0].desc}</textarea>
          </label>
        </div>
      `;
    } else if (matchRgbList && matchRgbList.length) {
      const nonMatchList = ['匹配到的RGB有:' + matchRgbList.map(item => item.name).join(',')];
      nonMatchList.push('但是透明度的值不匹配');
      nonMatchTip = `
        <div class="item">
          <label data-label="匹配失败提醒">
            <textarea rows="3" readonly="readonly">${nonMatchList.join('，')}</textarea>
          </label>
        </div>
      `;
    } else if (borderColor) {
      nonMatchTip = `
        <div class="item">
          <label data-label="匹配失败提醒">
            <textarea rows="3" readonly="readonly">该元素有边框，但系统暂无这种颜色，请联系产品进行确认</textarea>
          </label>
        </div>
      `;
    }
    return [matchTip, nonMatchTip].join('');
  };

  const renderInspectorPatch = function (html) {
    const layer = this.current.layers[this.selectedIndex];
    const _addList = [2, 0]; // 这里之所以有默认的2, 0, 是因为下面用apply方法把_addList添加到html的
    if (layer.type === 'text') { // 如果类型是字体
      _addList.push(this.propertyType('<a style="color: #FF7A7A;">字体匹配结果</a>', layerText(layer)));
    }
    if (layer.type === 'shape') {
      const bgColor = layerShape(layer);
      if (bgColor) {
        _addList.push(this.propertyType('<a style="color: #6BC859;">背景色匹配结果</a>', bgColor));
      }
      const button = layerButton(layer);
      if (button) {
        _addList.push(this.propertyType('<a style="color: #5698DB;">按钮匹配结果</a>', button));
      }
      const border = layerBorder(layer);
      if (border) {
        _addList.push(this.propertyType('<a style="color: #ee6723;">边框色匹配结果</a>', border))
      }
    }
    Array.prototype.splice.apply(html, _addList);
  };

  if (window.SMApp) { // 如果SMApp已经定义
    const _renderInspector = window.SMApp.prototype.renderInspector;
    window.SMApp.prototype.renderInspector = function () {
      renderInspectorPatch.apply(this, arguments);
      return _renderInspector.apply(this, arguments);
    };
  } else {
    Object.defineProperty(window, 'SMApp', {
      set: function (value) {
        const _renderInspector = value.prototype.renderInspector;
        value.prototype.renderInspector = function () {
          renderInspectorPatch.apply(this, arguments);
          return _renderInspector.apply(this, arguments);
        }
        this._SMApp = value;
      },
      get: function () {
        const _this = this;
        return function (project) {
          window.postMessage({type: 'SKETCH_MEASURE_PROJECT', project: project}, '*');
          return this._SMApp(project);          
        };
      }
    });
  }
})();