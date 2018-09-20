<template>
  <div class="container">
    <div class="header">
      <img class="logo" src="../assets/images/logo07.png">
    </div>
    <div class="content">
      <!-- 用于添加图形、渐变和变换的菜单区域 -->
      <div class="toolbox">
        <!-- 图形菜单 -->
        <h3 class="toolbox-title" @click="toggleToolboxExpand('shape')">
          <span
            :class="{'icon-rotate': toolboxExpand['shape']}"
            class="fa fa-caret-up icon-expand"></span>&nbsp;图形
        </h3>
        <div class="toolbox-banner" v-show="toolboxExpand['shape']">
          <img
            class="cursor-pointer"
            src="../assets/images/shape01.png"
            title="矩形"
            @click="createShape('rect')"><!--
            --><img
          class="cursor-pointer"
          src="../assets/images/shape02.png"
          title="圆形"
          @click="createShape('circle')"><!--
            --><img
          class="cursor-pointer"
          src="../assets/images/shape03.png"
          title="椭圆"
          @click="createShape('ellipse')"><!--
            --><img
          class="cursor-pointer"
          src="../assets/images/shape04.png"
          title="直线"
          @click="createShape('line')"><!--
            --><img
          class="cursor-pointer"
          src="../assets/images/shape05.png"
          title="折线"
          @click="createShape('polyline')"><!--
            --><img
          class="cursor-pointer"
          src="../assets/images/shape06.png"
          title="多边形"
          @click="createShape('polygon')"><!--
            --><img
          class="cursor-pointer"
          src="../assets/images/shape07.png"
          title="路径"
          @click="createShape('path')"><!--
          --><img
          class="cursor-pointer"
          src="../assets/images/shape08.png"
          title="文本"
          @click="createShape('text')">
        </div>
        <!-- 渐变菜单 -->
        <h3 class="toolbox-title" @click="toggleToolboxExpand('gradient')">
          <span
            :class="{'icon-rotate': toolboxExpand['gradient']}"
            class="fa fa-caret-up icon-expand"
            @click="toggleToolboxExpand('gradient')"></span>&nbsp;渐变
        </h3>
        <div class="toolbox-banner" v-show="toolboxExpand['gradient']">
          <img
            class="cursor-pointer"
            src="../assets/images/gradient01.png"
            title="线性渐变"
            @click="createGradient('linear')"><!--
            --><img
          class="cursor-pointer"
          src="../assets/images/gradient02.png"
          title="径向渐变"
          @click="createGradient('radial')">
        </div>
        <!-- 变换菜单 -->
        <h3 class="toolbox-title" @click="toggleToolboxExpand('transform')">
          <span
            :class="{'icon-rotate': toolboxExpand['transform']}"
            class="fa fa-caret-up icon-expand"
            @click="toggleToolboxExpand('transform')"></span>&nbsp;变换
        </h3>
        <div class="toolbox-banner" v-show="toolboxExpand['transform']">
          <img
            class="cursor-forbid"
            src="../assets/images/transform01.png"
            title="图形蒙版"
            @click="createTransform('mask')"><!--
            --><img
          class="cursor-forbid"
          src="../assets/images/transform02.png"
          title="剪贴路径"
          @click="createTransform('clipPath')">
        </div>
      </div>
      <!-- 画板区域 -->
      <div class="board">
        <svg
          class="stage"
          xlmns="http://www.w3.org/2000/svg"
          :width="boardWidth"
          :height="boardHeight"
          :viewBox="viewBox"
          :style="{ backgroundColor: boardBgColor }">
          <defs
            v-for="gradient in gradientList"
            :key="'g' + gradient.id">
            <linearGradient
              v-if="gradient.type === 'linear'"
              :id="gradient.name"
              :x1="gradient.x1 + '%'"
              :y1="gradient.y1 + '%'"
              :x2="gradient.x2 + '%'"
              :y2="gradient.y2 + '%'">
              <stop
                v-for="(stop, index) in gradient.stops"
                :key="index"
                :offset="stop.offset + '%'"
                :stop-color="stop.color"
                :stop-opacity="stop.opacity"></stop>
            </linearGradient>
            <radialGradient
              v-else-if="gradient.type === 'radial'"
              :id="gradient.name"
              :cx="gradient.cx + '%'"
              :cy="gradient.cy + '%'"
              :r="gradient.r + '%'"
              :fx="gradient.fx + '%'"
              :fy="gradient.fy + '%'">
              <stop
                v-for="(stop, index) in gradient.stops"
                :key="index"
                :offset="stop.offset + '%'"
                :stop-color="stop.color"
                :stop-opacity="stop.opacity"></stop>
            </radialGradient>
          </defs>
          <g
            v-for="shape in shapeList"
            :key="'s' + shape.id">
            <rect
              v-show="shape.isHidden < 0"
              class="actor"
              v-if="shape.type === 'rect'"
              :x="shape.x"
              :y="shape.y"
              :width="shape.width"
              :height="shape.height"
              :fill="shape.fill"
              :stroke="shape.stroke"
              :stroke-width="shape.strokeWidth"
              @click="handleShapeClick(shape)"></rect>
            <circle
              v-show="shape.isHidden < 0"
              class="actor"
              v-else-if="shape.type === 'circle'"
              :cx="shape.cx"
              :cy="shape.cy"
              :r="shape.r"
              :fill="shape.fill"
              :stroke="shape.stroke"
              :stroke-width="shape.strokeWidth"
              @click="handleShapeClick(shape)"></circle>
            <ellipse
              v-show="shape.isHidden < 0"
              class="actor"
              v-else-if="shape.type === 'ellipse'"
              :cx="shape.cx"
              :cy="shape.cy"
              :rx="shape.rx"
              :ry="shape.ry"
              :fill="shape.fill"
              :stroke="shape.stroke"
              :stroke-width="shape.strokeWidth"
              @click="handleShapeClick(shape)"></ellipse>
            <line
              v-show="shape.isHidden < 0"
              class="actor"
              v-else-if="shape.type === 'line'"
              :x1="shape.x1"
              :y1="shape.y1"
              :x2="shape.x2"
              :y2="shape.y2"
              :stroke="shape.stroke"
              :stroke-width="shape.strokeWidth"
              @click="handleShapeClick(shape)"></line>
            <polyline
              v-show="shape.isHidden < 0"
              class="actor"
              v-else-if="shape.type === 'polyline'"
              :points="shape.points"
              :fill="shape.fill"
              :stroke="shape.stroke"
              :stroke-width="shape.strokeWidth"
              @click="handleShapeClick(shape)"></polyline>
            <polygon
              v-show="shape.isHidden < 0"
              class="actor"
              v-else-if="shape.type === 'polygon'"
              :points="shape.points"
              :fill="shape.fill"
              :stroke="shape.stroke"
              :stroke-width="shape.strokeWidth"
              @click="handleShapeClick(shape)"></polygon>
            <path
              v-show="shape.isHidden < 0"
              class="actor"
              v-else-if="shape.type === 'path'"
              :d="shape.d"
              :fill="shape.fill"
              :stroke="shape.stroke"
              :stroke-width="shape.strokeWidth"
              @click="handleShapeClick(shape)"></path>
            <text
              v-show="shape.isHidden < 0"
              class="actor"
              v-else-if="shape.type === 'text'"
              :x="shape.x"
              :y="shape.y"
              :font-size="shape.fontSize"
              :fill="shape.fill"
              :stroke="shape.stroke"
              :stroke-width="shape.strokeWidth"
              @click="handleShapeClick(shape)">
              {{ shape.text }}
            </text>
          </g>
        </svg>
      </div>
      <!-- 用于设置画板和精灵的区域 -->
      <div class="setting">
        <!-- 设置选项列表 -->
        <ul class="setting-list">
          <li
            class="setting-list-item setting-board"
            :class="{ 'is-active': activeBar === 'board' }"
            title="画板设置"
            @click="toggleActiveBar('board')"></li>
          <li
            class="setting-list-item setting-shape"
            :class="{ 'is-active': activeBar === 'shape' }"
            title="图形列表"
            @click="toggleActiveBar('shape')"></li>
          <li
            class="setting-list-item setting-gradient"
            :class="{ 'is-active': activeBar === 'gradient' }"
            title="渐变列表"
            @click="toggleActiveBar('gradient')"></li>
          <li
            class="setting-list-item setting-transform"
            :class="{ 'is-active': activeBar === 'transform' }"
            title="变换列表"
            @click="toggleActiveBar('transform')"></li>
        </ul>
        <!-- 设置面板 -->
        <div class="setting-panel" v-if="activeBar !== 'none'">
          <!-- 画板设置 -->
          <div v-if="activeBar === 'board'">
            <h4 class="setting-title">画板设置</h4>
            <div class="setting-row">
              <label class="setting-label" for="boardWidth">画板宽度</label>
              <input
                id="boardWidth"
                class="ipt-setting setting-value"
                min="0"
                type="number"
                v-model="boardWidthValue">
            </div>
            <div class="setting-row">
              <label class="setting-label" for="boardHeight">画板高度</label>
              <input
                id="boardHeight"
                class="ipt-setting setting-value"
                min="0"
                type="number"
                v-model="boardHeightValue">
            </div>
            <div class="setting-row">
              <label class="setting-label" for="boardBg">背景颜色</label>
              <input
                id="boardBg"
                class="ipt-setting setting-value"
                min="0"
                type="color"
                v-model="boardBgColor">
            </div>
          </div>
          <!-- 图形设置 -->
          <div v-else-if="activeBar === 'shape'">
            <div v-if="isShapeList">
              <h4 class="setting-title">图形列表</h4>
              <ul class="shape-list" v-if="shapeList.length">
                <li
                  v-for="shape in shapeList"
                  :key="shape.id"
                  :title="shape.name"
                  class="shape-list-item"
                  @click="toggleShapeItem(shape)">
                  <svg
                    class="shape-shadow"
                    xlmns="http://www.w3.org/2000/svg"
                    width="60px"
                    height="40px"
                    :viewBox="viewBox">
                    <rect
                      v-show="shape.isHidden < 0"
                      v-if="shape.type === 'rect'"
                      :x="shape.x"
                      :y="shape.y"
                      :width="shape.width"
                      :height="shape.height"
                      :fill="shape.fill"
                      :stroke="shape.stroke"
                      :stroke-width="shape.strokeWidth"></rect>
                    <circle
                      v-show="shape.isHidden < 0"
                      v-else-if="shape.type === 'circle'"
                      :cx="shape.cx"
                      :cy="shape.cy"
                      :r="shape.r"
                      :fill="shape.fill"
                      :stroke="shape.stroke"
                      :stroke-width="shape.strokeWidth"></circle>
                    <ellipse
                      v-show="shape.isHidden < 0"
                      v-else-if="shape.type === 'ellipse'"
                      :cx="shape.cx"
                      :cy="shape.cy"
                      :rx="shape.rx"
                      :ry="shape.ry"
                      :fill="shape.fill"
                      :stroke="shape.stroke"
                      :stroke-width="shape.strokeWidth"></ellipse>
                    <line
                      v-show="shape.isHidden < 0"
                      v-else-if="shape.type === 'line'"
                      :x1="shape.x1"
                      :y1="shape.y1"
                      :x2="shape.x2"
                      :y2="shape.y2"
                      :stroke="shape.stroke"
                      :stroke-width="shape.strokeWidth"></line>
                    <polyline
                      v-show="shape.isHidden < 0"
                      v-else-if="shape.type === 'polyline'"
                      :points="shape.points"
                      :fill="shape.fill"
                      :stroke="shape.stroke"
                      :stroke-width="shape.strokeWidth"></polyline>
                    <polygon
                      v-show="shape.isHidden < 0"
                      v-else-if="shape.type === 'polygon'"
                      :points="shape.points"
                      :fill="shape.fill"
                      :stroke="shape.stroke"
                      :stroke-width="shape.strokeWidth"></polygon>
                    <path
                      v-show="shape.isHidden < 0"
                      v-else-if="shape.type === 'path'"
                      :d="shape.d"
                      :fill="shape.fill"
                      :stroke="shape.stroke"
                      :stroke-width="shape.strokeWidth"></path>
                    <text
                      v-show="shape.isHidden < 0"
                      v-else-if="shape.type === 'text'"
                      :x="shape.x"
                      :y="shape.y"
                      :font-size="shape.fontSize"
                      :fill="shape.fill"
                      :stroke="shape.stroke"
                      :stroke-width="shape.strokeWidth">{{ shape.text }}</text>
                  </svg>
                  <span class="shape-name one-line">{{ shape.name }}</span>
                  <span
                    class="fa fa-trash"
                    @click.stop="deleteShape(shape.id)"></span>
                </li>
              </ul>
              <small v-else>无</small>
            </div>
            <div v-else>
              <h4 class="setting-title">
                参数设置
                <span
                  class="fa fa-close setting-closer"
                  @click="backTo('shapeList')"></span>
              </h4>
              <!-- 矩形面板 -->
              <div v-if="shapeItem.type === 'rect'">
                <div class="setting-row">
                  <label class="setting-label" for="name">名称</label>
                  <input
                    id="name"
                    class="ipt-setting setting-value"
                    type="text"
                    v-model="shapeItem.name">
                </div>
                <div class="setting-row">
                  <label class="setting-label" for="x">坐标X</label>
                  <input
                    id="x"
                    class="ipt-setting setting-value"
                    min="0"
                    type="number"
                    v-model="shapeItem.x">
                </div>
                <div class="setting-row">
                  <label class="setting-label" for="y">坐标Y</label>
                  <input
                    id="y"
                    class="ipt-setting setting-value"
                    min="0"
                    type="number"
                    v-model="shapeItem.y">
                </div>
                <div class="setting-row">
                  <label class="setting-label" for="width">宽度</label>
                  <input
                    id="width"
                    class="ipt-setting setting-value"
                    min="0"
                    type="number"
                    v-model="shapeItem.width">
                </div>
                <div class="setting-row">
                  <label class="setting-label" for="height">高度</label>
                  <input
                    id="height"
                    class="ipt-setting setting-value"
                    min="0"
                    type="number"
                    v-model="shapeItem.height">
                </div>
                <div class="setting-row">
                  <label class="setting-label" for="strokeWidth">描边宽度</label>
                  <input
                    id="strokeWidth"
                    class="ipt-setting setting-value"
                    min="0"
                    type="number"
                    v-model="shapeItem.strokeWidth">
                </div>
                <div class="setting-row">
                  <label class="setting-label" for="stroke">描边颜色</label>
                  <input
                    id="stroke"
                    class="ipt-setting setting-value"
                    type="color"
                    v-model="shapeItem.stroke">
                </div>
                <div class="setting-row">
                  <label class="setting-label">填充方式</label>
                  <input
                    id="pure"
                    name="fill"
                    type="radio"
                    value="pure"
                    v-model="shapeItem.fillType"
                    @click="initialFillColor('pure')"><!--
                  --><label for="pure">&nbsp;纯色</label>
                  &nbsp;&nbsp;
                  <input
                    id="mixed"
                    name="fill"
                    type="radio"
                    value="mixed"
                    :disabled="!gradientList.length"
                    v-model="shapeItem.fillType"
                    @click="initialFillColor('mixed')"><!--
                  --><label for="mixed">&nbsp;渐变色</label>
                </div>
                <div class="setting-row" v-if="shapeItem.fillType === 'pure'">
                  <label class="setting-label" for="fill">填充颜色</label>
                  <input
                    id="fill"
                    class="ipt-setting setting-value"
                    type="color"
                    v-model="shapeItem.fill">
                </div>
                <div class="setting-row" v-else-if="shapeItem.fillType === 'mixed'">
                  <label class="setting-label" for="mixedSelect">填充颜色</label>
                  <select id="mixedSelect" name="mixed" v-model="shapeItem.fill">
                    <option
                      v-for="option in gradientList"
                      :key="option.id"
                      :value="'url(#' + option.name + ')'">{{ option.name }}</option>
                  </select>
                </div>
                <div class="setting-row">
                  <label class="setting-label">可见性</label>
                  <input
                    id="show"
                    name="radio"
                    type="radio"
                    value="-1"
                    v-model="shapeItem.isHidden"><!--
                  --><label for="show">&nbsp;显示</label>
                  &nbsp;&nbsp;
                  <input
                    id="hide"
                    name="radio"
                    type="radio"
                    value="1"
                    v-model="shapeItem.isHidden"><!--
                  --><label for="hide">&nbsp;隐藏</label>
                </div>
              </div>
              <!-- 圆形面板 -->
              <div v-else-if="shapeItem.type === 'circle'">
                <div class="setting-row">
                  <label class="setting-label" for="name02">名称</label>
                  <input
                    id="name02"
                    class="ipt-setting setting-value"
                    type="text"
                    v-model="shapeItem.name">
                </div>
                <div class="setting-row">
                  <label class="setting-label" for="cx">圆心坐标X</label>
                  <input
                    id="cx"
                    class="ipt-setting setting-value"
                    min="0"
                    type="number"
                    v-model="shapeItem.cx">
                </div>
                <div class="setting-row">
                  <label class="setting-label" for="cy">圆心坐标Y</label>
                  <input
                    id="cy"
                    class="ipt-setting setting-value"
                    min="0"
                    type="number"
                    v-model="shapeItem.cy">
                </div>
                <div class="setting-row">
                  <label class="setting-label" for="r">半径</label>
                  <input
                    id="r"
                    class="ipt-setting setting-value"
                    min="0"
                    type="number"
                    v-model="shapeItem.r">
                </div>
                <div class="setting-row">
                  <label class="setting-label" for="strokeWidth02">描边宽度</label>
                  <input
                    id="strokeWidth02"
                    class="ipt-setting setting-value"
                    min="0"
                    type="number"
                    v-model="shapeItem.strokeWidth">
                </div>
                <div class="setting-row">
                  <label class="setting-label" for="stroke02">描边颜色</label>
                  <input
                    id="stroke02"
                    class="ipt-setting setting-value"
                    type="color"
                    v-model="shapeItem.stroke">
                </div>
                <div class="setting-row">
                  <label class="setting-label">填充方式</label>
                  <input
                    id="pure02"
                    name="fill"
                    type="radio"
                    value="pure"
                    v-model="shapeItem.fillType"
                    @click="initialFillColor('pure')"><!--
                  --><label for="pure02">&nbsp;纯色</label>
                  &nbsp;&nbsp;
                  <input
                    id="mixed02"
                    name="fill"
                    type="radio"
                    value="mixed"
                    :disabled="!gradientList.length"
                    v-model="shapeItem.fillType"
                    @click="initialFillColor('mixed')"><!--
                  --><label for="mixed02">&nbsp;渐变色</label>
                </div>
                <div class="setting-row" v-if="shapeItem.fillType === 'pure'">
                  <label class="setting-label" for="fill02">填充颜色</label>
                  <input
                    id="fill02"
                    class="ipt-setting setting-value"
                    type="color"
                    v-model="shapeItem.fill">
                </div>
                <div class="setting-row" v-else-if="shapeItem.fillType === 'mixed'">
                  <label class="setting-label" for="mixedSelect02">填充颜色</label>
                  <select id="mixedSelect02" name="mixed" v-model="shapeItem.fill">
                    <option
                      v-for="option in gradientList"
                      :key="option.id"
                      :value="'url(#' + option.name + ')'">{{ option.name }}</option>
                  </select>
                </div>
                <div class="setting-row">
                  <label class="setting-label">可见性</label>
                  <input
                    id="show02"
                    name="radio"
                    type="radio"
                    value="-1"
                    v-model="shapeItem.isHidden"><!--
                  --><label for="show02">&nbsp;显示</label>
                  &nbsp;&nbsp;
                  <input
                    id="hide02"
                    name="radio"
                    type="radio"
                    value="1"
                    v-model="shapeItem.isHidden"><!--
                  --><label for="hide02">&nbsp;隐藏</label>
                </div>
              </div>
              <!-- 椭圆面板 -->
              <div v-else-if="shapeItem.type === 'ellipse'">
                <div class="setting-row">
                  <label class="setting-label" for="name03">名称</label>
                  <input
                    id="name03"
                    class="ipt-setting setting-value"
                    type="text"
                    v-model="shapeItem.name">
                </div>
                <div class="setting-row">
                  <label class="setting-label" for="cx02">圆心坐标X</label>
                  <input
                    id="cx02"
                    class="ipt-setting setting-value"
                    min="0"
                    type="number"
                    v-model="shapeItem.cx">
                </div>
                <div class="setting-row">
                  <label class="setting-label" for="cy02">圆心坐标Y</label>
                  <input
                    id="cy02"
                    class="ipt-setting setting-value"
                    min="0"
                    type="number"
                    v-model="shapeItem.cy">
                </div>
                <div class="setting-row">
                  <label class="setting-label" for="rx">水平半径</label>
                  <input
                    id="rx"
                    class="ipt-setting setting-value"
                    min="0"
                    type="number"
                    v-model="shapeItem.rx">
                </div>
                <div class="setting-row">
                  <label class="setting-label" for="ry">垂直半径</label>
                  <input
                    id="ry"
                    class="ipt-setting setting-value"
                    min="0"
                    type="number"
                    v-model="shapeItem.ry">
                </div>
                <div class="setting-row">
                  <label class="setting-label" for="strokeWidth03">描边宽度</label>
                  <input
                    id="strokeWidth03"
                    class="ipt-setting setting-value"
                    min="0"
                    type="number"
                    v-model="shapeItem.strokeWidth">
                </div>
                <div class="setting-row">
                  <label class="setting-label" for="stroke03">描边颜色</label>
                  <input
                    id="stroke03"
                    class="ipt-setting setting-value"
                    type="color"
                    v-model="shapeItem.stroke">
                </div>
                <div class="setting-row">
                  <label class="setting-label">填充方式</label>
                  <input
                    id="pure03"
                    name="fill"
                    type="radio"
                    value="pure"
                    v-model="shapeItem.fillType"
                    @click="initialFillColor('pure')"><!--
                  --><label for="pure03">&nbsp;纯色</label>
                  &nbsp;&nbsp;
                  <input
                    id="mixed03"
                    name="fill"
                    type="radio"
                    value="mixed"
                    :disabled="!gradientList.length"
                    v-model="shapeItem.fillType"
                    @click="initialFillColor('mixed')"><!--
                  --><label for="mixed03">&nbsp;渐变色</label>
                </div>
                <div class="setting-row" v-if="shapeItem.fillType === 'pure'">
                  <label class="setting-label" for="fill03">填充颜色</label>
                  <input
                    id="fill03"
                    class="ipt-setting setting-value"
                    type="color"
                    v-model="shapeItem.fill">
                </div>
                <div class="setting-row" v-else-if="shapeItem.fillType === 'mixed'">
                  <label class="setting-label" for="mixedSelect03">填充颜色</label>
                  <select id="mixedSelect03" name="mixed" v-model="shapeItem.fill">
                    <option
                      v-for="option in gradientList"
                      :key="option.id"
                      :value="'url(#' + option.name + ')'">{{ option.name }}</option>
                  </select>
                </div>
                <div class="setting-row">
                  <label class="setting-label">可见性</label>
                  <input
                    id="show03"
                    name="radio"
                    type="radio"
                    value="-1"
                    v-model="shapeItem.isHidden"><!--
                  --><label for="show03">&nbsp;显示</label>
                  &nbsp;&nbsp;
                  <input
                    id="hide03"
                    name="radio"
                    type="radio"
                    value="1"
                    v-model="shapeItem.isHidden"><!--
                  --><label for="hide03">&nbsp;隐藏</label>
                </div>
              </div>
              <!-- 直线面板 -->
              <div v-else-if="shapeItem.type === 'line'">
                <div class="setting-row">
                  <label class="setting-label" for="name04">名称</label>
                  <input
                    id="name04"
                    class="ipt-setting setting-value"
                    type="text"
                    v-model="shapeItem.name">
                </div>
                <div class="setting-row">
                  <label class="setting-label" for="x1">坐标X1</label>
                  <input
                    id="x1"
                    class="ipt-setting setting-value"
                    min="0"
                    type="number"
                    v-model="shapeItem.x1">
                </div>
                <div class="setting-row">
                  <label class="setting-label" for="y1">坐标Y1</label>
                  <input
                    id="y1"
                    class="ipt-setting setting-value"
                    min="0"
                    type="number"
                    v-model="shapeItem.y1">
                </div>
                <div class="setting-row">
                  <label class="setting-label" for="x2">坐标X2</label>
                  <input
                    id="x2"
                    class="ipt-setting setting-value"
                    min="0"
                    type="number"
                    v-model="shapeItem.x2">
                </div>
                <div class="setting-row">
                  <label class="setting-label" for="y2">坐标Y2</label>
                  <input
                    id="y2"
                    class="ipt-setting setting-value"
                    min="0"
                    type="number"
                    v-model="shapeItem.y2">
                </div>
                <div class="setting-row">
                  <label class="setting-label" for="strokeWidth04">描边宽度</label>
                  <input
                    id="strokeWidth04"
                    class="ipt-setting setting-value"
                    min="0"
                    type="number"
                    v-model="shapeItem.strokeWidth">
                </div>
                <div class="setting-row">
                  <label class="setting-label" for="stroke04">描边颜色</label>
                  <input
                    id="stroke04"
                    class="ipt-setting setting-value"
                    type="color"
                    v-model="shapeItem.stroke">
                </div>
                <div class="setting-row">
                  <label class="setting-label">可见性</label>
                  <input
                    id="show04"
                    name="radio"
                    type="radio"
                    value="-1"
                    v-model="shapeItem.isHidden"><!--
                  --><label for="show04">&nbsp;显示</label>
                  &nbsp;&nbsp;
                  <input
                    id="hide04"
                    name="radio"
                    type="radio"
                    value="1"
                    v-model="shapeItem.isHidden"><!--
                  --><label for="hide04">&nbsp;隐藏</label>
                </div>
              </div>
              <!-- 折线面板 -->
              <div v-else-if="shapeItem.type === 'polyline'">
                <div class="setting-row">
                  <label class="setting-label" for="name05">名称</label>
                  <input
                    id="name05"
                    class="ipt-setting setting-value"
                    type="text"
                    v-model="shapeItem.name">
                </div>
                <div class="setting-row">
                  <label class="setting-label" for="points">点集</label>
                  <input
                    id="points"
                    class="ipt-setting setting-value"
                    type="text"
                    v-model="shapeItem.points">
                </div>
                <div class="setting-row">
                  <label class="setting-label" for="strokeWidth05">描边宽度</label>
                  <input
                    id="strokeWidth05"
                    class="ipt-setting setting-value"
                    min="0"
                    type="number"
                    v-model="shapeItem.strokeWidth">
                </div>
                <div class="setting-row">
                  <label class="setting-label" for="stroke05">描边颜色</label>
                  <input
                    id="stroke05"
                    class="ipt-setting setting-value"
                    type="color"
                    v-model="shapeItem.stroke">
                </div>
                <div class="setting-row">
                  <label class="setting-label">填充方式</label>
                  <input
                    id="pure04"
                    name="fill"
                    type="radio"
                    value="pure"
                    v-model="shapeItem.fillType"
                    @click="initialFillColor('pure')"><!--
                  --><label for="pure04">&nbsp;纯色</label>
                  &nbsp;&nbsp;
                  <input
                    id="mixed04"
                    name="fill"
                    type="radio"
                    value="mixed"
                    :disabled="!gradientList.length"
                    v-model="shapeItem.fillType"
                    @click="initialFillColor('mixed')"><!--
                  --><label for="mixed04">&nbsp;渐变色</label>
                </div>
                <div class="setting-row" v-if="shapeItem.fillType === 'pure'">
                  <label class="setting-label" for="fill04">填充颜色</label>
                  <input
                    id="fill04"
                    class="ipt-setting setting-value"
                    type="color"
                    v-model="shapeItem.fill">
                </div>
                <div class="setting-row" v-else-if="shapeItem.fillType === 'mixed'">
                  <label class="setting-label" for="mixedSelect04">填充颜色</label>
                  <select id="mixedSelect04" name="mixed" v-model="shapeItem.fill">
                    <option
                      v-for="option in gradientList"
                      :key="option.id"
                      :value="'url(#' + option.name + ')'">{{ option.name }}</option>
                  </select>
                </div>
                <div class="setting-row">
                  <label class="setting-label">可见性</label>
                  <input
                    id="show05"
                    name="radio"
                    type="radio"
                    value="-1"
                    v-model="shapeItem.isHidden"><!--
                  --><label for="show05">&nbsp;显示</label>
                  &nbsp;&nbsp;
                  <input
                    id="hide05"
                    name="radio"
                    type="radio"
                    value="1"
                    v-model="shapeItem.isHidden"><!--
                  --><label for="hide05">&nbsp;隐藏</label>
                </div>
              </div>
              <!-- 多边形面板 -->
              <div v-else-if="shapeItem.type === 'polygon'">
                <div class="setting-row">
                  <label class="setting-label" for="name06">名称</label>
                  <input
                    id="name06"
                    class="ipt-setting setting-value"
                    type="text"
                    v-model="shapeItem.name">
                </div>
                <div class="setting-row">
                  <label class="setting-label" for="points02">点集</label>
                  <input
                    id="points02"
                    class="ipt-setting setting-value"
                    type="text"
                    v-model="shapeItem.points">
                </div>
                <div class="setting-row">
                  <label class="setting-label" for="strokeWidth06">描边宽度</label>
                  <input
                    id="strokeWidth06"
                    class="ipt-setting setting-value"
                    min="0"
                    type="number"
                    v-model="shapeItem.strokeWidth">
                </div>
                <div class="setting-row">
                  <label class="setting-label" for="stroke06">描边颜色</label>
                  <input
                    id="stroke06"
                    class="ipt-setting setting-value"
                    type="color"
                    v-model="shapeItem.stroke">
                </div>
                <div class="setting-row">
                  <label class="setting-label">填充方式</label>
                  <input
                    id="pure05"
                    name="fill"
                    type="radio"
                    value="pure"
                    v-model="shapeItem.fillType"
                    @click="initialFillColor('pure')"><!--
                  --><label for="pure05">&nbsp;纯色</label>
                  &nbsp;&nbsp;
                  <input
                    id="mixed05"
                    name="fill"
                    type="radio"
                    value="mixed"
                    :disabled="!gradientList.length"
                    v-model="shapeItem.fillType"
                    @click="initialFillColor('mixed')"><!--
                  --><label for="mixed05">&nbsp;渐变色</label>
                </div>
                <div class="setting-row" v-if="shapeItem.fillType === 'pure'">
                  <label class="setting-label" for="fill05">填充颜色</label>
                  <input
                    id="fill05"
                    class="ipt-setting setting-value"
                    type="color"
                    v-model="shapeItem.fill">
                </div>
                <div class="setting-row" v-else-if="shapeItem.fillType === 'mixed'">
                  <label class="setting-label" for="mixedSelect05">填充颜色</label>
                  <select id="mixedSelect05" name="mixed" v-model="shapeItem.fill">
                    <option
                      v-for="option in gradientList"
                      :key="option.id"
                      :value="'url(#' + option.name + ')'">{{ option.name }}</option>
                  </select>
                </div>
                <div class="setting-row">
                  <label class="setting-label">可见性</label>
                  <input
                    id="show06"
                    name="radio"
                    type="radio"
                    value="-1"
                    v-model="shapeItem.isHidden"><!--
                  --><label for="show06">&nbsp;显示</label>
                  &nbsp;&nbsp;
                  <input
                    id="hide06"
                    name="radio"
                    type="radio"
                    value="1"
                    v-model="shapeItem.isHidden"><!--
                  --><label for="hide06">&nbsp;隐藏</label>
                </div>
              </div>
              <!-- 路径面板 -->
              <div v-else-if="shapeItem.type === 'path'">
                <div class="setting-row">
                  <label class="setting-label" for="name07">名称</label>
                  <input
                    id="name07"
                    class="ipt-setting setting-value"
                    type="text"
                    v-model="shapeItem.name">
                </div>
                <div class="setting-row">
                  <label class="setting-label" for="d">路径</label>
                  <input
                    id="d"
                    class="ipt-setting setting-value"
                    type="text"
                    v-model="shapeItem.d">
                </div>
                <div class="setting-row">
                  <label class="setting-label" for="strokeWidth07">描边宽度</label>
                  <input
                    id="strokeWidth07"
                    class="ipt-setting setting-value"
                    min="0"
                    type="number"
                    v-model="shapeItem.strokeWidth">
                </div>
                <div class="setting-row">
                  <label class="setting-label" for="stroke07">描边颜色</label>
                  <input
                    id="stroke07"
                    class="ipt-setting setting-value"
                    type="color"
                    v-model="shapeItem.stroke">
                </div>
                <div class="setting-row">
                  <label class="setting-label">填充方式</label>
                  <input
                    id="pure06"
                    name="fill"
                    type="radio"
                    value="pure"
                    v-model="shapeItem.fillType"
                    @click="initialFillColor('pure')"><!--
                  --><label for="pure06">&nbsp;纯色</label>
                  &nbsp;&nbsp;
                  <input
                    id="mixed06"
                    name="fill"
                    type="radio"
                    value="mixed"
                    :disabled="!gradientList.length"
                    v-model="shapeItem.fillType"
                    @click="initialFillColor('mixed')"><!--
                  --><label for="mixed06">&nbsp;渐变色</label>
                </div>
                <div class="setting-row" v-if="shapeItem.fillType === 'pure'">
                  <label class="setting-label" for="fill06">填充颜色</label>
                  <input
                    id="fill06"
                    class="ipt-setting setting-value"
                    type="color"
                    v-model="shapeItem.fill">
                </div>
                <div class="setting-row" v-else-if="shapeItem.fillType === 'mixed'">
                  <label class="setting-label" for="mixedSelect06">填充颜色</label>
                  <select id="mixedSelect06" name="mixed" v-model="shapeItem.fill">
                    <option
                      v-for="option in gradientList"
                      :key="option.id"
                      :value="'url(#' + option.name + ')'">{{ option.name }}</option>
                  </select>
                </div>
                <div class="setting-row">
                  <label class="setting-label">可见性</label>
                  <input
                    id="show07"
                    name="radio"
                    type="radio"
                    value="-1"
                    v-model="shapeItem.isHidden"><!--
                  --><label for="show07">&nbsp;显示</label>
                  &nbsp;&nbsp;
                  <input
                    id="hide07"
                    name="radio"
                    type="radio"
                    value="1"
                    v-model="shapeItem.isHidden"><!--
                  --><label for="hide07">&nbsp;隐藏</label>
                </div>
              </div>
              <!-- 文本面板 -->
              <div v-else-if="shapeItem.type === 'text'">
                <div class="setting-row">
                  <label class="setting-label" for="name08">名称</label>
                  <input
                    id="name08"
                    class="ipt-setting setting-value"
                    type="text"
                    v-model="shapeItem.name">
                </div>
                <div class="setting-row">
                  <label class="setting-label" for="x3">坐标X</label>
                  <input
                    id="x3"
                    class="ipt-setting setting-value"
                    type="text"
                    v-model="shapeItem.x">
                </div>
                <div class="setting-row">
                  <label class="setting-label" for="y3">坐标Y</label>
                  <input
                    id="y3"
                    class="ipt-setting setting-value"
                    min="0"
                    type="number"
                    v-model="shapeItem.y">
                </div>
                <div class="setting-row">
                  <label class="setting-label" for="text">文本</label>
                  <input
                    id="text"
                    class="ipt-setting setting-value"
                    type="text"
                    v-model="shapeItem.text">
                </div>
                <div class="setting-row">
                  <label class="setting-label" for="fontSize">字体大小</label>
                  <input
                    id="fontSize"
                    class="ipt-setting setting-value"
                    min="0"
                    type="number"
                    v-model="shapeItem.fontSize">
                </div>
                <div class="setting-row">
                  <label class="setting-label" for="strokeWidth08">描边宽度</label>
                  <input
                    id="strokeWidth08"
                    class="ipt-setting setting-value"
                    min="0"
                    type="number"
                    v-model="shapeItem.strokeWidth">
                </div>
                <div class="setting-row">
                  <label class="setting-label" for="stroke08">描边颜色</label>
                  <input
                    id="stroke08"
                    class="ipt-setting setting-value"
                    type="color"
                    v-model="shapeItem.stroke">
                </div>
                <div class="setting-row">
                  <label class="setting-label">填充方式</label>
                  <input
                    id="pure07"
                    name="fill"
                    type="radio"
                    value="pure"
                    v-model="shapeItem.fillType"
                    @click="initialFillColor('pure')"><!--
                  --><label for="pure07">&nbsp;纯色</label>
                  &nbsp;&nbsp;
                  <input
                    id="mixed07"
                    name="fill"
                    type="radio"
                    value="mixed"
                    :disabled="!gradientList.length"
                    v-model="shapeItem.fillType"
                    @click="initialFillColor('mixed')"><!--
                  --><label for="mixed07">&nbsp;渐变色</label>
                </div>
                <div class="setting-row" v-if="shapeItem.fillType === 'pure'">
                  <label class="setting-label" for="fill07">填充颜色</label>
                  <input
                    id="fill07"
                    class="ipt-setting setting-value"
                    type="color"
                    v-model="shapeItem.fill">
                </div>
                <div class="setting-row" v-else-if="shapeItem.fillType === 'mixed'">
                  <label class="setting-label" for="mixedSelect07">填充颜色</label>
                  <select id="mixedSelect07" name="mixed" v-model="shapeItem.fill">
                    <option
                      v-for="option in gradientList"
                      :key="option.id"
                      :value="'url(#' + option.name + ')'">{{ option.name }}</option>
                  </select>
                </div>
                <div class="setting-row">
                  <label class="setting-label">可见性</label>
                  <input
                    id="show08"
                    name="radio"
                    type="radio"
                    value="-1"
                    v-model="shapeItem.isHidden"><!--
                  --><label for="show08">&nbsp;显示</label>
                  &nbsp;&nbsp;
                  <input
                    id="hide08"
                    name="radio"
                    type="radio"
                    value="1"
                    v-model="shapeItem.isHidden"><!--
                  --><label for="hide08">&nbsp;隐藏</label>
                </div>
              </div>
            </div>
          </div>
          <!-- 渐变设置 -->
          <div v-else-if="activeBar === 'gradient'">
            <div v-if="isGradientList">
              <h4 class="setting-title">渐变列表</h4>
              <ul class="shape-list" v-if="gradientList.length">
                <li
                  v-for="(gradient, index) in gradientList"
                  :key="gradient.id"
                  :title="gradient.name"
                  class="shape-list-item"
                  @click="toggleGradientItem(gradient)">
                  <svg
                    class="shape-shadow"
                    xlmns="http://www.w3.org/2000/svg"
                    width="60px"
                    height="40px"
                    :viewBox="viewBox">
                    <defs>
                      <linearGradient
                        v-if="gradient.type === 'linear'"
                        :id="'shadow' + gradient.id"
                        :x1="gradient.x1 + '%'"
                        :y1="gradient.y1 + '%'"
                        :x2="gradient.x2 + '%'"
                        :y2="gradient.y2 + '%'">
                        <stop
                          v-for="(stop, index) in gradient.stops"
                          :key="index"
                          :offset="stop.offset + '%'"
                          :stop-color="stop.color"
                          :stop-opacity="stop.opacity"></stop>
                      </linearGradient>
                      <radialGradient
                        v-else-if="gradient.type === 'radial'"
                        :id="'shadow' + gradient.id"
                        :cx="gradient.cx + '%'"
                        :cy="gradient.cy + '%'"
                        :r="gradient.r + '%'"
                        :fx="gradient.fx + '%'"
                        :fy="gradient.fy + '%'">
                        <stop
                          v-for="(stop, index) in gradient.stops"
                          :key="index"
                          :offset="stop.offset + '%'"
                          :stop-color="stop.color"
                          :stop-opacity="stop.opacity"></stop>
                      </radialGradient>
                    </defs>
                    <rect
                      x="0"
                      y="0"
                      :width="boardWidthValue"
                      :height="boardHeightValue"
                      :fill="'url(#shadow' + gradient.id + ')'"></rect>
                  </svg>
                  <span class="shape-name one-line">{{ gradient.name }}</span>
                  <span
                    v-if="index > 1"
                    class="fa fa-trash"
                    @click.stop="deleteGradient(gradient.id)"></span>
                </li>
              </ul>
              <small v-else>无</small>
            </div>
            <div v-else>
              <h4 class="setting-title">
                参数设置
                <span
                  class="fa fa-close setting-closer"
                  @click="backTo('gradientList')"></span>
              </h4>
              <!-- 线性渐变 -->
              <div v-if="gradientItem.type === 'linear'">
                <div class="setting-row">
                  <label class="setting-label" for="name001">名称</label>
                  <input
                    id="name001"
                    class="ipt-setting setting-value-md"
                    type="text"
                    v-model="gradientItem.name">
                </div>
                <div class="setting-row">
                  <label class="setting-label" for="startX">起点坐标X</label>
                  <input
                    id="startX"
                    class="ipt-setting setting-value-sm"
                    min="0"
                    max="100"
                    type="number"
                    v-model="gradientItem.x1">%
                </div>
                <div class="setting-row">
                  <label class="setting-label" for="startY">起点坐标Y</label>
                  <input
                    id="startY"
                    class="ipt-setting setting-value-sm"
                    min="0"
                    max="100"
                    type="number"
                    v-model="gradientItem.y1">%
                </div>
                <div class="setting-row">
                  <label class="setting-label" for="endX">终点坐标X</label>
                  <input
                    id="endX"
                    class="ipt-setting setting-value-sm"
                    min="0"
                    max="100"
                    type="number"
                    v-model="gradientItem.x2">%
                </div>
                <div class="setting-row">
                  <label class="setting-label" for="endY">终点坐标Y</label>
                  <input
                    id="endY"
                    class="ipt-setting setting-value-sm"
                    min="0"
                    max="100"
                    type="number"
                    v-model="gradientItem.y2">%
                </div>
                <div class="setting-row">
                  <span class="btn btn-info" @click="addGradientStop">添加色站</span>
                </div>
                <div
                  v-for="(stop, index) in gradientItem.stops"
                  :key="index"
                  class="setting-row">
                  <h4>
                    <span
                      :class="{'icon-rotate': stop.editable > 0}"
                      class="fa fa-caret-up icon-expand"
                      @click="toggleStopEditable(stop)"></span>
                    色站{{ index + 1 }}
                  </h4>
                  <div v-show="stop.editable > 0">
                    <label :for="'offset' + index">偏移</label>
                    <input
                      :id="'offset' + index"
                      class="ipt-setting setting-value-sm"
                      min="0"
                      max="100"
                      type="number"
                      v-model="stop.offset">%&nbsp;&nbsp;&nbsp;
                    <label :for="'opacity' + index">透明度</label>
                    <input
                      :id="'opacity' + index"
                      class="ipt-setting setting-value-sm"
                      min="0"
                      max="1"
                      type="number"
                      v-model="stop.opacity"><br>
                    <label :for="'color' + index">颜色</label>
                    <input
                      :id="'color' + index"
                      class="ipt-setting setting-value-sm"
                      type="color"
                      v-model="stop.color">
                  </div>
                </div>
              </div>
              <!-- 径向渐变 -->
              <div v-else-if="gradientItem.type === 'radial'">
                <div class="setting-row">
                  <label class="setting-label" for="name002">名称</label>
                  <input
                    id="name002"
                    class="ipt-setting setting-value-md"
                    type="text"
                    v-model="gradientItem.name">
                </div>
                <div class="setting-row">
                  <label class="setting-label" for="centerX">中心坐标X</label>
                  <input
                    id="centerX"
                    class="ipt-setting setting-value-sm"
                    min="0"
                    max="100"
                    type="number"
                    v-model="gradientItem.cx">%
                </div>
                <div class="setting-row">
                  <label class="setting-label" for="centerY">中心坐标Y</label>
                  <input
                    id="centerY"
                    class="ipt-setting setting-value-sm"
                    min="0"
                    max="100"
                    type="number"
                    v-model="gradientItem.cy">%
                </div>
                <div class="setting-row">
                  <label class="setting-label" for="gradientR">渐变变径</label>
                  <input
                    id="gradientR"
                    class="ipt-setting setting-value-sm"
                    min="0"
                    max="100"
                    type="number"
                    v-model="gradientItem.r">%
                </div>
                <div class="setting-row">
                  <label class="setting-label" for="focusX">焦点坐标X</label>
                  <input
                    id="focusX"
                    class="ipt-setting setting-value-sm"
                    min="0"
                    max="100"
                    type="number"
                    v-model="gradientItem.fx">%
                </div>
                <div class="setting-row">
                  <label class="setting-label" for="focusY">焦点坐标Y</label>
                  <input
                    id="focusY"
                    class="ipt-setting setting-value-sm"
                    min="0"
                    max="100"
                    type="number"
                    v-model="gradientItem.fy">%
                </div>
                <div class="setting-row">
                  <span class="btn btn-info" @click="addGradientStop">添加色站</span>
                </div>
                <div
                  v-for="(stop, index) in gradientItem.stops"
                  :key="index"
                  class="setting-row">
                  <h4>
                    <span
                      :class="{'icon-rotate': stop.editable > 0}"
                      class="fa fa-caret-up icon-expand"
                      @click="toggleStopEditable(stop)"></span>
                    色站{{ index + 1 }}
                  </h4>
                  <div v-show="stop.editable > 0">
                    <label :for="'offset' + index">偏移</label>
                    <input
                      :id="'offset' + index"
                      class="ipt-setting setting-value-sm"
                      min="0"
                      max="100"
                      type="number"
                      v-model="stop.offset">%&nbsp;&nbsp;&nbsp;
                    <label :for="'opacity' + index">透明度</label>
                    <input
                      :id="'opacity' + index"
                      class="ipt-setting setting-value-sm"
                      min="0"
                      max="1"
                      type="number"
                      v-model="stop.opacity"><br>
                    <label :for="'color' + index">颜色</label>
                    <input
                      :id="'color' + index"
                      class="ipt-setting setting-value-sm"
                      type="color"
                      v-model="stop.color">
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- 变换设置 -->
          <div v-else-if="activeBar === 'transform'">
            <h4 class="setting-title">变换列表</h4>
            <ul class="shape-list" v-if="transformList.length">
            </ul>
            <small v-else>无</small>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'DrawBoard',
    data () {
      return {
        toolboxExpand: {
          shape: true,
          gradient: true,
          transform: true
        },
        activeBar: 'shape',
        boardWidthValue: 720,
        boardHeightValue: 480,
        boardBgColor: '#ffffff',
        shapeList: [
          {
            id: 0,
            name: '00-default',
            type: 'rect',
            x: 50,
            y: 35,
            width: 140,
            height: 90,
            fillType: 'pure',
            fill: '#ffffff',
            stroke: '#4e9bd4',
            strokeWidth: 3,
            isHidden: -1
          }
        ],
        shapeItem: {},
        gradientList: [
          {
            id: 0,
            name: '00-default',
            type: 'linear',
            x1: 0,
            y1: 0,
            x2: 100,
            y2: 0,
            stops: [
              {
                offset: 0,
                color: '#000000',
                opacity: 1,
                editable: 1
              },
              {
                offset: 100,
                color: '#ffffff',
                opacity: 1,
                editable: 1
              }
            ]
          },
          {
            id: 1,
            name: '01-default',
            type: 'radial',
            cx: 50,
            cy: 50,
            r: 50,
            fx: 50,
            fy: 50,
            stops: [
              {
                offset: 0,
                color: '#000000',
                opacity: 1,
                editable: 1
              },
              {
                offset: 100,
                color: '#ffffff',
                opacity: 1,
                editable: 1
              }
            ]
          }
        ],
        gradientItem: {},
        transformList: [],
        transformItem: {},
        isShapeList: true,
        isGradientList: true,
        isTransformList: true
      }
    },
    computed: {
      boardWidth () {
        return this.boardWidthValue + 'px'
      },
      boardHeight () {
        return this.boardHeightValue + 'px'
      },
      viewBox () {
        return '0 0 ' + this.boardWidthValue + ' ' + this.boardHeightValue
      },
      shapeKeys () {
        return Object.keys(this.shapeItem)
      },
      sequence () {
        return []
      }
    },
    methods: {
      toggleToolboxExpand (key) {
        this.toolboxExpand[key] = !this.toolboxExpand[key]
      },
      toggleStopEditable (stop) {
        stop.editable = -stop.editable
      },
      toggleActiveBar (key) {
        this.isShapeList = true
        this.isGradientList = true
        this.isTransformList = true
        this.activeBar = this.activeBar !== key ? key : 'none'
      },
      toggleShapeItem (shape) {
        this.isShapeList = false
        this.shapeItem = shape
      },
      toggleGradientItem (gradient) {
        this.isGradientList = false
        this.gradientItem = gradient
      },
      toggleTransformItem (transform) {
        this.isTransformList = false
        this.transformItem = transform
      },
      initialFillColor (type) {
        let isPure = this.shapeItem.fill.indexOf('#') === 0
        if (type === 'mixed' && isPure) {
          this.shapeItem.fill = 'url(#' + this.gradientList[0].name + ')'
        }
        if (type === 'pure' && !isPure) {
          this.shapeItem.fill = '#ffffff'
        }
      },
      backTo (key) {
        switch (key) {
          case 'shapeList':
            this.isShapeList = true
            break
          case 'gradientList':
            this.isGradientList = true
            break
          case 'transformList':
            this.isTransformList = true
            break
        }
      },
      toHex (num) {
        let map = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'a', 'b', 'c', 'd', 'e', 'f']
        return '' + map[Math.floor(num / 16)] + map[num % 16]
      },
      addGradientStop () {
        this.gradientItem.stops.push({
          offset: 100,
          color: '#000000',
          opacity: 1,
          editable: true
        })
      },
      createShape (type) {
        let id = this.shapeList.length
          ? Math.max(...(this.shapeList.map(shape => shape.id))) + 1
          : 0
        let prototype = {
          id,
          name: this.toHex(id) + '-' + type,
          type,
          isHidden: -1,
          stroke: '#4e9bd4',
          fillType: 'pure',
          fill: '#ffffff',
          strokeWidth: 3
        }
        let partial = {
          rect: { x: 50, y: 35, width: 140, height: 90 },
          circle: { cx: 360, cy: 80, r: 60 },
          ellipse: { cx: 600, cy: 80, rx: 80, ry: 50 },
          line: { x1: 40, y1: 190, x2: 200, y2: 290 },
          polyline: { points: '360,180 300,240 430,240 360,300' },
          polygon: { points: '600,180 540,240 605,240 600,300 670,240' },
          path: { d: 'M60,370C160,370,60,430,180,430' },
          text: { x: 300, y: 420, fontSize: 72, text: '文本' }
        }[type]
        let shape = Object.assign(prototype, partial)
        this.shapeList.push(shape)
        this.shapeItem = shape
        this.activeBar = 'shape'
        this.isShapeList = false
      },
      createGradient (type) {
        let id = this.gradientList.length
          ? Math.max(...(this.gradientList.map(gradient => gradient.id))) + 1
          : 0
        let prototype = {
          id,
          name: this.toHex(id) + '-' + type,
          type,
          stops: [
            {
              offset: 0,
              color: '#000000',
              opacity: 1,
              editable: 1
            },
            {
              offset: 100,
              color: '#ffffff',
              opacity: 1,
              editable: 1
            }
          ]
        }
        let partial = {
          linear: {
            x1: 0,
            y1: 0,
            x2: 100,
            y2: 0
          },
          radial: {
            cx: 50,
            cy: 50,
            r: 50,
            fx: 50,
            fy: 50
          }
        }[type]
        let gradient = Object.assign(prototype, partial)
        this.gradientList.push(gradient)
        this.gradientItem = gradient
        this.activeBar = 'gradient'
        this.isGradientList = false
      },
      createTransform (type) {

      },
      deleteShape (id) {
        let index = this.shapeList.findIndex(shape => shape.id === id)
        index !== -1 && this.shapeList.splice(index, 1)
      },
      deleteGradient (id) {
        let index = this.gradientList.findIndex(gradient => gradient.id === id)
        index !== -1 && this.gradientList.splice(index, 1)
      },
      deleteTransform (id) {
        let index = this.transformList.findIndex(transform => transform.id === id)
        index !== -1 && this.transformList.splice(index, 1)
      },
      handleShapeClick (shape) {
        this.shapeItem = shape
        this.activeBar = 'shape'
        this.isShapeList = false
      }
    }
  }
