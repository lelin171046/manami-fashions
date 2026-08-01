export const COUNTRY_NAMES = {
  US: "United States", GB: "United Kingdom", CA: "Canada", AU: "Australia", DE: "Germany",
  FR: "France", IT: "Italy", ES: "Spain", NL: "Netherlands", BE: "Belgium", CH: "Switzerland",
  AT: "Austria", SE: "Sweden", NO: "Norway", DK: "Denmark", FI: "Finland", IE: "Ireland",
  PT: "Portugal", PL: "Poland", CZ: "Czechia", GR: "Greece", HU: "Hungary", RO: "Romania",
  BG: "Bulgaria", HR: "Croatia", SK: "Slovakia", SI: "Slovenia", LT: "Lithuania", LV: "Latvia",
  EE: "Estonia", UA: "Ukraine", RU: "Russia", TR: "Turkey", IL: "Israel", SA: "Saudi Arabia",
  AE: "United Arab Emirates", QA: "Qatar", KW: "Kuwait", BH: "Bahrain", OM: "Oman", JO: "Jordan",
  LB: "Lebanon", EG: "Egypt", MA: "Morocco", TN: "Tunisia", DZ: "Algeria", NG: "Nigeria",
  KE: "Kenya", GH: "Ghana", ZA: "South Africa", ET: "Ethiopia", TZ: "Tanzania", UG: "Uganda",
  PK: "Pakistan", IN: "India", BD: "Bangladesh", LK: "Sri Lanka", NP: "Nepal", MM: "Myanmar",
  TH: "Thailand", VN: "Vietnam", ID: "Indonesia", MY: "Malaysia", SG: "Singapore", PH: "Philippines",
  CN: "China", JP: "Japan", KR: "South Korea", TW: "Taiwan", HK: "Hong Kong", NZ: "New Zealand",
  MX: "Mexico", BR: "Brazil", AR: "Argentina", CL: "Chile", CO: "Colombia", PE: "Peru",
  VE: "Venezuela", EC: "Ecuador", BO: "Bolivia", PY: "Paraguay", UY: "Uruguay", CR: "Costa Rica",
  PA: "Panama", DO: "Dominican Republic", GT: "Guatemala", HN: "Honduras", NI: "Nicaragua", SV: "El Salvador",
  IS: "Iceland", LU: "Luxembourg", CY: "Cyprus", MT: "Malta", MD: "Moldova", GE: "Georgia",
  AM: "Armenia", AZ: "Azerbaijan", UZ: "Uzbekistan", KZ: "Kazakhstan",
};

