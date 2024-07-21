import 'cookie';
import { bold, red, yellow, dim, blue } from 'kleur/colors';
import { D as DEFAULT_404_COMPONENT } from './astro/server_xU0KpEGp.mjs';
import 'clsx';
import { escape } from 'html-escaper';
import { compile } from 'path-to-regexp';

const dateTimeFormat = new Intl.DateTimeFormat([], {
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hour12: false
});
const levels = {
  debug: 20,
  info: 30,
  warn: 40,
  error: 50,
  silent: 90
};
function log(opts, level, label, message, newLine = true) {
  const logLevel = opts.level;
  const dest = opts.dest;
  const event = {
    label,
    level,
    message,
    newLine
  };
  if (!isLogLevelEnabled(logLevel, level)) {
    return;
  }
  dest.write(event);
}
function isLogLevelEnabled(configuredLogLevel, level) {
  return levels[configuredLogLevel] <= levels[level];
}
function info(opts, label, message, newLine = true) {
  return log(opts, "info", label, message, newLine);
}
function warn(opts, label, message, newLine = true) {
  return log(opts, "warn", label, message, newLine);
}
function error(opts, label, message, newLine = true) {
  return log(opts, "error", label, message, newLine);
}
function debug(...args) {
  if ("_astroGlobalDebug" in globalThis) {
    globalThis._astroGlobalDebug(...args);
  }
}
function getEventPrefix({ level, label }) {
  const timestamp = `${dateTimeFormat.format(/* @__PURE__ */ new Date())}`;
  const prefix = [];
  if (level === "error" || level === "warn") {
    prefix.push(bold(timestamp));
    prefix.push(`[${level.toUpperCase()}]`);
  } else {
    prefix.push(timestamp);
  }
  if (label) {
    prefix.push(`[${label}]`);
  }
  if (level === "error") {
    return red(prefix.join(" "));
  }
  if (level === "warn") {
    return yellow(prefix.join(" "));
  }
  if (prefix.length === 1) {
    return dim(prefix[0]);
  }
  return dim(prefix[0]) + " " + blue(prefix.splice(1).join(" "));
}
if (typeof process !== "undefined") {
  let proc = process;
  if ("argv" in proc && Array.isArray(proc.argv)) {
    if (proc.argv.includes("--verbose")) ; else if (proc.argv.includes("--silent")) ; else ;
  }
}
class Logger {
  options;
  constructor(options) {
    this.options = options;
  }
  info(label, message, newLine = true) {
    info(this.options, label, message, newLine);
  }
  warn(label, message, newLine = true) {
    warn(this.options, label, message, newLine);
  }
  error(label, message, newLine = true) {
    error(this.options, label, message, newLine);
  }
  debug(label, ...messages) {
    debug(label, ...messages);
  }
  level() {
    return this.options.level;
  }
  forkIntegrationLogger(label) {
    return new AstroIntegrationLogger(this.options, label);
  }
}
class AstroIntegrationLogger {
  options;
  label;
  constructor(logging, label) {
    this.options = logging;
    this.label = label;
  }
  /**
   * Creates a new logger instance with a new label, but the same log options.
   */
  fork(label) {
    return new AstroIntegrationLogger(this.options, label);
  }
  info(message) {
    info(this.options, this.label, message);
  }
  warn(message) {
    warn(this.options, this.label, message);
  }
  error(message) {
    error(this.options, this.label, message);
  }
  debug(message) {
    debug(this.label, message);
  }
}

