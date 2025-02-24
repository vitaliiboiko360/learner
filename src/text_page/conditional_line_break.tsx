import React from 'react'

export default function ConditionalLineBreak(props) {
  if (props.endParagraph)
    return (<><br /><br /></>);
  return (<></>)
}