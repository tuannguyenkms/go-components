/* eslint-disable react/prop-types */
import React, { FunctionComponent } from 'react'
import { ReactionFormProps } from '.'
import { MentionInputNew } from './mention-input-new'

export const CommentInput: FunctionComponent<ReactionFormProps> = (props: ReactionFormProps) => {
  const { type = 'input' } = props
  switch (type) {
    case 'button':
      return <MentionInputNew  {...props} />
    case 'input':
      return <MentionInputNew {...props}  />
    default:
      return <MentionInputNew {...props}  />
  }
}
