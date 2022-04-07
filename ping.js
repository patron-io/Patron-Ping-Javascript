async function ping() {
  var ipResponse,
    ipAddress,
    ipGeocodeResponse,
    ipGeocodeData,
    data = {},
    response;
  const endPoint =
    "https://firestore.googleapis.com/v1beta1/projects/patron-ping/databases/(default)/documents/ping/";

  try {
    ipResponse = await fetch("https://api.ipify.org");
    ipAddress = await ipResponse.text();
    console.log(ipAddress);
  } catch (e) {}

  try {
    ipGeocodeResponse = await fetch(
      `https://www.iplocate.io/api/lookup/${ipAddress.toString()}/json`
    );
    ipGeocodeData = await ipGeocodeResponse.json();
    console.log(ipGeocodeData);
  } catch (e) {}

  ipGeocodeData["timeStamp"] = new Date().toLocaleString();
  ipGeocodeData["userAgent"] = navigator.userAgent.toString();

  Object.keys(ipGeocodeData).map((item) => {
    data[item] = {
      stringValue: ipGeocodeData[item] ? ipGeocodeData[item]?.toString() : "",
    };
  });

  const firebaseBody = { fields: data };
  const headers = {
    "Content-Type": "application/json",
  };

  try {
    const firebaseResponse = await fetch(endPoint, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(firebaseBody),
    });
    response = await firebaseResponse.json();
  } catch (e) {}
}

function getBrowserDetails(userAgent) {
  var browser = "";
  var browserVersion = 0;
  var os = "";

  if (/Opera[\/\s](\d+\.\d+)/.test(navigator.userAgent)) {
    browser = "Opera";
  } else if (/MSIE (\d+\.\d+);/.test(navigator.userAgent)) {
    browser = "MSIE";
  } else if (/Navigator[\/\s](\d+\.\d+)/.test(navigator.userAgent)) {
    browser = "Netscape";
  } else if (/Chrome[\/\s](\d+\.\d+)/.test(navigator.userAgent)) {
    browser = "Chrome";
  } else if (/Safari[\/\s](\d+\.\d+)/.test(navigator.userAgent)) {
    browser = "Safari";
    /Version[\/\s](\d+\.\d+)/.test(navigator.userAgent);
    browserVersion = new Number(RegExp.$1);
  } else if (/Firefox[\/\s](\d+\.\d+)/.test(navigator.userAgent)) {
    browser = "Firefox";
  }
  if (browserVersion === 0) {
    browserVersion = parseFloat(new Number(RegExp.$1));
  }

  alert(browser + "*" + browserVersion);

  return { browser: browser, browserVersion: browserVersion };
}

ping();
