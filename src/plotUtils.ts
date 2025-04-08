import { computed, ComputedRef } from 'vue';

// Plot constants
export const plotSvgWidth = 350;
export const plotSvgHeight = 110;
export const plotPadding = { top: 5, right: 5, bottom: 30, left: 45 };
export const plotMaxSnoozeMinutes = 60;
export const plotPointResolution = 0.5;

export const plotAreaWidth = computed(() => plotSvgWidth - plotPadding.left - plotPadding.right);
export const plotAreaHeight = computed(() => plotSvgHeight - plotPadding.top - plotPadding.bottom);

export function formatMinutes(totalMinutes: number): string {
  const roundedMinutes = Math.round(totalMinutes);
  if (roundedMinutes < 0) return `-${formatMinutes(Math.abs(roundedMinutes))}`;
  if (roundedMinutes < 60) return `${roundedMinutes}m`;
  const hours = Math.floor(roundedMinutes / 60);
  const minutes = roundedMinutes % 60;
  return minutes === 0 ? `${hours}h` : `${hours}h${minutes}`;
}

export function createCooldownDataPoints(cooldownMinutes: ComputedRef<number>, cooldownPercentage: ComputedRef<number>) {
  return computed(() => {
    const points: any[] = [];
    const fixedMins = cooldownMinutes.value;
    const percentage = cooldownPercentage.value / 100;
    
    for (let snoozeMin = 0; snoozeMin <= plotMaxSnoozeMinutes; snoozeMin += plotPointResolution) {
      const calcSnoozeMin = Math.max(1, snoozeMin);
      const percentageCooldown = calcSnoozeMin * percentage;
      const resultCooldown = Math.max(fixedMins, percentageCooldown);
      points.push({ snoozeMin, cooldownMin: resultCooldown });
    }
    
    if (plotMaxSnoozeMinutes % plotPointResolution !== 0) {
      const finalSnoozeMin = plotMaxSnoozeMinutes;
      const calcSnoozeMin = Math.max(1, finalSnoozeMin);
      const percentageCooldown = calcSnoozeMin * percentage;
      const resultCooldown = Math.max(fixedMins, percentageCooldown);
      points.push({ snoozeMin: finalSnoozeMin, cooldownMin: resultCooldown });
    }
    
    return points;
  });
}

export function createPlotAxisInfo(cooldownDataPoints: ComputedRef<any[]>) {
  return computed(() => {
    const dataValues = cooldownDataPoints.value.map((p: any) => p.cooldownMin);
    const dataMin = Math.min(...dataValues);
    const dataMax = Math.max(...dataValues);
    const numTicks = 5;
    const numIntervals = numTicks - 1;
    
    if (Math.abs(dataMax - dataMin) < 1e-6) {
      const centerValue = dataMin;
      const tickInterval = centerValue > 10 ? 5 : centerValue > 2 ? 2 : 1;
      let tickMin = Math.max(0, Math.floor(centerValue / tickInterval) * tickInterval - (2 * tickInterval));
      if (centerValue >= 0 && tickMin < 0) tickMin = 0;
      const tickMax = tickMin + numIntervals * tickInterval;
      const ticks: any[] = [];
      for (let i = 0; i < numTicks; i++) {
        ticks.push({ value: tickMin + i * tickInterval, label: formatMinutes(tickMin + i * tickInterval) });
      }
      return { tickMin, tickMax, ticks };
    }
    
    const cleanIntervals = [1, 2, 5, 10, 15, 20, 30, 60];
    let tickInterval = 1;
    let tickMin = 0;
    let tickMax = 0;
    
    for (const testInterval of cleanIntervals) {
      let potentialTickMin = Math.floor(dataMin / testInterval) * testInterval;
      if (dataMin >= 0 && potentialTickMin < 0) potentialTickMin = 0;
      const potentialTickMax = potentialTickMin + numIntervals * testInterval;
      if (potentialTickMax >= dataMax) {
        tickInterval = testInterval;
        tickMin = potentialTickMin;
        tickMax = potentialTickMax;
        break;
      }
      if (testInterval === cleanIntervals[cleanIntervals.length - 1]) {
        tickInterval = testInterval;
        tickMin = potentialTickMin;
        tickMax = potentialTickMax;
      }
    }
    
    const ticks: any[] = [];
    for (let i = 0; i < numTicks; i++) {
      const value = tickMin + i * tickInterval;
      ticks.push({ value: dataMin < 0 ? value : Math.max(0, value), label: formatMinutes(dataMin < 0 ? value : Math.max(0, value)) });
    }
    
    return { tickMin: ticks[0].value, tickMax: ticks[numTicks - 1].value, ticks };
  });
}

export function createScaleFunctions(plotAxisInfo: ComputedRef<any>) {
  const scaleY = (value: number) => {
    const { tickMin, tickMax } = plotAxisInfo.value;
    const range = tickMax - tickMin;
    if (range <= 1e-6) return plotPadding.top + plotAreaHeight.value / 2;
    const clampedValue = Math.max(tickMin, Math.min(tickMax, value));
    return plotPadding.top + plotAreaHeight.value - ((clampedValue - tickMin) / range) * plotAreaHeight.value;
  };

  const scaleX = (value: number) => {
    return plotPadding.left + (value / plotMaxSnoozeMinutes) * plotAreaWidth.value;
  };

  return { scaleX, scaleY };
}

export function createPlotPoints(cooldownDataPoints: ComputedRef<any[]>, scaleX: (value: number) => number, scaleY: (value: number) => number) {
  return computed(() => {
    return cooldownDataPoints.value
      .map((p: any) => `${scaleX(p.snoozeMin).toFixed(1)},${scaleY(p.cooldownMin).toFixed(1)}`)
      .join(' ');
  });
}

export function createXTicks(scaleX: (value: number) => number) {
  return computed(() => {
    const ticks: any[] = [];
    const interval = 15;
    for (let min = 0; min <= plotMaxSnoozeMinutes; min += interval) {
      ticks.push({ x: scaleX(min), label: min.toString() });
    }
    if (plotMaxSnoozeMinutes % interval !== 0) {
      ticks.push({ x: scaleX(plotMaxSnoozeMinutes), label: plotMaxSnoozeMinutes.toString() });
    }
    return ticks;
  });
}

export function createDynamicYTicks(plotAxisInfo: ComputedRef<any>, scaleY: (value: number) => number) {
  return computed(() => {
    return plotAxisInfo.value.ticks.map((tick: any) => ({
      y: scaleY(tick.value),
      label: tick.label
    }));
  });
}

export function createFixedLineY(cooldownMinutes: ComputedRef<number>, scaleY: (value: number) => number) {
  return computed(() => scaleY(cooldownMinutes.value));
}