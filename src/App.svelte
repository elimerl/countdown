<script>
	let countdown = localStorage.getItem("lastDate") || "2021-12-31";
	let msg = "in";
	let formattedTime = "";
	let userMessage = localStorage.getItem("userMessage") || "Countdown ends";
	$: {
		localStorage.setItem("lastDate", countdown);
		localStorage.setItem("userMessage", userMessage);
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
	msg = "in";
	const time = timeLeft(new Date(countdown).getTime());
	if (time.days > 0) {
		msg += ` ${time.days} days`;
	}
	if (time.hours > 0) {
		msg += ` ${time.hours} hours`;
	}
	if (time.minutes > 0) {
		msg += ` ${time.minutes} minutes`;
	}
	if (time.seconds > 0) {
		msg += ` ${time.seconds} seconds`;
	}
	setInterval(() => {
		msg = "in";
		const time = timeLeft(new Date(countdown).getTime());
		if (time.days > 0) {
			msg += ` ${time.days} days`;
		}
		if (time.hours > 0) {
			msg += ` ${time.hours} hours`;
		}
		if (time.minutes > 0) {
			msg += ` ${time.minutes} minutes`;
		}
		if (time.minutes > 0 && time.seconds > 0) {
			msg += " and";
		}
		if (time.seconds > 0) {
			msg += ` ${time.seconds} seconds`;
		}
	}, 1000);
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
	.App code {
		background: #0002;
		padding: 4px 8px;
		border-radius: 4px;
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

<div class="App">
	<header class="App-header">
		<h1>Countdown</h1>
		<div>
			<p style="font-size: 3em;">
				<span contenteditable bind:innerHTML={userMessage} />
				{msg}
			</p>
			<input type="date" bind:value={countdown} id="countdown" />
			<input type="time" id="time" value="23:59" />
			<!-- midnight isn't working???-->
		</div>
	</header>
</div>
