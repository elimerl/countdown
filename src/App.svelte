<script lang="ts">
	import { timestampToDatetimeInputString } from "./polyfill";
	import confetti from "canvas-confetti";
	let usrMsgElement = false;
	const parsedHash: {
		countdown?: string;
		message?: string;
		time?: string;
	} = {};
	parser(window.location.hash.slice(1), parsedHash);
	const nowAlmost = new Date();
	nowAlmost.setMinutes(nowAlmost.getMinutes() + 1);
	let countdown = parsedHash.countdown
		? decodeURIComponent(parsedHash.countdown)
		: localStorage.getItem("lastDate") ||
		  timestampToDatetimeInputString(nowAlmost.getTime());
	let msg = "in";
	let userMessage = parsedHash.message
		? decodeURIComponent(parsedHash.message)
		: localStorage.getItem("userMessage") || "Countdown ends";
	$: {
		localStorage.setItem("lastDate", countdown);
		localStorage.setItem("userMessage", userMessage);

		const countdownDate = new Date(countdown);
		const time = timeLeft(countdownDate.getTime());

		if (
			time.days >= 0 &&
			time.hours >= 0 &&
			time.minutes >= 0 &&
			time.seconds >= 0
		) {
			usrMsgElement = false;
			genMsg();
			finishedCountdown = false;
		}
	}
	function timeLeft(countDownDate: number) {
		const now = new Date().getTime();
		const timeleft = countDownDate - now;
		const days = Math.floor(timeleft / (1000 * 60 * 60 * 24));
		const hours = Math.floor(
			(timeleft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
		);
		const minutes = Math.floor((timeleft % (1000 * 60 * 60)) / (1000 * 60));
		const seconds = Math.floor((timeleft % (1000 * 60)) / 1000);
		return { days, hours, minutes, seconds };
	}
	let finishedCountdown = false;
	function genMsg() {
		msg = "in";
		const countdownDate = new Date(countdown);

		const time = timeLeft(countdownDate.getTime());
		if (
			time.days <= 0 &&
			time.hours <= 0 &&
			time.minutes <= 0 &&
			time.seconds <= 0
		) {
			if (!finishedCountdown) fireworks(5000);
			finishedCountdown = true;
			usrMsgElement = true;
			msg = "Finished!";
		}
		if (time.days > 0) {
			msg += ` ${time.days} day${time.days === 1 ? "" : "s"}`;
		}
		if (time.hours > 0) {
			msg += ` ${time.hours} hour${time.hours === 1 ? "" : "s"}`;
		}
		if (time.minutes > 0) {
			msg += ` ${time.minutes} minute${time.minutes === 1 ? "" : "s"}`;
		}
		if (time.seconds > 0) {
			msg += ` ${time.seconds} second${time.seconds === 1 ? "" : "s"}`;
		}
	}
	function fireworks(duration: number) {
		const animationEnd = Date.now() + duration;
		const defaults = {
			startVelocity: 30,
			spread: 360,
			ticks: 60,
			zIndex: 0,
		};

		function randomInRange(min: number, max: number) {
			return Math.random() * (max - min) + min;
		}
		//@ts-expect-error
		const interval = setInterval(function () {
			const timeLeft = animationEnd - Date.now();

			if (timeLeft <= 0) {
				return clearInterval(interval);
			}

			const particleCount = 50 * (timeLeft / duration);
			// since particles fall down, start a bit higher than random
			confetti(
				Object.assign({}, defaults, {
					particleCount,
					origin: {
						x: randomInRange(0.1, 0.3),
						y: Math.random() - 0.2,
					},
				})
			);
			confetti(
				Object.assign({}, defaults, {
					particleCount,
					origin: {
						x: randomInRange(0.7, 0.9),
						y: Math.random() - 0.2,
					},
				})
			);
		}, 250);
	}
	genMsg();
	setInterval(() => {
		genMsg();
	}, 1000);
	function parser(
		string: string,
		results: { [key: string]: string | number | boolean | undefined }
	) {
		"use strict";
		const result = /((?:"[^"]+[^\\]")|(?:'[^']+[^\\]')|(?:[^=]+))\s*=\s*("(?:[\s\S]*?[^\\])"|'(?:[\s\S]*?[^\\])'|(?:.*?[^\\])|$)(?:;|$)(?:\s*(.*))?/m.exec(
			string
		);
		if (result && result[1]) {
			const key = result[1].trim().replace(/(^\s*["'])|(["']\s*$)/g, "");
			if (typeof result[2] === "string") {
				const val = result[2].replace(
					/(^\s*[\\]?["'])|([\\]?["']\s*$)/g,
					""
				);
				// const val = result[2];
				if (/^[0-9-.,]+$/.test(val)) {
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

	function getPermaLink() {
		const url = new URL(window.location.href);
		url.hash = `message=${encodeURIComponent(
			userMessage
		)};countdown=${encodeURIComponent(countdown)}`;
		return url.href;
	}
</script>

<style>
	@import url("https://fonts.googleapis.com/css2?family=Lato:wght@300;400&display=swap");

	:global(body) {
		margin: 0;
		font-family: "Lato", sans-serif;
	}
	.App {
		text-align: center;
	}

	.App p {
		margin: 0.4rem;
	}

	.App-header {
		background-color: rgb(15, 15, 15);
		color: whitesmoke;
		min-height: 100vh;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		font-size: calc(10px + 2vmin);
	}

	@keyframes App-logo-spin {
		from {
			transform: scale(1);
		}
		to {
			transform: scale(1.06);
		}
	}
	button {
		display: inline-block;
		padding: 0.35em 1.2em;
		border: 0.1em solid #ffffff;
		margin: 0 0.3em 0.3em 0;
		border-radius: 0.12em;
		box-sizing: border-box;
		text-decoration: none;
		font-weight: 300;
		text-align: center;
		transition: all 0.2s;
	}
	input {
		display: inline-block;
		padding: 0.35em 1.2em;
		border: 0.1em solid #ffffff;
		margin: 0 0.3em 0.3em 0;
		border-radius: 0.12em;
		box-sizing: border-box;
		text-decoration: none;
		font-weight: 300;
		text-align: center;
		transition: all 0.2s;
	}
</style>

<svelte:head>
	<script
		lang="js"
		src="https://unpkg.com/ionicons@5.1.2/dist/ionicons/ionicons.js">
	</script>
	<title>Ends {msg}</title>
</svelte:head>
<div class="App">
	<header class="App-header">
		<div>
			<p style="font-size: 3em;">
				<span hidden={usrMsgElement}><ion-icon
						name="hourglass-outline" />
				</span>
				<span hidden={!usrMsgElement}><ion-icon
						name="checkmark-outline" />
				</span>
				<br />
				<span
					hidden={usrMsgElement}
					contenteditable
					bind:innerHTML={userMessage}
					spellcheck={false} />

				{msg}
			</p>
			<input
				type="datetime-local"
				bind:value={countdown}
				id="countdown" />
			<button
				on:click={() => navigator.clipboard.writeText(getPermaLink())}>Copy
				Permalink</button>
			<button
				on:click={() => {
					localStorage.clear();
					window.location.reload();
				}}>Reset</button>
		</div>
		<small style="font-size: .5em;">Uses
			{Intl.DateTimeFormat().resolvedOptions().timeZone}
			time.</small>
	</header>
</div>