function template({
  title,
  pathname,
  statusCode = 404,
  tabTitle,
  body
}) {
  return `<!doctype html>
<html lang="en">
	<head>
		<meta charset="UTF-8">
		<title>${tabTitle}</title>
		<style>
			:root {
				--gray-10: hsl(258, 7%, 10%);
				--gray-20: hsl(258, 7%, 20%);
				--gray-30: hsl(258, 7%, 30%);
				--gray-40: hsl(258, 7%, 40%);
				--gray-50: hsl(258, 7%, 50%);
				--gray-60: hsl(258, 7%, 60%);
				--gray-70: hsl(258, 7%, 70%);
				--gray-80: hsl(258, 7%, 80%);
				--gray-90: hsl(258, 7%, 90%);
				--black: #13151A;
				--accent-light: #E0CCFA;
			}

			* {
				box-sizing: border-box;
			}

			html {
				background: var(--black);
				color-scheme: dark;
				accent-color: var(--accent-light);
			}

			body {
				background-color: var(--gray-10);
				color: var(--gray-80);
				font-family: ui-monospace, Menlo, Monaco, "Cascadia Mono", "Segoe UI Mono", "Roboto Mono", "Oxygen Mono", "Ubuntu Monospace", "Source Code Pro", "Fira Mono", "Droid Sans Mono", "Courier New", monospace;
				line-height: 1.5;
				margin: 0;
			}

			a {
				color: var(--accent-light);
			}

			.center {
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				height: 100vh;
				width: 100vw;
			}

			h1 {
				margin-bottom: 8px;
				color: white;
				font-family: system-ui, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
				font-weight: 700;
				margin-top: 1rem;
				margin-bottom: 0;
			}

			.statusCode {
				color: var(--accent-light);
			}

			.astro-icon {
				height: 124px;
				width: 124px;
			}

			pre, code {
				padding: 2px 8px;
				background: rgba(0,0,0, 0.25);
				border: 1px solid rgba(255,255,255, 0.25);
				border-radius: 4px;
				font-size: 1.2em;
				margin-top: 0;
				max-width: 60em;
			}
		</style>
	</head>
	<body>
		<main class="center">
			<svg class="astro-icon" xmlns="http://www.w3.org/2000/svg" width="64" height="80" viewBox="0 0 64 80" fill="none"> <path d="M20.5253 67.6322C16.9291 64.3531 15.8793 57.4632 17.3776 52.4717C19.9755 55.6188 23.575 56.6157 27.3035 57.1784C33.0594 58.0468 38.7122 57.722 44.0592 55.0977C44.6709 54.7972 45.2362 54.3978 45.9045 53.9931C46.4062 55.4451 46.5368 56.9109 46.3616 58.4028C45.9355 62.0362 44.1228 64.8429 41.2397 66.9705C40.0868 67.8215 38.8669 68.5822 37.6762 69.3846C34.0181 71.8508 33.0285 74.7426 34.403 78.9491C34.4357 79.0516 34.4649 79.1541 34.5388 79.4042C32.6711 78.5705 31.3069 77.3565 30.2674 75.7604C29.1694 74.0757 28.6471 72.2121 28.6196 70.1957C28.6059 69.2144 28.6059 68.2244 28.4736 67.257C28.1506 64.8985 27.0406 63.8425 24.9496 63.7817C22.8036 63.7192 21.106 65.0426 20.6559 67.1268C20.6215 67.2865 20.5717 67.4446 20.5218 67.6304L20.5253 67.6322Z" fill="white"/> <path d="M20.5253 67.6322C16.9291 64.3531 15.8793 57.4632 17.3776 52.4717C19.9755 55.6188 23.575 56.6157 27.3035 57.1784C33.0594 58.0468 38.7122 57.722 44.0592 55.0977C44.6709 54.7972 45.2362 54.3978 45.9045 53.9931C46.4062 55.4451 46.5368 56.9109 46.3616 58.4028C45.9355 62.0362 44.1228 64.8429 41.2397 66.9705C40.0868 67.8215 38.8669 68.5822 37.6762 69.3846C34.0181 71.8508 33.0285 74.7426 34.403 78.9491C34.4357 79.0516 34.4649 79.1541 34.5388 79.4042C32.6711 78.5705 31.3069 77.3565 30.2674 75.7604C29.1694 74.0757 28.6471 72.2121 28.6196 70.1957C28.6059 69.2144 28.6059 68.2244 28.4736 67.257C28.1506 64.8985 27.0406 63.8425 24.9496 63.7817C22.8036 63.7192 21.106 65.0426 20.6559 67.1268C20.6215 67.2865 20.5717 67.4446 20.5218 67.6304L20.5253 67.6322Z" fill="url(#paint0_linear_738_686)"/> <path d="M0 51.6401C0 51.6401 10.6488 46.4654 21.3274 46.4654L29.3786 21.6102C29.6801 20.4082 30.5602 19.5913 31.5538 19.5913C32.5474 19.5913 33.4275 20.4082 33.7289 21.6102L41.7802 46.4654C54.4274 46.4654 63.1076 51.6401 63.1076 51.6401C63.1076 51.6401 45.0197 2.48776 44.9843 2.38914C44.4652 0.935933 43.5888 0 42.4073 0H20.7022C19.5206 0 18.6796 0.935933 18.1251 2.38914C18.086 2.4859 0 51.6401 0 51.6401Z" fill="white"/> <defs> <linearGradient id="paint0_linear_738_686" x1="31.554" y1="75.4423" x2="39.7462" y2="48.376" gradientUnits="userSpaceOnUse"> <stop stop-color="#D83333"/> <stop offset="1" stop-color="#F041FF"/> </linearGradient> </defs> </svg>
			<h1>${statusCode ? `<span class="statusCode">${statusCode}: </span> ` : ""}<span class="statusMessage">${title}</span></h1>
			${body || `
				<pre>Path: ${escape(pathname)}</pre>
			`}
			</main>
	</body>
</html>`;
}

