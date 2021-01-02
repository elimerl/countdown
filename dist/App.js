import './App.css.proxy.js';
/* src/App.svelte generated by Svelte v3.31.0 */
import {
	SvelteComponent,
	add_render_callback,
	append,
	attr,
	detach,
	element,
	init,
	insert,
	listen,
	noop,
	run_all,
	safe_not_equal,
	set_data,
	set_input_value,
	set_style,
	space,
	text
} from "../web_modules/svelte/internal.js";

import confetti from "../web_modules/canvas-confetti.js";

function create_fragment(ctx) {
	let div1;
	let header;
	let h1;
	let t1;
	let div0;
	let p;
	let span;
	let span_spellcheck_value;
	let t2;
	let t3;
	let t4;
	let input;
	let t5;
	let button;
	let t7;
	let small;
	let mounted;
	let dispose;

	return {
		c() {
			div1 = element("div");
			header = element("header");
			h1 = element("h1");
			h1.textContent = "Countdown";
			t1 = space();
			div0 = element("div");
			p = element("p");
			span = element("span");
			t2 = space();
			t3 = text(/*msg*/ ctx[3]);
			t4 = space();
			input = element("input");
			t5 = space();
			button = element("button");
			button.textContent = "Copy\n\t\t\t\tPermalink";
			t7 = space();
			small = element("small");

			small.textContent = `Uses
			${Intl.DateTimeFormat().resolvedOptions().timeZone}
			time.`;

			span.hidden = /*usrMsgElement*/ ctx[2];
			attr(span, "contenteditable", "");
			attr(span, "spellcheck", span_spellcheck_value = false);
			if (/*userMessage*/ ctx[1] === void 0) add_render_callback(() => /*span_input_handler*/ ctx[5].call(span));
			set_style(p, "font-size", "3em");
			attr(p, "class", "svelte-22ess9");
			attr(input, "type", "datetime-local");
			attr(input, "id", "countdown");
			attr(input, "class", "svelte-22ess9");
			attr(button, "class", "svelte-22ess9");
			set_style(small, "font-size", ".5em");
			attr(header, "class", "App-header svelte-22ess9");
			attr(div1, "class", "App svelte-22ess9");
		},
		m(target, anchor) {
			insert(target, div1, anchor);
			append(div1, header);
			append(header, h1);
			append(header, t1);
			append(header, div0);
			append(div0, p);
			append(p, span);

			if (/*userMessage*/ ctx[1] !== void 0) {
				span.innerHTML = /*userMessage*/ ctx[1];
			}

			append(p, t2);
			append(p, t3);
			append(div0, t4);
			append(div0, input);
			set_input_value(input, /*countdown*/ ctx[0]);
			append(div0, t5);
			append(div0, button);
			append(header, t7);
			append(header, small);

			if (!mounted) {
				dispose = [
					listen(span, "input", /*span_input_handler*/ ctx[5]),
					listen(input, "input", /*input_input_handler*/ ctx[6]),
					listen(button, "click", /*click_handler*/ ctx[7])
				];

				mounted = true;
			}
		},
		p(ctx, [dirty]) {
			if (dirty & /*usrMsgElement*/ 4) {
				span.hidden = /*usrMsgElement*/ ctx[2];
			}

			if (dirty & /*userMessage*/ 2 && /*userMessage*/ ctx[1] !== span.innerHTML) {
				span.innerHTML = /*userMessage*/ ctx[1];
			}

			if (dirty & /*msg*/ 8) set_data(t3, /*msg*/ ctx[3]);

			if (dirty & /*countdown*/ 1) {
				set_input_value(input, /*countdown*/ ctx[0]);
			}
		},
		i: noop,
		o: noop,
		d(detaching) {
			if (detaching) detach(div1);
			mounted = false;
			run_all(dispose);
		}
	};
}

function timeLeft(countDownDate) {
	const now = new Date().getTime();
	const timeleft = countDownDate - now;
	const days = Math.floor(timeleft / (1000 * 60 * 60 * 24));
	const hours = Math.floor(timeleft % (1000 * 60 * 60 * 24) / (1000 * 60 * 60));
	const minutes = Math.floor(timeleft % (1000 * 60 * 60) / (1000 * 60));
	const seconds = Math.floor(timeleft % (1000 * 60) / 1000);
	return { days, hours, minutes, seconds };
}