const TIMEZONE_COUNTRY = {
  "America/New_York": "US", "America/Chicago": "US", "America/Denver": "US",
  "America/Los_Angeles": "US", "America/Phoenix": "US", "America/Anchorage": "US",
  "Pacific/Honolulu": "US", "Europe/London": "GB", "Europe/Dublin": "IE",
  "Europe/Paris": "FR", "Europe/Berlin": "DE", "Europe/Rome": "IT", "Europe/Madrid": "ES",
  "Europe/Amsterdam": "NL", "Europe/Brussels": "BE", "Europe/Zurich": "CH",
  "Europe/Vienna": "AT", "Europe/Stockholm": "SE", "Europe/Oslo": "NO",
  "Europe/Copenhagen": "DK", "Europe/Helsinki": "FI", "Europe/Lisbon": "PT",
  "Europe/Warsaw": "PL", "Europe/Prague": "CZ", "Europe/Athens": "GR",
  "Europe/Budapest": "HU", "Europe/Bucharest": "RO", "Europe/Sofia": "BG",
  "Europe/Zagreb": "HR", "Europe/Bratislava": "SK", "Europe/Ljubljana": "SI",
  "Europe/Vilnius": "LT", "Europe/Riga": "LV", "Europe/Tallinn": "EE",
  "Europe/Kyiv": "UA", "Europe/Moscow": "RU", "Europe/Istanbul": "TR",
  "Asia/Jerusalem": "IL", "Asia/Riyadh": "SA", "Asia/Dubai": "AE",
  "Asia/Qatar": "QA", "Asia/Kuwait": "KW", "Asia/Bahrain": "BH",
  "Asia/Muscat": "OM", "Asia/Amman": "JO", "Asia/Beirut": "LB",
  "Africa/Cairo": "EG", "Africa/Casablanca": "MA", "Africa/Tunis": "TN",
  "Africa/Algiers": "DZ", "Africa/Lagos": "NG", "Africa/Nairobi": "KE",
  "Africa/Accra": "GH", "Africa/Johannesburg": "ZA", "Africa/Addis_Ababa": "ET",
  "Africa/Dar_es_Salaam": "TZ", "Africa/Kampala": "UG",
  "Asia/Karachi": "PK", "Asia/Kolkata": "IN", "Asia/Dhaka": "BD",
  "Asia/Colombo": "LK", "Asia/Kathmandu": "NP", "Asia/Yangon": "MM",
  "Asia/Bangkok": "TH", "Asia/Ho_Chi_Minh": "VN", "Asia/Jakarta": "ID",
  "Asia/Kuala_Lumpur": "MY", "Asia/Singapore": "SG", "Asia/Manila": "PH",
  "Asia/Shanghai": "CN", "Asia/Tokyo": "JP", "Asia/Seoul": "KR",
  "Asia/Taipei": "TW", "Asia/Hong_Kong": "HK", "Pacific/Auckland": "NZ",
  "Australia/Sydney": "AU", "Australia/Perth": "AU", "Australia/Brisbane": "AU",
  "America/Mexico_City": "MX", "America/Sao_Paulo": "BR", "America/Buenos_Aires": "AR",
  "America/Santiago": "CL", "America/Bogota": "CO", "America/Lima": "PE",
  "America/Caracas": "VE", "America/Guayaquil": "EC", "America/La_Paz": "BO",
  "America/Asuncion": "PY", "America/Montevideo": "UY", "America/Costa_Rica": "CR",
  "America/Panama": "PA", "America/Santo_Domingo": "DO", "America/Guatemala": "GT",
  "America/Tegucigalpa": "HN", "America/Managua": "NI", "America/El_Salvador": "SV",
  "Atlantic/Reykjavik": "IS", "Europe/Luxembourg": "LU", "Asia/Nicosia": "CY",
  "Europe/Malta": "MT", "Europe/Chisinau": "MD", "Asia/Tbilisi": "GE",
  "Asia/Yerevan": "AM", "Asia/Baku": "AZ", "Asia/Tashkent": "UZ", "Asia/Almaty": "KZ",
};

const codeFromLanguage = () => {
  try {
    const locale = navigator.language || "en-US";
    const parts = locale.split(/[-_]/);
    if (parts.length > 1 && /^[a-z]{2}$/i.test(parts[1])) {
      return parts[1].toUpperCase();
    }
  } catch {
    /* ignore */
  }
  return null;
};

const codeFromTimezone = () => {
  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    if (tz && TIMEZONE_COUNTRY[tz]) return TIMEZONE_COUNTRY[tz];
  } catch {
    /* ignore */
  }
  return null;
};

export const countryName = (code) =>
  code && COUNTRY_NAMES[code.toUpperCase()] ? COUNTRY_NAMES[code.toUpperCase()] : code || "Unknown";

export const countryFlag = (code) =>
  code && /^[A-Z]{2}$/.test(code) ? `https://flagcdn.com/w40/${code.toLowerCase()}.png` : null;

let geoCache = null;
const resolveCountry = async () => {
  if (geoCache) return geoCache;

  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 2500);
    const response = await fetch("https://ipwho.is/", { signal: controller.signal });
    clearTimeout(timer);
    if (response.ok) {
      const data = await response.json();
      if (data && data.success !== false && data.country_code) {
        geoCache = { country: data.country || data.country_code, code: data.country_code };
        return geoCache;
      }
    }
  } catch {
    /* fall through */
  }

  const code = codeFromTimezone() || codeFromLanguage();
  geoCache = { country: code ? countryName(code) : "Unknown", code: code || "XX" };
  return geoCache;
};

export default resolveCountry;