const DEFAULT_404_ROUTE = {
  component: DEFAULT_404_COMPONENT,
  generate: () => "",
  params: [],
  pattern: /\/404/,
  prerender: false,
  pathname: "/404",
  segments: [[{ content: "404", dynamic: false, spread: false }]],
  type: "page",
  route: "/404",
  fallbackRoutes: [],
  isIndex: false
};
function ensure404Route(manifest) {
  if (!manifest.routes.some((route) => route.route === "/404")) {
    manifest.routes.push(DEFAULT_404_ROUTE);
  }
  return manifest;
}
async function default404Page({ pathname }) {
  return new Response(
    template({
      statusCode: 404,
      title: "Not found",
      tabTitle: "404: Not Found",
      pathname
    }),
    { status: 404, headers: { "Content-Type": "text/html; charset=utf-8" } }
  );
}
default404Page.isAstroComponentFactory = true;
const default404Instance = {
  default: default404Page
};

function sanitizeParams(params) {
  return Object.fromEntries(
    Object.entries(params).map(([key, value]) => {
      if (typeof value === "string") {
        return [key, value.normalize().replace(/#/g, "%23").replace(/\?/g, "%3F")];
      }
      return [key, value];
    })
  );
}
function getRouteGenerator(segments, addTrailingSlash) {
  const template = segments.map((segment) => {
    return "/" + segment.map((part) => {
      if (part.spread) {
        return `:${part.content.slice(3)}(.*)?`;
      } else if (part.dynamic) {
        return `:${part.content}`;
      } else {
        return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]").replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      }
    }).join("");
  }).join("");
  let trailing = "";
  if (addTrailingSlash === "always" && segments.length) {
    trailing = "/";
  }
  const toPath = compile(template + trailing);
  return (params) => {
    const sanitizedParams = sanitizeParams(params);
    const path = toPath(sanitizedParams);
    return path || "/";
  };
}

function deserializeRouteData(rawRouteData) {
  return {
    route: rawRouteData.route,
    type: rawRouteData.type,
    pattern: new RegExp(rawRouteData.pattern),
    params: rawRouteData.params,
    component: rawRouteData.component,
    generate: getRouteGenerator(rawRouteData.segments, rawRouteData._meta.trailingSlash),
    pathname: rawRouteData.pathname || void 0,
    segments: rawRouteData.segments,
    prerender: rawRouteData.prerender,
    redirect: rawRouteData.redirect,
    redirectRoute: rawRouteData.redirectRoute ? deserializeRouteData(rawRouteData.redirectRoute) : void 0,
    fallbackRoutes: rawRouteData.fallbackRoutes.map((fallback) => {
      return deserializeRouteData(fallback);
    }),
    isIndex: rawRouteData.isIndex
  };
}

function deserializeManifest(serializedManifest) {
  const routes = [];
  for (const serializedRoute of serializedManifest.routes) {
    routes.push({
      ...serializedRoute,
      routeData: deserializeRouteData(serializedRoute.routeData)
    });
    const route = serializedRoute;
    route.routeData = deserializeRouteData(serializedRoute.routeData);
  }
  const assets = new Set(serializedManifest.assets);
  const componentMetadata = new Map(serializedManifest.componentMetadata);
  const inlinedScripts = new Map(serializedManifest.inlinedScripts);
  const clientDirectives = new Map(serializedManifest.clientDirectives);
  const serverIslandNameMap = new Map(serializedManifest.serverIslandNameMap);
  return {
    // in case user middleware exists, this no-op middleware will be reassigned (see plugin-ssr.ts)
    middleware(_, next) {
      return next();
    },
    ...serializedManifest,
    assets,
    componentMetadata,
    inlinedScripts,
    clientDirectives,
    routes,
    serverIslandNameMap
  };
}

const manifest = deserializeManifest({"hrefRoot":"file:///home/user/kuis/","adapterName":"@astrojs/vercel/serverless","routes":[{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_image","pattern":"^\\/_image$","segments":[[{"content":"_image","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/astro/dist/assets/endpoint/generic.js","pathname":"/_image","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/auth/detail","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/auth\\/detail\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"auth","dynamic":false,"spread":false}],[{"content":"detail","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/auth/detail.js","pathname":"/api/auth/detail","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/auth/register","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/auth\\/register\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"auth","dynamic":false,"spread":false}],[{"content":"register","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/auth/register.js","pathname":"/api/auth/register","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/auth/signin","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/auth\\/signin\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"auth","dynamic":false,"spread":false}],[{"content":"signin","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/auth/signin.js","pathname":"/api/auth/signin","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/auth/signout","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/auth\\/signout\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"auth","dynamic":false,"spread":false}],[{"content":"signout","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/auth/signout.js","pathname":"/api/auth/signout","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/image","isIndex":true,"type":"endpoint","pattern":"^\\/api\\/image\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"image","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/image/index.js","pathname":"/api/image","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/kelas/all","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/kelas\\/all\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"kelas","dynamic":false,"spread":false}],[{"content":"all","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/kelas/all.js","pathname":"/api/kelas/all","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/kelas","isIndex":true,"type":"endpoint","pattern":"^\\/api\\/kelas\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"kelas","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/kelas/index.js","pathname":"/api/kelas","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/mapel/all","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/mapel\\/all\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"mapel","dynamic":false,"spread":false}],[{"content":"all","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/mapel/all.js","pathname":"/api/mapel/all","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/mapel","isIndex":true,"type":"endpoint","pattern":"^\\/api\\/mapel\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"mapel","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/mapel/index.js","pathname":"/api/mapel","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/quiz","isIndex":true,"type":"endpoint","pattern":"^\\/api\\/quiz\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"quiz","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/quiz/index.js","pathname":"/api/quiz","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/user/data","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/user\\/data\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"user","dynamic":false,"spread":false}],[{"content":"data","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/user/data.js","pathname":"/api/user/data","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/user/password-ad","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/user\\/password-ad\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"user","dynamic":false,"spread":false}],[{"content":"password-ad","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/user/password-ad.js","pathname":"/api/user/password-ad","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/user/role","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/user\\/role\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"user","dynamic":false,"spread":false}],[{"content":"role","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/user/role.js","pathname":"/api/user/role","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/user/user-role","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/user\\/user-role\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"user","dynamic":false,"spread":false}],[{"content":"user-role","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/user/user-role.js","pathname":"/api/user/user-role","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/createKuis.D8n5973i.css"}],"routeData":{"route":"/createkuis","isIndex":false,"type":"page","pattern":"^\\/createKuis\\/?$","segments":[[{"content":"createKuis","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/createKuis.astro","pathname":"/createKuis","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/createKuis.D8n5973i.css"}],"routeData":{"route":"/dashboard","isIndex":false,"type":"page","pattern":"^\\/dashboard\\/?$","segments":[[{"content":"dashboard","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/dashboard.astro","pathname":"/dashboard","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/detailusers","isIndex":false,"type":"page","pattern":"^\\/detailUsers\\/?$","segments":[[{"content":"detailUsers","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/detailUsers.astro","pathname":"/detailUsers","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/createKuis.D8n5973i.css"}],"routeData":{"route":"/feedback","isIndex":false,"type":"page","pattern":"^\\/feedback\\/?$","segments":[[{"content":"feedback","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/feedback.astro","pathname":"/feedback","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/createKuis.D8n5973i.css"}],"routeData":{"route":"/history","isIndex":false,"type":"page","pattern":"^\\/history\\/?$","segments":[[{"content":"history","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/history.astro","pathname":"/history","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/createKuis.D8n5973i.css"}],"routeData":{"route":"/kelas","isIndex":false,"type":"page","pattern":"^\\/kelas\\/?$","segments":[[{"content":"kelas","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/kelas.astro","pathname":"/kelas","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/createKuis.D8n5973i.css"}],"routeData":{"route":"/kuis/[kuis]","isIndex":false,"type":"page","pattern":"^\\/kuis\\/([^/]+?)\\/?$","segments":[[{"content":"kuis","dynamic":false,"spread":false}],[{"content":"kuis","dynamic":true,"spread":false}]],"params":["kuis"],"component":"src/pages/kuis/[kuis].astro","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/createKuis.D8n5973i.css"}],"routeData":{"route":"/log","isIndex":false,"type":"page","pattern":"^\\/log\\/?$","segments":[[{"content":"log","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/log.astro","pathname":"/log","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/createKuis.D8n5973i.css"}],"routeData":{"route":"/mapel","isIndex":false,"type":"page","pattern":"^\\/mapel\\/?$","segments":[[{"content":"mapel","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/mapel.astro","pathname":"/mapel","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/createKuis.D8n5973i.css"}],"routeData":{"route":"/profile","isIndex":false,"type":"page","pattern":"^\\/profile\\/?$","segments":[[{"content":"profile","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/profile.astro","pathname":"/profile","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/createKuis.D8n5973i.css"}],"routeData":{"route":"/register","isIndex":false,"type":"page","pattern":"^\\/register\\/?$","segments":[[{"content":"register","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/register.astro","pathname":"/register","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/createKuis.D8n5973i.css"}],"routeData":{"route":"/users","isIndex":false,"type":"page","pattern":"^\\/users\\/?$","segments":[[{"content":"users","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/users.astro","pathname":"/users","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/createKuis.D8n5973i.css"}],"routeData":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}}],"base":"/","trailingSlash":"ignore","compressHTML":true,"componentMetadata":[["/home/user/kuis/src/pages/createKuis.astro",{"propagation":"none","containsHead":true}],["/home/user/kuis/src/pages/dashboard.astro",{"propagation":"none","containsHead":true}],["/home/user/kuis/src/pages/feedback.astro",{"propagation":"none","containsHead":true}],["/home/user/kuis/src/pages/history.astro",{"propagation":"none","containsHead":true}],["/home/user/kuis/src/pages/kelas.astro",{"propagation":"none","containsHead":true}],["/home/user/kuis/src/pages/kuis/[kuis].astro",{"propagation":"none","containsHead":true}],["/home/user/kuis/src/pages/log.astro",{"propagation":"none","containsHead":true}],["/home/user/kuis/src/pages/mapel.astro",{"propagation":"none","containsHead":true}],["/home/user/kuis/src/pages/profile.astro",{"propagation":"none","containsHead":true}],["/home/user/kuis/src/pages/users.astro",{"propagation":"none","containsHead":true}],["/home/user/kuis/src/pages/index.astro",{"propagation":"none","containsHead":true}],["/home/user/kuis/src/pages/register.astro",{"propagation":"none","containsHead":true}]],"renderers":[],"clientDirectives":[["idle","(()=>{var i=t=>{let e=async()=>{await(await t())()};\"requestIdleCallback\"in window?window.requestIdleCallback(e):setTimeout(e,200)};(self.Astro||(self.Astro={})).idle=i;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var s=(i,t)=>{let a=async()=>{await(await i())()};if(t.value){let e=matchMedia(t.value);e.matches?a():e.addEventListener(\"change\",a,{once:!0})}};(self.Astro||(self.Astro={})).media=s;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var l=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let a of e)if(a.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=l;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000astro-internal:middleware":"_astro-internal_middleware.mjs","\u0000@astro-page:node_modules/astro/dist/assets/endpoint/generic@_@js":"pages/_image.astro.mjs","\u0000@astro-page:src/pages/api/auth/detail@_@js":"pages/api/auth/detail.astro.mjs","\u0000@astro-page:src/pages/api/auth/register@_@js":"pages/api/auth/register.astro.mjs","\u0000@astro-page:src/pages/api/auth/signin@_@js":"pages/api/auth/signin.astro.mjs","\u0000@astro-page:src/pages/api/auth/signout@_@js":"pages/api/auth/signout.astro.mjs","\u0000@astro-page:src/pages/api/image/index@_@js":"pages/api/image.astro.mjs","\u0000@astro-page:src/pages/api/kelas/all@_@js":"pages/api/kelas/all.astro.mjs","\u0000@astro-page:src/pages/api/kelas/index@_@js":"pages/api/kelas.astro.mjs","\u0000@astro-page:src/pages/api/mapel/all@_@js":"pages/api/mapel/all.astro.mjs","\u0000@astro-page:src/pages/api/mapel/index@_@js":"pages/api/mapel.astro.mjs","\u0000@astro-page:src/pages/api/quiz/index@_@js":"pages/api/quiz.astro.mjs","\u0000@astro-page:src/pages/api/user/data@_@js":"pages/api/user/data.astro.mjs","\u0000@astro-page:src/pages/api/user/password-ad@_@js":"pages/api/user/password-ad.astro.mjs","\u0000@astro-page:src/pages/api/user/role@_@js":"pages/api/user/role.astro.mjs","\u0000@astro-page:src/pages/api/user/user-role@_@js":"pages/api/user/user-role.astro.mjs","\u0000@astro-page:src/pages/createKuis@_@astro":"pages/createkuis.astro.mjs","\u0000@astro-page:src/pages/dashboard@_@astro":"pages/dashboard.astro.mjs","\u0000@astro-page:src/pages/detailUsers@_@astro":"pages/detailusers.astro.mjs","\u0000@astro-page:src/pages/feedback@_@astro":"pages/feedback.astro.mjs","\u0000@astro-page:src/pages/history@_@astro":"pages/history.astro.mjs","\u0000@astro-page:src/pages/kelas@_@astro":"pages/kelas.astro.mjs","\u0000@astro-page:src/pages/kuis/[kuis]@_@astro":"pages/kuis/_kuis_.astro.mjs","\u0000@astro-page:src/pages/log@_@astro":"pages/log.astro.mjs","\u0000@astro-page:src/pages/mapel@_@astro":"pages/mapel.astro.mjs","\u0000@astro-page:src/pages/profile@_@astro":"pages/profile.astro.mjs","\u0000@astro-page:src/pages/register@_@astro":"pages/register.astro.mjs","\u0000@astro-page:src/pages/users@_@astro":"pages/users.astro.mjs","\u0000@astro-page:src/pages/index@_@astro":"pages/index.astro.mjs","\u0000@astrojs-ssr-virtual-entry":"entry.mjs","\u0000@astro-renderers":"renderers.mjs","/home/user/kuis/node_modules/astro/dist/env/setup.js":"chunks/astro/env-setup_Cr6XTFvb.mjs","/home/user/kuis/node_modules/@astrojs/react/vnode-children.js":"chunks/vnode-children_BkR_XoPb.mjs","/home/user/kuis/src/components/users/ChangePassword.jsx":"_astro/ChangePassword.Bfk99MzK.js","\u0000@astrojs-manifest":"manifest_BBWenbwi.mjs","@/components/kelas/KelasData":"_astro/KelasData.CLUXJQvx.js","@/components/Card":"_astro/Card.B08vv4cL.js","@/components/mapel/MapelData":"_astro/MapelData.DH6wtTas.js","/home/user/kuis/src/components/users/UsersData":"_astro/UsersData.DfBQ_Mjq.js","/home/user/kuis/src/components/RoleDialog":"_astro/RoleDialog.DR5tsbSu.js","/home/user/kuis/src/components/DashboardNav":"_astro/DashboardNav.By2AbJJ4.js","/home/user/kuis/src/components/Navbar.jsx":"_astro/Navbar.CRoN_aj7.js","@/components/ui/toaster":"_astro/toaster.eNTAJPzh.js","@/components/quiz/CreateQuiz":"_astro/CreateQuiz.DsCf6UMO.js","/home/user/kuis/src/components/RegisterForm":"_astro/RegisterForm.grDSovGG.js","/home/user/kuis/src/components/LoginForm":"_astro/LoginForm.C0o-qqhB.js","@astrojs/react/client.js":"_astro/client.BP1rUSKO.js","/home/user/kuis/src/components/EditorInput.jsx":"_astro/EditorInput.lkH1j1IE.js","astro:scripts/before-hydration.js":""},"inlinedScripts":[],"assets":["/_astro/createKuis.D8n5973i.css","/favicon.svg","/_astro/ButtonLoader.B4LbEwmK.js","/_astro/Card.B08vv4cL.js","/_astro/ChangePassword.Bfk99MzK.js","/_astro/Combination.bo6dpEKa.js","/_astro/CreateQuiz.B1PwUNva.js","/_astro/CreateQuiz.DsCf6UMO.js","/_astro/DashboardNav.By2AbJJ4.js","/_astro/EditorInput.lkH1j1IE.js","/_astro/KelasData.CLUXJQvx.js","/_astro/LoginForm.C0o-qqhB.js","/_astro/MapelData.DH6wtTas.js","/_astro/Navbar.CRoN_aj7.js","/_astro/RegisterForm.grDSovGG.js","/_astro/RoleDialog.DR5tsbSu.js","/_astro/UsersData.DfBQ_Mjq.js","/_astro/WithQuery.DnMMxJSk.js","/_astro/button.4wA_-35M.js","/_astro/client.BP1rUSKO.js","/_astro/dialog.C3FXW3zP.js","/_astro/generatePdf.Bzozffwp.js","/_astro/index.BQ-noFVk.js","/_astro/index.BT_cHE16.js","/_astro/index.C7eCcQ7I.js","/_astro/index.CxOCE76-.js","/_astro/index.D-OInZdG.js","/_astro/index.D2UOOlok.js","/_astro/index.DLkKLInH.js","/_astro/index.UvFsUNS0.js","/_astro/index.bGmHf_Qs.js","/_astro/index.caxmlYbZ.js","/_astro/input.C4_IcoYx.js","/_astro/jsx-runtime.B6Q2Q8rY.js","/_astro/preload-helper.BiBI96sQ.js","/_astro/react-icons.esm.Bl5TofSn.js","/_astro/select.Cho6iDwW.js","/_astro/toaster.eNTAJPzh.js","/_astro/use-toast.FdKHRWm9.js","/_astro/useBaseQuery.Dlinqwim.js","/_astro/useMutation.CWFg6o0r.js","/images/f952a9dc-0191-42db-9e78-cf127d7e16af.jpeg"],"buildFormat":"directory","checkOrigin":false,"rewritingEnabled":false,"serverIslandNameMap":[],"experimentalEnvGetSecretEnabled":false});

export { AstroIntegrationLogger as A, DEFAULT_404_ROUTE as D, Logger as L, default404Instance as d, ensure404Route as e, getEventPrefix as g, levels as l, manifest as m };
