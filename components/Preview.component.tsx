"use client"


import React, {useEffect, useRef} from "react"
import Babel from "@babel/standalone"

type PreviewProps = {
	code: string;
};

const Preview = ({code}: PreviewProps) => {
	const iframeRef = useRef<HTMLIFrameElement>(null)

	useEffect(() => {
		if (!iframeRef.current) return
		const iframe = iframeRef.current
		iframe.contentWindow?.postMessage(code, "*")
	}, [code])
	const iFrameSrcDoc = `
      <html>
      <head>
        <script crossorigin src="https://unpkg.com/react@18/umd/react.development.js"></script>
<script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
          <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
           <script src="https://cdn.tailwindcss.com"></script>
      
</head>
        <body>
          <div id="root"></div>

          <script>
          window.addEventListener("message", (event) => {
            try {
				
              const rootElement = document.getElementById("root")
              const code = Babel.transform(event.data, { presets: ["react"] }).code
             ReactDOM.render(eval(code), rootElement) 
             
            } catch (err) {
              const root = document.querySelector("#root")
              root.innerHTML = "<div ><h4>Runtime Error:</h4>" + err + "</div>"
              console.error(err)
            }
          }, false)
          </script>
          <p class="text-sky-500">Hello</p>
        </body>
      </html>
      `
	return (
		<iframe
			className={"w-full h-full bg-slate-100 p-8"}
			sandbox="allow-scripts"
			ref={iframeRef}
			srcDoc={iFrameSrcDoc}
		/>
	)
}

export default Preview
