
# 🖥️ Web Performance Plugin

  

**A lightweight, easy-to-integrate plugin for monitoring and visualizing web performance metrics.**

  

---

  

## ✨ Features

  

- 🛠️ Tracks **Core Web Vitals**:

- LCP (Largest Contentful Paint)

- FID (First Input Delay)

- CLS (Cumulative Layout Shift)

- TTFB (Time to First Byte)

- 📡 Sends metrics to your backend or handles them locally via callbacks.

- 📊 Built-in support for **real-time chart visualization**.

- ⚡ Framework-agnostic: Works with **React**, **Vue**, **Angular**, or plain **JavaScript**.

  

---

  

## 📦 Installation

  

Install the plugin via NPM:

  

```js
npm install web-performance-plugin
``` 
 

## How to  Use? 🚀

**1️⃣ Initialize Performance Monitoring**

Import the plugin and call the ***initPerformanceMonitor*** function:

```js

import { initPerformanceMonitor } from "web-performance-plugin";

initPerformanceMonitor({

endpoint: "https://your-backend.com/metrics", // (Optional) Backend API to send metrics

onMetric: (metric) => console.log("New Metric Captured:", metric), // (Optional) Local callback

});
```
<br />

### 2️⃣ Generate a Performance Chart

Add a `<canvas>` element in your HTML where the chart will be rendered:

```js
<div>
  <canvas id="performanceChart" width="400" height="200"></canvas>
</div>
```
Then call ***generatePerformanceChart*** to render the metrics:

```js
import { generatePerformanceChart } from "web-performance-plugin";

setTimeout(() => {
  generatePerformanceChart("performanceChart"); // Pass the ID of the canvas element
}, 5000); // Allow time to collect metrics
```
<br />

### 3️⃣ Enable Real-Time Updates

Keep your chart updated with new metrics as they arrive:
```js
import { initPerformanceMonitor, generatePerformanceChart, updateChart } from "web-performance-plugin";

initPerformanceMonitor({
  onMetric: (metric) => {
    console.log("New metric logged:", metric);
    updateChart(); // Refresh the chart dynamically
  },
});

generatePerformanceChart("performanceChart");
```
<br />
<br />

## ⚙️ Configuration

The ****`initPerformanceMonitor`**** function accepts the following configuration options:

<table>
<tr>
	<td>
	      <strong>Option</strong> 
	 </td>
	 <td><strong>Type</strong></td>
	  <td><strong>Default</strong></td>
	    <td width="60%"><strong>Description</strong></td>
</tr>
<tr>
	<td><code>endpoint</code></td>
	<td><code>string</code></td>
	<td><code>null</code></td>
	<td><code>The Backend URL to send captured metrics to.</code></td>
</tr>
<tr>
	<td><code>onMetric</code></td>
	<td><code>function</code></td>
	<td><code>null</code></td>
	<td><code>A callback that is triggered whenever a new metric is captured.</code></td>
</tr>
</table>



<br /><br /><br />


## 🔮 Future Features

-   Export metrics as JSON or CSV.
-   Support for advanced metrics like network timings.
-   Customizable chart themes and styles.