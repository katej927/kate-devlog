'use client'

import { useRouter } from 'next/navigation'

import {
  DetailArticleCategoryIdInterface,
  GetDetailArticleInterface,
  putArticleById,
} from '@/apis/articles'

import ArticleForm from '@/components/ArticleForm'

interface Props {
  article: GetDetailArticleInterface
}

const ArticleEdit = ({
  article: { title, content, _id: id, category },
}: Props) => {
  const router = useRouter()

  const handleSubmit = async (
    editedArticle: DetailArticleCategoryIdInterface,
  ) => {
    try {
      const res = await putArticleById(id, editedArticle)

      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`)
      }

      router.push(`/article/${id}`)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <ArticleForm
      title={title}
      content={content}
      category={category}
      onSubmit={handleSubmit}
    />
  )
}
export default ArticleEdit
