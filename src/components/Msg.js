import { h, Component } from 'preact';
import KUTE from 'kute.js';

const onclick = (e) => {
	console.log(e.target);
	KUTE.to(e.target,
		{ translate: 1, opacity: 0 },
		{ duration: 500, delay: 0, easing: 'exponentialInOut' }
	).start();
};

export default class ChatImage extends Component {
	render({ id, msg, img }) {
		return <div>
			<dd class={id === '0' ? 'to' : 'from'}>
				<p onclick={onclick}>{msg}</p>
			</dd><img class={id === '0' ? 'me' : 'you'} src={img} />
		</div>;
	}
}