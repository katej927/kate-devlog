'use client'

import { useMemo, useRef } from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'

import { ArticleContentInterface } from '@/apis/articles'

import { FORMATS, convertModules } from './_shared'
import { HandleChangeNewContentType } from '../_shared'

interface Props {
  contentHtml: ArticleContentInterface['html']
  onChangeContent: (content: HandleChangeNewContentType) => void
}

const Editor = ({ contentHtml, onChangeContent }: Props) => {
  const quillRef = useRef<ReactQuill>()

  const modules = useMemo(() => convertModules(quillRef), [])

  return (
    <ReactQuill
      theme="snow"
      style={{
        height: '550px',
        display: 'inline-block',
      }}
      onChange={(value, delta, source, editor) =>
        onChangeContent({
          text: editor.getText(),
          html: editor.getHTML(),
        })
      }
      modules={modules}
      formats={FORMATS}
      ref={(element) => {
        if (element !== null) {
          quillRef.current = element
        }
      }}
      placeholder="내용을 입력해주세요."
      value={contentHtml}
    />
  )
}

export default Editor
