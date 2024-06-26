'use client'

import { FormEvent, useState } from 'react'
import { useRouter } from 'next/navigation'
import classNames from 'classnames/bind'

import { deleteCategoryById, putCategoryById } from '@/apis/categories'
import useIsLogin from '@/hooks/useIsLogin'

import styles from './index.module.css'

interface Props {
  initCategoryName: string
  categoryId: string
}

const cx = classNames.bind(styles)

const EachCategoryHeader = ({ initCategoryName, categoryId }: Props) => {
  const router = useRouter()
  const { isLoggedin } = useIsLogin()

  const [isCategoryNameEditable, setIsCategoryNameEditable] =
    useState<boolean>(false)
  const [categoryName, setCategoryName] = useState<string | null>(
    initCategoryName,
  )

  const handleInputCategoryName = ({
    currentTarget: { textContent },
  }: FormEvent<HTMLHeadingElement>) => {
    setCategoryName(textContent)
  }

  const handleClickEditButton = () => {
    setIsCategoryNameEditable(true)
  }

  const handleClickDeleteButton = async () => {
    const confirmed = window.confirm(
      '정말 삭제하시겠습니까? 아티클들은 삭제되지 않습니다.',
    )

    if (!confirmed) return

    try {
      const res = await deleteCategoryById(categoryId)

      if (!res.ok) {
        router.push('/')
        throw new Error('카테고리를 삭제하는데 실패했습니다.')
      }

      router.push('/')
    } catch (error) {
      console.log(error)
    }
  }

  const handleClickApplyButton = async () => {
    if (!categoryName) return window.confirm('카테고리 이름을 입력해주세요.')

    try {
      const res = await putCategoryById({ _id: categoryId, categoryName })

      if (!res.ok) {
        router.push('/')
        throw new Error('카테고리를 수정하는데 실패했습니다.')
      }

      setIsCategoryNameEditable(false)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <header>
      <h1
        contentEditable={isCategoryNameEditable}
        onInput={handleInputCategoryName}
        suppressContentEditableWarning
        className={cx('categoryTitle')}
      >
        {initCategoryName}
      </h1>
      <div className={cx('categoryTitleDivisionLine')} />
      {isLoggedin && (
        <div className={cx('categoryTitleEditButtonsWrapper')}>
          {isCategoryNameEditable ? (
            <button
              onClick={handleClickApplyButton}
              disabled={!categoryName}
              className={cx('categoryTitleEditButton')}
            >
              적용
            </button>
          ) : (
            <>
              <button
                onClick={handleClickEditButton}
                className={cx('categoryTitleEditButton')}
              >
                수정
              </button>
              <button
                onClick={handleClickDeleteButton}
                className={cx('categoryTitleEditButton', 'deleteButton')}
              >
                삭제
              </button>
            </>
          )}
        </div>
      )}
    </header>
  )
}

export default EachCategoryHeader
