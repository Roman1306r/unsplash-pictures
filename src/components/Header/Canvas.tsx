import { useEffect, useRef } from 'react'
import gsap from 'gsap'

const Canvas = () => {

	const canvasRef = useRef<any>(null)

    useEffect(() => {
		const c = canvasRef?.current
    	const ctx = c.getContext('2d');

		let cw = c.width = innerWidth
		let ch = c.height = innerHeight

		const ticks = 50
		const ring1: any = []
		const ring2: any = []
		const dur = 60

		for (let i=0; i<ticks; i++) {
			const angle = i / ticks * Math.PI * 2
			const radius = 250
			ring1[i] = {
				x1:0, x2:0, y1:0, y2:0,
				lineWidth: 6,
				a: angle,
				r: radius,
				h: 180+ gsap.utils.wrapYoyo(0, 40, i/ticks * 160)
			}
			
			ring2[i] = {
				x1:0, x2:0, y1:0, y2:0,
				lineWidth: 2,
				a: angle,
				r: radius/2,
				h: 180+ gsap.utils.wrapYoyo(0, 40, i/ticks * 160)
			}
		}

		gsap.timeline({onUpdate:update})
		.fromTo([ring1,ring2], {
		x1:(_i: any,t: any)=> Math.cos(t.a)*t.r*-2,
		y1:(_i: any,t: any)=> Math.sin(t.a)*t.r*-2,
		x2:(_i: any,t: any)=> Math.cos(t.a)*t.r*15,
		y2:(_i: any,t: any)=> Math.sin(t.a)*t.r*8,
		},{
		x1:(_i: any,t: any)=> Math.cos(t.a)*t.r*.3,
		y1:(_i: any,t: any)=> Math.sin(t.a)*t.r*.3,
		x2:(_i: any,t: any)=> Math.cos(t.a)*t.r*.12,
		y2:(_i: any,t: any)=> Math.sin(t.a)*t.r*.12,
		duration:dur/2,
		ease:'back',
		repeat:-1,
		yoyo:true
		}, 0)
		.to(ring1, {
		lineWidth: 1,
		h:'+=120',
		duration: dur *.25,
		ease:'power4',
		yoyoEase:'power2.in',
		stagger:{amount:dur, from:0, repeat:-1, yoyo:true}
		}, 0)
		.play(dur * 1.5)


		function drawPath(t: any) {
			ctx.strokeStyle = 'white'
			ctx.lineCap = "round"
			ctx.lineWidth = t.lineWidth
			ctx.setLineDash([t.lineWidth*2, 30])
			ctx.beginPath()
			ctx.moveTo(t.x1+cw/2, t.y1+ch/2);
			ctx.lineTo(t.x2+cw/2, t.y2+ch/2);
			ctx.stroke();
		}

		function update(){
			ctx.clearRect(0,0,cw,ch)
			ring1.forEach(drawPath)
			ring2.forEach(drawPath)
		}

		window.onresize = ()=>{
			cw = c.width = innerWidth
			ch = c.height = innerHeight
			update()
		}

    }, [])

	return (
		<canvas className='header__canvas' ref={canvasRef} />	
	);
}
export default Canvas;