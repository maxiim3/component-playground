"use client"
import React, {useCallback, useEffect, useState} from "react"

import dynamic from "next/dynamic"

const Editor = dynamic(() => import( "./Editor.component" ), {ssr: false, loading: () => <h1>Loading Editor</h1>})
const Preview = dynamic(() => import( "./Preview.component" ), {ssr: false, loading: () => <h1>Loading Preview</h1>})

const App = () => {
	const [code, setCode] = useState("")
	const [isLoading, setIsLoading] = useState(true)
	useEffect(() => {
		setIsLoading(false)
	}, [])
	const exampleCode = `
render(
  <h1>Hello, world!</h1>
)
`
	const handleCodeChange = useCallback(
		(newCode: string | undefined) => {
			console.log(code)
			newCode && setCode(newCode)
		},
		[],
	)
	if (isLoading) return <h2>Editor is mounting...</h2>


	return (
		<div className={"flex flex-row w-screen h-screen p-4"}>
			{/*<LiveProvider code={exampleCode} noInline={true}><h2>COUCOU</h2></LiveProvider>*/}
			<div className={"bg-pink-300 w-1/2"}><Editor onCodeChange={handleCodeChange} /></div>
			<div className={"bg-sky-500 w-1/2"}><Preview code={code} /></div>
		</div>
	)
}

export default App
