<script setup lang="ts">
import { computed, ComputedRef } from 'vue';
import {
  plotSvgWidth,
  plotSvgHeight,
  plotPadding,
  plotAreaWidth,
  plotAreaHeight,
  createCooldownDataPoints,
  createPlotAxisInfo,
  createScaleFunctions,
  createPlotPoints,
  createXTicks,
  createDynamicYTicks,
  createFixedLineY
} from '../plotUtils';

const props = defineProps({
  cooldownMinutes: {
    type: Number,
    required: true
  },
  cooldownPercentage: {
    type: Number,
    required: true
  }
});

// Create reactive references to props
const cooldownMinutesRef = computed(() => props.cooldownMinutes);
const cooldownPercentageRef = computed(() => props.cooldownPercentage);

// Create data points and axis info
const cooldownDataPoints = createCooldownDataPoints(cooldownMinutesRef, cooldownPercentageRef);
const plotAxisInfo = createPlotAxisInfo(cooldownDataPoints);

// Create scale functions
const { scaleX, scaleY } = createScaleFunctions(plotAxisInfo);

// Create plot elements
const plotPoints = createPlotPoints(cooldownDataPoints, scaleX, scaleY);
const xTicks = createXTicks(scaleX);
const dynamicYTicks = createDynamicYTicks(plotAxisInfo, scaleY);
const fixedLineY = createFixedLineY(cooldownMinutesRef, scaleY);
</script>

<template>
  <div>
    <h5 class="text-sm font-medium text-gray-300 mb-1">Hybrid Cooldown Preview</h5>
    <svg 
      :viewBox="`0 0 ${plotSvgWidth} ${plotSvgHeight}`" 
      preserveAspectRatio="xMidYMid meet" 
      class="w-full bg-dark-800 overflow-visible"
    >
      <!-- Axes -->
      <line 
        :x1="plotPadding.left" 
        :y1="plotPadding.top" 
        :x2="plotPadding.left" 
        :y2="plotSvgHeight - plotPadding.bottom" 
        stroke="#a0aec0" 
        stroke-width="1"
      />
      <line 
        :x1="plotPadding.left" 
        :y1="plotSvgHeight - plotPadding.bottom" 
        :x2="plotSvgWidth - plotPadding.right" 
        :y2="plotSvgHeight - plotPadding.bottom" 
        stroke="#a0aec0" 
        stroke-width="1"
      />
      
      <!-- Y-axis ticks -->
      <g 
        v-for="tick in dynamicYTicks" 
        :key="`y-${tick.label}`" 
        class="text-xs text-gray-400" 
        fill="currentColor"
      >
        <line 
          :x1="plotPadding.left - 4" 
          :y1="tick.y" 
          :x2="plotPadding.left" 
          :y2="tick.y" 
          stroke="#a0aec0" 
          stroke-width="1"
        />
        <text 
          :x="plotPadding.left - 6" 
          :y="tick.y" 
          text-anchor="end" 
          dominant-baseline="middle"
        >
          {{ tick.label }}
        </text>
      </g>
      
      <!-- X-axis ticks -->
      <g 
        v-for="tick in xTicks" 
        :key="`x-${tick.label}`" 
        class="text-xs text-gray-400" 
        fill="currentColor"
      >
        <line 
          :x1="tick.x" 
          :y1="plotSvgHeight - plotPadding.bottom" 
          :x2="tick.x" 
          :y2="plotSvgHeight - plotPadding.bottom + 4" 
          stroke="#a0aec0" 
          stroke-width="1"
        />
        <text 
          :x="tick.x" 
          :y="plotSvgHeight - plotPadding.bottom + 6" 
          text-anchor="middle" 
          dominant-baseline="hanging"
        >
          {{ tick.label }}
        </text>
      </g>
      
      <!-- Axis labels -->
      <text 
        :x="plotPadding.left + plotAreaWidth / 2" 
        :y="plotSvgHeight" 
        text-anchor="middle" 
        class="text-xs" 
        fill="#cbd5e0"
      >
        Snooze (m)
      </text>
      <text 
        :x="plotPadding.left - 50" 
        :y="plotPadding.top + plotAreaHeight / 2" 
        text-anchor="middle" 
        dominant-baseline="central" 
        :transform="`rotate(-90, ${plotPadding.left - 50}, ${plotPadding.top + plotAreaHeight / 2})`" 
        class="text-xs" 
        fill="#cbd5e0"
      >
        Cooldown
      </text>
      
      <!-- Fixed cooldown line -->
      <line 
        v-if="cooldownMinutes > 0" 
        :x1="plotPadding.left" 
        :y1="fixedLineY" 
        :x2="plotSvgWidth - plotPadding.right" 
        :y2="fixedLineY" 
        stroke="#a0aec0" 
        stroke-width="0.5" 
        stroke-dasharray="4 2"
      />
      
      <!-- Cooldown curve -->
      <polyline 
        :points="plotPoints" 
        fill="none" 
        stroke="#4ade80" 
        stroke-width="2" 
        stroke-linecap="round" 
        stroke-linejoin="round"
      />
    </svg>
  </div>
</template>