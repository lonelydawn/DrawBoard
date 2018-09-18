<template>
  <div class="container">
    <div class="header">
      <img class="logo" src="../assets/images/logo07.png">
    </div>
    <div class="content">
      <!-- 用于添加图形、渐变和变换的菜单区域 -->
      <div class="toolbox">
        <!-- 图形菜单 -->
        <h3 class="toolbox-title">
          <span
            :class="{'icon-rotate': toolboxExpand['shape']}"
            class="fa fa-caret-up icon-expand"
            @click="toggleToolboxExpand('shape')"></span>
          &nbsp;图形
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
          @click="createShape('path')">
        </div>
        <!-- 渐变菜单 -->
        <h3 class="toolbox-title">
          <span
            :class="{'icon-rotate': toolboxExpand['gradient']}"
            class="fa fa-caret-up icon-expand"
            @click="toggleToolboxExpand('gradient')"></span>
          &nbsp;渐变
        </h3>
        <div class="toolbox-banner" v-show="toolboxExpand['gradient']">
          <img
            class="cursor-pointer"
            src="../assets/images/gradient01.png"
            title="线性渐变"><!--
            --><img
          class="cursor-pointer"
          src="../assets/images/gradient02.png"
          title="径向渐变">
        </div>
        <!-- 变换菜单 -->
        <h3 class="toolbox-title">
          <span
            :class="{'icon-rotate': toolboxExpand['transform']}"
            class="fa fa-caret-up icon-expand"
            @click="toggleToolboxExpand('transform')"></span>
          &nbsp;变换
        </h3>
        <div class="toolbox-banner" v-show="toolboxExpand['transform']">
          <img
            class="cursor-pointer"
            src="../assets/images/transform01.png"
            title="图形蒙版"><!--
            --><img
          class="cursor-pointer"
          src="../assets/images/transform02.png"
          title="剪贴路径">
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
          <g
            v-for="(shape, index) in shapeList"
            :key="index">
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
              <ul class="shape-list">
                <li
                  v-for="(shape, index) in shapeList"
                  :key="index"
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
                      v-if="shape.type === 'rect'"
                      :x="shape.x"
                      :y="shape.y"
                      :width="shape.width"
                      :height="shape.height"
                      :fill="shape.fill"
                      :stroke="shape.stroke"
                      :stroke-width="shape.strokeWidth"></rect>
                    <circle
                      v-else-if="shape.type === 'circle'"
                      :cx="shape.cx"
                      :cy="shape.cy"
                      :r="shape.r"
                      :fill="shape.fill"
                      :stroke="shape.stroke"
                      :stroke-width="shape.strokeWidth"></circle>
                    <ellipse
                      v-else-if="shape.type === 'ellipse'"
                      :cx="shape.cx"
                      :cy="shape.cy"
                      :rx="shape.rx"
                      :ry="shape.ry"
                      :fill="shape.fill"
                      :stroke="shape.stroke"
                      :stroke-width="shape.strokeWidth"></ellipse>
                    <line
                      v-else-if="shape.type === 'line'"
                      :x1="shape.x1"
                      :y1="shape.y1"
                      :x2="shape.x2"
                      :y2="shape.y2"
                      :stroke="shape.stroke"
                      :stroke-width="shape.strokeWidth"></line>
                    <polyline
                      v-else-if="shape.type === 'polyline'"
                      :points="shape.points"
                      :fill="shape.fill"
                      :stroke="shape.stroke"
                      :stroke-width="shape.strokeWidth"></polyline>
                    <polygon
                      v-else-if="shape.type === 'polygon'"
                      :points="shape.points"
                      :fill="shape.fill"
                      :stroke="shape.stroke"
                      :stroke-width="shape.strokeWidth"></polygon>
                    <path
                      v-else-if="shape.type === 'path'"
                      :d="shape.d"
                      :fill="shape.fill"
                      :stroke="shape.stroke"
                      :stroke-width="shape.strokeWidth"></path>
                  </svg>
                  <span class="shape-name one-line">{{ shape.name }}</span>
                  <span
                    class="fa fa-trash expand-area"
                    @click.stop="deleteShape(shape.id)"></span>
                </li>
              </ul>
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
                  <label class="setting-label" for="fill">填充颜色</label>
                  <input
                    id="fill"
                    class="ipt-setting setting-value"
                    type="color"
                    v-model="shapeItem.fill">
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
                  <label class="setting-label" for="fill02">填充颜色</label>
                  <input
                    id="fill02"
                    class="ipt-setting setting-value"
                    type="color"
                    v-model="shapeItem.fill">
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
                  <label class="setting-label" for="fill03">填充颜色</label>
                  <input
                    id="fill03"
                    class="ipt-setting setting-value"
                    type="color"
                    v-model="shapeItem.fill">
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
                  <label class="setting-label" for="fill05">填充颜色</label>
                  <input
                    id="fill05"
                    class="ipt-setting setting-value"
                    type="color"
                    v-model="shapeItem.fill">
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
                  <label class="setting-label" for="fill06">填充颜色</label>
                  <input
                    id="fill06"
                    class="ipt-setting setting-value"
                    type="color"
                    v-model="shapeItem.fill">
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
                  <label class="setting-label" for="fill07">填充颜色</label>
                  <input
                    id="fill07"
                    class="ipt-setting setting-value"
                    type="color"
                    v-model="shapeItem.fill">
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
            </div>
          </div>
          <!-- 渐变设置 -->
          <div v-else-if="activeBar === 'gradient'">
            <h4 class="setting-title">渐变列表</h4>
            <ul class="shape-list">
              <li></li>
            </ul>
          </div>
          <!-- 变换设置 -->
          <div v-else-if="activeBar === 'transform'">
            <h4 class="setting-title">变换列表</h4>
            <ul class="shape-list">
            </ul>
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
        shapeList: [],
        shapeItem: {},
        gradientItem: {},
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
      toggleActiveBar (key) {
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
      backTo (key) {
        switch (key) {
          case 'shapeList':
            this.isShapeList = true
            break
          case 'transformList':
            this.isTransformList = true
            break
          case 'gradientList':
            this.isGradientList = true
            break
        }
      },
      toHex (num) {
        let map = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'a', 'b', 'c', 'd', 'e', 'f']
        return '' + map[Math.floor(num / 16)] + map[num % 16]
      },
      createShape (type) {
        let id = this.shapeList.length
          ? Math.max(...(this.shapeList.map(shape => shape.id))) + 1
          : 0
        let prototype = {
          id,
          name: type + '-' + this.toHex(id),
          type,
          isHidden: -1,
          stroke: '#4e9bd4',
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
          path: { d: 'M40,350L200,450' }
        }[type]
        let shape = Object.assign(prototype, partial)
        this.shapeList.push(shape)
        this.shapeItem = shape
        this.activeBar = 'shape'
        this.isShapeList = false
      },
      deleteShape (id) {
        let index = this.shapeList.findIndex(shape => shape.id === id)
        index !== -1 && this.shapeList.splice(index, 1)
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
  }
  .toolbox-title:first-child {
    border-top: none;
  }
  .icon-expand {
    cursor: pointer;
    transition: transform 160ms linear;
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
    background-color: #fff;
    border-top: 1px solid #eee;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.33);
  }
  .setting-title {
     font-size: 15px;
     margin-bottom: 10px;
    color: #515a6e;
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
    color: #000;
  }
  .setting-value {
    width: 120px;
  }
  .ipt-setting {
    outline: none;
    vertical-align: middle;
    border: 1px solid transparent;
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
    width: 100px;
    display: inline-block;
    vertical-align: middle;
  }
</style>
