"use client"
// Changed import from "react-monaco-editor" to "@monaco-editor/react"
import React, {useRef} from "react"
import MonacoEditor from "@monaco-editor/react"

interface EditorProps {
	onCodeChange: (newCode: string | undefined) => void;
}

const Editor = ({onCodeChange}: EditorProps) => {
	const editorRef = useRef<unknown>(null)

	// editorDidMount is replaced with onMount in "@monaco-editor/react"
	const handleEditorDidMount = (editor: any, monaco: any) => {
		editorRef.current = editor

		// configure JSX support for TypeScript
		monaco.languages.typescript.javascriptDefaults.setCompilerOptions({
																			  jsx: monaco.languages.typescript.JsxEmit.React,
																			  allowNonTsExtensions: true,
																			  moduleResolution: monaco.languages.typescript.ModuleResolutionKind.NodeJs,
																			  module: monaco.languages.typescript.ModuleKind.CommonJS,
																			  target: monaco.languages.typescript.ScriptTarget.ES2016,
																		  })
	}

	const options = {
		selectOnLineNumbers: true,
		theme: "vs-dark", // moved theme to options
		language: "javascript", // moved language to options
		automaticLayout: true,
	}

	// Returned MonacoEditor from "@monaco-editor/react"
	return (
		<MonacoEditor
			options={options}
			onChange={onCodeChange}
			onMount={handleEditorDidMount} // changed editorDidMount to onMount
		/>
	)
}

export default Editor
