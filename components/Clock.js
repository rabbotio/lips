import React from 'react'
import Bar from './Bar'

export default Foo => {
	return (
		<div>
			<dl className="foo">
				<style jsx>{`
					.foo {
						color: red; 
					}
					.foo p {
						color: green; 
					}
					.bar p + p {
						color: blue; 
					}
					`}
				</style>
				red<p>green</p><p>blue</p>
				{
					[0,1,2].map(item => <Bar key={item}/>)
				}
			</dl>
		</div>
	)
};

const format = t => `${pad(t.getHours())}:${pad(t.getMinutes())}:${pad(t.getSeconds())}`

const pad = n => n < 10 ? `0${n}` : n