</script>

<style scoped>
  .container {
    height: 100%;
    user-select: none;
    background-color: #f5f5f5;
  }
  .header {
    padding-top: 20px;
    padding-bottom: 20px;
  }
  .logo {
    margin-left: 50px;
    height: 40px;
    vertical-align: top;
  }
  .content {
    position: relative;
    height: calc(100% - 81px);
    border-top: 1px solid #eee;
  }
  .toolbox {
    float: left;
    width: 260px;
    height: 100%;
    overflow-y: auto;
  }
  .toolbox-title {
    padding-left: 15px;
    line-height: 40px;
    font-size: 16px;
    color: #515a6e;
    border-top: 1px solid #eee;
    border-bottom: 1px solid #eee;
    cursor: pointer;
  }
  .toolbox-title:first-child {
    border-top: none;
  }
  .icon-rotate {
    transform: rotateZ(180deg);
  }
  .toolbox-banner {
    width: 240px;
    margin-left: auto;
    margin-right: auto;
  }
  .board {
    margin-right: 40px;
    overflow: auto;
    height: 100%;
    border-left: 1px solid #eee;
    border-right: 1px solid #eee;
    background: url(../assets/images/stage_bg.jpg) repeat;
  }
  .stage {
    margin: 12px;
    background-color: #fff;
    border: 1px solid #eee;
  }
  .actor {
    cursor: pointer;
  }
  .setting {
    position: absolute;
    width: 40px;
    height: 100%;
    right: 0;
    top: 0;
  }
  .setting-list {
    list-style: none;
  }
  .setting-list-item {
    width: 40px;
    height: 40px;
    cursor: pointer;
    background-repeat: no-repeat;
    background-size: 30px 30px;
    background-position: center center;
  }
  .setting-list-item.is-active {
    background-color: #eee;
  }
  .setting-board {
    background-image: url(../assets/images/bar01.png);
  }
  .setting-shape {
    background-image: url(../assets/images/bar02.png);
  }
  .setting-gradient {
    background-image: url(../assets/images/bar03.png);
  }
  .setting-transform {
    background-image: url(../assets/images/bar04.png);
  }
  .setting-panel {
    position: absolute;
    box-sizing: border-box;
    padding: 15px;
    top: 0;
    left: -253px;
    width: 240px;
    max-height: calc(100% - 24px);
    overflow-y: auto;
    margin-top: 12px;
    color: #515a6e;
    background-color: #fff;
    border-top: 1px solid #eee;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.33);
  }
  .setting-title {
     font-size: 15px;
     margin-bottom: 10px;
   }
  .setting-closer {
    cursor: pointer;
    float: right;
    padding-top: 3px;
  }
  .setting-row {
    line-height: 38px;
    font-size: 12px;
  }
  .setting-label {
    display: inline-block;
    vertical-align: middle;
    width: 72px;
  }
  .setting-value {
    width: 120px;
  }
  .setting-value-sm {
    width: 40px;
  }
  .setting-value-md {
    width: 100px;
  }
  .ipt-setting {
    outline: none;
    height: 17px;
    padding-left: 3px;
    padding-right: 3px;
    vertical-align: middle;
    border: 1px solid #e5e5e5;
    background-color: #fff;
    transition: border-color 160ms linear;
  }
  .ipt-setting:focus,
  .ipt-setting:hover {
    border-color: #ccc;
  }
  input[type=radio],
  input[type=radio] + label {
    vertical-align: middle;
  }
  .btn {
    padding: 1px 6px;
    border-radius: 3px;
    border: 1px solid transparent;
    transition: all 240ms linear;
  }
  .btn-info {
    color: #409eff;
    border-color: #409eff;
  }
  .btn-info:hover {
    color: #fff;
    background-color: #409eff;
  }
  .shape-list {
    list-style: none;
  }
  .shape-list-item {
    padding: 5px;
    color: #515a6e;
    border: 1px solid #eee;
    cursor: pointer;
  }
  .shape-shadow {
    display: inline-block;
    vertical-align: middle;
    border: 1px solid #ccc;
    margin-right: 10px;
  }
  .shape-name {
    width: 90px;
    display: inline-block;
    vertical-align: middle;
  }
</style>