function parser(string, results) {
	"use strict";
	const result = (/((?:"[^"]+[^\\]")|(?:'[^']+[^\\]')|(?:[^=]+))\s*=\s*("(?:[\s\S]*?[^\\])"|'(?:[\s\S]*?[^\\])'|(?:.*?[^\\])|$)(?:;|$)(?:\s*(.*))?/m).exec(string);

	if (result && result[1]) {
		const key = result[1].trim().replace(/(^\s*["'])|(["']\s*$)/g, "");

		if (typeof result[2] === "string") {
			const val = result[2].replace(/(^\s*[\\]?["'])|([\\]?["']\s*$)/g, "");

			// const val = result[2];
			if ((/^[0-9-.,]+$/).test(val)) {
				results[key] = parseFloat(val);
			} else if (val === "") {
				results[key] = undefined;
			} else if (val.toLowerCase() === "true") {
				results[key] = true;
			} else if (val.toLowerCase() === "false") {
				results[key] = false;
			} else {
				results[key] = val;
			}
		} else {
			results[result[1].trim()] = undefined;
		}

		if (result[3] && result[3].length > 1) {
			parser(result[3], results);
		}
	}
}

function instance($$self, $$props, $$invalidate) {
	let usrMsgElement = false;
	const parsedHash = {};
	parser(window.location.hash.slice(1), parsedHash);
	console.log(parsedHash);

	let countdown = parsedHash.countdown
	? decodeURIComponent(parsedHash.countdown)
	: localStorage.getItem("lastDate") || new Date().toISOString().slice(0, 16);

	console.log(countdown);
	let msg = "in";

	let userMessage = parsedHash.message
	? decodeURIComponent(parsedHash.message)
	: localStorage.getItem("userMessage") || "Countdown ends";

	let finishedCountdown = false;

	function genMsg() {
		$$invalidate(3, msg = "in");
		const countdownDate = new Date(countdown);
		const time = timeLeft(countdownDate.getTime());

		if (time.days <= 0 && time.hours <= 0 && time.minutes <= 0 && time.seconds <= 0) {
			finishedCountdown = true;
			$$invalidate(2, usrMsgElement = true);
			$$invalidate(3, msg = "Finished!");
			if (!finishedCountdown) confetti();
		}

		if (time.days > 0) {
			$$invalidate(3, msg += ` ${time.days} days`);
		}

		if (time.hours > 0) {
			$$invalidate(3, msg += ` ${time.hours} hours`);
		}

		if (time.minutes > 0) {
			$$invalidate(3, msg += ` ${time.minutes} minutes`);
		}

		if (time.seconds > 0) {
			$$invalidate(3, msg += ` ${time.seconds} seconds`);
		}
	}

	genMsg();

	setInterval(
		() => {
			genMsg();
		},
		1000
	);

	function getPermaLink() {
		const url = new URL(window.location.href);
		url.hash = `message=${encodeURIComponent(userMessage)};countdown=${encodeURIComponent(countdown)}`;
		return url.href;
	}

	function span_input_handler() {
		userMessage = this.innerHTML;
		$$invalidate(1, userMessage);
	}

	function input_input_handler() {
		countdown = this.value;
		$$invalidate(0, countdown);
	}

	const click_handler = () => navigator.clipboard.writeText(getPermaLink());

	$$self.$$.update = () => {
		if ($$self.$$.dirty & /*countdown, userMessage*/ 3) {
			$: {
				console.log(countdown);
				$$invalidate(2, usrMsgElement = false);
				genMsg();
				localStorage.setItem("lastDate", new Date(countdown).toISOString().slice(0, 16));
				localStorage.setItem("userMessage", userMessage);
			}
		}
	};

	return [
		countdown,
		userMessage,
		usrMsgElement,
		msg,
		getPermaLink,
		span_input_handler,
		input_input_handler,
		click_handler
	];
}

class App extends SvelteComponent {
	constructor(options) {
		super();
		init(this, options, instance, create_fragment, safe_not_equal, {});
	}
}

export default App;