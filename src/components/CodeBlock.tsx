interface CodeBlockProps {
  code: string
}

export function CodeBlock({ code }: CodeBlockProps) {
  return (
    <div className="code-block">
      {code}
    </div>
  )
}
