// import Script from 'next/script'

export function InlineScript(props: { id: string; children: () => void }) {
  return (
    <script
      id={props.id}
      dangerouslySetInnerHTML={{ __html: `(${props.children.toString()})()` }}
    />
  )
}
