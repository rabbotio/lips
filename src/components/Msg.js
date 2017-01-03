import { h } from 'preact';
import KUTE from 'kute.js';

const onclick = (e) => {
	console.log(e.target);
	KUTE.to(e.target,
		{ translate: 1, opacity: 0 },
		{ duration: 500, delay: 0, easing: 'exponentialInOut' }
	).start();
};

export default ({ id, uid, msg, img }) => <div>
	<dd class={uid === '0' ? 'to' : 'from'}>
		<p onclick={onclick}>{msg}</p>
	</dd><img class={uid === '0' ? 'me' : 'you'} src={img} />
</div>;
